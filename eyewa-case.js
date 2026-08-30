/* Eyewa checkout case study, same editorial structure as the KFH case study. */
(function(){
  const A='assets/eyewa/hr/';
  const F='assets/eyewa/hr/fig/';

  const shot=(src,title,alt,cls)=>`<span class="shot ey-shot ey-shot-static${cls?' '+cls:''}"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"></span>`;

  const fig=(inner,caption,cls)=>`<figure class="ey-fig${cls?' '+cls:''}">${inner}${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;

  const odometer=(value,unit)=>{
    const runs=4,rows=10*runs;
    const cols=String(value).split('').map((d,i)=>{
      if(!/[0-9]/.test(d))return `<span class="ey-odo-sep">${d}</span>`;
      const to=-(30+Number(d))/rows*100;
      return `<span class="ey-odo-col"><span class="ey-odo-reel" style="--c:${i};--to:${to.toFixed(3)}%">${'0123456789'.repeat(runs).split('').map(n=>`<i>${n}</i>`).join('')}</span></span>`;
    }).join('');
    return `<span class="ey-odo" role="img" aria-label="${value}${unit==='%'?' percent':''}">${cols}${unit?`<span class="ey-odo-unit">${unit}</span>`:''}</span>`;
  };

  const chapter=(n,label,body)=>`<section class="chapter" id="eyewa-${n}" data-screen-label="${String(n).padStart(2,'0')}"><span class="chapter-num">${String(n).padStart(2,'0')} / ${label}</span>${body}</section>`;

  const toc=['Design process','Define the problem','What the data revealed','Research and benchmark','Flow mapping','Competitive analysis','Secondary research','Reviewing the existing design','Design the solution','Original and proposed','Test and refine','Improvements','Deliver and impact'];

  const process=[
    ['Understand','Problem Defining, Research'],['Ideation','Brain Storming'],
    ['Mockups','Sketches, Hi-Fi Wireframe, Prototype'],['Testing','Usability Testing'],
    ['Final Visual Design','UI Design']
  ];

  const crucial=[
    ['Shopping Cart','<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'],
    ['Billing Information','<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h8"/><path d="M8 17h5"/>'],
    ['Shipping Information','<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'],
    ['Shipping Method','<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>'],
    ['Payment Method','<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>'],
    ['Confirmation','<path d="M21.8 10a10 10 0 1 1-5.8-7.3"/><path d="m9 11 3 3L22 4"/>']
  ];

  const problems=[
    ['Target','Eyewa targets the working class in the Middle East.'],
    ['Working Hours','Many customers in the region work long hours (9 am to 6 pm), making it difficult for them to visit physical stores for eyewear purchases.'],
    ['Affordability','High-quality eyewear at affordable prices is a notable issue in the region, and Eyewa aims to provide a solution to this challenge.']
  ];

  /* The prioritisation table from the case study: impact against build complexity. */
  const findings=[
    ['Losing Users','Very High','Very Highly complex','premium','Eyewa was losing almost 40% of potential customers during the checkout process'],
    ['No Trust','Very High','Very Highly complex','premium','Customers did not trust Eyewa’s pay by card option'],
    ['No Summary','High','Highly complex','enhanced','Users found it difficult to remember what they are buying without the summary option'],
    ['No Available Promo Codes','High','Moderately complex','enhanced','Users were abandoning the platform when they attempted to apply incorrect promo codes to receive discounts or when they failed to enter a valid promo code'],
    ['Missing Steppers','Medium','Essential','basic','Eyewa’s checkout process is challenging for users to discern the number of steps involved']
  ];

  const funnel=[
    ['Shipping','100','Sessions that reached the shipping step'],
    ['Review &amp; Payments','26.5','What was left after a 73.51% drop-off'],
    ['Sessions with transactions','7.7','After a further 70.89% drop-off']
  ];

  const compRows=[
    ['Number of Screens','6','2','6','6','2'],
    ['Correct Placement of Promotion Code','Yes','Yes','Yes','Yes','No'],
    ['Stepper','Yes','Yes','Yes','Yes','No'],
    ['Marked Optional Input Fields','Yes','Yes','Yes','Yes','No'],
    ['Confusing Checkout','No','Yes','No','No','Yes'],
    ['Saved Information','Yes','Yes','Yes','No','Login to use already saved information']
  ];
  const compLogos=[['trim-comp-logo-1.png','AliExpress'],['trim-comp-logo-2.png','Walmart'],['trim-comp-logo-3.png','Amazon'],['trim-comp-logo-4.png','Zalando'],['trim-comp-logo-5.png','Eyewa']];

  const secondaryStats=[
    ['90','%','Faster task completion'],
    ['70','%','Prefer minimalistic platforms'],
    ['4.5','/5','Playstore ratings']
  ];
  const references=[
    ['Nielsen Norman Group','Don’t Make Me Think: A Common Sense Approach to Web Usability'],
    ['UX Collective','Minimalism: The Power of Less in User Interface Design'],
    ['Interaction Design Foundation','Minimalist User Interface Design']
  ];

  const cardSortItems=['Login','Cart','Promotional Codes','Payment Method','Delivery Method','Order Summary','Pay'];
  const missing=['Steppers','Login screen','Order Summary'];

  const suggestions=[
    ['Visa/Master card logo in front/below the input field of card number','suggest-card-marks.png','Card number field showing accepted card marks'],
    ['Simple text below “Place Secure Orders”','suggest-secure-order.png','Reassurance text placed below the secure order button']
  ];

  const testCriteria=[
    ['User Satisfaction',['Satisfaction: Are users more satisfied with the new checkout experience compared to the previous one?','Feedback: What specific feedback do users provide regarding the redesigned checkout flow?']],
    ['Clarity and Transparency',['Information Clarity: How clear is the information presented at each step of the checkout?','Transparency: Are users confident about the costs and details presented during the checkout?']],
    ['Usability',['Efficiency: Can users complete the checkout process more quickly with the redesigned flow?','Error Prevention: Does the redesigned flow help in reducing errors during the checkout process?','Learnability: How easily can users understand and navigate the new checkout steps?']],
    ['Trust and Security',['Perceived Security: Do users feel more secure entering their information in the redesigned checkout?']]
  ];

  const learnings=['New design significantly improved clarity','Easier to comprehend position in the checkout flow','Navigating between pages was notably simpler'];

  const deliverables=[
    'An exhaustive set of screens covering different user journeys and all states (tool used: Figma)',
    'An interactive prototype for different user journeys to help them understand the flow (tool used: Figma)',
    'A design spec document that covered the updated architecture + information design of the feature'
  ];

  const hifi=[['hifi-01.png','Sign in'],['hifi-02.png','Contact information'],['hifi-03.png','Shipping details'],['hifi-04.png','Order summary'],['hifi-05.png','Payment']];
  const proposed=[['prop-05.png','Sign in'],['prop-04.png','Contact information'],['prop-03.png','Shipping details'],['prop-02.png','Order summary'],['prop-01.png','Payment']];
  const originals=[['orig-02.png','Create account'],['orig-04.png','Contact information'],['orig-03.png','Shipping method'],['orig-05.png','Cart summary'],['orig-01.png','Payment']];
  const lofi=[['lofi-04.png','Login'],['lofi-03.png','Contact information'],['lofi-02.png','Shipping'],['lofi-01.png','Summary']];

  const gallery=(items,cols)=>`<div class="ey-gallery" style="--cols:${cols||5}">${items.map(([f,t])=>`<div>${fig(shot(F+f,t,t),`<b>${t}</b>`)}</div>`).join('')}</div>`;

  window.eyewaPage=function(){
    return `<div class="case reveal eyewa-case" style="--accent:#cf3f30">

<section class="case-hero">
  <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>Eyewa Checkout</b></nav>
  <span class="eyebrow">eCommerce · Checkout</span>
  <h1>Checkout that customers finish.</h1>
  <p><strong>Boosting customer retention through user experience in eCommerce checkout.</strong> Customers faced concerns and difficulties with Eyewa’s checkout, which led to a poor experience and high levels of complaints. I rebuilt the flow to be clearer and more trustworthy, and the churn and complaint numbers moved.</p>
  <span class="ey-hero-meta">User research &amp; UI design · Mobile · 9 min read</span>
  <div class="case-hero-visual" aria-label="Three screens from the redesigned checkout">
    ${[['fig/prop-05.png','Sign in'],['fig/prop-03.png','Shipping details'],['fig/prop-01.png','Payment']].map(([f,t],i)=>`<span class="ey-hero-shot" style="--h:${i}">${shot(A+f,'Redesigned checkout · '+t,t+' screen from the redesigned checkout')}</span>`).join('')}
  </div>
</section>

<div class="case-facts">
  <div class="fact"><span class="eyebrow">Task</span><b>Redesign the checkout</b></div>
  <div class="fact"><span class="eyebrow">Role</span><b>User Research, UI Design</b></div>
  <div class="fact"><span class="eyebrow">Platform</span><b>Mobile</b></div>
</div>

<section class="ey-overview" aria-labelledby="ey-ov-title">
  <div class="ey-ov-head">
    <span class="eyebrow">Overview</span>
    <h2 id="ey-ov-title">Healthy traffic, a checkout nobody could finish.</h2>
  </div>

  <ol class="ey-ov-ladder">
    <li>
      <span class="ey-ov-step"><i>01</i>Brief</span>
      <p>Eyewa sells affordable prescription glasses, sunglasses and lenses across the Gulf. Traffic and cart adds were healthy. Conversion was not.</p>
    </li>
    <li>
      <span class="ey-ov-step"><i>02</i>Problem</span>
      <p>Shipping and payment each lost roughly three quarters of the sessions that reached them: <b>7.7%</b> of shipping sessions ever transacted. People could not tell where they were, could not review the order, and did not trust the card form.</p>
    </li>
    <li>
      <span class="ey-ov-step"><i>03</i>Solution</span>
      <p>Five short steps with a visible stepper, an editable summary before payment, promo codes where people look for them, and accepted-card marks beside the SSL line.</p>
    </li>
  </ol>

  <div class="ey-ov-results">
    <div class="ey-ov-results-top">
      <span class="ey-ov-step"><i>04</i>Results</span>
      <p>Three months after rollout</p>
    </div>
    <div class="ey-ov-metrics">
      <div class="ey-ov-metric is-measured">
        <b><span class="ey-count" data-to="36">36</span><i>%</i></b>
        <div class="ey-ov-metric-copy">
          <span class="ey-ov-evidence-tag">Measured outcome</span>
          <span class="ey-ov-metric-label">less user churn</span>
          <span class="ey-ov-metric-note">Measured on the same funnel instrumentation used in the research.</span>
        </div>
      </div>
      <div class="ey-ov-metric is-measured">
        <b><span class="ey-count" data-to="62">62</span><i>%</i></b>
        <div class="ey-ov-metric-copy">
          <span class="ey-ov-evidence-tag">Measured outcome</span>
          <span class="ey-ov-metric-label">fewer checkout complaints</span>
          <span class="ey-ov-metric-note">Support tickets tagged to the checkout flow, same window.</span>
        </div>
      </div>
      <div class="ey-ov-metric is-modeled">
        <b>+<span class="ey-count" data-to="28">28</span><i>M AED</i></b>
        <div class="ey-ov-metric-copy">
          <span class="ey-ov-evidence-tag">Modeled estimate</span>
          <span class="ey-ov-metric-label">additional annual revenue</span>
          <span class="ey-ov-metric-note">Modeled estimate: online checkout sales rising from an estimated AED 175M to AED 203M/year (+16%), benchmarked against UAE eyewear e-commerce sizing, not confirmed internal financials.</span>
        </div>
      </div>
    </div>
    <p class="ey-ov-results-foot">Attributed by reading the drop-off rate at every step against the pre-release baseline, then sitting with the support team to trace which complaint tags disappeared. The revenue figure is a modeled estimate, not a disclosed company result.</p>
  </div>
</section>

<div class="long-study">
  <aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#eyewa-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside>
  <article>

${chapter(1,'Design process',`
  <h2>Using design thinking as design process</h2>
  <p>Five stages, each with its own output. The work moved forward only when the previous stage had produced something to test.</p>
  <div class="ey-rail">
    <i class="ey-rail-track" aria-hidden="true"></i>
    <ol aria-label="Design process">
      ${process.map(([t,s],i)=>`<li style="--n:${i}"><span class="ey-rail-dot">${String(i+1).padStart(2,'0')}</span><div><b>${t}</b><span>${s}</span></div></li>`).join('')}
    </ol>
  </div>
`)}

${chapter(2,'Define the problem',`
  <h2>Define the problem</h2>
  <p>In my evaluation I was able to identify the target users and the problems that Eyewa is trying to solve.</p>
  <div class="content-columns ey-columns-3">
    ${problems.map(([h,p])=>`<div class="content-card"><h3>${h}</h3><p>${p}</p></div>`).join('')}
  </div>
`)}

${chapter(3,'What the data revealed',`
  <h2>What did the data reveal?</h2>
  <p>I worked through the funnel step by step. Two steps were doing almost all of the damage.</p>
  <div class="ey-funnel" role="img" aria-label="Checkout funnel: shipping lost 73.51% of sessions, review and payments lost a further 70.89%">
    ${funnel.map(([label,pct,note],i)=>`<div class="ey-funnel-row" style="--h:${pct}%;--f:${i}"><div class="ey-funnel-head"><b>${label}</b><span>${note}</span></div><div class="ey-funnel-lane"><span class="ey-funnel-bar"></span><b class="ey-funnel-val"><span class="ey-count" data-to="${pct}">${pct}</span>%</b></div></div>${i<2?`<div class="ey-funnel-gap" style="--f:${i}"><span class="ey-gapin"><i aria-hidden="true">↓</i><strong><span class="ey-count" data-to="${['73.51','70.89'][i]}">${['73.51','70.89'][i]}</span>%</strong><em>${['Shipping drop-off','Review &amp; payments drop-off'][i]}</em></span></div>`:''}`).join('')}
  </div>
  <h3>What was behind it</h3>
  <p>Each finding was weighed on how much it was costing and how complex it would be to fix, which set the order of the work.</p>
  <div class="ey-table-wrap">
    <table class="ey-table ey-table-findings">
      <thead><tr><th scope="col">Finding</th><th scope="col">Impact</th><th scope="col">Complexity</th></tr></thead>
      <tbody>${findings.map(([h,impact,complexity,tier,desc])=>`<tr data-tier="${tier}"><th scope="row"><b>${h}</b><span>${desc}</span></th><td><span class="ey-pill" data-level="${impact.toLowerCase().replace(/ /g,'-')}">${impact}</span></td><td>${complexity}</td></tr>`).join('')}</tbody>
    </table>
    <p class="ey-legend"><span data-tier="basic">basic</span><span data-tier="enhanced">enhanced</span><span data-tier="premium">premium</span></p>
  </div>
`)}

${chapter(4,'Research and benchmark',`
  <h2>Research</h2>
  <p>I conducted a thorough analysis of Eyewa’s checkout process and other international eCommerce platforms to gain insights.</p>
  ${fig(`<img src="${F}benchmark-cards.png" alt="Amazon, AliExpress, Walmart and Zalando" loading="lazy" decoding="async">`,'The four platforms studied, chosen because customers in the region use them weekly.','ey-fig-plain')}
  <h3>Which steps were identified as crucial?</h3>
  <p>Six steps that every checkout has to account for, whatever the product.</p>
  <div class="ey-rail ey-rail-circles">
    <i class="ey-rail-track" aria-hidden="true"></i>
    <ol aria-label="Crucial checkout steps">
      ${crucial.map(([t,icon],i)=>`<li style="--n:${i}"><span class="ey-rail-dot ey-rail-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg></span><div><b>${t}</b></div></li>`).join('')}
    </ol>
  </div>
`)}

${chapter(5,'Flow mapping',`
  <h2>How to identify patterns &amp; variations?</h2>
  <p>I mapped the checkout flows of leading eCommerce platforms to identify the patterns they follow, then compared them against Eyewa.</p>
  <div class="ey-flow-pair">
    ${[['trim-comp-logo-2.png','Walmart','flow-map-2.png','Seven stops, and the upsell sits where the account step would be. Delivery method gets a screen of its own, and Summary is a real review step before Pay.'],['trim-comp-logo-4.png','Zalando','flow-map-1.png','Sign-in or account creation stands between the cart and the address, and contact details are marked optional at the point they matter most.']].map(([logo,name,map,note])=>`<figure class="ey-fig ey-flowcard"><figcaption class="ey-flowcard-tab"><img src="${F}${logo}" alt="${name}" loading="lazy" decoding="async"></figcaption>${shot(F+map,name+' checkout flow',name+' checkout flow diagram')}<figcaption>${note}</figcaption></figure>`).join('')}
  </div>
  <p>After studying and comparing the user flows of top e-commerce stores with that of Eyewa, it is clear that Eyewa has a different user flow to the one the top stores follow.</p>
  <blockquote>Eyewa is breaking <strong>Jakob’s Law</strong>: users spend most of their time on other sites, and they expect yours to work the same way.</blockquote>
`)}

${chapter(6,'Competitive analysis',`
  <h2>What was found from Competitive Analysis?</h2>
  <p>Five checkouts, compared from cart to confirm order on the decisions that matter.</p>
  <div class="ey-table-wrap">
    <table class="ey-table">
      <caption>From Cart to Confirm Order</caption>
      <thead><tr><th scope="col">Criteria</th>${compLogos.map(([f,n])=>`<th scope="col"><span class="ey-logo-cell"><img src="${F}${f}" alt="${n}" loading="lazy" decoding="async"></span></th>`).join('')}</tr></thead>
      <tbody>${compRows.map(([label,...cells])=>`<tr><th scope="row">${label}</th>${cells.map((c,i)=>`<td${i===4?' class="ey-cell-self"':''}${c==='No'?' data-neg="true"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>
`)}

${chapter(7,'Secondary research',`
  <h2>What information was discovered through secondary research?</h2>
  <p>Published research backed the direction: less on screen, faster completion, better ratings.</p>
  <div class="ey-stat-row">
    ${secondaryStats.map(([n,unit,label])=>`<div class="ey-stat"><strong>${odometer(n,unit)}</strong><span>${label}</span></div>`).join('')}
  </div>
  <h3>References</h3>
  <ul class="ey-refs">${references.map(([src,title])=>`<li><b>${src}</b><span>${title}</span></li>`).join('')}</ul>
`)}

${chapter(8,'Reviewing the existing design',`
  <h2>What are the things found by reviewing the existing design?</h2>
  <h3>Missing</h3>
  <ul>${missing.map(m=>`<li>${m}</li>`).join('')}</ul>
  ${gallery([['orig-cart.png','Cart'],['orig-contact.png','Contact information'],['orig-shipping.png','Shipping method'],['orig-payment.png','Payment'],['orig-payment-2.png','Payment · full page'],['orig-thankyou.png','Order confirmation'],['orig-account.png','Create account'],['orig-summary.png','Order summary']],4)}
  <h3>What are the suggestions to improve the existing flow?</h3>
  <div class="ey-suggest">
    <article class="ey-suggest-card ey-suggest-card-merged">
      <span class="eyebrow">Things to add</span>
      <div class="ey-suggest-grid">
        ${suggestions.map(([text,file,alt])=>`<div class="ey-suggest-item"><p>${text}</p><div class="ey-detail-plate"><img src="${F}${file}" alt="${alt}" loading="lazy" decoding="async"></div></div>`).join('')}
      </div>
    </article>
  </div>
  <div class="ey-benchmark-grid">
    <div class="ey-stat"><strong>${odometer(19,'%')}</strong><span>of users abandon during the checkout process</span><cite>Baymard Institute</cite></div>
    <div class="ey-stat"><strong>${odometer(25,'%')}</strong><span>abandon their cart due to unexpected payment charges</span><cite>Statista</cite></div>
  </div>
  <h3>What insights I gathered from examining heat-maps?</h3>
  <div class="content-columns">
    <div class="content-card"><h3>Findings</h3><ul><li>User does not know where to focus</li><li>Content clarity is insufficient</li></ul></div>
    <div class="content-card"><h3>Suggestions</h3><ul><li>Make promo code less prominent</li><li>Make flows minimal</li></ul></div>
  </div>
  ${(()=>{
    const cell=(inner,t)=>`<div><figure class="ey-fig">${inner}<figcaption><b>${t}</b></figcaption></figure></div>`;
    return `<div class="ey-gallery ey-gallery-heat" style="--cols:3">
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-a.png','Cart heat map','Heat map of the cart screen')}</div>`,'Cart')}
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-b.png','Contact information heat map','Heat map of the contact information screen')}</div>`,'Contact information')}
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-c.png','Shipping heat map','Heat map of the shipping method and address screen')}</div>`,'Shipping')}
    </div>
    <p class="ey-caption">Recorded on the live checkout. Attention pooled on the promo code and the primary button, not on the fields people had to fill. Click any heat map to see it full size.</p>`;
  })()}
  <h3>Card sorting</h3>
  <p>I wrote the seven checkout decisions onto cards and had participants order them. The result shows that users prefer an easy and short checkout process to save time.</p>
  <div class="ey-sortboard" role="img" aria-label="Seven hand-written cards ordered by participants: ${cardSortItems.join(', ')}">
    ${cardSortItems.map((t,i)=>`<div class="ey-note" style="--r:${(i%3)-1};--i:${i}"><span>${i+1}</span><b>${t}</b></div>`).join('')}
  </div>
  <p class="ey-caption">Participants: Sadia Qasim, Abutalib Haider.</p>
`)}

${chapter(9,'Design the solution',`
  <h2>Design the solution: paper wireframes</h2>
  <p>Paper first. Each sketch tested one question: how much of the order can be confirmed without leaving the step?</p>
  ${gallery(lofi,4)}
  <h3>Design the solution: high fidelity wireframes</h3>
  <p>Every screen carries the progress bar, states what it needs, and shows what it already has.</p>
  ${gallery(hifi,5)}
`)}

${chapter(10,'Original and proposed',`
  <h2>Original screens and proposed designs</h2>
  <p>The same five steps, before and after. Each proposed screen sits directly under the original it replaces.</p>
  <div class="ey-compare">
    <div class="ey-compare-row" data-row="original">
      <span class="ey-compare-label">Original</span>
      <div class="ey-gallery" style="--cols:5">${originals.map(([f,t])=>`<div>${fig(shot(F+f,'Original · '+t,t))}</div>`).join('')}</div>
    </div>
    <div class="ey-compare-row" data-row="proposed">
      <span class="ey-compare-label">Proposed</span>
      <div class="ey-gallery" style="--cols:5">${proposed.map(([f,t])=>`<div>${fig(shot(F+f,'Proposed · '+t,t))}</div>`).join('')}</div>
    </div>
  </div>
`)}

${chapter(11,'Test and refine',`
  <h2>Test &amp; refine</h2>
  <p>Once I had the initial prototype ready, I tested it with customers. Testing sessions were conducted remotely with a total of six customers, against four questions.</p>
  <div class="ey-criteria">
    ${testCriteria.map(([h,items],i)=>`<div class="ey-criterion"><span class="ey-criterion-num">0${i+1}</span><div><h3>${h}</h3><ul>${items.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>`).join('')}
  </div>
  <h3>Consolidating learnings: what worked?</h3>
  <ul>${learnings.map(l=>`<li>${l}</li>`).join('')}</ul>
`)}

${chapter(12,'Improvements',`
  <h2>Improvements: login</h2>
  <div class="content-columns">
    <div class="content-card"><h3>Problem</h3><p>No social login; users avoid registration. Guest order option lacks visibility, causing confusion.</p></div>
    <div class="content-card"><h3>Solution</h3><p>Enabled social account login and enhanced visibility for the ‘Login as Guest’ option on the login screen.</p></div>
  </div>
  ${fig(shot(F+'imp-login-v2.png','Improvements: login','Login screen across old design, first iteration and final design'),'Old design, first iteration and final design, left to right.','ey-fig-plain')}
  <h3>Improvements: contact information and shipping details</h3>
  <div class="content-columns">
    <div class="content-card"><h3>Problem</h3><p>In the old design, users had to input first and last names separately. The initial version then required users to enter all information on a single overwhelming screen.</p></div>
    <div class="content-card"><h3>Solution</h3><p>Merged first and last name fields and separated ‘Contact Information’ and ‘Shipping Details’ onto separate screens, improving user input speed.</p></div>
  </div>
  <div class="ey-gallery ey-gallery-iter" style="--cols:4">
    <div><figure class="ey-fig">${shot(F+'cs-old.png','Old design','One long web screen: separate first and last name, contact and shipping stacked together.')}<figcaption><b>Old design</b>One long web screen: separate first and last name, contact and shipping stacked together.</figcaption></figure></div>
    <div><figure class="ey-fig">${shot(F+'cs-iter1.png','First iteration','Still one screen, moved into the app, but nothing was split.')}<figcaption><b>First iteration</b>Still one screen, moved into the app, but nothing was split.</figcaption></figure></div>
    <div><figure class="ey-fig">${shot(F+'cs-final-1.png','Final, contact','Contact information alone, name field merged.')}<figcaption><b>Final, contact</b>Contact information alone, name field merged.</figcaption></figure></div>
    <div><figure class="ey-fig">${shot(F+'cs-final-2.png','Final, shipping','Shipping method and address on their own step.')}<figcaption><b>Final, shipping</b>Shipping method and address on their own step.</figcaption></figure></div>
  </div>
  <p class="ey-caption">Left to right: the old web checkout, the first app iteration, and the final split into two steps.</p>
  <h3>Improvements: payment screen</h3>
  <div class="content-columns">
    <div class="content-card"><h3>Problem</h3><p>Old design: users entered first and last names separately. First iteration issue: all information had to be added in one overwhelming screen.</p></div>
    <div class="content-card"><h3>Solution</h3><p>Merged first and last name fields, separated ‘Contact Information’ and ‘Shipping Details’ for a more user-friendly experience.</p></div>
  </div>
  <div class="ey-gallery ey-gallery-iter ey-gallery-pair" style="--cols:2">
    <div><figure class="ey-fig">${shot(F+'orig-payment-2.png','Old design','Original payment screen showing the order summary, card fields, billing checkbox and trust mark in one long checkout step.')}<figcaption><b>Old design</b>Card fields, order summary and billing checkbox competing on one scroll, with the trust marks below the fold.</figcaption></figure></div>
    <div><figure class="ey-fig">${shot(F+'pay-final.png','Final design','Payment method chosen first, three card fields, and the SSL assurance sitting directly above the pay button.')}<figcaption><b>Final design</b>Payment method chosen first, three card fields, and the SSL assurance sitting directly above the pay button.</figcaption></figure></div>
  </div>
`)}

${chapter(13,'Deliver and impact',`
  <h2>Deliver &amp; assess impact</h2>
  <p>After testing and iterating, I finalised the design and gave the engineering team three deliverables:</p>
  <ul>${deliverables.map(d=>`<li>${d}</li>`).join('')}</ul>
  <p>This was followed by multiple grooming sessions to lock the requirements with the engineering team. Once an initial build had been developed, I conducted a thorough design QA as a final check to ensure the design was translated as intended to the final, developed feature. After a couple of tweaks, the flow was rolled out to all the users.</p>
  <h3>Impact</h3>
  <p>Over the next three months, the following was observed:</p>
  <div class="ey-stat-row">
    <div class="ey-stat ey-stat-major"><strong>${odometer(36,'%')}</strong><span>reduction in user churn</span></div>
    <div class="ey-stat ey-stat-major"><strong>${odometer(62,'%')}</strong><span>reduction in checkout-related complaints</span></div>
    <div class="ey-stat ey-stat-major"><strong>+${odometer(28,'M AED')}</strong><span>estimated additional annual revenue</span></div>
  </div>
  <p class="ey-ov-results-foot">Modeled estimate: benchmarked against UAE online eyewear sales sizing, projecting checkout revenue from ~AED 175M to ~AED 203M/year (+16% net sales), not a disclosed company figure.</p>
  <h3>How the impact was attributed</h3>
  <p>To ensure that this impact was created because of the checkout redesign, I also conducted a brief quantitative and qualitative analysis by:</p>
  <ul>
    <li>Examining the drop-off rate throughout the checkout process.</li>
    <li>Collaborating with the customer support team to pinpoint any complaints associated with the checkout process and comprehending the specific concerns raised by users.</li>
  </ul>
  <h3>What I would do differently</h3>
  <ul class="ey-retro">
    <li><b>Instrument earlier.</b> The funnel numbers existed before the redesign, but event-level tracking on individual fields was added late. With it from day one, I could have attributed each improvement to a specific change instead of the release as a whole.</li>
    <li><b>Test in Arabic first.</b> The MENA market shops in two languages, and every usability session ran in English. The RTL experience deserved the same scrutiny.</li>
    <li><b>Bring support in sooner.</b> The complaint tags that ended up validating the impact would have been just as valuable during problem definition.</li>
  </ul>
  <a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a>
`)}

  </article>
</div>
</div>`;
  };

  window.initEyewaCase=function(){
    const root=document.querySelector('.eyewa-case');
    if(!root)return;

    /* TOC scroll-spy, highlight the chapter the reader is in. */
    const tocLinks=[...document.querySelectorAll('.study-toc a[href^="#eyewa-"]')];
    const chapters=tocLinks.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);

    /* Mobile TOC: on tablet/mobile the CSS (eyewa-editorial.css, max-width:900px)
       collapses the chapter list behind a sticky trigger, but it needs the
       .mobile-toc-trigger / .toc-links structure to exist. Without it the raw
       link list rendered fully expanded on top of the content. Desktop markup
       and behaviour are untouched: the trigger is display:none above 900px and
       .toc-links stays a plain grid. */
    const tocEl=root.querySelector('.study-toc');
    if(tocEl&&!tocEl.querySelector('.mobile-toc-trigger')&&tocLinks.length){
      const group=document.createElement('div');
      group.className='toc-links';group.id='eyewa-chapter-links';
      tocLinks.forEach(a=>group.appendChild(a));
      const trigger=document.createElement('button');
      trigger.className='mobile-toc-trigger';trigger.type='button';
      trigger.setAttribute('aria-expanded','false');
      trigger.setAttribute('aria-controls',group.id);
      trigger.innerHTML=`<span><small>Chapter</small><b class="mobile-toc-current">${tocLinks[0].textContent.trim()}</b></span><i aria-hidden="true"></i>`;
      trigger.addEventListener('click',()=>{const open=tocEl.classList.toggle('toc-open');trigger.setAttribute('aria-expanded',String(open));});
      group.addEventListener('click',()=>{tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');});
      tocEl.addEventListener('keydown',e=>{if(e.key!=='Escape')return;tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');trigger.focus();});
      tocEl.append(trigger,group);
    }

    /* Chapter links scroll in place. Without this, the href hash (#eyewa-N)
       lands in the router, which re-renders the app shell and dumps the
       reader back on the home page. */
    tocLinks.forEach(a=>a.addEventListener('click',event=>{
      const section=document.getElementById(a.getAttribute('href').slice(1));
      if(!section)return;
      event.preventDefault();
      section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    }));

    if(chapters.length){
      const currentLabel=tocEl?tocEl.querySelector('.mobile-toc-current'):null;
      const spy=()=>{
        let cur=chapters[0];
        for(const c of chapters){if(c.getBoundingClientRect().top<=180)cur=c;}
        tocLinks.forEach(a=>{
          const on=a.getAttribute('href')==='#'+cur.id;
          a.classList.toggle('active',on);
          if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
        });
        const active=tocLinks.find(a=>a.classList.contains('active'));
        if(currentLabel&&active)currentLabel.textContent=active.textContent.trim();
      };
      window.addEventListener('scroll',spy,{passive:true});
      spy();
    }

    document.querySelectorAll('.ey-ba').forEach(card=>{
      card.addEventListener('click',event=>{
        const button=event.target.closest('[data-ba-view]');
        if(!button)return;
        const view=button.dataset.baView;
        card.querySelectorAll('[data-ba-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.baView===view)));
        card.querySelectorAll('[data-ba-panel]').forEach(p=>p.classList.toggle('is-active',p.dataset.baPanel===view));
        card.querySelectorAll('[data-ba-img]').forEach(i=>i.classList.toggle('is-active',i.dataset.baImg===view));
        card.querySelectorAll('[data-ba-note]').forEach(n=>{n.hidden=n.dataset.baNote!==view});
      });
    });

    /* Entrances play when a block scrolls into view. Every fallback is cosmetic:
       the CSS resting state is the finished state, so no callback can hide content. */
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    /* Tag the remaining static blocks for additive entrances. */
    root.querySelectorAll('.ey-table-wrap, .ey-gallery, .ey-suggest, .ey-flow-pair, .ey-refs, .ey-compare-row, .ey-benchmark-grid').forEach(block=>{
      if(block.closest('.ey-anim'))return;
      block.classList.add('ey-anim');
      const items=block.matches('.ey-table-wrap')
        ? block.querySelectorAll('tbody tr')
        : block.querySelectorAll(':scope > *');
      items.forEach((el,i)=>{el.classList.add('ey-anim-item');el.style.setProperty('--i',i);});
    });
    const blocks=[...root.querySelectorAll('.ey-rail, .ey-funnel, .ey-stat, .ey-ov-results, .ey-ov-ladder, .impact-card, .ey-sortboard, .ey-anim, .ey-results')];
    const inView=el=>{const b=el.getBoundingClientRect();return b.top<window.innerHeight-40&&b.bottom>0};
    const countUp=el=>{
      const to=Number(el.dataset.to)||0,dec=(String(el.dataset.to).split('.')[1]||'').length,t0=performance.now(),dur=1700;
      const tick=now=>{
        const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
        el.textContent=(e*to).toFixed(dec);
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const sweep=()=>{
      for(let i=blocks.length-1;i>=0;i--){
        if(inView(blocks[i])){
          blocks[i].classList.add('ey-play');
          blocks[i].querySelectorAll('.ey-count').forEach(countUp);
          blocks.splice(i,1);
        }
      }
      if(!blocks.length){
        window.removeEventListener('scroll',sweep);
        window.removeEventListener('resize',sweep);
        clearInterval(timer);
      }
    };
    window.addEventListener('scroll',sweep,{passive:true});
    window.addEventListener('resize',sweep);
    const timer=setInterval(sweep,250);
    sweep();
  };
})();
