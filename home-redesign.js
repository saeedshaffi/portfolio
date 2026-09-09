(function(){
  const linkedin='https://linkedin.com/in/saeedshaffi';
  let observer=null;
  function headerLink(){
    const nav=document.getElementById('site-nav');
    if(!nav)return;
    nav.querySelector('[data-home-highlights]')?.remove();
    if(nav.querySelector('[data-home-linkedin]'))return;
    const link=document.createElement('a');
    link.href=linkedin;link.target='_blank';link.rel='noreferrer';link.dataset.homeLinkedin='true';
    link.innerHTML='LinkedIn <span aria-hidden="true">↗</span>';
    nav.insertBefore(link,nav.lastElementChild);
  }
  function markup(){return `
    <div class="home-redesign" data-home-redesign>
      <section class="new-home-hero" aria-labelledby="new-home-title">
        <div class="new-home-copy">
          <div class="new-home-kicker"><span>Product designer</span><span>Berlin, Germany</span></div>
          <h1 id="new-home-title">I turn complexity into <em>intelligent products that grow.</em></h1>
          <p>Lead Product Designer combining product strategy, systems thinking and AI to make ambitious ideas clearer, more useful and ready to scale.</p>
          <div class="new-home-actions">
            <a href="#/" data-scroll-target="selected-work">Explore selected work <span aria-hidden="true">↓</span></a>
            <a href="mailto:saeedshaffi@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="new-home-scroll" aria-hidden="true"><i></i><span>Scroll to explore</span></div>
      </section>
      <section class="experience-strip" aria-labelledby="experience-title">
        <span id="experience-title">Experience across</span>
        <div class="experience-logos" role="list" aria-label="Selected companies and product environments">
          <b role="listitem">Zand Bank</b><b role="listitem">KFH Jazeel</b><b role="listitem">PriceOye</b><b role="listitem">PayPro</b><b role="listitem">CreditBook</b><b role="listitem">Expertlead</b>
        </div>
      </section>
      <section class="home-highlights" id="highlights" aria-labelledby="highlights-title">
        <header class="highlights-head home-rd-reveal"><span>Selected highlights</span><h2 id="highlights-title">Accomplishments</h2><p>Selected outcomes from product, research and design-system work.</p></header>
        <div class="highlight-grid">
          <a class="highlight-card highlight-lead home-rd-reveal" href="#/case/kfh-editorial">${highlightIcon('drop')}<div><span class="highlight-label">KFH Jazeel</span><h3>Onboarding drop-off reduced from 66% to 18%</h3><p>Research and phased delivery transformed the bank’s most critical customer journey.</p></div><span class="highlight-link">See case study <i>↗</i></span></a>
          <article class="highlight-card home-rd-reveal">${highlightIcon('growth')}<div><span class="highlight-label">Product adoption</span><h3>PayBills grew from 3% to 32.5%</h3><p>Clear guidance made an overlooked feature useful and understandable.</p></div></article>
          <article class="highlight-card home-rd-reveal">${highlightIcon('screens')}<div><span class="highlight-label">Delivery at scale</span><h3>900 screens delivered in six months</h3><p>A shared system and workflow helped the team move consistently.</p></div></article>
          <article class="highlight-card home-rd-reveal">${highlightIcon('checkout')}<div><span class="highlight-label">Eyewa</span><h3>36% reduction in checkout churn</h3><p>A clearer journey improved progress, cost and payment confidence.</p></div></article>
          <article class="highlight-card home-rd-reveal">${highlightIcon('system')}<div><span class="highlight-label">CreditBook</span><h3>54% productivity lift with Harmony</h3><p>One design language connected components, teams and breakpoints.</p></div></article>
          <article class="highlight-card home-rd-reveal">${highlightIcon('quality')}<div><span class="highlight-label">Delivery quality</span><h3>99% of deadlines met or beaten</h3><p>Clear ownership and practical handoff kept delivery on track.</p></div></article>
          <article class="highlight-card home-rd-reveal">${highlightIcon('support')}<div><span class="highlight-label">Customer experience</span><h3>62% fewer checkout complaints</h3><p>Research-led changes gave customers clarity and confidence.</p></div></article>
        </div>
      </section>
    </div>`}
  function highlightIcon(type){const marks={
    drop:'<svg viewBox="0 0 76 76"><path d="M38 5v48M18 35l20 20 20-20"/></svg>',
    growth:'<svg viewBox="0 0 76 54"><path d="M4 45 25 25l14 11L68 7"/><path d="M49 7h19v19"/></svg>',
    screens:'<svg viewBox="0 0 76 60"><g class="screen-grid"><rect x="2" y="2" width="18" height="15"/><rect x="29" y="2" width="18" height="15"/><rect x="56" y="2" width="18" height="15"/><rect x="2" y="23" width="18" height="15"/><rect x="29" y="23" width="18" height="15"/><rect x="56" y="23" width="18" height="15"/><rect x="2" y="44" width="18" height="15"/><rect x="29" y="44" width="18" height="15"/><rect x="56" y="44" width="18" height="15"/></g></svg>',
    checkout:'<svg viewBox="0 0 82 54"><path class="eye-solid" d="M2 27C14 9 27 2 41 2s27 7 39 25C68 45 55 52 41 52S14 45 2 27Z"/><circle class="eye-cut" cx="41" cy="27" r="12"/></svg>',
    system:'<span class="mark-word mark-credit"><b>C</b><i>B</i></span>',
    quality:'<svg viewBox="0 0 76 76"><circle class="badge-ring" cx="38" cy="38" r="31"/><path d="m22 39 11 11 22-25"/></svg>',
    support:'<span class="mark-word mark-cx"><b>CX</b><i>↓</i></span>'};return `<span class="highlight-icon highlight-icon-${type}" aria-hidden="true">${marks[type]}</span>`}
  function init(){
    headerLink();
    const isHome=location.hash===''||location.hash==='#/'||location.hash==='#/work';
    document.body.classList.remove('home-rd-active');
    document.querySelectorAll('[data-home-redesign]').forEach(el=>el.remove());
    if(observer)observer.disconnect();observer=null;
    if(!isHome)return;
    /* The editorial dark hero (app.js + hero.css) is the approved hero.
       The alternate light hero below is retired; keep only the header link. */
    if(true)return;
    const oldHero=document.querySelector('.home-hero');
    const work=document.getElementById('selected-work');
    if(!oldHero||!work)return;
    oldHero.remove();
    work.insertAdjacentHTML('beforebegin',markup());
    const root=document.querySelector('[data-home-redesign]');
    root.querySelector('.home-highlights')?.remove();
    root.querySelectorAll('a[href^="#"]:not([href^="#/"])').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(!target)return;event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
    const targets=[...root.querySelectorAll('.home-rd-reveal')];
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)targets.forEach(el=>el.classList.add('is-visible'));
    else{observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.12,rootMargin:'0px 0px -7%'});targets.forEach(el=>observer.observe(el));}
  }
  window.addEventListener('hashchange',()=>setTimeout(init,0));
  setTimeout(init,0);
})();
