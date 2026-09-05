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

  /* 5. Eyewa: original/proposed rows become before/after sliders. */
  function initEyewaCompare(){
    var cmp=document.querySelector('.ey-compare');
    if(!cmp)return;
    var before=cmp.querySelectorAll('[data-row="original"] img'),after=cmp.querySelectorAll('[data-row="proposed"] img');
    if(!before.length||before.length!==after.length)return;
    var grid=document.createElement('div');grid.className='ba-grid';
    before.forEach(function(b,i){
      var a=after[i],wrap=document.createElement('div');
      wrap.innerHTML='<div class="ba" style="--pos:50%"><img class="ba-before" alt=""><img class="ba-after" alt=""><span class="ba-handle" aria-hidden="true"></span><span class="ba-tag ba-tag-before">Before</span><span class="ba-tag ba-tag-after">After</span><input type="range" min="0" max="100" value="50" aria-label="Compare before and after"></div><p class="ba-caption"></p>';
      wrap.querySelector('.ba-before').src=b.src;wrap.querySelector('.ba-before').alt=b.alt||'Original screen';
      wrap.querySelector('.ba-after').src=a.src;wrap.querySelector('.ba-after').alt=a.alt||'Proposed screen';
      wrap.querySelector('.ba-caption').textContent=(a.alt||'').replace(/^Proposed · /,'');
      var ba=wrap.querySelector('.ba'),range=wrap.querySelector('input');
      var set=function(v){ba.style.setProperty('--pos',v+'%');};
      range.addEventListener('input',function(){set(range.value);});
      ba.addEventListener('pointermove',function(e){if(e.buttons||finePointer()){var r=ba.getBoundingClientRect();var v=clamp((e.clientX-r.left)/r.width*100,0,100);range.value=v;set(v);}});
      grid.appendChild(wrap);
    });
    cmp.replaceWith(grid);
  }

  /* 6. AI design system: live button + date picker playground. */
  function seg(name,label,values){
    return '<fieldset><legend>'+label+'</legend><div class="dsp-seg">'+values.map(function(v,i){return '<label><input type="radio" name="'+name+'" value="'+v+'"'+(i===0||(name==='size'&&v==='md')||(name==='density'&&v==='comfortable')?' checked':'')+'><span>'+v+'</span></label>';}).join('')+'</div></fieldset>';
  }
  function renderDatePicker(dp){
    var now=new Date(),y=now.getFullYear(),m=now.getMonth();
    var first=new Date(y,m,1),startDow=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate(),prevDays=new Date(y,m,0).getDate();
    var s=8,e=14,today=now.getDate(),cells='';
    for(var i=0;i<startDow;i++)cells+='<b class="is-muted">'+(prevDays-startDow+i+1)+'</b>';
    for(var d=1;d<=days;d++){var cls=[];if(d===s)cls.push('is-start');if(d===e)cls.push('is-end');if(d>s&&d<e)cls.push('in-range');if(d===today)cls.push('is-today');if(d===e+3)cls.push('is-hover');cells+='<b class="'+cls.join(' ')+'">'+d+'</b>';}
    var rest=(7-(startDow+days)%7)%7;for(var j=1;j<=rest;j++)cells+='<b class="is-muted">'+j+'</b>';
    var month=first.toLocaleString('en-GB',{month:'long',year:'numeric'});
    dp.innerHTML='<div class="ds-dp-head"><button type="button" aria-label="Previous month">‹</button><span>'+month+'</span><button type="button" aria-label="Next month">›</button></div><div class="ds-dp-grid">'+['Mo','Tu','We','Th','Fr','Sa','Su'].map(function(d){return '<span>'+d+'</span>';}).join('')+cells+'</div><div class="ds-dp-foot"><button type="button" class="ds-btn" data-variant="ghost" data-size="sm">Clear</button><button type="button" class="ds-btn" data-variant="primary" data-size="sm">Apply</button></div>';
  }
  function initPlayground(){
    var host=document.getElementById('ai-system-9');
    if(!host||host.querySelector('.dsp'))return;
    var box=document.createElement('div');box.className='dsp';
    box.innerHTML='<div class="dsp-head"><h3>Try the components</h3><p>Same props as the conceptual API above. Change one, watch both.</p></div><div class="dsp-body"><div class="dsp-stage"><button type="button" class="ds-btn" data-variant="primary" data-size="md" data-state="default" data-icon="none" data-density="comfortable"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span>Continue to payment</span></button><div class="ds-dp" data-size="md" data-state="default" data-density="comfortable" role="group" aria-label="Date range picker preview"></div></div><form class="dsp-controls" onsubmit="return false">'+seg('variant','Variant',['primary','secondary','ghost'])+seg('size','Size',['sm','md','lg'])+seg('state','State',['default','hover','focus','loading','disabled'])+seg('density','Density',['comfortable','compact'])+seg('icon','Icon',['none','start','end'])+'<pre class="dsp-spec" aria-live="polite"></pre></form></div>';
    host.appendChild(box);
    var btn=box.querySelector('.ds-btn'),dp=box.querySelector('.ds-dp'),spec=box.querySelector('.dsp-spec');
    renderDatePicker(dp);
    var update=function(){
      var v={};['variant','size','state','density','icon'].forEach(function(k){var el=box.querySelector('input[name="'+k+'"]:checked');v[k]=el?el.value:'';});
      btn.dataset.variant=v.variant;btn.dataset.size=v.size;btn.dataset.state=v.state;btn.dataset.density=v.density;btn.dataset.icon=v.icon;
      dp.dataset.size=v.size;dp.dataset.state=v.state;dp.dataset.density=v.density;
      var cs=getComputedStyle(btn);
      spec.textContent='<Button variant="'+v.variant+'" size="'+v.size+'"'+(v.icon!=='none'?' iconPosition="'+v.icon+'"':'')+(v.state==='loading'?' loading':'')+(v.state==='disabled'?' disabled':'')+' />\nheight '+Math.round(parseFloat(cs.height))+'px · padding-x '+Math.round(parseFloat(cs.paddingLeft))+'px\nfont '+Math.round(parseFloat(cs.fontSize))+'px/600 · radius '+cs.borderTopLeftRadius+'\nbg '+cs.backgroundColor+'\n'+(v.state==='focus'?'focus ring: 2px surface + 2px color-focus':'')+(v.state==='hover'?'hover: color-accent-hover / surface-subtle':'');
    };
    box.addEventListener('change',update);update();
  }

  /* 10. Shots grid becomes a strip you can drag. */
  function initShotsStrip(){
    var strip=document.querySelector('.home-archive .shots');
    if(!strip||strip.dataset.strip)return;
    strip.dataset.strip='1';strip.classList.add('shots-strip');
    if(!finePointer())return;
    var down=false,startX=0,startLeft=0,moved=false;
    on(strip,'pointerdown',function(e){down=true;moved=false;startX=e.clientX;startLeft=strip.scrollLeft;});
    on(strip,'pointermove',function(e){if(!down)return;var dx=e.clientX-startX;if(Math.abs(dx)>4){moved=true;strip.classList.add('is-dragging');}strip.scrollLeft=startLeft-dx;});
    var up=function(){down=false;strip.classList.remove('is-dragging');};
    on(strip,'pointerup',up);on(strip,'pointercancel',up);on(strip,'pointerleave',up);
    on(strip,'click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
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

  window.initInteractions=function(path){
    cleanup();
    if(path==='/'){initHeroLean();initCardTilt();initShotsStrip();}
    initCountUp();
    if(path.indexOf('/case/')===0){
      initProgressTicks();
      if(path==='/case/eyewa')initEyewaCompare();
      if(path==='/case/ai-system')initPlayground();
    }
  };
})();
