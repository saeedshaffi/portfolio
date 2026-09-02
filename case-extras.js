/* Case-study extras shared by every case page: TL;DR summary, reading
   progress (where the page has none), and "next case study" navigation.
   Called by app.js after each route render: window.initCaseExtras(path). */
(function(){
  const ORDER=['kfh','ai-system','eyewa','system','talon'];
  const ACCENT={kfh:'#56e0bd','ai-system':'#d81e2c',eyewa:'#cf3f30',system:'#1e8055',talon:'#2f62e9'}; /* matches each page's --accent */
  const TLDR={
    kfh:{
      problem:'66% of users dropped off during onboarding; core flows were unclear and crashed.',
      did:'Research-led redesign, phased onboarding, a new design system and a shared team workflow.',
      outcome:'Drop-off 66% → 18%, PayBills adoption 3% → 32.5%, 900 screens shipped.',
      role:'Lead Product Designer · 6 months'
    },
    'ai-system':{
      problem:'900+ button and 1,800+ input implementations across a fragmented codebase.',
      did:'Built the Figma system, then a governed AI workflow that turns engineering rules into reusable context.',
      outcome:'Designers ship the first implementation; engineers validate instead of rebuild.',
      role:'Lead Product Designer · 6 months, ongoing'
    },
    eyewa:{
      problem:'Around 40% of customers abandoned checkout; unclear steps and weak trust in payments.',
      did:'Funnel analysis, competitive review, guest checkout, clearer progress and security cues, remote testing.',
      outcome:'36% less churn, 62% fewer checkout complaints.',
      role:'Product Designer · complete journey'
    },
    system:{
      problem:'No formal system — inconsistent fields, colours, hierarchy and flows across the product.',
      did:'Audit, moodboard alignment, tokens, components with full states, documentation.',
      outcome:'+54% customer productivity, 40% fewer inconsistencies, six months from audit to rollout.',
      role:'Sole Product Designer'
    },
    talon:{
      problem:'Every user needed documentation to create a campaign.',
      did:'Five-day sprint — research, flows, wireframes with contextual guidance, A/B test.',
      outcome:'A four-step guided flow that tested considerably easier to use.',
      role:'Sole Product Designer · 5 days'
    }
  };
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  let progressHandler=null;
  const removeProgress=()=>{
    document.querySelectorAll('.case-extra-progress').forEach(el=>el.remove());
    if(progressHandler){window.removeEventListener('scroll',progressHandler);progressHandler=null;}
  };

  function addTldr(id,caseRoot){
    const data=TLDR[id];
    const hero=caseRoot.querySelector('.case-hero');
    if(!data||!hero||caseRoot.querySelector('.case-tldr'))return;
    const box=document.createElement('aside');
    box.className='case-tldr';
    box.setAttribute('aria-labelledby','case-tldr-title');
    box.style.setProperty('--case-accent',ACCENT[id]||'#ff756b');
    box.innerHTML=`<div class="case-tldr-head"><span class="case-tldr-eyebrow" id="case-tldr-title">TL;DR</span><span class="case-tldr-hint">The 20-second version</span></div>
      <dl class="case-tldr-grid">
        <div><dt>Problem</dt><dd>${esc(data.problem)}</dd></div>
        <div><dt>What I did</dt><dd>${esc(data.did)}</dd></div>
        <div><dt>Outcome</dt><dd>${esc(data.outcome)}</dd></div>
        <div><dt>Role</dt><dd>${esc(data.role)}</dd></div>
      </dl>`;
    hero.insertAdjacentElement('afterend',box);
  }

  function addProgress(id,caseRoot){
    removeProgress();
    if(document.querySelector('.reading-progress, .hm-progress'))return; // page already has one
    const bar=document.createElement('div');
    bar.className='case-extra-progress';
    bar.setAttribute('aria-hidden','true');
    bar.style.setProperty('--case-accent',ACCENT[id]||'#ff756b');
    bar.innerHTML='<span></span>';
    bar.classList.add('is-arming');
    setTimeout(()=>bar.classList.remove('is-arming'),900);
    document.body.appendChild(bar);
    const fill=bar.firstElementChild;
    let ticking=false;
    const update=()=>{
      const end=caseRoot.offsetTop+caseRoot.offsetHeight-window.innerHeight;
      const value=Math.max(0,Math.min(1,window.scrollY/Math.max(1,end)));
      fill.style.transform=`scaleX(${value})`;
      ticking=false;
    };
    progressHandler=()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}};
    window.addEventListener('scroll',progressHandler,{passive:true});
    update();
  }

  function addNext(id,caseRoot){
    if(caseRoot.querySelector('.case-next')||typeof projects==='undefined')return;
    const nextId=ORDER[(ORDER.indexOf(id)+1)%ORDER.length];
    const next=projects.find(p=>p.id===nextId);
    if(!next)return;
    const link=document.createElement('a');
    link.className='case-next';
    link.href='#/case/'+next.id;
    link.style.setProperty('--case-accent',ACCENT[next.id]||'#ff756b');
    link.innerHTML=`<span class="case-next-eyebrow">Next case study</span>
      <span class="case-next-title">${esc(next.title)}</span>
      <span class="case-next-desc">${esc(next.desc)}</span>
      <span class="case-next-cta">Read the case <i aria-hidden="true">→</i></span>`;
    caseRoot.appendChild(link);
  }


  const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let chapterObserver=null;

  /* J. Case hero entrance: title words rise, TL;DR follows, progress bar arms */
  function splitWords(el){
    if(el.dataset.split)return; el.dataset.split='1';
    let i=0;
    const walk=node=>{[...node.childNodes].forEach(n=>{
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
    });};
    walk(el); el.classList.add('split-words');
  }
  function heroEntrance(caseRoot){
    if(reduceMotion())return;
    const h1=caseRoot.querySelector('.case-hero h1');
    if(h1&&!h1.dataset.split){splitWords(h1);requestAnimationFrame(()=>h1.classList.add('is-in'));}
    caseRoot.classList.add('case-entering');
    setTimeout(()=>caseRoot.classList.remove('case-entering'),2200);
  }

  /* C. Chapter transitions: number slides in, media settles, comparisons wipe */
  function chapterMotion(caseRoot){
    if(chapterObserver){chapterObserver.disconnect();chapterObserver=null;}
    document.body.classList.remove('chapters-armed');
    if(reduceMotion()||!('IntersectionObserver' in window)||document.body.classList.contains('kfh-active'))return;
    const chapters=[...caseRoot.querySelectorAll('.chapter')];
    if(!chapters.length)return;
    document.body.classList.add('chapters-armed');
    const vh=window.innerHeight;
    chapters.forEach(ch=>{ if(ch.getBoundingClientRect().top<vh*0.6)ch.classList.add('ch-in'); });
    chapterObserver=new IntersectionObserver(es=>{es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('ch-in');chapterObserver.unobserve(e.target);} });},{rootMargin:'0px 0px -12% 0px',threshold:0.08});
    chapters.forEach(ch=>{ if(!ch.classList.contains('ch-in'))chapterObserver.observe(ch); });
  }

  /* S. TL;DR outcome numbers count up once when the box enters view */
  function tldrCountUp(caseRoot){
    const dd=caseRoot.querySelector('.case-tldr-grid>div:nth-child(3) dd');
    if(!dd||dd.dataset.counted)return; dd.dataset.counted='1';
    const html=dd.textContent.replace(/(\d+(?:\.\d+)?)/g,(m)=>`<span class="tldr-num" data-target="${m}">${m}</span>`);
    dd.innerHTML=html;
    const nums=[...dd.querySelectorAll('.tldr-num')];
    if(reduceMotion()||!nums.length)return;
    const run=()=>{
      const start=performance.now();
      nums.forEach((el,i)=>{
        const target=parseFloat(el.dataset.target),decimals=(el.dataset.target.split('.')[1]||'').length;
        const tick=now=>{
          const t=Math.max(0,Math.min(1,(now-start-i*90)/900)),eased=1-Math.pow(1-t,3);
          el.textContent=(target*eased).toFixed(decimals);
          if(t<1)requestAnimationFrame(tick);else el.textContent=el.dataset.target;
        };
        el.textContent=(0).toFixed(decimals);requestAnimationFrame(tick);
      });
    };
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){run();io.disconnect();}});},{threshold:0.3});
      io.observe(dd);
    }else run();
  }

  window.initCaseExtras=function(path){
    const main=document.getElementById('main');
    if(!path||!path.startsWith('/case/')||!main){removeProgress();return;}
    const id=path.split('/')[2];
    const caseRoot=main.querySelector('.case')||main.firstElementChild;
    if(!caseRoot)return;
    addTldr(id,caseRoot);
    addNext(id,caseRoot);
    heroEntrance(caseRoot);
    chapterMotion(caseRoot);
    tldrCountUp(caseRoot);
    /* Existing pages create their own bars slightly later; defer so we only
       add ours when none appears. */
    setTimeout(()=>{ if((location.hash.slice(1)||'/')===path) addProgress(id,caseRoot); },60);
  };
})();
