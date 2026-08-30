/* Talon.One design sprint case study, same editorial structure as the KFH Jazeel case study. */
(function(){
  const T='assets/talon/hr/';
  const L=T+'logos/';

  const big=(f,caption,alt,noMatte)=>`<figure class="media-block"><figcaption>${caption}</figcaption><div class="tl-bigshot${noMatte?'':' tl-matte'}"><img loading="lazy" decoding="async" src="${T+f}" alt="${alt||caption}"></div></figure>`;
  const bullet=x=>`<ul>${x.map(v=>`<li>${v}</li>`).join('')}</ul>`;

  const n=(t,v,hot)=>`<span class="tl-n tl-i${v?' tl-n-'+v:''}${hot?' tl-n-hot':''}">${t}</span>`;
  const line=()=>`<i class="tl-fline tl-i" aria-hidden="true"></i>`;
  const frow=inner=>`<div class="tl-frow">${inner}</div>`;

  const sprint=[
    ['Understand',['What the product is','Who the users are','What are their needs','Competitor review']],
    ['Diverge',['Envision','Formulate strategy','Develop solutions','Ideate']],
    ['Decide',['Choosing the better idea','Storyboarding the idea']],
    ['Prototype',['Build something quick and rough to show to users','Focus on usability, not design']],
    ['Validate',['A/B testing','Show the prototype to real users outside the organisation','Learn what doesn’t work']]
  ];

  const wallRows=[
    [['r1-1.png','Eddie Bauer'],['r1-2.png','Bitwala'],['r1-3.png','Bank al Etihad'],['r2-1.png','National Express'],['r2-2.png','River Island'],['r2-3.png','Elsevier'],['r2-4.png','Vclip']],
    [['r3-1.png','Jochen Schweizer, Giant Eagle, Zalando, HelloPrint and AirFox'],['r4-1.png','H&M'],['r4-2.png','Reebok'],['r4-3.png','adidas'],['r4-4.png','Afterpay']],
    [['r5-1.png','Plastiq, Share Now, Ticketmaster and Hostelworld'],['r6-1.png','Chantelle'],['r6-3.png','Zipcar'],['r6-4.png','Mercedes-Benz']]
  ];
  const wall=`<div class="tl-wall" role="img" aria-label="Brands using Talon.One, including Eddie Bauer, Zalando, H&M, Reebok, adidas, Afterpay, Ticketmaster and Mercedes-Benz">${wallRows.map((row,i)=>{
    const imgs=row.map(([f,a])=>`<img src="${L+f}" alt="${a}" loading="lazy" decoding="async">`).join('');
    return `<div class="tl-wall-row"${i%2?' data-dir="rtl"':''} style="--dur:${34+i*6}s"><div class="tl-wall-track">${imgs}</div><div class="tl-wall-track" aria-hidden="true">${imgs}</div></div>`;
  }).join('')}</div>`;

  const chips=files=>`<div class="tl-logo-cards tl-anim">${files.map(([f,a])=>`<figure class="tl-i"><img src="${L+f}" alt="${a}" loading="lazy" decoding="async"></figure>`).join('')}</div>`;

  const flowMap=`<div class="tl-flow tl-anim" role="img" aria-label="Recreated map of the Talon.One application: applications lead to the sidebar, filters and campaigns; the sidebar holds Create Campaign">
    ${frow(n('Create Application','green')+n('Study User Flows for App')+n('Recently updated campaigns','green')+n('Search Application','green'))}
    ${line()}
    ${frow(n('Applications'))}
    ${line()}
    <div class="tl-fcols">
      <div class="tl-fcol">${n('Sidebar')}${['Coupon Finder','Sessions','Create Campaign','Customers','Priority','Events','Settings'].map(t=>n(t,'plain',t==='Create Campaign')).join('')}</div>
      <div class="tl-fcol">${n('Filters')}${n('Search Campaign')+n('Campaigns Exports')}</div>
      <div class="tl-fcol">${n('Campaigns')}${['Details','State','Schedule','Rules','Performance &amp; Budgets'].map(t=>n(t,'ghost')).join('')}</div>
    </div>
  </div>`;

  const flowSelected=`<div class="tl-flow tl-anim" role="img" aria-label="Recreated Create Campaign flow: from scratch or from a template, then name and optional features, coupons or referrals, ending at campaign detail">
    ${frow(n('Create Campaign'))}
    ${line()}
    ${frow(n('From Scratch','gray',true)+n('From a Template','gray'))}
    ${line()}
    ${frow(n('Name','ghost')+n('Features (optional)','ghost'))}
    ${line()}
    ${frow(n('Coupons','ghost')+n('Referrals','ghost'))}
    ${line()}
    ${frow(n('Campaign Detail','ghost'))}
  </div>`;

  const flowUpdated=`<div class="tl-flow tl-anim" role="img" aria-label="Recreated updated flow: Create Campaign, then Rules, Cart Item Filters, Create Coupons and Activate Our Campaign in a straight sequence">
    ${frow(n('Create Campaign'))}${line()}
    ${frow(n('Rules','ghost'))}${line()}
    ${frow(n('Cart Item Filters','ghost'))}${line()}
    ${frow(n('Create Coupons','ghost'))}${line()}
    ${frow(n('Activate Our Campaign','ghost'))}
  </div>`;

  const heurRows=[
    ['Campaign Dashboard',[
      ['No way to know the campaign table scrolls horizontally to reveal more information','Visibility','Medium','Keep only the important columns so the table fits without scrolling'],
      ['No information on total budget and spend across campaigns','Visibility','Low','Surface spend, budgets and campaign totals on the dashboard'],
      ['No way of knowing how the dashboard screen was reached','Recognition over recall','Medium','Highlight the active item in the main menu'],
      ['The complete application name is not visible','Recognition over recall','High','Show the full name instead of truncating it, truncation adds memory load']
    ]],
    ['Campaign detail',[
      ['No clear place to focus, the eye lands on a disabled “Activate Campaign” button','Visibility','High','Order the information on this screen by priority']
    ]],
    ['Create Campaign',[
      ['No way of seeing how many steps campaign creation involves','Mapping','Low','Add steppers'],
      ['Typing an existing campaign name silently redirects to that campaign','Error prevention','Medium','Show an error that a campaign with this name already exists'],
      ['Cannot figure out the next steps to set up a new campaign','Allow efficiency','Emergency','Add steppers and walk users through the next screens']
    ]]
  ];
  const heurTable=`<div class="tl-heur-wrap tl-anim"><table class="tl-heur">
    <thead><tr><th scope="col">Problem identified</th><th scope="col">Heuristic</th><th scope="col">Priority</th><th scope="col">Recommendation</th></tr></thead>
    <tbody>${heurRows.map(([screen,rows])=>`<tr class="tl-heur-screen tl-i"><th colspan="4" scope="colgroup">${screen}</th></tr>${rows.map(([p,h,pri,rec])=>`<tr class="tl-i"><td>${p}</td><td>${h}</td><td><span class="tl-pri" data-pri="${pri.toLowerCase()}">${pri}</span></td><td>${rec}</td></tr>`).join('')}`).join('')}</tbody>
  </table></div>`;

  const clarity=`<div class="tl-clarity tl-anim" role="img" aria-label="Microsoft Clarity score of 52 out of 100, moderate difficulty: lower clarity than 60 percent of the most popular websites">
    <span class="tl-clarity-title">Moderate difficulty</span>
    <span class="tl-clarity-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="tl-cl-track" cx="60" cy="60" r="52"></circle><circle class="tl-cl-val" cx="60" cy="60" r="52"></circle></svg><b><span class="tl-count" data-to="52">52</span></b></span>
    <p>Lower clarity than 60% of the most popular websites.</p>
  </div>`;

  const morph=`<div class="tl-morph tl-anim" role="img" aria-label="Low fidelity wireframe of Create a Campaign morphing into the high fidelity wireframe">
    <img class="tl-morph-lo" src="${T}lofi.png" alt="Low fidelity wireframe of Create a Campaign" loading="lazy" decoding="async">
    <img class="tl-morph-hi" src="${T}hifi.png" alt="" aria-hidden="true" loading="lazy" decoding="async">
    <span class="tl-morph-tag" aria-hidden="true"><b class="tl-tag-lo">Lo-fi</b><b class="tl-tag-hi">Hi-fi</b></span>
  </div>`;

  const toc=['Brief and context','Sprint and process','Product research','User interviews','Flow mapping','Heuristic evaluation','Data and benchmarks','Design and prototype','Validation and takeaways'];

  window.talonPage=function(){
    return `<div class="case reveal talon-case" style="--accent:#2f62e9">

<section class="case-hero">
  <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>Talon.One</b></nav>
  <span class="eyebrow">B2B SaaS · Promotion engine</span>
  <h1>Simplifying campaign creation in a five day design sprint.</h1>
  <p>Talon.One powers promotions for adidas, H&amp;M and Ticketmaster, but new users struggle to start their first campaign. One sprint: research the product, interview its audience, rebuild the flow around a guided stepper.</p>
  <figure class="case-hero-visual"><figcaption class="visually-hidden">The redesigned Talon.One Campaigns experience</figcaption><div class="media-open"><img src="${T}hero-prototype.png" alt="Redesigned Talon.One Campaigns screen with a clear empty state and Create Campaign call to action" width="1571" height="1056" decoding="async"></div></figure>
</section>

<div class="case-facts">
  <div class="fact"><span class="eyebrow">Task</span><b>Redesign campaign creation</b></div>
  <div class="fact"><span class="eyebrow">Role</span><b>Product Designer</b></div>
  <div class="fact"><span class="eyebrow">Time</span><b>5 day design sprint</b></div>
</div>

<div class="long-study">
  <aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#talon-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside>
  <article>

<section class="chapter" id="talon-1" data-screen-label="01"><span class="chapter-num">01 / Brief and context</span><h2 class="chapter-title">Brief</h2><p>Talon.One lets enterprise teams build promotions, coupons, referrals and loyalty programs on one platform. The people configuring those campaigns are mostly marketers, not engineers, yet the entry point of the product, creating a campaign, gave them no sense of what the process involved or how far along they were.</p><h3>The problem</h3><p>New users could not figure out the next steps to set up a campaign. Navigation was icon-only, the campaign detail screen had no clear focus, and nothing told users how many steps creation would take.</p><div class="content-columns"><div class="content-card"><h3>Goal</h3><p>Make campaign creation understandable on first contact, so a marketer can go from an empty state to an active campaign without help.</p></div><div class="content-card"><h3>What I needed to do</h3><p>Understand the product and its users fast, find the highest-impact usability problems, and redesign the flow within one sprint.</p></div></div></section>

<section class="chapter" id="talon-2" data-screen-label="02"><span class="chapter-num">02 / Sprint and process</span><h2 class="chapter-title">Design sprint</h2><p>I ran the project as a classic five day sprint. Each day had a single job, and the work only moved forward once that day had produced something concrete.</p><ol class="tl-sprint tl-anim">${sprint.map(([t,items],i)=>`<li class="tl-i"><span class="tl-num" aria-hidden="true">0${i+1}</span><span class="tl-day">Day ${i+1}</span><h4>${t}</h4><ul>${items.map(v=>`<li>${v}</li>`).join('')}</ul></li>`).join('')}</ol></section>

<section class="chapter" id="talon-3" data-screen-label="03"><span class="chapter-num">03 / Product research</span><h2 class="chapter-title">Understanding the product</h2><p>Since I had never operated a promotion engine, I started where Talon.One teaches its own customers: the documentation and the official YouTube channel. The tutorial series walked through building campaigns, coupon codes and referral programs, and gave me a working mental model of applications, campaigns, rules and effects.</p>${big('youtube.png','Talon.One’s tutorial library, my crash course in how the promotion engine is meant to be used.','Talon.One YouTube channel with tutorial videos on campaigns, coupons and referrals',true)}<h3>Who relies on it</h3><p>The customer list explains the stakes. Enterprise brands run revenue-critical promotions through this tool. If campaign creation is confusing, the cost lands on every one of these teams.</p><figure class="media-block"><figcaption>A sample of the brands running promotions on Talon.One.</figcaption>${wall}</figure></section>

<section class="chapter" id="talon-4" data-screen-label="04"><span class="chapter-num">04 / User interviews</span><h2 class="chapter-title">Recruiting real users</h2><p>I had no access to Talon.One’s customers, so I recruited my own. On LinkedIn I contacted people who create or manage campaigns for a living, marketers, project managers and engineers at companies already using the product, including adidas and Zalando.</p>${big('outreach.png','Outreach messages sent during the sprint. The adidas and Zalando contacts came from Talon.One’s own customer list.','LinkedIn messages sent to a marketing student, an adidas project manager and a Zalando engineer',true)}<h3>Potential customers</h3><p>I also interviewed teams at PriceOye and PayPro, two companies that run promotion campaigns today and match Talon.One’s target profile, to hear how they expect campaign creation to work.</p><figure class="media-block"><figcaption>Potential customers interviewed during the sprint.</figcaption>${chips([['customer-1.png','PriceOye'],['customer-2.png','PayPro']])}</figure><h3>What the interviews surfaced</h3>${bullet(['People creating campaigns think in steps: rules, then filters, then coupons, then activation.','New users could not tell how many steps campaign creation involved, or where they were in it.','Marketers leaned on tools they already knew, most named Google Ads as their reference point.'])}<div class="finding-grid tl-anim"><div class="finding tl-i"><strong><span class="tl-count" data-to="5">5</span><span></span></strong>interviews in three days</div><div class="finding tl-i"><strong><span class="tl-count" data-to="2">2</span><span></span></strong>user groups: marketers and engineers</div><div class="finding tl-i"><strong><span class="tl-count" data-to="4">4</span><span></span></strong>crucial issues in Create Campaign</div><div class="finding tl-i"><strong><span class="tl-count" data-to="52">52</span><span>/100</span></strong>Microsoft Clarity score on key screens</div></div></section>

<section class="chapter" id="talon-5" data-screen-label="05"><span class="chapter-num">05 / Flow mapping</span><h2 class="chapter-title">Mapping the existing flows</h2><p>Before changing anything, I mapped how the app is actually structured, applications, the sidebar, filters and campaigns, and traced every path a user can take to create a campaign.</p><figure class="media-block"><figcaption>The application structure, rebuilt from my flow map. The highlighted node is the campaign creation path.</figcaption>${flowMap}</figure><h3>The flow that mattered</h3><p>One branch carried the sprint: Create Campaign. It splits into “from scratch” and “from a template”, then asks for a name and optional features before landing on campaign detail.</p><figure class="media-block"><figcaption>Create Campaign, isolated, the flow the redesign focuses on.</figcaption>${flowSelected}</figure></section>

<section class="chapter" id="talon-6" data-screen-label="06"><span class="chapter-num">06 / Heuristic evaluation</span><h2 class="chapter-title">Heuristic evaluation</h2><p>I walked the Campaign Dashboard, campaign detail and Create Campaign screens against Nielsen’s heuristics, logging each problem with a priority and a recommendation. The single emergency-level finding: users cannot figure out the next steps to set up a new campaign.</p><figure class="media-block"><figcaption>The heuristics log, every problem, its heuristic, priority and recommendation.</figcaption>${heurTable}</figure></section>

<section class="chapter" id="talon-7" data-screen-label="07"><span class="chapter-num">07 / Data and benchmarks</span><h2 class="chapter-title">What the data showed</h2><p>Microsoft Clarity confirmed the heuristics with behavioural data. The campaign screens scored 52, lower clarity than 60% of the most popular websites, and the click maps showed attention scattered across the page instead of following a path.</p><figure class="media-block"><figcaption>Clarity score for the campaign screens, rebuilt from the Clarity report.</figcaption>${clarity}</figure><div class="content-card tl-score-method"><h3>How the score was measured</h3><p>The 52/100 value came directly from Microsoft Clarity&rsquo;s report for the original campaign screens. It is a third-party diagnostic score, not a percentage I calculated from the five interviews or from the redesigned prototype. I used the separate click heatmap to understand what the score looked like in behaviour: attention was dispersed, with no dominant path through the screen.</p></div>${big('clarity-heatmap.png','Clicks spread thinly across campaign detail, no dominant path.','Campaign detail screen overlaid with click percentages from Microsoft Clarity')}<h2 class="section-title">Competitive analysis</h2><p>I compared how Viral Loops, Antavo and Google Ads handle the same job: setting up a campaign with rules and rewards.</p><figure class="media-block"><figcaption>The three products benchmarked against Talon.One.</figcaption>${chips([['comp-1.png','Viral Loops'],['comp-2.png','Antavo, loyalty programs for retail'],['comp-3.png','Google Ads']])}</figure><h3>Jakob’s law</h3><p>Users spend most of their time on other products, so they expect new tools to work like the ones they already know. Google Ads, the tool my interviewees knew best, walks users through campaign setup with a numbered stepper. That pattern became the backbone of the redesign.</p>${big('jakobs-law.png','Google Ads breaks campaign creation into four visible steps.','Google Ads campaign setup with numbered steps: select campaign settings, set up ad groups, create ads, review',true)}</section>

<section class="chapter" id="talon-8" data-screen-label="08"><span class="chapter-num">08 / Design and prototype</span><h2 class="chapter-title">From flows to interface</h2><h3>The redesigned flow</h3><p>The new Create Campaign journey follows the order users described in interviews: campaign, rules, cart item filters, coupons, activate. One decision per screen, with a stepper showing progress throughout.</p><figure class="media-block"><figcaption>The updated flow, a straight line where the original branched and doubled back.</figcaption>${flowUpdated}</figure><h3>Paper wireframes</h3><p>I sketched the stepper concept on paper first: numbered steps across the top, and the “from scratch / from template” choice as two large cards.</p>${big('paper-wireframes.png','First pass on paper, steps along the top, two clear starting points.','Paper sketch of the Create Campaign screen with numbered steps and two cards for from scratch and from template',true)}<h3>Low and high fidelity wireframes</h3><p>The lo-fi pass places the stepper, name field and optional features; the hi-fi wireframe adds the four step breadcrumb and selected states.</p><figure class="media-block"><figcaption>The same screen, looping from lo-fi to hi-fi.</figcaption>${morph}</figure><h3>Before the redesign</h3><p>The original entry point: a bare empty state, an icon-only rail, and no hint of what happens after the button.</p>${big('before.png','The original Campaigns screen.','Original Talon.One Campaigns screen with an empty state and Create Campaign button')}<h3>Improvements</h3>${bullet(['Icon navigation gained labels and clear active states, so users always know where they are.','Inactive items were visually quietened to keep focus on the current section.','Hover states preview where each item leads before users commit to a click.','A four step breadcrumb replaces the unmarked creation journey.'])}${big('improvements.png','Sidebar improvements, annotated.','Annotated sidebar comparison showing active tab treatment, quieter inactive tabs and hover behaviour')}<h2 class="section-title">Final interface</h2>${big('after.png','The redesigned Campaigns screen with labelled navigation and a clearer empty state.','Redesigned Campaigns screen with labelled navigation and a clearer empty state')}${big('prototype.png','The new Create a Campaign step, a four step breadcrumb replaces the unmarked journey.','Prototype of the redesigned Create a Campaign screen with stepper, selection cards, campaign name and features')}${big('rule-builder.png','Rule building in plain language, conditions on top, effects below.','Rule creation step with conditions and effects: 20% off with coupon, coupon code is valid, discount individual items')}</section>

<section class="chapter" id="talon-9" data-screen-label="09"><span class="chapter-num">09 / Validation and takeaways</span><h2 class="chapter-title">Checking the design</h2><p>I walked my interviewees through the clickable prototype, from the empty state through rules, filters and coupons. Every participant could say, unprompted, how many steps remained, the exact thing the original flow failed at.</p><blockquote>“Now I can actually tell how far I am from a live campaign.”</blockquote><h3>Takeaways</h3>${bullet(['A sprint is enough to move a complex B2B flow when research is focused on one journey.','Recruiting users through LinkedIn works, five relevant interviews in three days, at zero cost.','Familiar patterns beat novel ones: the stepper won because every participant already trusted it from Google Ads.'])}</section>

  <a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a>
  </article>
</div>
</div>`;
  };

  window.initTalonCase=function(){
    const root=document.querySelector('.talon-case');
    if(!root)return;
    document.body.classList.add('kfh-active');

    const tocLinks=[...document.querySelectorAll('.study-toc a[href^="#talon-"]')];
    const chapters=tocLinks.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if(chapters.length){
      const spy=()=>{
        let cur=chapters[0];
        for(const c of chapters){if(c.getBoundingClientRect().top<=180)cur=c;}
        tocLinks.forEach(a=>{
          const on=a.getAttribute('href')==='#'+cur.id;
          a.classList.toggle('active',on);
          if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
        });
        const current=document.querySelector('.talon-case .mobile-toc-current');
        if(current){const active=tocLinks.find(a=>a.classList.contains('active'));if(active)current.textContent=active.textContent.trim();}
      };
      window.addEventListener('scroll',spy,{passive:true});
      spy();
    }

    /* Mobile chapter menu, same pattern as the KFH case. */
    const tocEl=root.querySelector('.study-toc');
    if(tocEl&&!tocEl.querySelector('.mobile-toc-trigger')&&tocLinks.length){
      const group=document.createElement('div');
      group.className='toc-links';group.id='talon-chapter-links';
      tocLinks.forEach(a=>group.appendChild(a));
      const trigger=document.createElement('button');
      trigger.className='mobile-toc-trigger';trigger.type='button';
      trigger.setAttribute('aria-expanded','false');
      trigger.setAttribute('aria-controls',group.id);
      trigger.innerHTML=`<span><small>Chapter</small><b class="mobile-toc-current">${tocLinks[0].textContent.trim()}</b></span><i class="mobile-toc-chevron" aria-hidden="true"></i>`;
      trigger.addEventListener('click',()=>{const open=tocEl.classList.toggle('toc-open');trigger.setAttribute('aria-expanded',String(open));});
      group.addEventListener('click',()=>{tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');});
      tocEl.addEventListener('keydown',e=>{if(e.key!=='Escape')return;tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');trigger.focus();});
      tocEl.append(trigger,group);
    }

    const countUp=el=>{
      const to=Number(el.dataset.to)||0,t0=performance.now(),dur=1500;
      const tick=now=>{
        const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
        el.textContent=String(Math.round(e*to));
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const anims=[...root.querySelectorAll('.tl-anim')];
    anims.forEach(b=>{
      [...b.querySelectorAll('.tl-i, .tl-fline')].forEach((el,i)=>el.style.setProperty('--i',i));
      b.classList.add('tl-armed');
    });
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting)return;
        e.target.classList.add('tl-play');
        e.target.querySelectorAll('.tl-count').forEach(countUp);
        io.unobserve(e.target);
      });
    },{rootMargin:'0px 0px -12% 0px'});
    anims.forEach(b=>io.observe(b));
  };
})();
