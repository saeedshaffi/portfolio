(function(){
  const route='#/case/kfh-editorial';
  const base='assets/kfh/';
  const galleries={
    'Gathering requirements':['optimized/requirement-gathering-v2.svg'],
    'Product analysis':['optimized/product-analysis.jpg'],
    'Design process':['Design Process.png'],
    'Design workflow':['Design Workflow.png'],
    'User interviews':['optimized/user-interviews-poster.jpg'],
    'Heuristic evaluation':['optimized/heuristic-evaluation.jpg'],
    'Neobank user flows':['optimized/neobank-userflows.jpg'],
    'Comparing the user flows':['optimized/flow-comparison.jpg'],
    'High fidelity wireframes':['HiFi wireframes/Component 7.png'],
    'Version control':['optimized/version-control.jpg'],
    'Design system':['ds.png','DS Kapple.png'],
    'Before the redesign':['Before/KFH Home Dashboard@3x 3.png','Before/image 90.png','Before/image 91.png','Before/image 92.png'],
    'Improvements':['optimized/interface-improvements.jpg'],
    'Final interface':['optimized/final-ui.jpg'],
    'Heatmaps':['optimized/heatmap-validation.jpg'],
    'Design iterations after launch':['optimized/iterative-progress-poster.jpg'],
    'KFH Jazeel mobile case study':['optimized/mobile-preview.jpg']
  };
  let observer=null,scrollHandler=null;
  const esc=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  function gallery(title,files){const contain=/requirements|process|workflow|system/i.test(title);return `<section class="kfhr-gallery kfhr-reveal"><div class="kfhr-gallery-head"><strong>${esc(title)}</strong><span>${files.length>1?`${files.length} views`:'Project evidence'}</span></div><div class="kfhr-gallery-grid${contain?' is-contain':''}">${files.map((file,i)=>`<figure><img loading="lazy" decoding="async" src="${base}${encodeURI(file)}" alt="${esc(title)}, view ${i+1}"></figure>`).join('')}</div></section>`}
  function cleanup(){document.body.classList.remove('kfhr-active');document.querySelectorAll('.kfhr-progress').forEach(el=>el.remove());if(observer)observer.disconnect();observer=null;if(scrollHandler)window.removeEventListener('scroll',scrollHandler);scrollHandler=null}
  function hydrate(){if(location.hash!==route){cleanup();return}document.body.classList.add('kfhr-active');const root=document.querySelector('.kfhr-case');if(!root||root.dataset.ready)return;root.dataset.ready='true';
    const hero=root.querySelector('.case-hero');hero.insertAdjacentHTML('beforeend',`<figure class="kfhr-hero-art" aria-label="Redesigned KFH Jazeel experience"><img src="${base}Device%20-%20Macbook%20Pro%203D.png" alt="KFH Jazeel experience displayed on a laptop"></figure>`);hero.insertAdjacentHTML('afterend',`<section class="kfhr-impact" aria-label="Project outcomes"><div class="kfhr-impact-copy"><small>Measured impact</small><strong>Results first.</strong><span>The evidence behind the redesign.</span></div><div><small>Retention</small><strong>66→18%</strong><span>onboarding drop off</span></div><div><small>Adoption</small><strong>3→32.5%</strong><span>PayBills usage</span></div><div><small>Scale</small><strong>900</strong><span>screens delivered</span></div><div><small>Delivery</small><strong>99%</strong><span>deadlines met</span></div></section>`);
    Object.entries(galleries).forEach(([title,files])=>{const heading=[...root.querySelectorAll('h2,h3')].find(h=>h.textContent.trim()===title);if(heading)heading.insertAdjacentHTML('afterend',gallery(title,files))});
    const targets=[...root.querySelectorAll('.chapter>h2,.chapter>h3,.chapter>p,.chapter>.content-columns,.kfhr-gallery')];targets.forEach(el=>el.classList.add('kfhr-reveal'));if(matchMedia('(prefers-reduced-motion: reduce)').matches)targets.forEach(el=>el.classList.add('is-visible'));else{observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.08,rootMargin:'0px 0px -8%'});targets.forEach(el=>observer.observe(el))}
    const links=[...root.querySelectorAll('.study-toc a')],chapters=[...root.querySelectorAll('.chapter')];links.forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}}));
    const progress=document.createElement('div');progress.className='kfhr-progress';progress.innerHTML='<i></i>';document.body.appendChild(progress);const fill=progress.firstElementChild;scrollHandler=()=>{const start=root.offsetTop,end=root.offsetTop+root.offsetHeight-innerHeight,value=Math.max(0,Math.min(1,(scrollY-start)/Math.max(1,end-start)));fill.style.transform=`scaleX(${value})`;const active=[...chapters].reverse().find(ch=>ch.getBoundingClientRect().top<180)||chapters[0];links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active.id}`))};window.addEventListener('scroll',scrollHandler,{passive:true});scrollHandler();
  }
  window.addEventListener('hashchange',()=>setTimeout(hydrate,0));setTimeout(hydrate,0);
})();
