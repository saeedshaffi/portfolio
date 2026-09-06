/* interactions.js — additive interaction layer. Entry: window.initInteractions(path),
   called by app.js after each route render. Nothing here changes layout or copy. */
(function(){
  var reduceMotion=function(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches;};
  var finePointer=function(){return window.matchMedia('(hover: hover) and (pointer: fine)').matches;};
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v));};
  var cleanups=[];
  function cleanup(){cleanups.forEach(function(f){try{f();}catch(e){}});cleanups=[];}
  function on(el,ev,fn,opt){el.addEventListener(ev,fn,opt);cleanups.push(function(){el.removeEventListener(ev,fn,opt);});}

  /* 1. Hero headline leans toward the pointer (a few px, eased in CSS). */
  function initHeroLean(){
    var hero=document.querySelector('.home-hero');
    if(!hero||!finePointer()||reduceMotion())return;
    var words=hero.querySelectorAll('#home-hero-title .hl');
    if(!words.length)return;
    var raf=0,x=0,y=0;
    var apply=function(){words.forEach(function(w,i){var k=1+(i%3)*.35;w.style.setProperty('--lean-x',(x*4*k).toFixed(2)+'px');w.style.setProperty('--lean-y',(y*3*k).toFixed(2)+'px');});raf=0;};
    on(hero,'pointermove',function(e){var r=hero.getBoundingClientRect();x=clamp((e.clientX-r.left)/r.width-.5,-.5,.5)*2;y=clamp((e.clientY-r.top)/r.height-.5,-.5,.5)*2;if(!raf)raf=requestAnimationFrame(apply);});
    on(hero,'pointerleave',function(){x=0;y=0;if(!raf)raf=requestAnimationFrame(apply);});
  }

  /* 2. Project cards tilt in 3D; CSS uses the --px/--py the existing parallax sets. */
  function initCardTilt(){
    var grid=document.querySelector('.project-grid');
    if(!grid||!finePointer()||reduceMotion())return;
    grid.classList.add('has-tilt');
    on(grid,'pointerover',function(e){var c=e.target.closest('.project-card');if(c)c.classList.add('is-tilting');});
    on(grid,'pointerout',function(e){var c=e.target.closest('.project-card');if(c&&!c.contains(e.relatedTarget))c.classList.remove('is-tilting');});
  }

  /* 3. Metric count-up: every number inside a metric ticks from 0 when first seen. */
  /* KFH, Eyewa, Talon and the AI case already animate their numbers; this covers the rest. */
  var COUNT_SEL='.case-hero .metrics .metric strong,.hm-metric strong';
  function initCountUp(){
    if(reduceMotion())return;
    var nodes=Array.prototype.slice.call(document.querySelectorAll(COUNT_SEL)).filter(function(n){return !n.dataset.countup&&/\d/.test(n.textContent)&&n.textContent.trim().length<24;});
    if(!nodes.length)return;
    nodes.forEach(function(n){n.dataset.countup='1';n.dataset.final=n.textContent;});
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(!en.isIntersecting)return;io.unobserve(en.target);run(en.target);});
    },{threshold:.6});
    nodes.forEach(function(n){io.observe(n);});
    cleanups.push(function(){io.disconnect();});
    function run(n){
      var text=n.dataset.final,parts=text.split(/(\d[\d.,]*)/),start=performance.now(),dur=1100;
      var targets=parts.map(function(p){return /^\d/.test(p)?parseFloat(p.replace(/,/g,'')):null;});
      var dec=parts.map(function(p){var m=/^\d/.test(p)&&p.match(/\.(\d+)/);return m?m[1].length:0;});
      n.classList.add('is-counting');
      var step=function(t){
        var p=clamp((t-start)/dur,0,1),e=1-Math.pow(1-p,3);
        n.textContent=parts.map(function(part,i){if(targets[i]===null)return part;var v=targets[i]*e;return dec[i]?v.toFixed(dec[i]):Math.round(v).toLocaleString('en-US');}).join('');
        if(p<1)requestAnimationFrame(step);else{n.textContent=text;n.classList.remove('is-counting');n.classList.add('is-counted');setTimeout(function(){n.classList.remove('is-counted');},700);}
      };
      requestAnimationFrame(step);
    }
  }

  /* 6. AI design system: a live component playground. Pick a component, then
     its props; the preview and the spec readout follow. */
  var COMPONENTS={
    button:{label:'Button',props:{variant:['primary','secondary','ghost'],size:['sm','md','lg'],state:['default','hover','focus','loading','disabled'],icon:['none','start','end'],density:['comfortable','compact']}},
    input:{label:'Input',props:{type:['text','email','password','search'],size:['sm','md','lg'],state:['default','hover','focus','filled','error','disabled'],label:['on','off'],helper:['none','hint','error'],density:['comfortable','compact']}},
    datepicker:{label:'Date picker',props:{mode:['range','single'],size:['sm','md','lg'],state:['default','hover','focus','disabled'],density:['comfortable','compact']}},
    radio:{label:'Radio',props:{size:['sm','md'],state:['default','hover','focus','disabled'],layout:['vertical','horizontal'],description:['off','on']}},
    toggle:{label:'Toggle',props:{size:['sm','md','lg'],checked:['on','off'],state:['default','hover','focus','disabled'],label:['right','left','none']}},
    dropdown:{label:'Dropdown',props:{size:['sm','md','lg'],state:['default','hover','focus','open','error','disabled'],multi:['no','yes'],searchable:['no','yes']}}
  };
  var DEFAULTS={size:'md',density:'comfortable',state:'default',variant:'primary',icon:'none',type:'text',label:'on',helper:'none',mode:'range',layout:'vertical',description:'off',checked:'on',multi:'no',searchable:'no'};
  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function seg(name,label,values,current){
    return '<fieldset><legend>'+label+'</legend><div class="dsp-seg">'+values.map(function(v){return '<label><input type="radio" name="'+name+'" value="'+v+'"'+(v===current?' checked':'')+'><span>'+v+'</span></label>';}).join('')+'</div></fieldset>';
  }
  function calendarHTML(mode){
    var now=new Date(),y=now.getFullYear(),m=now.getMonth();
    var first=new Date(y,m,1),startDow=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate(),prevDays=new Date(y,m,0).getDate();
    var s=8,e=mode==='range'?14:8,today=now.getDate(),cells='';
    for(var i=0;i<startDow;i++)cells+='<b class="is-muted">'+(prevDays-startDow+i+1)+'</b>';
    for(var d=1;d<=days;d++){var cls=[];if(d===s)cls.push('is-start');if(d===e)cls.push('is-end');if(d>s&&d<e)cls.push('in-range');if(d===today)cls.push('is-today');if(d===e+3)cls.push('is-hover');cells+='<b class="'+cls.join(' ')+'">'+d+'</b>';}
    var rest=(7-(startDow+days)%7)%7;for(var j=1;j<=rest;j++)cells+='<b class="is-muted">'+j+'</b>';
    var month=first.toLocaleString('en-GB',{month:'long',year:'numeric'});
    return '<div class="ds-dp-head"><button type="button" aria-label="Previous month">‹</button><span>'+month+'</span><button type="button" aria-label="Next month">›</button></div><div class="ds-dp-grid">'+['Mo','Tu','We','Th','Fr','Sa','Su'].map(function(d){return '<span>'+d+'</span>';}).join('')+cells+'</div><div class="ds-dp-foot"><button type="button" class="ds-btn" data-variant="ghost" data-size="sm">Clear</button><button type="button" class="ds-btn" data-variant="primary" data-size="sm">Apply</button></div>';
  }
  var RENDER={
    button:function(v){return '<button type="button" class="ds-btn" data-variant="'+v.variant+'" data-size="'+v.size+'" data-state="'+v.state+'" data-icon="'+v.icon+'" data-density="'+v.density+'">'+ICON+'<span>Continue to payment</span></button>';},
    input:function(v){
      var val=v.state==='filled'||v.state==='error'?(v.type==='email'?'saeed@company':v.type==='password'?'••••••••':'Abdul Hakim'):'';
      var ph=v.type==='email'?'name@company.com':v.type==='search'?'Search accounts':v.type==='password'?'At least 8 characters':'Full name';
      var help=v.helper==='hint'?'<span class="ds-help">We only use this to send the statement.</span>':(v.helper==='error'||v.state==='error')?'<span class="ds-help is-error">Enter a valid '+(v.type==='email'?'email address':'value')+'.</span>':'';
      return '<div class="ds-field" data-size="'+v.size+'" data-state="'+v.state+'" data-density="'+v.density+'">'+(v.label==='on'?'<label class="ds-label">'+(v.type==='email'?'Work email':v.type==='password'?'Password':v.type==='search'?'Search':'Account holder')+'</label>':'')+'<div class="ds-input">'+(v.type==='search'?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>':'')+'<input type="'+(v.type==='password'?'password':'text')+'" value="'+val+'" placeholder="'+ph+'" readonly tabindex="-1" aria-label="Preview input"></div>'+help+'</div>';
    },
    datepicker:function(v){return '<div class="ds-dp" data-size="'+v.size+'" data-state="'+v.state+'" data-density="'+v.density+'" role="group" aria-label="Date picker preview">'+calendarHTML(v.mode)+'</div>';},
    radio:function(v){
      var opts=[['Personal account','For everyday spending and savings.'],['Business account','For registered companies and freelancers.'],['Joint account','Shared with one other person.']];
      return '<div class="ds-radio-group" data-size="'+v.size+'" data-state="'+v.state+'" data-layout="'+v.layout+'">'+opts.map(function(o,i){return '<label class="ds-radio'+(i===0?' is-checked':'')+(i===1?' is-target':'')+'"><span class="ds-radio-dot"></span><span class="ds-radio-text"><b>'+o[0]+'</b>'+(v.description==='on'?'<small>'+o[1]+'</small>':'')+'</span></label>';}).join('')+'</div>';
    },
    toggle:function(v){return '<label class="ds-toggle" data-size="'+v.size+'" data-state="'+v.state+'" data-checked="'+v.checked+'" data-label="'+v.label+'">'+(v.label==='left'?'<span class="ds-toggle-text">Email me monthly statements</span>':'')+'<span class="ds-toggle-track"><span class="ds-toggle-thumb"></span></span>'+(v.label==='right'?'<span class="ds-toggle-text">Email me monthly statements</span>':'')+'</label>';},
    dropdown:function(v){
      var items=['Regional Office Account','Payroll Account','Savings Account','Tax Reserve'];
      var chips=v.multi==='yes'?'<span class="ds-chip">Payroll <i>×</i></span><span class="ds-chip">Savings <i>×</i></span>':'<span class="ds-select-value">'+(v.state==='error'?'Choose an account':'Payroll Account')+'</span>';
      return '<div class="ds-select" data-size="'+v.size+'" data-state="'+v.state+'" data-multi="'+v.multi+'"><label class="ds-label">Account</label><div class="ds-select-control">'+chips+CHEV+'</div>'+(v.state==='open'?'<div class="ds-menu">'+(v.searchable==='yes'?'<div class="ds-menu-search"><input type="text" value="" placeholder="Search accounts" readonly tabindex="-1" aria-label="Search"></div>':'')+items.map(function(it,i){return '<div class="ds-option'+(i===1?' is-selected':'')+(i===2&&v.multi==='yes'?' is-selected':'')+(i===0?' is-hover':'')+'">'+(v.multi==='yes'?'<span class="ds-check"></span>':'')+it+'</div>';}).join('')+'</div>':'')+(v.state==='error'?'<span class="ds-help is-error">Select an account to continue.</span>':'')+'</div>';
    }
  };
  function specFor(name,v,stage){
    var tag={button:'Button',input:'TextField',datepicker:'DatePicker',radio:'RadioGroup',toggle:'Switch',dropdown:'Select'}[name];
    var props=Object.keys(v).filter(function(k){return v[k]!==DEFAULTS[k]||k==='size'||k==='variant';}).map(function(k){var val=v[k];if(val==='yes'||val==='on')return k;if(val==='no'||val==='off')return '';return k+'="'+val+'"';}).filter(Boolean);
    var m=stage.querySelector('.ds-btn,.ds-input,.ds-select-control,.ds-toggle-track,.ds-radio-dot,.ds-dp'),measure={};
    if(m){var mc=getComputedStyle(m);measure.h=Math.round(parseFloat(mc.height));measure.w=Math.round(parseFloat(mc.width));measure.r=mc.borderTopLeftRadius;measure.fs=Math.round(parseFloat(mc.fontSize));measure.bg=mc.backgroundColor;}
    return '<'+tag+(props.length?' '+props.join(' '):'')+' />\n'+
      (measure.h?'size '+measure.w+'×'+measure.h+'px · radius '+measure.r+'\n':'')+
      (measure.fs?'font '+measure.fs+'px · bg '+measure.bg+'\n':'')+
      (v.state==='focus'?'focus ring: 2px surface + 2px color-focus\n':'')+
      (v.state==='hover'?'hover: color-accent-hover / surface-subtle\n':'')+
      (v.state==='error'?'error: color-danger border + helper text\n':'')+
      (v.state==='disabled'?'disabled: 45% opacity, no pointer events\n':'');
  }
  function initPlayground(){
    if(document.querySelector('.dsp'))return;
    var host=document.getElementById('ai-system-6')||document.getElementById('ai-system-9');
    if(!host)return;
    var anchor=Array.prototype.slice.call(host.querySelectorAll('figure')).filter(function(f){return /variant=/.test(f.textContent);}).pop();
    var box=document.createElement('div');box.className='dsp';
    box.innerHTML='<div class="dsp-head"><h3>Try the components</h3><p>Pick a component, then its props. The preview and the spec follow.</p></div>'+
      '<div class="dsp-tabs" role="tablist" aria-label="Component">'+Object.keys(COMPONENTS).map(function(k,i){return '<button type="button" role="tab" data-component="'+k+'" aria-selected="'+(i===0)+'"'+(i===0?' class="is-on"':'')+'>'+COMPONENTS[k].label+'</button>';}).join('')+'</div>'+
      '<div class="dsp-body"><div class="dsp-stage"></div><form class="dsp-controls" onsubmit="return false"></form></div>';
    if(anchor)anchor.insertAdjacentElement('afterend',box);else host.appendChild(box);
    var stage=box.querySelector('.dsp-stage'),form=box.querySelector('.dsp-controls'),tabs=box.querySelectorAll('[role=tab]');
    var current='button',values={};
    function build(name){
      current=name;values={};
      var props=COMPONENTS[name].props;
      Object.keys(props).forEach(function(k){values[k]=props[k].indexOf(DEFAULTS[k])>=0?DEFAULTS[k]:props[k][0];});
      form.innerHTML=Object.keys(props).map(function(k){return seg(k,k.charAt(0).toUpperCase()+k.slice(1),props[k],values[k]);}).join('')+'<pre class="dsp-spec" aria-live="polite"></pre>';
      tabs.forEach(function(t){var on=t.dataset.component===name;t.classList.toggle('is-on',on);t.setAttribute('aria-selected',on);});
      render();
    }
    function render(){
      stage.innerHTML=RENDER[current](values);
      form.querySelector('.dsp-spec').textContent=specFor(current,values,stage);
    }
    form.addEventListener('change',function(e){if(e.target.name){values[e.target.name]=e.target.value;render();}});
    tabs.forEach(function(t){t.addEventListener('click',function(){build(t.dataset.component);});});
    build('button');
  }

  /* 12. Reading progress bar gets chapter ticks; click a tick to jump. */
  function initProgressTicks(){
    var bar=document.querySelector('.case-extra-progress,.reading-progress,.hm-progress');
    if(!bar){var tries=0,t0=setInterval(function(){tries++;if(document.querySelector('.case-extra-progress,.reading-progress,.hm-progress')||tries>60){clearInterval(t0);if(tries<=60)initProgressTicks();}},150);cleanups.push(function(){clearInterval(t0);});return;}
    var heads=Array.prototype.slice.call(document.querySelectorAll('.study-toc a[href^="#"]')).map(function(a){var id=a.getAttribute('href').slice(1);return document.getElementById(id);}).filter(Boolean);
    if(heads.length<2)heads=Array.prototype.slice.call(document.querySelectorAll('main h2.chapter-title,main h2.section-title'));
    /* The case pages rebuild their progress bar after the hero entrance; whatever
       happens now, look again later and attach to the bar that is actually there. */
    var again=function(){var b=document.querySelector('.case-extra-progress,.reading-progress,.hm-progress');if(b&&!b.dataset.ticks)initProgressTicks();};
    var t2=setTimeout(again,1200),t3=setTimeout(again,3200),t4=setTimeout(again,6000);cleanups.push(function(){clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);});
    if(heads.length<2||bar.dataset.ticks)return;
    bar.dataset.ticks='1';
    var wrap=document.createElement('div');wrap.className='progress-ticks';
    var place=function(){
      var total=document.documentElement.scrollHeight-window.innerHeight;
      if(total<=0)return;
      wrap.innerHTML='';
      heads.forEach(function(h,i){
        var top=h.getBoundingClientRect().top+window.scrollY-90;var label=(h.matches('h1,h2,h3')?h:(h.querySelector('h2,h3')||h)).textContent.trim().slice(0,80);
        var a=document.createElement('a');a.href='#';a.className='progress-tick';a.style.left=clamp(top/total*100,0,100)+'%';
        a.setAttribute('aria-label','Jump to chapter '+(i+1)+': '+label);a.title=label;
        a.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:top,behavior:reduceMotion()?'auto':'smooth'});});
        wrap.appendChild(a);
      });
    };
    bar.appendChild(wrap);
    place();
    var t=setTimeout(place,1500);cleanups.push(function(){clearTimeout(t);});

    on(window,'resize',place);
    on(window,'load',place);
  }

  /* Chapter links in the case-study table of contents are plain "#id" anchors;
     the hash router would read them as a route and show the 404 page. Scroll instead. */
  document.addEventListener('click',function(e){
    var a=e.target instanceof Element?e.target.closest('.study-toc a[href^="#"]'):null;
    if(!a)return;
    var href=a.getAttribute('href');
    if(href.indexOf('#/')===0)return;
    var target=document.getElementById(href.slice(1));
    if(!target)return;
    e.preventDefault();
    var y=target.getBoundingClientRect().top+window.scrollY-96;
    window.scrollTo({top:y,behavior:reduceMotion()?'auto':'smooth'});
    a.parentElement.querySelectorAll('a').forEach(function(l){l.classList.toggle('active',l===a);l.classList.toggle('is-active',l===a);});
  });

  window.initInteractions=function(path){
    cleanup();
    if(path==='/'){initHeroLean();initCardTilt();}
    initCountUp();
    if(path.indexOf('/case/')===0){
      initProgressTicks();
      if(path==='/case/ai-system')initPlayground();
    }
  };
})();
