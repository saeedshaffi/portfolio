/* Site-wide extras: scroll reveals, cursor pill, mobile CTA bar, nav
   backdrop, first-visit intro, hover video previews, theme toggle.
   window.initSiteExtras(path) is called by app.js after every render;
   one-time pieces guard themselves. */
(function(){
  const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=()=>window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let revealObserver=null;

  /* ---------- Scroll reveals (home) ---------- */
  function initReveals(path){
    if(revealObserver){revealObserver.disconnect();revealObserver=null;}
    document.body.classList.remove('reveal-armed');
    if(path!=='/'||reduceMotion()||!('IntersectionObserver' in window))return;
    if(document.body.classList.contains('is-return-visit'))return; // settled on return
    const main=document.getElementById('main');
    main.querySelectorAll('.section-head').forEach(el=>el.classList.add('home-section-head'));
    const groups=[
      [...main.querySelectorAll('.project-grid .project-card')],
      [...main.querySelectorAll('.home-principle')],
      [...main.querySelectorAll('.timeline-stop')],
      [...main.querySelectorAll('.home-section-head')]
    ];
    groups.forEach(list=>list.forEach((el,i)=>{el.style.setProperty('--i',String(i%6));}));
    const targets=[...groups.flat(),...main.querySelectorAll('.timeline-track')];
    /* Things already on screen at load stay visible; only what enters later animates. */
    const vh=window.innerHeight;
    targets.forEach(el=>{ if(el.getBoundingClientRect().top<vh*0.9)el.classList.add('is-in'); });
    document.body.classList.add('reveal-armed');
    targets.forEach(el=>{ if(el.classList.contains('is-in')){el.style.animation='none';} });
    /* A. split section titles into words (only when reveals are armed, so nothing can stay hidden) */
    main.querySelectorAll('.home-section-head h2').forEach(h2=>{ splitWords(h2); if(h2.closest('.home-section-head').classList.contains('is-in'))h2.classList.add('is-in'); });
    const onIn=el=>{
      el.classList.add('is-in');
      if(el.classList.contains('home-section-head')){const h2=el.querySelector('h2');if(h2)h2.classList.add('is-in');}
      if(el.classList.contains('timeline-track'))countUpTimeline(el);   /* B */
    };
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){onIn(e.target);revealObserver.unobserve(e.target);} });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
    targets.forEach(el=>{ if(!el.classList.contains('is-in'))revealObserver.observe(el); });
  }

  function splitWords(el){
    if(el.dataset.split)return; el.dataset.split='1';
    let i=0;
    const walk=node=>{
      [...node.childNodes].forEach(n=>{
        if(n.nodeType===3){
          const frag=document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part=>{
            if(!part)return;
            if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return;}
            const w=document.createElement('span');w.className='w';
            const inner=document.createElement('span');inner.textContent=part;inner.style.setProperty('--wi',String(i++));
            w.appendChild(inner);frag.appendChild(w);
          });
          n.replaceWith(frag);
        }else if(n.nodeType===1&&n.tagName!=='BR'){walk(n);}
      });
    };
    walk(el);
    el.classList.add('split-words');
  }

  function countUpTimeline(track){
    if(track.dataset.counted)return; track.dataset.counted='1';
    const stats=[...track.querySelectorAll('.timeline-stat strong')];
    stats.forEach((el,idx)=>{
      const m=el.textContent.trim().match(/^([+\-\u2212]?)(\d+(?:\.\d+)?)(.*)$/);
      if(!m)return;
      const sign=m[1],target=parseFloat(m[2]),suffix=m[3],decimals=(m[2].split('.')[1]||'').length;
      const final=el.textContent;
      const start=performance.now()+idx*120,dur=900;
      const tick=now=>{
        const t=Math.max(0,Math.min(1,(now-start)/dur));
        const eased=1-Math.pow(1-t,3);
        el.textContent=sign+(target*eased).toFixed(decimals)+suffix;
        if(t<1)requestAnimationFrame(tick);else el.textContent=final;
      };
      el.textContent=sign+(0).toFixed(decimals)+suffix;
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Cursor-following "View case study" pill ----------
     The arrow always points at the centre of the hovered card: its angle is
     recomputed from the cursor position and eased, like the hero's eye. */
  let pill=null,pillArrow=null,pillRaf=0,pillOn=false;
  let pillTarget={x:0,y:0},pillPos={x:0,y:0},angleTarget=-45,angle=-45,activeCard=null;
  const shortest=(from,to)=>{let d=(to-from+540)%360-180;return from+d;};
  function initCursorPill(path){
    document.body.classList.remove('has-cursor-pill');
    if(path!=='/'||!finePointer()||reduceMotion()||window.innerWidth<=900)return;
    const grid=document.querySelector('.project-grid');
    if(!grid)return;
    if(!pill){
      pill=document.createElement('div');
      pill.className='cursor-pill';
      pill.setAttribute('aria-hidden','true');
      pill.innerHTML='<span class="cursor-pill-label">View case study</span><span class="cursor-pill-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg></span>';
      document.body.appendChild(pill);
      pillArrow=pill.querySelector('.cursor-pill-arrow');
    }
    document.body.classList.add('has-cursor-pill');
    const loop=()=>{
      pillPos.x+=(pillTarget.x-pillPos.x)*0.22;
      pillPos.y+=(pillTarget.y-pillPos.y)*0.22;
      angle+=(angleTarget-angle)*0.16;
      pill.style.transform=`translate(${pillPos.x}px,${pillPos.y}px) translate(-50%,-50%) scale(${pillOn?1:.6})`;
      /* the arrow glyph points right at 0deg; nudge it 1px along its own direction */
      pillArrow.style.transform=`rotate(${angle}deg) translateX(1px)`;
      pillRaf=requestAnimationFrame(loop);
    };
    const aim=(card,x,y)=>{
      const r=card.getBoundingClientRect();
      const cx=r.left+r.width/2,cy=r.top+r.height/2;
      const raw=Math.atan2(cy-y,cx-x)*180/Math.PI;   /* 0 = right, 90 = down */
      angleTarget=shortest(angle,raw);
    };
    const show=e=>{
      const card=e.target.closest('.project-card:not(.coming-soon-card)');
      if(!card){hide();return;}
      pillTarget={x:e.clientX,y:e.clientY};
      aim(card,e.clientX,e.clientY);
      if(!pillOn||card!==activeCard){
        activeCard=card;
        if(!pillOn){pillPos={x:e.clientX,y:e.clientY};angle=angleTarget;pillOn=true;pill.classList.add('is-on');cancelAnimationFrame(pillRaf);loop();}
      }
    };
    const hide=()=>{ activeCard=null; if(pillOn){pillOn=false;pill.classList.remove('is-on');setTimeout(()=>{if(!pillOn)cancelAnimationFrame(pillRaf);},350);} };
    grid.addEventListener('pointermove',show);
    grid.addEventListener('pointerleave',hide);
    grid.addEventListener('click',hide);
  }

  /* ---------- Sticky mobile CTA bar ---------- */
  let cta=null,ctaHandler=null;
  function initMobileCta(){
    if(!cta){
      cta=document.createElement('div');
      cta.className='mobile-cta';
      cta.innerHTML='<span class="mobile-cta-text"><b><i class="mobile-cta-dot" aria-hidden="true"></i>Saeed Shaffi</b><span>Lead Product Designer · Berlin</span></span><a class="mobile-cta-btn" href="mailto:saeedshaffi@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>';
      document.body.appendChild(cta);
      document.body.classList.add('has-mobile-cta');
    }
    if(ctaHandler)window.removeEventListener('scroll',ctaHandler);
    const footer=document.getElementById('contact');
    let ticking=false;
    const update=()=>{
      const pastTop=window.scrollY>window.innerHeight*0.7;
      const footerTop=footer?footer.getBoundingClientRect().top:Infinity;
      const nearFooter=footerTop<window.innerHeight-40;
      const on=pastTop&&!nearFooter&&!document.body.classList.contains('nav-open');
      if(on&&!cta.classList.contains('is-on')&&!cta.dataset.shown){cta.dataset.shown='1';cta.classList.add('is-first');cta.addEventListener('animationend',()=>cta.classList.remove('is-first'),{once:true});}
      cta.classList.toggle('is-on',on);
      ticking=false;
    };
    ctaHandler=()=>{ if(!ticking){requestAnimationFrame(update);ticking=true;} };
    window.addEventListener('scroll',ctaHandler,{passive:true});
    update();
  }

  /* ---------- Mobile nav backdrop + Escape ---------- */
  function initNavBackdrop(){
    if(document.querySelector('.nav-backdrop'))return;
    const nav=document.getElementById('site-nav'),toggle=document.querySelector('.menu-toggle');
    if(!nav||!toggle)return;
    const backdrop=document.createElement('div');
    backdrop.className='nav-backdrop';
    document.body.appendChild(backdrop);
    const sync=()=>{
      const open=nav.classList.contains('open');
      backdrop.classList.toggle('is-on',open);
      document.body.classList.toggle('nav-open',open);
    };
    new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});
    const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');};
    backdrop.addEventListener('click',close);
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&nav.classList.contains('open')){close();toggle.focus();} });
  }

  /* ---------- First-visit intro ---------- */
  function initIntro(path){
    if(path!=='/'||reduceMotion())return;
    let seen=false;
    try{seen=sessionStorage.getItem('siteIntroSeen')==='1';}catch(e){}
    if(seen||document.querySelector('.site-intro'))return;
    try{sessionStorage.setItem('siteIntroSeen','1');}catch(e){}
    const intro=document.createElement('div');
    intro.className='site-intro';
    intro.setAttribute('aria-hidden','true');
    intro.innerHTML='<div class="site-intro-inner"><span class="site-intro-name"><span>Saeed Shaffi</span></span><span class="site-intro-role">Lead Product Designer · Berlin</span></div><span class="site-intro-skip">Click to skip</span>';
    document.body.classList.add('intro-active');
    document.body.appendChild(intro);
    let done=false;
    const finish=()=>{ if(done)return;done=true;document.body.classList.remove('intro-active');setTimeout(()=>intro.remove(),50); };
    const skip=()=>{ if(done)return;intro.classList.add('is-skipped');intro.addEventListener('animationend',finish,{once:true});setTimeout(finish,600); };
    intro.addEventListener('click',skip);
    document.addEventListener('keydown',function onKey(e){ if(e.key==='Escape'||e.key==='Enter'||e.key===' '){skip();document.removeEventListener('keydown',onKey);} });
    /* The curtain keyframe starts at 1.35s and runs 0.7s. */
    setTimeout(()=>{ document.body.classList.remove('intro-active'); },1500);
    setTimeout(finish,2150);
  }

  /* ---------- Hover-to-play video previews ---------- */
  function initHoverVideo(path){
    if(path!=='/'||!finePointer()||reduceMotion())return;
    document.querySelectorAll('.project-card[data-preview-video]').forEach(card=>{
      if(card.dataset.previewReady)return;
      card.dataset.previewReady='1';
      const visual=card.querySelector('.visual');
      if(!visual)return;
      let video=null;
      card.addEventListener('pointerenter',()=>{
        if(!video){
          video=document.createElement('video');
          video.className='card-preview-video';
          video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';
          video.src=card.dataset.previewVideo;
          video.addEventListener('canplay',()=>video.classList.add('is-ready'),{once:true});
          visual.appendChild(video);
        }
        video.currentTime=0;
        video.play().catch(()=>{});
      });
      card.addEventListener('pointerleave',()=>{ if(video)video.pause(); });
    });
  }


  /* ---------- E + M: card hover parallax ---------- */
  function initCardParallax(path){
    const grid=document.querySelector('.project-grid');
    if(path!=='/'||!grid||!finePointer()||reduceMotion()||grid.dataset.parallax)return;
    grid.dataset.parallax='1';
    grid.addEventListener('pointermove',e=>{
      const card=e.target.closest('.project-card');
      if(!card)return;
      const r=card.getBoundingClientRect();
      const px=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width/2))/(r.width/2)));
      const py=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.height/2))/(r.height/2)));
      card.style.setProperty('--px',px.toFixed(3));card.style.setProperty('--py',py.toFixed(3));
    });
    grid.addEventListener('pointerout',e=>{
      const card=e.target.closest('.project-card');
      if(card&&!card.contains(e.relatedTarget)){card.style.setProperty('--px','0');card.style.setProperty('--py','0');}
    });
  }

  /* ---------- F: eased marquee for the client strip ---------- */
  let marqueeRaf=0;
  function initMarquee(path){
    cancelAnimationFrame(marqueeRaf);
    const track=document.querySelector('.home-clients-track');
    if(path!=='/'||!track||reduceMotion())return;
    const lists=[...track.querySelectorAll('.home-clients-list')];
    if(lists.length<2)return;
    let x=0,speed=1,target=1,last=performance.now();
    const base=()=>lists[0].getBoundingClientRect().width/42;  /* px per second: one loop ≈ 42s */
    track.addEventListener('pointerenter',()=>{target=0.18;});
    track.addEventListener('pointerleave',()=>{target=1;});
    const loop=now=>{
      const dt=Math.min(0.05,(now-last)/1000);last=now;
      speed+=(target-speed)*0.08;
      const w=lists[0].getBoundingClientRect().width;
      x-=base()*speed*dt; if(x<=-w)x+=w;
      lists.forEach(l=>{l.style.transform=`translate3d(${x.toFixed(2)}px,0,0)`;});
      marqueeRaf=requestAnimationFrame(loop);
    };
    marqueeRaf=requestAnimationFrame(loop);
  }

  /* ---------- G + I: scroll state, hero cue, hero exit ---------- */
  let scrollHandler=null;
  function initScrollMotion(path){
    if(scrollHandler)window.removeEventListener('scroll',scrollHandler);
    const hero=path==='/'?document.querySelector('.home-hero'):null;
    if(hero&&!hero.querySelector('.hero-scroll-cue')){
      const cue=document.createElement('div');cue.className='hero-scroll-cue';cue.setAttribute('aria-hidden','true');
      cue.innerHTML='<span>Scroll</span><i></i>';hero.appendChild(cue);
    }
    const motion=!reduceMotion();
    let ticking=false;
    const update=()=>{
      document.body.classList.toggle('is-scrolled',window.scrollY>40);
      if(hero&&motion){
        const h=hero.offsetHeight||1;
        const v=Math.max(0,Math.min(1,window.scrollY/(h*0.9)));
        hero.style.setProperty('--hero-exit',v.toFixed(3));
      }
      ticking=false;
    };
    scrollHandler=()=>{ if(!ticking){requestAnimationFrame(update);ticking=true;} };
    window.addEventListener('scroll',scrollHandler,{passive:true});
    update();
  }

  /* ---------- O: thumbnails fade in once decoded ---------- */
  function initImageFade(path){
    if(path!=='/')return;
    document.querySelectorAll('.project-card .visual img').forEach(img=>{
      if(img.dataset.fade)return; img.dataset.fade='1';
      if(img.complete&&img.naturalWidth>0)return;
      const visual=img.closest('.visual');
      img.classList.add('img-pending'); if(visual)visual.classList.add('is-loading');
      const done=()=>{img.classList.remove('img-pending'); if(visual)visual.classList.remove('is-loading');};
      img.addEventListener('load',done,{once:true}); img.addEventListener('error',done,{once:true});
    });
  }

  /* ---------- Q: live "Now" clock on the current chapter ---------- */
  let clockTimer=0;
  function initNowClock(path){
    clearInterval(clockTimer);
    const dates=path==='/'?document.querySelector('.timeline-stop-now .timeline-dates'):null;
    if(!dates)return;
    let el=dates.parentElement.querySelector('.timeline-now-clock');
    if(!el){el=document.createElement('span');el.className='timeline-now-clock';dates.insertAdjacentElement('afterend',el);}
    const fmt=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'});
    const tick=()=>{const t=fmt.format(new Date());el.innerHTML='Now · Berlin '+t.replace(':','<i class="clock-colon" aria-hidden="true">:</i>');};
    tick();clockTimer=setInterval(tick,30000);
  }

  /* ---------- D: footer moment ---------- */
  function initFooterMotion(){
    const ft=document.querySelector('.site-footer .ft4');
    if(!ft||ft.dataset.motion)return; ft.dataset.motion='1';
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){ft.classList.add('is-in');io.disconnect();}});},{threshold:0.25});
      io.observe(ft);
    }else ft.classList.add('is-in');
    const tile=ft.querySelector('.ft4-tile-email');
    if(tile&&finePointer()&&!reduceMotion()){
      tile.addEventListener('pointermove',e=>{
        const r=tile.getBoundingClientRect();
        const mx=((e.clientX-(r.left+r.width/2))/(r.width/2))*6,my=((e.clientY-(r.top+r.height/2))/(r.height/2))*4;
        tile.style.setProperty('--mx',mx.toFixed(1)+'px');tile.style.setProperty('--my',my.toFixed(1)+'px');
      });
      tile.addEventListener('pointerleave',()=>{tile.style.setProperty('--mx','0px');tile.style.setProperty('--my','0px');});
    }
    const copy=ft.querySelector('.ft4-copy');
    if(copy&&!copy.querySelector('.copy-check')){
      copy.insertAdjacentHTML('beforeend','<svg class="copy-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>');
    }
  }

  /* ---------- K: résumé links acknowledge the click ---------- */
  function initResumeFeedback(){
    if(document.body.dataset.resumeFeedback)return; document.body.dataset.resumeFeedback='1';
    document.addEventListener('click',e=>{
      const a=e.target.closest('a.home-resume-link, .site-footer a[href$=".pdf"]');
      if(!a)return;
      a.classList.remove('is-opening');void a.offsetWidth;a.classList.add('is-opening');
      setTimeout(()=>a.classList.remove('is-opening'),750);
      if(typeof showToast==='function')showToast('Résumé downloading — check your downloads');
    });
  }

  window.initSiteExtras=function(path){
    initNavBackdrop();
    initMobileCta();
    initReveals(path);
    initCursorPill(path);
    initCardParallax(path);
    initMarquee(path);
    initScrollMotion(path);
    initImageFade(path);
    initNowClock(path);
    initFooterMotion();
    initResumeFeedback();
    initHoverVideo(path);
    initIntro(path);
  };
})();
