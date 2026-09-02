/* Motion batch 3 — behaviour for the moments that need JS.
   window.initMotionExtras(path) is called by app.js after every render.
   Everything degrades to the static page: no class is applied unless the
   matching element exists and motion is allowed. */
(function(){
  const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=()=>window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* 5. Hero meta chips type on, once, on the first visit */
  function initMetaType(path){
    if(path!=='/'||reduceMotion()||document.body.classList.contains('is-return-visit'))return;
    const meta=document.querySelector('.home-hero-meta');
    if(!meta||meta.dataset.typed)return; meta.dataset.typed='1';
    const spans=[...meta.children].filter(el=>el.textContent.trim());
    if(!spans.length)return;
    spans.forEach(s=>{
      s.dataset.text=s.textContent;
      s.style.minWidth=Math.ceil(s.getBoundingClientRect().width)+'px';
      s.textContent='';
    });
    const typeSpan=(s,done)=>{
      const text=s.dataset.text; let i=0;
      s.classList.add('is-typing');
      const step=()=>{
        if(!s.isConnected)return;
        i++; s.textContent=text.slice(0,i);
        if(i<text.length)setTimeout(step,16+Math.random()*24);
        else setTimeout(()=>{s.classList.remove('is-typing');done();},140);
      };
      setTimeout(step,60);
    };
    let idx=0;
    const next=()=>{const s=spans[idx++];if(s)typeSpan(s,next);};
    const wait=document.body.classList.contains('intro-active')?1750:520;
    setTimeout(next,wait);
  }

  /* 3. The eye glances down when "See my work" is clicked */
  function initEyeGlance(){
    if(document.body.dataset.eyeGlance)return; document.body.dataset.eyeGlance='1';
    document.addEventListener('click',e=>{
      const cta=e.target.closest('.home-inline-cta');
      const eye=cta&&cta.querySelector('.home-eye');
      if(!eye||reduceMotion())return;
      eye.classList.add('is-glance');
      setTimeout(()=>eye.classList.remove('is-glance'),520);
    });
  }

  /* 9. Archive cascade (bottom-left → top-right) and tilt toward the cursor */
  let shotsObserver=null;
  function initArchive(path){
    if(shotsObserver){shotsObserver.disconnect();shotsObserver=null;}
    const shots=path==='/'?document.querySelector('.home-archive-section .shots'):null;
    if(!shots)return;
    if(!reduceMotion()&&document.body.classList.contains('reveal-armed')&&!shots.classList.contains('is-in')){
      const items=[...shots.querySelectorAll('.shot')];
      const order=()=>{
        const rects=items.map(el=>el.getBoundingClientRect());
        const rows=[...new Set(rects.map(r=>Math.round(r.top)))].sort((a,b)=>a-b);
        const cols=[...new Set(rects.map(r=>Math.round(r.left)))].sort((a,b)=>a-b);
        items.forEach((el,i)=>{
          const row=rows.indexOf(Math.round(rects[i].top)),col=cols.indexOf(Math.round(rects[i].left));
          el.style.setProperty('--i',String((rows.length-1-row)+col));
        });
      };
      if(shots.getBoundingClientRect().top<window.innerHeight*0.9){shots.classList.add('is-in');items.forEach(el=>el.style.animation='none');}
      else if('IntersectionObserver' in window){
        shotsObserver=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){order();shots.classList.add('is-in');shotsObserver.disconnect();}});},{rootMargin:'0px 0px -8% 0px',threshold:0.08});
        shotsObserver.observe(shots);
      }else shots.classList.add('is-in');
    }
    if(finePointer()&&!reduceMotion()&&!shots.dataset.tilt){
      shots.dataset.tilt='1';
      shots.addEventListener('pointermove',e=>{
        const shot=e.target.closest('.shot'); if(!shot)return;
        const r=shot.getBoundingClientRect();
        const px=(e.clientX-(r.left+r.width/2))/(r.width/2),py=(e.clientY-(r.top+r.height/2))/(r.height/2);
        shot.style.setProperty('--rx',(px*3).toFixed(2)+'deg');
        shot.style.setProperty('--ry',(-py*3).toFixed(2)+'deg');
      });
      shots.addEventListener('pointerout',e=>{
        const shot=e.target.closest('.shot');
        if(shot&&!shot.contains(e.relatedTarget)){shot.style.setProperty('--rx','0deg');shot.style.setProperty('--ry','0deg');}
      });
    }
  }

  /* 11. Principle numbers become two-digit reels that roll up on reveal */
  function initPrincipleOdometer(path){
    if(path!=='/')return;
    document.querySelectorAll('.home-principle').forEach(li=>{
      const num=li.querySelector('.home-principle-num');
      if(!num||num.dataset.odo)return;
      const text=num.textContent.trim();
      if(!/^\d{2}$/.test(text))return;
      num.dataset.odo=text;
      const digits=text.split('');
      num.innerHTML='<span class="odo" aria-hidden="true">'+digits.map(d=>{
        const n=parseInt(d,10);
        const reel=Array.from({length:n+1},(_,k)=>'<i>'+k+'</i>').join('');
        return '<span class="odo-d"><span class="odo-reel" style="translate:0 -'+(n*1.2)+'em">'+reel+'</span></span>';
      }).join('')+'</span><span class="sr-only">'+text+'</span>';
    });
  }

  /* 12. Tooltip lines get an index for the stagger */
  function initTooltipIndex(path){
    if(path!=='/')return;
    document.querySelectorAll('.timeline-tip').forEach(tip=>{
      [...tip.querySelectorAll('i')].forEach((el,n)=>el.style.setProperty('--n',String(n)));
    });
  }

  /* 14. Drag card: "Drag me" wiggles once after 8s idle, then every 8s until touched */
  let idleTimer=0;
  function initDragHint(path){
    clearTimeout(idleTimer);
    if(path!=='/'||reduceMotion())return;
    const arm=()=>{
      const card=document.querySelector('.drag-contact-card');
      if(!card){idleTimer=setTimeout(arm,600);return;}
      if(card.dataset.hint)return; card.dataset.hint='1';
      let touched=false;
      const stop=()=>{touched=true;clearTimeout(idleTimer);card.classList.remove('is-idle-hint');};
      card.addEventListener('pointerdown',stop,{once:true});
      const wiggle=()=>{
        if(touched||!card.isConnected)return;
        const r=card.getBoundingClientRect();
        if(r.bottom>0&&r.top<window.innerHeight){
          card.classList.remove('is-idle-hint');void card.offsetWidth;card.classList.add('is-idle-hint');
          card.addEventListener('animationend',()=>card.classList.remove('is-idle-hint'),{once:true});
        }
        idleTimer=setTimeout(wiggle,8000);
      };
      idleTimer=setTimeout(wiggle,8000);
    };
    arm();
  }

  /* 15. Copy email: the address scatters and reassembles at the point of action */
  function initCopyScatter(){
    if(document.body.dataset.copyScatter)return; document.body.dataset.copyScatter='1';
    document.addEventListener('click',e=>{
      const btn=e.target.closest('.ft4-copy'); if(!btn||reduceMotion())return;
      const link=btn.closest('.ft4-tile-email')?.querySelector('.ft4-tile-text a'); if(!link)return;
      if(!link.dataset.split){
        link.dataset.split='1';
        const text=link.textContent;
        link.setAttribute('aria-label',text);
        link.innerHTML=[...text].map((c,i)=>'<span class="ch" aria-hidden="true" style="--ci:'+i+'">'+(c===' '?'&nbsp;':c.replace(/[<>&]/g,''))+'</span>').join('');
      }
      link.querySelectorAll('.ch').forEach(ch=>{
        ch.style.setProperty('--sx',((Math.random()*6-3)).toFixed(1)+'px');
        ch.style.setProperty('--sy',((Math.random()*6-3)).toFixed(1)+'px');
      });
      link.classList.remove('is-scatter');void link.offsetWidth;link.classList.add('is-scatter');
      setTimeout(()=>link.classList.remove('is-scatter'),1200);
    });
  }

  /* 17. Sticky TOC: a single marker slides to the active chapter */
  let tocObserver=null;
  function initTocMarker(path){
    if(tocObserver){tocObserver.disconnect();tocObserver=null;}
    if(!path.startsWith('/case/'))return;
    const toc=document.querySelector('.study-toc'); if(!toc)return;
    const links=[...toc.querySelectorAll('a[href^="#"]')]; if(!links.length)return;
    links.forEach(a=>{
      if(a.dataset.numbered)return; a.dataset.numbered='1';
      const first=a.firstChild;
      if(first&&first.nodeType===3){
        const m=first.textContent.match(/^(\s*)(\d{2})(\s*·?)/);
        if(m){
          const b=document.createElement('b');b.className='toc-n';b.textContent=m[2];
          const rest=document.createTextNode(first.textContent.slice(m[1].length+m[2].length));
          first.replaceWith(document.createTextNode(m[1]),b,rest);
        }
      }
    });
    let marker=toc.querySelector('.toc-marker');
    if(!marker){marker=document.createElement('span');marker.className='toc-marker';marker.setAttribute('aria-hidden','true');toc.appendChild(marker);}
    toc.classList.add('has-marker');
    const place=()=>{
      const active=links.find(a=>a.classList.contains('active')||a.getAttribute('aria-current'));
      if(!active){toc.classList.remove('marker-on');return;}
      const tr=toc.getBoundingClientRect(),ar=active.getBoundingClientRect();
      toc.style.setProperty('--toc-y',(ar.top-tr.top).toFixed(1)+'px');
      toc.style.setProperty('--toc-h',ar.height.toFixed(1)+'px');
      toc.classList.add('marker-on');
    };
    tocObserver=new MutationObserver(place);
    links.forEach(a=>tocObserver.observe(a,{attributes:true,attributeFilter:['class','aria-current']}));
    place();
    setTimeout(place,400);
  }

  /* 18. Chapter numbers roll from 00 to their value as the chapter enters */
  let numObserver=null;
  function initChapterNumbers(path){
    if(numObserver){numObserver.disconnect();numObserver=null;}
    if(!path.startsWith('/case/'))return;
    const nums=[...document.querySelectorAll('.case .chapter-num')];
    if(!nums.length)return;
    nums.forEach(el=>{
      if(el.dataset.rolled)return;
      const first=el.firstChild;
      if(first&&first.nodeType===3){
        const m=first.textContent.match(/^(\d{2})/);
        if(m){const b=document.createElement('b');b.className='ch-n';b.textContent=m[1];b.dataset.target=m[1];first.replaceWith(b,document.createTextNode(first.textContent.slice(2)));}
      }
      el.dataset.rolled='1';
    });
    if(reduceMotion()||!('IntersectionObserver' in window)){nums.forEach(el=>el.classList.add('num-in'));return;}
    const roll=el=>{
      el.classList.add('num-in');
      const b=el.querySelector('.ch-n'); if(!b)return;
      const target=parseInt(b.dataset.target,10),start=performance.now(),dur=520;
      const tick=now=>{
        const t=Math.min(1,(now-start)/dur),eased=1-Math.pow(1-t,3);
        b.textContent=String(Math.round(target*eased)).padStart(2,'0');
        if(t<1)requestAnimationFrame(tick);else b.textContent=b.dataset.target;
      };
      requestAnimationFrame(tick);
    };
    numObserver=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){roll(e.target);numObserver.unobserve(e.target);}});},{threshold:0.5});
    nums.forEach(el=>{ if(el.getBoundingClientRect().top<window.innerHeight*0.7)el.classList.add('num-in'); else numObserver.observe(el); });
  }

  window.initMotionExtras=function(path){
    initEyeGlance();
    initCopyScatter();
    initMetaType(path);
    initArchive(path);
    initPrincipleOdometer(path);
    initTooltipIndex(path);
    initDragHint(path);
    initTocMarker(path);
    initChapterNumbers(path);
  };
})();
