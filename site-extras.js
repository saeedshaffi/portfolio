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
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('is-in');revealObserver.unobserve(e.target);} });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
    targets.forEach(el=>{ if(!el.classList.contains('is-in'))revealObserver.observe(el); });
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
      cta.innerHTML='<span class="mobile-cta-text"><b>Saeed Shaffi</b><span>Lead Product Designer · Berlin</span></span><a class="mobile-cta-btn" href="mailto:saeedshaffi@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>';
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
      cta.classList.toggle('is-on',pastTop&&!nearFooter&&!document.body.classList.contains('nav-open'));
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

  window.initSiteExtras=function(path){
    initNavBackdrop();
    initMobileCta();
    initReveals(path);
    initCursorPill(path);
    initHoverVideo(path);
    initIntro(path);
  };
})();
