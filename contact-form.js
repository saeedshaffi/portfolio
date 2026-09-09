/* Contact form (footer): validation, submit to Formspree, inline states.
   The footer is static markup outside <main>, so this arms once and survives route changes. */
(function(){
  const form=document.querySelector('.ft5-form');
  if(!form||form.dataset.ready==='true')return;
  form.dataset.ready='true';

  const fields=[...form.querySelectorAll('.ft5-field')];
  const button=form.querySelector('.ft5-submit');
  const status=form.querySelector('.ft5-status');
  const done=form.querySelector('.ft5-done');
  const body=form.querySelector('.ft5-body');
  const counter=form.querySelector('.ft5-count');
  const message=form.querySelector('#ct-message');
  const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MAX=Number(message?.getAttribute('maxlength'))||2000;
  const DRAFT='ft5-draft';
  const SENT_KEY='ft5-sent-at';
  const SENT_WINDOW=24*60*60*1000;   /* one delivered message per browser per 24h; repeats get the same confirmation, nothing is sent */
  const armedAt=Date.now();
  const recentlySent=()=>{try{const t=Number(localStorage.getItem(SENT_KEY)||0);return t&&(Date.now()-t)<SENT_WINDOW;}catch(e){return false;}};
  const markSent=()=>{try{localStorage.setItem(SENT_KEY,String(Date.now()));}catch(e){}};

  const messageFor=input=>{
    const v=input.value.trim();
    if(!v)return input.name==='name'?'Please add your name.':input.name==='email'?'Please add your email address.':'Please write a short message.';
    if(input.name==='email'&&!EMAIL.test(v))return 'That email address doesn’t look right.';
    if(input.name==='message'&&v.length<10)return 'A sentence or two helps me reply properly.';
    if(input.name==='message'&&v.length>MAX)return 'That’s a little long. Please keep it under '+MAX.toLocaleString()+' characters.';
    return '';
  };

  const paint=(field,touched)=>{
    const input=field.querySelector('input,textarea');
    const error=field.querySelector('.ft5-error');
    const msg=messageFor(input);
    field.classList.toggle('is-filled',!msg&&input.value.trim()!=='');
    if(touched||field.dataset.touched==='true'){
      field.dataset.touched='true';
      field.classList.toggle('is-invalid',!!msg);
      input.setAttribute('aria-invalid',msg?'true':'false');
      if(error)error.textContent=msg;
    }
    return !msg;
  };

  /* message length: the counter only appears once the writer is near the limit */
  const count=()=>{
    if(!counter||!message)return;
    const n=message.value.length;
    counter.textContent=n.toLocaleString()+' / '+MAX.toLocaleString();
    counter.hidden=n<MAX*0.75;
    counter.classList.toggle('is-over',n>MAX);
  };

  /* draft survives a reload or an accidental navigation within the session */
  const saveDraft=()=>{
    try{
      const d={};fields.forEach(f=>{const i=f.querySelector('input,textarea');d[i.name]=i.value;});
      sessionStorage.setItem(DRAFT,JSON.stringify(d));
    }catch(e){}
  };
  const loadDraft=()=>{
    try{
      const d=JSON.parse(sessionStorage.getItem(DRAFT)||'null');
      if(!d)return;
      fields.forEach(f=>{const i=f.querySelector('input,textarea');if(d[i.name])i.value=d[i.name];paint(f,false);});
      count();
    }catch(e){}
  };
  const clearDraft=()=>{try{sessionStorage.removeItem(DRAFT);}catch(e){}};

  fields.forEach(field=>{
    const input=field.querySelector('input,textarea');
    input.addEventListener('blur',()=>{ if(input.value.trim()!=='')paint(field,true); else paint(field,false); });
    input.addEventListener('input',()=>{paint(field,false);saveDraft();if(input===message)count();});
  });

  /* Cmd/Ctrl + Enter sends from anywhere in the form */
  form.addEventListener('keydown',event=>{
    if(event.key==='Enter'&&(event.metaKey||event.ctrlKey)){event.preventDefault();form.requestSubmit?form.requestSubmit():button.click();}
  });

  const setError=html=>{
    status.innerHTML=html;
    status.classList.toggle('is-error',!!html);
  };

  const setLoading=on=>{
    button.classList.toggle('is-loading',on);
    button.disabled=on;
    button.setAttribute('aria-busy',on?'true':'false');
    const label=button.querySelector('span');
    if(label)label.textContent=on?'Sending':'Send message';
    fields.forEach(f=>{f.querySelector('input,textarea').readOnly=on;});
  };

  const showDone=(name,email)=>{
    form.classList.add('is-sent');
    if(body)body.hidden=true;
    done.hidden=false;
    const who=done.querySelector('.ft5-done-who');
    if(who){
      const first=(name||'').trim().split(/\s+/)[0];
      who.textContent=(first?'Thanks, '+first+'. ':'Thanks. ')+'I’ll reply to '+email+', usually within two working days.';
    }
    done.setAttribute('tabindex','-1');
    done.focus({preventScroll:true});
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const r=done.getBoundingClientRect();
    if(r.top<0||r.bottom>window.innerHeight)done.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'});
  };

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(button.disabled)return;
    setError('');
    const ok=fields.map(f=>paint(f,true)).every(Boolean);
    if(!ok){
      const first=form.querySelector('.ft5-field.is-invalid input,.ft5-field.is-invalid textarea');
      if(first)first.focus();
      return;
    }
    const action=form.getAttribute('action')||'';
    if(!/formspree\.io\/f\/[a-z0-9]+$/i.test(action)){
      setError('The form isn’t connected yet. Email me at <a href="mailto:saeedshaffi@gmail.com">saeedshaffi@gmail.com</a> instead.');
      return;
    }
    if(navigator.onLine===false){
      setError('You look offline. Your message is kept here, so try again once you’re back online.');
      return;
    }
    /* bots fill and submit within a second; people don't */
    if(Date.now()-armedAt<1200){
      setError('That was quick. Please try sending again.');
      return;
    }
    if(recentlySent()){
      /* quiet cap: behave exactly like a successful send, without posting */
      setLoading(true);
      window.setTimeout(()=>{setLoading(false);clearDraft();showDone(String(new FormData(form).get('name')||''),String(new FormData(form).get('email')||'').trim());},700);
      return;
    }
    setLoading(true);
    const controller=('AbortController' in window)?new AbortController():null;
    const timer=controller?window.setTimeout(()=>controller.abort(),15000):0;
    try{
      const data=new FormData(form);
      const name=String(data.get('name')||'').trim();
      const email=String(data.get('email')||'').trim();
      data.set('name',name);
      data.set('email',email);
      data.set('message',String(data.get('message')||'').trim());
      data.set('_replyto',email);
      const response=await fetch(action,{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller?controller.signal:undefined});
      if(!response.ok){
        let detail='';
        try{const json=await response.json();detail=(json.errors||[]).map(e=>e.message).join(' ');}catch(e){}
        throw new Error(detail||('HTTP '+response.status));
      }
      clearDraft();
      markSent();
      showDone(name,email);
    }catch(error){
      const timedOut=error&&error.name==='AbortError';
      setError((timedOut?'That took too long and the message wasn’t sent. ':'Something went wrong and the message wasn’t sent. ')+'Your text is still here, so please try again, or email me at <a href="mailto:saeedshaffi@gmail.com">saeedshaffi@gmail.com</a>.');
    }finally{
      if(timer)window.clearTimeout(timer);
      setLoading(false);
    }
  });

  /* "Send another" resets the form but keeps it on screen */
  done.querySelector('button')?.addEventListener('click',()=>{
    form.reset();
    fields.forEach(f=>{f.classList.remove('is-filled','is-invalid');delete f.dataset.touched;});
    done.hidden=true;
    if(body)body.hidden=false;
    form.classList.remove('is-sent');
    setError('');
    count();
    form.querySelector('input')?.focus();
  });

  loadDraft();
  count();
})();

/* Smooth scroll for every "Let’s talk" control (header, hero, mobile bar), plus the #lets-talk deep link */
(function(){
  const id='lets-talk';
  const go=focusField=>{
    const target=document.getElementById(id);
    if(!target)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    target.focus({preventScroll:true});
    /* hand focus to the first field once the scroll has settled (desktop only, so mobile keyboards don't pop) */
    if(focusField&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      window.setTimeout(()=>target.querySelector('.ft5-form input')?.focus({preventScroll:true}),reduce?0:700);
    }
  };
  document.addEventListener('click',event=>{
    const origin=event.target instanceof Element?event.target:null;
    const trigger=origin?.closest('[data-scroll-target="'+id+'"]');
    if(!trigger)return;
    event.preventDefault();
    const nav=document.getElementById('site-nav');
    if(nav){nav.classList.remove('open');document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');}
    go(true);
  });
  /* saeedshaffi.com/#lets-talk: the hash router owns the hash, so hand it back to the home route and scroll */
  if(location.hash==='#'+id){
    location.replace('#/');
    window.setTimeout(()=>go(false),350);
  }
})();
