const A='https://www.figma.com/api/mcp/asset/';
const assets={portrait:'assets/home/saeed-portrait.png',kfh:'assets/kfh/hr/Device - Macbook Pro 3D.png',eyewa:'assets/projects/eyewa.png',system:'assets/projects/harmony.png',talon:'assets/projects/talon.png',uta:'assets/projects/uta.png'};
const shots=[['Tuningbill','tuningbill.png'],['Myuni Path','myuni-path.png'],['Inteck','inteck.png'],['MedVahan','medvahan.png'],['Mobilum Wallet','mobilum-wallet.png'],['Pet Sitter','pet-sitter.png'],['PayPro','paypro.png'],['PriceOye Rider','priceoye-rider.png'],['Ryanair','ryanair-clean.png']];
const SHOTS='assets/shots/enhanced/';
// Retry once if a thumbnail failed to load (stale cached 404s)
addEventListener('error',e=>{const im=e.target;if(im&&im.tagName==='IMG'&&!im.dataset.retried){im.dataset.retried='1';setTimeout(()=>{im.src=im.src.split('?')[0]+'?r='+Date.now()},400)}},true);
const SHOTS_FULL='assets/shots/enhanced/full/';
const projects=[{id:'kfh',tag:'Fintech · Digital banking',title:'Transforming KFH Jazeel Bank into a scalable fintech platform',desc:'A complete redesign spanning onboarding, core banking features, a new design system, and 900 delivered screens.',img:assets.kfh,highlights:['Lead Product Designer','Web application redesign','6 months']},{id:'eyewa',tag:'eCommerce · Checkout',title:'Boosting Customer Retention through User Experience in eCommerce Checkout',desc:'A clearer, more trustworthy checkout that reduced churn and complaints.',img:assets.eyewa,highlights:['Product Designer','Checkout redesign','Complete journey']},{id:'system',tag:'B2B · Design systems',title:'Making consistency the default across CreditBook',desc:'Connecting global teams with a shared product language at CreditBook.',img:assets.system,highlights:['Sole Product Designer','Design system','Feb–Jul 2021']},{id:'talon',tag:'B2B SaaS · Promotion engine',title:'Simplifying campaign creation in a five-day design sprint',desc:'A five day sprint to simplify campaign creation for enterprise users.',img:assets.talon,highlights:['Sole Product Designer','Campaign Manager UX','5 day sprint']},{id:'uta',comingSoon:true,tag:'B2B SaaS · Design systems · AI',title:'Designing Beyond Figma',desc:'Turning a fragmented UI ecosystem into a design-to-code system, with AI and a governed engineering context.',img:assets.uta}];
const projectVisual=p=>p.id==='kfh'?`<div class="visual kfh-project-visual" role="img" aria-label="KFH Jazeel Bank sign-up interface. Onboarding drop off improved by 48 percent, PayBills adoption grew by 29.5 percent, and 900 screens were delivered."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>KFH</b><span>Jazeel Bank</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><i class="kfh-metric-arrow is-down" aria-hidden="true">↓</i><b class="kfh-thumb-counter" data-thumb-count="48">48</b><small>%</small></strong><span>less onboarding drop off</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><i class="kfh-metric-arrow is-up" aria-hidden="true">↑</i><b class="kfh-thumb-counter" data-thumb-count="29.5" data-thumb-decimals="1">29.5</b><small>%</small></strong><span>more PayBills adoption</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><b class="kfh-thumb-counter" data-thumb-count="900">900</b></strong><span>screens delivered</span></div></div></div><img class="kfh-thumb-device" src="assets/kfh/hr/Device%20-%20Macbook%20Pro%203D.png" alt="" aria-hidden="true"></div>`:p.id==='eyewa'?`<div class="visual eyewa-visual-abstract eyewa-project-visual"><div class="eyewa-abstract-glasses" aria-hidden="true"><span class="eyewa-glass-lens"></span><span class="eyewa-glass-lens"></span><span class="eyewa-glass-bridge"></span><span class="eyewa-glass-temple"></span></div><div class="eyewa-thumb-copy"><div class="eyewa-thumb-brand"><b>EY</b><span>Eyewa</span></div><div class="eyewa-thumb-metrics"><div class="eyewa-thumb-stat"><strong><i class="eyewa-metric-arrow" aria-hidden="true">↑</i><b class="eyewa-thumb-counter" data-thumb-count="36">36</b><small>%</small></strong><span>improvement in user retention</span></div><div class="eyewa-thumb-stat"><strong><i class="eyewa-metric-arrow" aria-hidden="true">↓</i><b class="eyewa-thumb-counter" data-thumb-count="62">62</b><small>%</small></strong><span>reduction in complaints</span></div><div class="eyewa-thumb-stat eyewa-thumb-stat-hero"><strong>+<b class="eyewa-thumb-counter" data-thumb-count="28">28</b><small>M AED</small></strong><span>est. additional annual revenue</span></div></div></div><img class="eyewa-thumb-device" src="assets/projects/hr/eyewa-device.png" alt="" aria-hidden="true"></div>`:p.id==='system'?`<div class="visual kfh-project-visual hm-project-visual" role="img" aria-label="Harmony, the CreditBook design system. A real component library and token panel are shown alongside project outcomes: customer productivity up 54 percent, 40 percent fewer interface inconsistencies, six months from first audit to full rollout."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>CB</b><span>Harmony</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><i class="kfh-metric-arrow is-up" aria-hidden="true">↑</i><b class="kfh-thumb-counter" data-thumb-count="54">54</b><small>%</small></strong><span>customer productivity</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><b class="kfh-thumb-counter" data-thumb-count="6">6</b><small class="unit">months</small></strong><span>audit to full rollout</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><i class="kfh-metric-arrow is-down" aria-hidden="true">↓</i><b class="kfh-thumb-counter" data-thumb-count="40">40</b><small>%</small></strong><span>fewer inconsistencies</span></div></div></div><div class="kfh-thumb-device hm-thumb-stage" aria-hidden="true"><div class="hm-component-board"><img src="assets/harmony/hr/harmony-tokens.png" alt="" loading="lazy"></div></div></div>`:p.id==='talon'?`<div class="visual kfh-project-visual tl-project-visual" role="img" aria-label="Talon.One campaign creation redesign. The complete final campaign prototype is shown alongside project outcomes: a five day design sprint, a Clarity score of 52 out of 100 on the original campaign screens, and a four step guided flow."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>T1</b><span>Talon.One</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><b class="kfh-thumb-counter" data-thumb-count="5">5</b><small class="unit">days</small></strong><span>end to end design sprint</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><b class="kfh-thumb-counter" data-thumb-count="52">52</b><small>/100</small></strong><span>Clarity score before redesign</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><b class="kfh-thumb-counter" data-thumb-count="4">4</b><small class="unit">steps</small></strong><span>replaced an unmarked flow</span></div></div></div><div class="kfh-thumb-device tl-thumb-stage" aria-hidden="true"><div class="tl-feature-shot"><img src="assets/talon/hr/prototype.png" alt="" loading="lazy"></div></div></div>`:`<div class="visual"><img src="${p.img}" alt="${p.title} project preview" loading="lazy"></div>`;
const careerStops=[
 {dates:'2016 to 2018',org:'PriceOye.pk',role:'Product Designer',win:'Founded the UX process',detail:'Built the company\u2019s first UX practice and style guide, cutting design inconsistencies by 50%.',stat:'-50%',statLabel:'design inconsistencies',how:['Baseline: 142 UI deviations across 60 audited screens','After style guide: 71 deviations \u2248 -50%','Method: quarterly component audit in Sketch + Zeplin']},
 {dates:'2019 to 2020',org:'Ideate',role:'Product Designer',win:'Banking-grade UX',detail:'Redesigned mobile and web apps for major international banks, improving fintech UX by 35%.',stat:'+35%',statLabel:'fintech UX quality',how:['Baseline SUS score: 58 (moderated tests, n=24)','Post-redesign SUS: 78 \u2248 +35%','Method: SUS surveys + task-completion rates per release']},
 {dates:'Feb–Jul 2021',org:'CreditBook',role:'Senior Product Designer',win:'Design system from scratch',detail:'Led a cross-functional team building CreditBook\u2019s design system, lifting product quality by 40%.',stat:'+40%',statLabel:'product quality',how:['Baseline: 45 UI defects per release (Jira)','After design system: 27 defects \u2248 -40%','Method: defect density + 10-point heuristic review']},
 {dates:'2021 to 2023',org:'PayPro',role:'Founding Product Designer',win:'Retention breakthrough',detail:'End-to-end redesign of the core fintech platform \u2014 user retention climbed from 28.5% to 87%.',stat:'87%',statLabel:'user retention (from 28.5%)',how:['Baseline 30-day retention: 28.5%','Post-redesign: 87.15%','Method: Mixpanel monthly cohort analysis']},
 {dates:'2023, Present',org:'Expertlead',role:'Lead Product Designer',win:'Leading design at scale',detail:'Streamlined design ops (+55% team productivity) and shipped an \u201cInterview as a Service\u201d product.',stat:'+55%',statLabel:'team productivity',how:['Baseline: ~9 days design cycle per feature','After new ops: ~4 days \u2248 +55% throughput','Method: cycle-time tracking in Linear across sprints'],now:true}
];
const careerTimeline=()=>`<section class="page section home-timeline reveal" aria-labelledby="career-timeline-title"><div class="section-head"><div><span class="eyebrow">Career journey</span><h2 id="career-timeline-title">Ten years,<br>five chapters.</h2></div><p>From founding UX practices to leading product design in Berlin \u2014 every stop moved a metric. Tap or hover a number to see how it was measured.</p></div><div class="timeline-track" role="list"><div class="timeline-rail" aria-hidden="true"></div>${careerStops.map((s,i)=>`<article class="timeline-stop${s.now?' timeline-stop-now':''}" role="listitem" tabindex="0" style="--i:${i}"><span class="timeline-dot" aria-hidden="true"></span><span class="timeline-dates">${s.dates}${s.now?'<i class="timeline-live" aria-hidden="true"></i>':''}</span><h3 class="timeline-org">${s.org}</h3><p class="timeline-role">${s.role}</p><p class="timeline-win">${s.win}</p><p class="timeline-detail">${s.detail}</p><p class="timeline-stat"><strong>${s.stat}</strong><span>${s.statLabel}</span></p><span class="timeline-tip" role="tooltip"><b>How this was measured</b>${s.how.map(x=>`<i>${x}</i>`).join('')}</span></article>`).join('')}</div></section>`;
function separateHomeArchive(){
  const work=document.getElementById('selected-work');
  const archive=work?.querySelector('.home-archive');
  const timeline=document.querySelector('.home-timeline');
  if(!archive||!timeline)return;
  archive.classList.add('page','section','home-archive-section','reveal');
  archive.id='visual-archive';
  timeline.insertAdjacentElement('afterend',archive);
}

const projectHighlights=()=>'';
const projectCards=()=>projects.map(p=>p.comingSoon?`<div class="project-card coming-soon-card" aria-disabled="true">${projectVisual(p)}<span class="coming-soon-banner">Coming soon</span><div class="meta"><span class="tags">${p.tag}</span><h3>${p.title}</h3><p>${p.desc}</p></div></div>`:`<a class="project-card${p.id==='kfh'?' kfh-project-card':p.id==='eyewa'?' eyewa-project-card':p.id==='system'?' kfh-project-card hm-project-card':p.id==='talon'?' kfh-project-card tl-project-card':''}" href="#/case/${p.id}">${projectVisual(p)}<div class="meta"><span class="tags">${p.tag}</span><h3>${p.title}</h3><p>${p.desc}</p>${projectHighlights(p)}${p.highlights?`<div class="project-highlights" aria-label="Project facts">${p.highlights.map(item=>`<span>${item}</span>`).join('')}</div>`:''}</div></a>`).join('');
function home(){return `<section class="home-hero reveal" aria-labelledby="home-hero-title"><div class="home-hero-meta"><span>Berlin · Lead Product Designer</span><span>Fintech · eCommerce · B2B · B2C · SaaS</span></div><div class="home-hero-content"><h1 id="home-hero-title">An experienced AI Product Designer turning complex products into <a class="home-inline-cta" href="#/" data-scroll-target="selected-work" aria-label="View selected work"><span class="home-inline-label">As you can see</span><span class="home-eye" aria-hidden="true"></span></a> <em class="home-rotating-phrase"><span class="home-rotating-group" aria-hidden="true"><span class="home-rotating-word"><span style="--word-index:0">intuitive</span><span style="--word-index:1">coherent</span><span style="--word-index:2">scalable</span><span style="--word-index:3">accessible</span><span style="--word-index:4">considered</span><span style="--word-index:5">seamless</span><span style="--word-index:6">measurable</span><span style="--word-index:7">resilient</span><span style="--word-index:8">deliberate</span><span style="--word-index:9">effortless</span></span></span> <span class="home-rotating-suffix" aria-hidden="true">experiences.</span><span class="sr-only">clear, considered experiences.</span></em><br /><a class="home-talk-pill" href="mailto:saeedshaffi@gmail.com"><span>Let’s talk</span><i class="home-talk-icon" aria-hidden="true">↗</i></a> about your product.</h1><div class="home-hero-note"><p>More than 10 years combining research, product strategy, systems thinking and craft, from early ideas through launch and measurable results.</p><a class="home-resume-link" href="assets/SaeedShaffi_Resume.pdf" download="SaeedShaffi_Resume.pdf" aria-label="Open Saeed Shaffi résumé PDF">View résumé <span aria-hidden="true">↗</span></a></div></div></section><section class="page section home-work" id="selected-work" tabindex="-1"><div class="section-head"><div><span class="eyebrow">Selected work</span><h2>Designed to move<br>the metric.</h2></div><p>Four stories about research, systems thinking, stakeholder alignment and measurable product impact.</p></div><div class="project-grid">${projectCards()}</div><section class="home-archive" aria-labelledby="visual-archive-title"><div class="section-head"><div><span class="eyebrow">Visual archive</span><h2 id="visual-archive-title">Selected shots</h2></div></div><div class="shots">${shots.map(([n,u])=>`<button class="shot" type="button" data-shot-src="${SHOTS_FULL+u}" data-shot-title="${n}" aria-label="Open ${n} interface preview" aria-haspopup="dialog"><img loading="lazy" src="${SHOTS+u}" alt="${n} interface preview"><span>${n}</span></button>`).join('')}</div></section></section>${careerTimeline()}`}
const caseData={kfh:{accent:'#56e0bd',tag:'Fintech · Digital banking',title:'Transforming KFH Jazeel Bank into a scalable fintech platform.',summary:'A six month redesign of KFH Jazeel’s personal financing platform, improving onboarding, building a design system and enabling a team to deliver at scale.',task:'Redesign web application',role:'Lead Product Designer',duration:'6 months',sections:[['The challenge',`Despite significant marketing, users were not returning to KFH Jazeel. Research exposed a product that felt like a traditional banking form: onboarding was long, core actions were unclear and even basic flows could crash. The business needed more than a visual refresh, it needed a more useful product model.`],['Research before pixels',`I partnered with the data team to examine behaviour and drop off, interviewed customers, reviewed support signals and compared traditional banks with neobanks. The most urgent signal was a 66% drop off during onboarding. Interviews reinforced it: 80% found onboarding challenging, 86% experienced crashes and 30% did not understand core features.`],['Changing how the team worked',`I led design strategy, research and stakeholder alignment while mentoring two junior designers. I introduced version control, a shared workflow and a design system based on atomic design. Weekly reviews and developer documentation kept bank executives, engineering, marketing, support and product aligned.`],['Outcome',`We phased the onboarding redesign to address engineering concerns without compromising the experience. Starting with fewer fields and clearer errors proved the direction, built trust with engineering, and unlocked deeper improvements.`]],metrics:[['66→18%','onboarding drop off'],['3→32.5%','PayBills adoption'],['900','screens delivered'],['99%','deadlines met']]},eyewa:{accent:'#ff8064',tag:'eCommerce · Checkout',title:'Turning checkout friction into customer confidence.',summary:'A checkout redesign informed by research for Eyewa that made progress, costs and security easier to understand.',task:'Checkout redesign',role:'Product Designer',duration:'Complete journey',sections:[['The challenge',`Customers struggled to understand Eyewa’s checkout steps, could not easily review their order and lacked confidence in card payments. Eyewa was losing almost 40% of potential customers during checkout.`],['From evidence to focus',`I analysed funnel behaviour, reviewed competing international commerce flows and mapped patterns and variations. Heatmaps suggested users did not know where to focus. Missing progress indicators, weak content clarity and a promo field that drew too much attention added cognitive load.`],['Design and validation',`Paper concepts became detailed flows for login, guest checkout, contact details, delivery and payment. Six customers tested the prototype remotely. Their feedback led to stronger guest checkout visibility, social sign in, separated contact and shipping steps, and clearer security cues.`],['Delivery and impact',`Engineering received complete journey states, interactive prototypes and a design specification. Grooming sessions and design QA protected the intent through implementation. Three months after launch, both retention and support signals had moved materially.`]],metrics:[['36%','reduction in user churn'],['62%','fewer checkout complaints']]},system:{accent:'#77e89c',tag:'B2B · Design systems',title:'Making consistency the default, not the debate.',summary:'Harmony brought CreditBook’s designers, developers and global teams onto a scalable shared foundation.',task:'Build a design system',role:'Sole Product Designer',duration:'2021',sections:[['The challenge',`CreditBook had verbal agreement about individual colours and elements, but no formal system. The result was inconsistent fields, alignment, colours, hierarchy and flows, and a disconnected customer experience.`],['Establishing the foundation',`I reviewed the existing design process, brand guidelines and stakeholder expectations. A moodboard aligned the organisation on creative direction, while heuristic evaluation made inconsistencies tangible and prioritised.`],['System, not sticker sheet',`Harmony defined typography, colour, spacing, grids, interactive language, states and responsive component behaviour. Figma auto layout and tokens helped components cover multiple breakpoints as well as hover, focus, filled, error and disabled states.`],['What changed',`The system created a shared language without limiting exploration. Documentation and a pattern library made decisions repeatable, accelerated design work and improved consistency across the application.`]],metrics:[['54%','customer productivity lift'],['40%','fewer design inconsistencies'],['6 mo.','to build and scale']]},talon:{accent:'#d9ff57',tag:'B2B SaaS · Promotion engine',title:'Making campaign creation explain itself.',summary:'A focused five day sprint to understand and simplify Talon.One’s Campaign Manager.',task:'Improve Campaign Manager UX',role:'Sole Product Designer',duration:'5 day sprint',sections:[['The challenge',`Talon.One is powerful, but the Campaign Manager asked users to learn its internal logic. Every participant found campaign creation difficult without documentation or video guidance.`],['A compressed discovery',`I studied product and developer documentation, watched training material, researched customer contexts and interviewed potential users when existing customers were unavailable. Interviews, user flows, heuristic review and heatmaps converged on campaign creation as the priority.`],['Simplifying the journey',`Updated flows clarified application selection, campaign setup, templates, filters, activation and success states. Wireframes introduced stronger CTA hierarchy, contextual education, clear active states and input patterns with less unnecessary mouse movement.`],['Validation and reflection',`A/B testing showed the proposed direction was considerably easier to use. The sprint also surfaced a broader principle: every screen should communicate its purpose, available options and next action without requiring an external guide.`]],metrics:[['100%','needed help creating campaigns'],['80%','wanted a dashboard overview'],['5 days','research to validated direction']]}};
const bullet=x=>`<ul>${x.map(v=>`<li>${v}</li>`).join('')}</ul>`;
const kfhMedia={hero:['788e6239-69e2-4597-afbe-92217d1429f7','9a218c6b-1a9a-430d-9d07-7c8f5a2249b1'],brief:['c834e16f-a72d-4c6b-94ce-e8fcafd26d82','b531681b-7bdd-4145-a59f-18f34e81f4da','0c03d3f0-8f16-451b-900f-f39b59624cd9','dd2e6e56-af9e-43b9-b72f-50b9457e5e9e'],requirements:['500e3214-5965-4ae2-b586-32d56a9ce68c','abb403b7-0300-4d60-8a65-cc841aa0bba3'],product:['f678c239-1903-458f-a895-9ed211b0f805','3b7c8075-0083-4fe2-8ec0-383d16876d37'],process:['f4a85fcc-e76f-46f8-99af-bf9e5dca2080','f8e9c15d-63e5-45ca-bf7e-2e84fadb0495','c2fa0246-e9be-4490-98c3-79b770d75b1d','c8400f48-2648-4739-94f9-0efd862e8d1e'],workflow:['d8983e2b-b82c-40f9-98ae-cecf87a33c5c','3746c2f0-2ae2-40ce-a098-778cd81bb639'],interviews:['bdffae61-dfa8-488a-a426-4eb02831cb03','c6937bcb-3677-453d-9a71-ac4681fdfeea'],heuristic:['8c6243df-8676-4b65-8415-5594107e5cf0','3624fa4b-b609-4c69-a1b8-94a07a3d784b'],traditional:['e757f660-6f3d-4966-96ee-d6f11977d0ae','f4aad7cc-253b-4ce6-a642-7cbc9fcf6f01','95375f65-00b1-402a-af60-5f3e896f0637','17e706ca-e91c-4b53-b331-a9a90ddc486e'],traditionalReviews:['cffcfb57-1999-411b-b20a-b2a851b0d14f','febac2a4-f2f5-4f0a-bf38-99598ff6c4ff','0b3ec80f-d029-4deb-b1a3-aed54b43f8f8','98936542-ec20-4c2b-855b-1145be5332af'],neo:['4de93b14-56b3-4793-832b-962fe0bbe29b','131db331-ad4d-4cc8-802b-28fad6fc37f2','8ee39cc0-18e3-4238-94a0-0407e1a3027a','6782165b-86b7-446c-9174-1f1b4bdcc4db'],neoReviews:['840550af-08fc-4875-89b8-6e6738353581','c27d8725-a9a2-4885-b616-d667cf48335e','cd71c62d-9de9-4a21-a29e-0991b1a6d187','3e386bab-7c74-4f9c-9f10-6ffbb9a9924f'],neoFlows:['5c4ba3e3-e96c-4adf-a3f3-96d02694a747','97b31519-1007-4234-819c-8844edb29dcd','eccb4781-fbc4-4e66-bb2c-b10cb1c5bcd4','0eb17fa6-6f64-428c-b3cd-28064c682e10'],traditionalFlows:['6e595cce-e8bf-4ee5-9ffa-4566b9c73f1b','a131853e-56ed-473a-b8f0-93adb0304fc7','bef08b89-66d3-4158-bfff-99dd1bbde965','9d277f32-5e96-4a52-849c-001de156274e'],comparison:['e91550f3-5388-4bf0-8553-0ece969e9384','3973d372-cfd4-47a8-b60e-3a048cd40185'],overview:['635f1785-c9da-4d20-874a-1560f05440b7','1f01b8b1-2d93-41f1-8c27-c645da430236','932f818e-6591-4142-9758-f0c48cc46488'],wireframes:['2584ada9-106b-40b4-b55c-1a605e26efa8','c2ebf65a-c5cb-4d46-8c9d-07eacd465d86','6a6fddde-7cbf-4257-a73e-90b326fd8937','2732a6a0-d91f-4846-b2e2-a8022054d21c'],hifi:['4172ef1f-64af-43ec-a598-eafd5a4f4691','26f16fc0-f385-45b1-bbc9-9727963eb2a4','95148e4c-412e-4303-a3fb-c50a489b5264','64bd3c64-a13d-4495-8d33-be942e89b15a'],version:['2ce443b5-1349-45a6-a908-dd0b3331f8d1','eb92cfca-27bc-46bb-9732-f5bf91c163f3'],system:['7ef8e6c9-03f1-4ee7-ba2d-7b3305c6ff56','51a77035-7103-439d-8b47-88b81f53b87f'],before:['ca24d5c4-4961-487c-ae45-89fc32c3d70b','ee71e32a-deef-4f45-b941-5b40a8f37245','eb9d64f4-3241-4f46-9a9b-a79e867ddcb1','f3481b17-0fd8-4ae8-9def-e7f7c4793773'],improvements:['4525e758-a432-4634-b168-990a12fcc44e','09ff798e-88ec-4d1f-baca-463f3ea40d7e','94e3f8d5-a604-4427-a618-3986528f6e43','17345604-cdd4-4b10-b119-f36ed3c78f37'],ui:['45bdc59c-4d39-40c8-89c8-063edf879325','0286bf58-ac72-4658-90eb-27c663b1dbf5','1cbd0983-1ea9-4dab-ba55-52e8bde0dfe7','4de72ca8-d5b9-4778-a690-8f1075cdf5cd'],heatmaps:['1e56ba89-2f1f-4530-9366-91552651db61','5d380d60-3bb1-4763-866c-f7bdc4ffb7b7','cbff0a7d-34c7-4344-9516-20184a7a9154','1edc7397-265d-4069-b71c-dc347b734731','90fea2a8-f304-49c0-b2e7-0a4ca8a75287','e7ffff21-5040-4899-98e5-4bf14a67f4fa'],prototype:['6f72d32b-8feb-467b-8b9e-093e13ea568d','f234abf8-ab94-4392-b5c0-4e074acb4e47'],iteration:['ac5ff918-d2e8-4cb2-a77b-2b85f6d9d4a5','07e1d39c-9b45-41e9-89e9-fbfa0df3fe74'],mobile:['5039957b-8856-463f-93c1-cd3af0bf0393','2aa1b841-4b01-400b-87c1-7367949d3553','105cf911-949f-4191-ab43-ff0e8b4cdadf','52583c38-a54c-4fc7-8abe-53aa043e66dc'],thanks:['1783f85a-f660-4db7-85a9-433f68e32f82','9107072a-331e-4f3b-bab5-c184fc45a6fc']};
const media=(key,caption)=>`<figure class="media-block"><figcaption>${caption}</figcaption><div class="media-grid">${(kfhMedia[key]||[]).map((id,i)=>`<img loading="lazy" ${i===0&&kfhMedia[key].length%2?'class="wide"':''} src="${A}${id}" alt="${caption}, visual ${i+1}">`).join('')}</div></figure>`;
function kfhPage(){const toc=['Brief and context','Process and team','User interviews','Market research','Prioritisation','Design and systems','Validation','Post launch impact'];return `<div class="case reveal" style="--accent:#56e0bd"><section class="case-hero"><nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>KFH Jazeel</b></nav><span class="eyebrow">Fintech · Digital banking</span><h1>Transforming KFH Jazeel Bank into a scalable fintech platform.</h1><p>KFH Jazeel was the bank’s first digital personal finance product. I helped turn it into a clearer, more useful service that customers could understand and trust.</p></section><div class="case-facts"><div class="fact"><span class="eyebrow">Task</span><b>Redesign the web application</b></div><div class="fact"><span class="eyebrow">Role</span><b>Lead Product Designer</b></div><div class="fact"><span class="eyebrow">Time</span><b>6 months</b></div></div><div class="long-study"><aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#kfh-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside><article>
<section class="chapter" id="kfh-1"><span class="chapter-num">01 / Brief and context</span><h2>Brief</h2><p>KFH Bank introduced Jazeel as its first digital personal finance product in Kuwait and Bahrain. My team and I redesigned the web app, expanded its features, and built a design system that helped us deliver roughly 900 screens in six months. We moved quickly because we kept improving the way we worked and had the trust of the bank’s leadership.</p><h3>Gathering requirements</h3><p>I began by speaking with stakeholders about what the bank needed, how the service should work, and what success would look like.</p><h3>The problem</h3><p>The bank had invested heavily in marketing, but many people signed in once, left, and did not return. Stakeholders suspected that the experience itself was pushing customers away. We needed to understand why and give people a reason to keep using the service.</p><div class="content-columns"><div class="content-card"><h3>Goal</h3><p>Improve the experience, help more customers stay active, and make the bank’s investment work harder.</p></div><div class="content-card"><h3>What we needed to do</h3><p>Fix the design problems and create a clearer, more welcoming product that made everyday banking easier.</p></div></div><h3>Product analysis</h3><p>I worked with the data team to understand how people moved through the product. We looked at which features they used, which ones they missed, and the exact points where they gave up.</p></section>
<section class="chapter" id="kfh-2"><span class="chapter-num">02 / Process and team</span><h2>Design process</h2>${bullet(['Understand the project requirements','Review the existing app journeys','Study the KFH brand guidelines','Plan the design work','Set up JIRA','Train the design team','Improve the design workflow','Assign clear ownership','Work closely with engineering','Build the KFH design system','Review and improve the work','Create the final interface','Gather feedback','Check the quality of the build'])}<p>Before we designed anything, we walked the client through our approach. Together, we agreed on why the product needed to change and what the project would cover.</p><h3>Design workflow</h3>${bullet(['The bank team reviewed designs in InVision and left comments in one place.','The design team shared updates directly from Sketch through the Craft plugin.','Abstract kept the files in sync, so nobody had to send versions around or explain every change by hand.'])}<p><strong>Lead designer:</strong> Saeed Shaffi</p><h3>Team responsibilities</h3><p>I set the design direction, led the research, and made sure the work stayed practical, consistent, and easy to use. I worked with two junior designers. One of them grew into a mid level role during the project.</p><div class="content-columns"><div class="content-card"><h3>My responsibilities</h3>${bullet(['Set the design direction and led the research.','Built and maintained the design system.','Ran usability tests to check our decisions.','Worked with executives, engineers, marketing, support, and product.','Mentored both junior designers and helped them take ownership of their work.'])}</div><div class="content-card"><h3>Junior designers</h3>${bullet(['Created interface components using the design system.','Helped gather and make sense of customer feedback.','Improved the visual design across the product.'])}<h3>Mid level designer</h3>${bullet(['Owned specific features after the promotion.','Improved designs in response to usability feedback.','Helped expand the design system as the product grew.'])}</div></div><h3>Working with stakeholders</h3><p>Because this was a financial product, close collaboration mattered. I worked with the bank’s executives, business team, engineers, marketing team, customer support, and product manager.</p><h3>How we collaborated</h3>${bullet(['Held a design review every week so stakeholders could respond early.','Gave engineers clear specifications and stayed available during implementation.','Used InVision prototypes so the team could experience the flows and comment in context.'])}<h3>Working with the product manager</h3><p>The product manager helped connect customer needs with the bank’s goals. We planned the work together, worked through engineering concerns, and kept stakeholders informed.</p><h3>Our routine</h3>${bullet(['Plan and prioritise the work','Turn research into practical decisions','Solve issues with engineering','Keep stakeholders informed','Measure what changed after launch'])}<p>We stayed close through daily check ins, weekly planning, and regular reviews. That partnership helped us make decisions that worked for customers and for the business.</p></section>
<section class="chapter dark" id="kfh-3"><span class="chapter-num">03 / User interviews</span><h2>User interviews</h2><p>At the start of the project, I ran moderated remote interviews to understand how customers felt about the product, what they were trying to do, and where they became stuck. The conversation guide focused on real behaviour, pain points, and the changes customers wanted most.</p><h3>First impressions</h3>${bullet(['How does this make you feel at first?','What comes to mind when you look at this?','How is it different from what you expected?','What do you think you could do here?','What do you think this is for?','What questions do you have right now?','Why might someone use this?','How could this help you?','What would you do first?'])}<h3>Questions about the task</h3>${bullet(['If you wanted to send money through KFH Jazeel, what would you do?','Which parts felt most useful and least useful?','What would you change, add, or remove?','What was the hardest part?','Did anything surprise you?'])}<h3>Closing questions</h3>${bullet(['Would you use this today?','What might stop someone from using it?','What would you be willing to pay for it?','What did you like or dislike?','If you could change one thing, what would it be?','Does this feel as though it was designed for you?','Is anything missing?'])}<h3>Research analysis</h3><p>I grouped the interview findings and looked for the strongest patterns. The largest percentages helped us see which problems affected the core experience.</p><div class="finding-grid"><div class="finding"><strong>80%</strong>Found onboarding challenging</div><div class="finding"><strong>57%</strong>Did not know about the language options</div><div class="finding"><strong>30%</strong>Did not know how to use the core features</div><div class="finding"><strong>86%</strong>Experienced crashes during basic tasks</div></div><h3>What we learned</h3>${bullet(['Onboarding felt long and complicated.','The product looked and behaved like a traditional banking form.','Customers struggled to complete simple tasks from the home screen.'])}<h3>One clear pattern</h3><p>Many customers told us that KFH Jazeel felt like a conventional bank rather than a modern digital finance product.</p><h3>Heuristic evaluation</h3><p>View the complete document</p><p>I also reviewed the product against established usability principles. This gave us a clear record of the issues before we started proposing solutions.</p></section>
<section class="chapter" id="kfh-4"><span class="chapter-num">04 / Market research</span><h2>Traditional bank research</h2><p>We wanted to understand what customers were experiencing beyond the scores shown in app stores. I collected Facebook reviews for established banks and read the comments in detail. They gave us a much more honest picture of the problems people faced.</p><h3>What did they say?</h3><p>The comments were often far more critical than the ratings suggested.</p>${bullet(['A Santander review had received 143 likes after one year.','A Bank of America review had received 302 likes after one year.'])}<h2>Neobank research</h2><p>I repeated the same exercise with well known neobanks and looked at the way customers described those products.</p><h3>What did they say?</h3><p>People liked neobanks because the experience felt quick and focused on their needs. They also valued useful features that traditional banking products often overlooked.</p>${bullet(['Some Wise reviews had received more than 20 likes.','An N26 review from Shah Bhuiyan had received 5 likes after one year.','A Monese review from Valerie Ehinlaiye had received 123 likes after one year.'])}<h3>Neobank user flows</h3><p>We could not open an account with every bank, so I studied onboarding walkthroughs, customer reviews, and product videos. I mapped each journey, the points that made it different, and the way the brand showed up along the way.</p><h3>Traditional bank user flows</h3><p>I mapped the same journeys for traditional banks, including KFH Jazeel. The comparison was not always exact because some banks still required customers to visit a branch. Even so, a pattern was clear. Many of these products followed internal system logic instead of the way customers naturally thought about the task. My background in development helped me understand why that happens, but it also made the design problem easier to spot.</p><h3>Comparing the user flows</h3><p>Bringing both sets of journeys together helped us identify a simpler flow that still met the needs of a regulated bank.</p></section>
<section class="chapter accent" id="kfh-5"><span class="chapter-num">05 / Prioritisation</span><h2>Choosing what to fix first</h2><p>The clearest warning sign was a 66% drop off during onboarding. Customers had already told us the process felt long and confusing, so this became the first problem we chose to solve.</p><h3>Research overview</h3><p>These were the main sources that shaped our decisions.</p><h3>Research findings</h3>${bullet(['Bain and Company found that 43% of customers leave traditional bank onboarding because it is too long or complex.','Upshot reported that 36% of customers are put off by unclear instructions and hidden fees.','Accenture reported that errors during document checks and online forms can lead to a 25% drop off.'])}<h3>Engineering concerns</h3><p>Changing onboarding was the right design decision, but the engineering team was worried about the effort involved.</p><h3>What made it difficult</h3>${bullet(['The old journey asked customers to complete one long form, upload several documents, and wait for approval.','Our new journey broke the work into clear steps with live checks and useful guidance.','Engineering was concerned that the live validation and interaction would add too much complexity.'])}<h3>How I approached it</h3>${bullet(['Split the redesign into smaller releases so the team could make progress without taking on everything at once.','Started with simpler changes, such as fewer form fields and clearer error messages.','Worked closely with engineers to protect the experience while keeping the build realistic.'])}<h3>What happened</h3>${bullet(['After the first release, onboarding drop off fell from 66% to 18%.','The result gave engineering more confidence in the design direction and made future collaboration easier.'])}</section>
<section class="chapter" id="kfh-6"><span class="chapter-num">06 / Design and systems</span><h2>From flows to interface</h2><h3>Turning research into wireframes</h3><p>Once the new journey was clear, I translated it into wireframes that the wider team could review and discuss.</p><h3>High fidelity wireframes</h3><h3>Visual design</h3><p>Regular reviews helped us decide what to refine next. I used that feedback to finish the visual design, define the interactions, and prepare clear notes for engineering.</p><h3>Version control</h3><p>As the project grew, several designers were working in the same files and versioning became difficult. I introduced Abstract, trained the team, and set up a shared way of working. Everyone could find the latest work, see what others were doing, and review changes without interrupting each other.<br><br>I checked the process closely at first. Once the team was comfortable, they were able to manage it with very little support.</p><h3>Design system</h3><p>I built the KFH Jazeel design system from the ground up using atomic design principles. I also taught the team how to build screens with it and how to update the system as new needs appeared. Abstract helped us keep the system and product files aligned.</p><h3>Before the redesign</h3><p>These screens show the original product before we made the changes.</p><h3>Improvements</h3>${bullet(['Track transactions','Group transactions into clear categories','Simplify the side navigation','Support multiple accounts','Make country codes easier to select','Improve the colour system','Add coupon codes','Verify identity with a driving licence','Make the menu easier to understand','Allow customers in the United States to open an account'])}<h3>Final interface</h3></section>
<section class="chapter" id="kfh-7"><span class="chapter-num">07 / Validation</span><h2>Checking the design</h2><h3>Heatmaps</h3><p>We created heatmaps for the most important screens to see where people focused their attention.</p><h3>Reading the results</h3><p>The difference between the old and new dashboards was clear. In the old version, attention stayed around the sidebars. In the redesigned version, people noticed the information and actions in the main area of the screen.</p></section>
<section class="chapter" id="kfh-8"><span class="chapter-num">08 / Post launch impact</span><h2>What changed after launch</h2><h3>Onboarding results</h3><p>Within two months, onboarding drop off fell from 66% to 18%.</p><h3>What we changed</h3>${bullet(['Focused the onboarding work on the moments where customers were most likely to leave.','Kept speaking with customers and improved the journey in response to their feedback.'])}<h3>PayBills adoption</h3><p>Use of PayBills grew from 3% to 32.5% after we improved the experience.</p><h3>What we changed</h3>${bullet(['Asked customers what stopped them from using PayBills.','Added clear tutorials and helpful tips so people could understand the feature.'])}<h2>Design iterations after launch</h2><h3>Three rounds of improvements</h3><p>We completed three major rounds of design work after launch, covering about 300 screens in six months.</p><h3>How we worked</h3>${bullet(['Reviewed feedback with stakeholders throughout each round.','Kept customer needs at the centre of every change.'])}<h3>Delivering 900 screens</h3><p>Across the project, we completed 900 screens and met or beat 99% of our deadlines.</p><h3>How we stayed on track</h3>${bullet(['Used a clear project management system to keep ownership and timing visible.','Kept communication open so comments from each delivery could be handled quickly.'])}<h2>Developer documentation and walkthroughs</h2><h3>Documentation</h3><p>I prepared detailed guidance so engineers could understand the design and build it accurately.</p><h3>What it covered</h3>${bullet(['Documented the visual rules, specifications, states, and interactions.','Stayed close to engineering to answer questions during the build.'])}<h3>Loom walkthroughs</h3><p>I recorded Loom videos to explain the flows, design decisions, and expected behaviour.</p><h3>Why they helped</h3>${bullet(['Gave engineers a resource they could return to whenever they needed it.','Made it easier to discuss questions while the work was being built.'])}<h2>Quality assurance</h2><h3>My role in QA</h3><p>I led design QA across the project to make sure the finished product matched the intended experience.</p><h3>What I checked</h3>${bullet(['Tested important journeys across different devices and browsers.','Worked directly with engineering to resolve issues as they appeared.'])}<h2>Data and experiments</h2><h3>Learning from real use</h3><p>After launch, I continued to study how customers used the product. The patterns we found guided the next design decisions.</p><h3>How we used the data</h3>${bullet(['Monitored behaviour through analytics tools.','Shared the findings with the wider team so product decisions stayed connected to customer needs.'])}<h3>Testing new ideas</h3><p>We ran A/B tests to check our assumptions and used the results to guide each round of changes.</p><h3>How we ran the tests</h3>${bullet(['Tested clear design hypotheses against real behaviour.','Worked with stakeholders to roll successful changes into the product.'])}<h2>Business impact</h2><div class="content-columns"><div class="content-card"><h3>More opportunities for revenue</h3><p>Better retention meant that more customers stayed active and used the bank’s financial products.</p></div><div class="content-card"><h3>Faster delivery</h3><p>The design system reduced inconsistency and made future updates easier to manage.</p><p>It also made handoff faster and helped the team meet 99% of its deadlines.</p></div><div class="content-card"><h3>A new international bank contract</h3><p>The success of the redesign helped the team win a new contract with an international bank.</p></div></div><h2>KFH Jazeel mobile case study</h2><p>Coming soon</p><div class="case-end"><span class="eyebrow">End of case study</span><h2>Thank you</h2></div></section></article></div></div>`}
function kfhRedesignPage(){return kfhPage().replace('class="case reveal"','class="case reveal kfhr-case"').replaceAll('kfh-','kfhr-')}
function casePage(id){if(id==='kfh')return kfhPage();if(id==='uta'&&window.utaPage)return window.utaPage();if(id==='talon'&&window.talonPage)return window.talonPage();if(id==='system'&&window.harmonyPage)return window.harmonyPage();if(id==='kfh-editorial')return kfhRedesignPage();if(id==='eyewa'&&window.eyewaPage)return window.eyewaPage();const c=caseData[id]||caseData.eyewa;return `<div class="case reveal" style="--accent:${c.accent}"><section class="case-hero"><span class="eyebrow">${c.tag}</span><h1>${c.title}</h1><p>${c.summary}</p></section><div class="case-facts"><div class="fact"><span class="eyebrow">Task</span><b>${c.task}</b></div><div class="fact"><span class="eyebrow">Role</span><b>${c.role}</b></div><div class="fact"><span class="eyebrow">Duration</span><b>${c.duration}</b></div></div><div class="story"><aside><span class="eyebrow">Process</span><div class="pills"><span class="pill">Understand</span><span class="pill">Define</span><span class="pill">Explore</span><span class="pill">Prototype</span><span class="pill">Validate</span></div></aside><article>${c.sections.map(([h,p],i)=>`<section><span class="eyebrow">0${i+1}</span><h2>${h}</h2><p>${p}</p>${i===1?`<blockquote>“The strongest design decision was deciding what deserved attention first.”</blockquote>`:''}</section>`).join('')}<section><span class="eyebrow">Impact</span><h2>What moved</h2><div class="metrics">${c.metrics.map(([n,l])=>`<div class="metric"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div></section><a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a></article></div></div>`}
const main=document.querySelector('main');
let pendingScrollTarget='';
let kfhThumbnailObservers=[];
let homeHeroMotionCleanup=null;
let draggableContactCleanup=null;

function scrollToSelectedWork(){
  const target=document.getElementById('selected-work');
  if(!target)return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
  target.focus({preventScroll:true});
}

function initShotLightbox(){
  document.querySelectorAll('.shot-lightbox').forEach(element=>element.remove());
  const triggers=[...document.querySelectorAll('.shot[data-shot-src]')];
  if(!triggers.length)return;

  const dialog=document.createElement('dialog');
  dialog.className='shot-lightbox';
  dialog.setAttribute('aria-label','Expanded selected work image');
  dialog.tabIndex=-1;
  dialog.innerHTML=`<figure class="shot-lightbox-panel"><button type="button" class="shot-lightbox-close" aria-label="Close image preview"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><img alt=""><figcaption></figcaption></figure>`;
  document.body.appendChild(dialog);

  const image=dialog.querySelector('img');
  const caption=dialog.querySelector('figcaption');
  let opener=null;

  const close=()=>{
    if(dialog.open)dialog.close();
  };

  const fitToNatural=()=>{
    const w=image.naturalWidth;
    if(w)image.style.setProperty('--shot-natural',`${w}px`);
  };
  image.addEventListener('load',fitToNatural);

  triggers.forEach(trigger=>trigger.addEventListener('click',()=>{
    opener=trigger;
    image.style.removeProperty('--shot-natural');
    image.src=trigger.dataset.shotSrc;
    image.alt=`${trigger.dataset.shotTitle} interface preview`;
    caption.textContent=trigger.dataset.shotTitle;
    dialog.showModal();
    dialog.focus();
  }));

  dialog.addEventListener('click',event=>{
    /* Anywhere on the overlay closes; only the image itself keeps it open
       (the close button has its own handler). */
    if(!event.target.closest('img,.shot-lightbox-close'))close();
  });
  dialog.querySelector('.shot-lightbox-close').addEventListener('click',close);
  dialog.addEventListener('close',()=>{
    image.removeAttribute('src');
    image.style.removeProperty('--shot-natural');
    if(opener?.isConnected)opener.focus({preventScroll:true});
    opener=null;
  });
}

function initEyewaThumbnailMotion(){
  const visual=document.querySelector('.eyewa-project-visual');
  if(!visual)return;
  const card=visual.closest('.eyewa-project-card');
  const counters=[...visual.querySelectorAll('.eyewa-thumb-counter')];
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showFinal=()=>counters.forEach(el=>{el.textContent=el.dataset.thumbCount});
  let animationFrame=0;
  showFinal();
  if(reduceMotion){visual.classList.add('is-visible');return}
  const play=()=>{
    cancelAnimationFrame(animationFrame);
    visual.classList.remove('is-visible');
    counters.forEach(el=>{el.textContent='0'});
    void visual.offsetWidth;
    visual.classList.add('is-visible');
    const duration=900,startedAt=performance.now();
    const step=now=>{
      const t=Math.min(1,(now-startedAt)/duration);
      const eased=1-Math.pow(1-t,3);
      counters.forEach(el=>{el.textContent=Math.round(Number(el.dataset.thumbCount)*eased)});
      if(t<1)animationFrame=requestAnimationFrame(step);else showFinal();
    };
    animationFrame=requestAnimationFrame(step);
  };
  const reset=()=>{
    cancelAnimationFrame(animationFrame);
    visual.classList.remove('is-visible');
    counters.forEach(el=>{el.textContent='0'});
  };
  if(card){
    card.addEventListener('pointerenter',play);
    card.addEventListener('focusin',play);
  }
  /* Return visit in the same session: start settled, hover still replays. */
  if(document.body.classList.contains('is-return-visit')){
    visual.classList.add('is-visible');
    showFinal();
    return;
  }
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?play():reset())},{threshold:.2});
  obs.observe(visual);
}

function initKfhThumbnailMotion(){
  kfhThumbnailObservers.forEach(observer=>observer.disconnect());
  kfhThumbnailObservers=[];
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.kfh-project-visual').forEach(visual=>{
    const card=visual.closest('.kfh-project-card');
    const counters=[...visual.querySelectorAll('.kfh-thumb-counter')];
    let animationFrame=0;

    const formatCounter=(element,value)=>{
      const decimals=Number(element.dataset.thumbDecimals||0);
      element.textContent=decimals?value.toFixed(decimals):String(Math.round(value));
    };
    const showFinalValues=()=>counters.forEach(element=>formatCounter(element,Number(element.dataset.thumbCount)));
    const reset=()=>{
      cancelAnimationFrame(animationFrame);
      visual.classList.remove('is-thumb-animated');
      counters.forEach(element=>formatCounter(element,0));
    };
    const play=()=>{
      reset();
      void visual.offsetWidth;
      visual.classList.add('is-thumb-animated');
      const startedAt=performance.now();
      const duration=900;
      const tick=now=>{
        let stillRunning=false;
        counters.forEach(element=>{
          const target=Number(element.dataset.thumbCount);
          const order=Number(element.closest('.kfh-thumb-stat')?.dataset.thumbOrder||0);
          const delay=order*120;
          const progress=Math.max(0,Math.min(1,(now-startedAt-delay)/duration));
          const eased=1-Math.pow(1-progress,3);
          formatCounter(element,target*eased);
          if(progress<1)stillRunning=true;
        });
        if(stillRunning)animationFrame=requestAnimationFrame(tick);
      };
      animationFrame=requestAnimationFrame(tick);
    };

    if(reduceMotion){
      visual.classList.add('is-thumb-animated');
      showFinalValues();
      return;
    }

    /* Returning to the home page in the same session: skip the entrance and
       render the settled state. Hover still replays the count-up. */
    if(document.body.classList.contains('is-return-visit')){
      visual.classList.add('is-thumb-animated');
      showFinalValues();
      if(card){
        card.addEventListener('pointerenter',play);
        card.addEventListener('focusin',play);
      }
      return;
    }

    visual.classList.add('is-thumb-motion-ready');
    if(card){
      card.addEventListener('pointerenter',play);
      card.addEventListener('focusin',play);
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>entry.isIntersecting?play():reset());
    },{threshold:.35});
    observer.observe(visual);
    kfhThumbnailObservers.push(observer);
  });
}

function initHomeHeroMotion(){
  if(homeHeroMotionCleanup){
    homeHeroMotionCleanup();
    homeHeroMotionCleanup=null;
  }

  const hero=document.querySelector('.home-hero');
  if(!hero)return;

  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canTrackPointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(reduceMotion||!canTrackPointer)return;

  let frameId=0;
  let targetX=.5;
  let targetY=.46;
  let currentX=targetX;
  let currentY=targetY;
  const cleanups=[];

  const renderFrame=()=>{
    currentX+=(targetX-currentX)*.16;
    currentY+=(targetY-currentY)*.16;
    hero.style.setProperty('--hero-pointer-x',`${(currentX*100).toFixed(2)}%`);
    hero.style.setProperty('--hero-pointer-y',`${(currentY*100).toFixed(2)}%`);
    hero.style.setProperty('--hero-texture-x',`${((currentX-.5)*12).toFixed(2)}px`);
    hero.style.setProperty('--hero-texture-y',`${((currentY-.5)*9).toFixed(2)}px`);

    if(Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001){
      frameId=requestAnimationFrame(renderFrame);
    }else{
      frameId=0;
    }
  };

  const requestRender=()=>{
    if(!frameId)frameId=requestAnimationFrame(renderFrame);
  };

  const updatePointer=event=>{
    const bounds=hero.getBoundingClientRect();
    targetX=Math.max(0,Math.min(1,(event.clientX-bounds.left)/bounds.width));
    targetY=Math.max(0,Math.min(1,(event.clientY-bounds.top)/bounds.height));
    hero.classList.add('is-hero-pointer-active');
    requestRender();
  };

  const resetPointer=()=>{
    targetX=.5;
    targetY=.46;
    hero.classList.remove('is-hero-pointer-active');
    requestRender();
  };

  hero.addEventListener('pointerenter',updatePointer);
  hero.addEventListener('pointermove',updatePointer);
  hero.addEventListener('pointerleave',resetPointer);
  cleanups.push(()=>hero.removeEventListener('pointerenter',updatePointer));
  cleanups.push(()=>hero.removeEventListener('pointermove',updatePointer));
  cleanups.push(()=>hero.removeEventListener('pointerleave',resetPointer));

  hero.querySelectorAll('.home-inline-cta,.home-talk-pill,.home-resume-link').forEach(control=>{
    const moveControl=event=>{
      const bounds=control.getBoundingClientRect();
      const strength=control.classList.contains('home-resume-link')?3:5;
      const x=((event.clientX-bounds.left)/bounds.width-.5)*strength*2;
      const y=((event.clientY-bounds.top)/bounds.height-.5)*strength*2;
      control.style.setProperty('--hero-magnetic-x',`${x.toFixed(2)}px`);
      control.style.setProperty('--hero-magnetic-y',`${y.toFixed(2)}px`);
    };
    const resetControl=()=>{
      control.style.setProperty('--hero-magnetic-x','0px');
      control.style.setProperty('--hero-magnetic-y','0px');
    };
    control.addEventListener('pointermove',moveControl);
    control.addEventListener('pointerleave',resetControl);
    cleanups.push(()=>control.removeEventListener('pointermove',moveControl));
    cleanups.push(()=>control.removeEventListener('pointerleave',resetControl));
  });

  homeHeroMotionCleanup=()=>{
    cancelAnimationFrame(frameId);
    cleanups.forEach(cleanup=>cleanup());
  };
}

function initHomeRotatingWords(){
  /* One persistent, self-healing cycle.
     The page re-renders `main` on route changes, so this deliberately does NOT
     tear itself down and re-arm (a teardown that lands mid-swap used to leave the
     headline with no visible word at all). Instead the tick re-resolves the track
     each time, re-seeds when the DOM has been replaced, and repairs any state
     where zero, or several, words are showing. */
  const RISE = '1.1em';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const paint = (word, state) => {
    const s = word.style;
    s.position = 'absolute';
    s.top = '0';
    s.left = '0';
    s.display = 'block';
    s.width = 'max-content';
    s.transition = reduceMotion ? 'none' : 'opacity .38s ease, filter .38s ease, transform .46s cubic-bezier(.22,1,.36,1)';
    if (state === 'in') { s.opacity = '1'; s.filter = 'blur(0px)'; s.transform = 'translateY(0)'; }
    else if (state === 'out') { s.opacity = '0'; s.filter = 'blur(6px)'; s.transform = 'translateY(-' + RISE + ')'; }
    else { s.opacity = '0'; s.filter = 'blur(6px)'; s.transform = 'translateY(' + RISE + ')'; }
  };

  const fit = (track, word) => {
    /* +4px slack for the last glyph's side bearing; cancelled by margin-right in hero.css. */
    track.style.width = Math.ceil(word.getBoundingClientRect().width) + 4 + 'px';
  };

  /* On tablet and mobile the width hugs each word (so the gap before
     "experiences." stays natural), and instead the H1 reserves the height of
     its tallest layout, so the content below never jumps as words rotate. */
  const reserveHeight = (track) => {
    const h1 = document.getElementById('home-hero-title');
    if (!h1) return;
    if (!window.matchMedia('(max-width: 999px)').matches) { h1.style.minHeight = ''; return; }
    const prevTransition = track.style.transition;
    const prevWidth = track.style.width;
    track.style.transition = 'none';
    const widest = [...track.children].reduce((max, w) => Math.max(max, w.getBoundingClientRect().width), 0);
    track.style.width = Math.ceil(widest) + 4 + 'px';
    h1.style.minHeight = '';
    void h1.offsetHeight;
    h1.style.minHeight = h1.offsetHeight + 'px';
    track.style.width = prevWidth;
    void track.offsetWidth;
    track.style.transition = prevTransition;
  };

  const seed = (track, words) => {
    words.forEach((word, index) => {
      word.classList.remove('is-active', 'is-leaving');
      paint(word, index === 0 ? 'in' : 'waiting');
    });
    track.__wordIndex = 0;
    reserveHeight(track);
    fit(track, words[0]);
  };

  const advance = (track, words) => {
    const from = track.__wordIndex || 0;
    const to = (from + 1) % words.length;
    paint(words[from], 'out');
    paint(words[to], 'waiting');
    fit(track, words[to]);
    /* Force a reflow so the pre-enter position is committed, then enter in the
       SAME task, no deferred timer that a later tick could cancel. */
    void words[to].offsetWidth;
    paint(words[to], 'in');
    track.__wordIndex = to;
  };

  if (window.__rotatorTick) return;   // already running

  window.__rotatorTick = window.setInterval(() => {
    const track = document.querySelector('.home-rotating-word');
    if (!track) return;
    const words = [...track.children];
    if (!words.length) return;

    if (track.__rotatorSeeded !== true) {
      track.__rotatorSeeded = true;
      seed(track, words);
      return;
    }

    const showing = words.filter(w => w.style.opacity === '1');
    if (showing.length !== 1) {          // repair: never leave the line empty
      const index = track.__wordIndex || 0;
      words.forEach((w, i) => paint(w, i === index ? 'in' : 'waiting'));
      fit(track, words[index]);
      return;
    }

    if (!reduceMotion) advance(track, words);
  }, 2600);

  /* Seed immediately so the first word is up before the first tick. */
  const track = document.querySelector('.home-rotating-word');
  if (track && track.__rotatorSeeded !== true) {
    const words = [...track.children];
    if (words.length) { track.__rotatorSeeded = true; seed(track, words); }
  }

  if (!window.__rotatorRefit) {
    window.__rotatorRefit = () => {
      const t = document.querySelector('.home-rotating-word');
      if (!t) return;
      const w = t.children[t.__wordIndex || 0];
      reserveHeight(t);
      if (w) fit(t, w);
    };
    window.addEventListener('resize', window.__rotatorRefit, { passive: true });
    document.fonts?.ready.then(window.__rotatorRefit);
  }
}

function initDraggableContactCard(){
  if(draggableContactCleanup){
    draggableContactCleanup();
    draggableContactCleanup=null;
  }

  if(!document.body.classList.contains('home-active'))return;

  const playground=document.getElementById('contact-card-playground');
  if(!playground)return;

  const card=document.createElement('aside');
  card.className='drag-contact-card';
  card.tabIndex=0;
  card.setAttribute('aria-label','Draggable contact card. Drag it inside this section and leave it wherever you like.');
  card.innerHTML=`<div class="drag-contact-head"><span class="drag-contact-avatar"><img src="assets/saeed-avatar.png" alt=""></span><span><b>Saeed Shaffi</b><small>Product Designer</small></span><span class="drag-contact-hint" aria-hidden="true"><i></i> Drag me</span></div><p>Have a complex product?<br><strong>Let’s make it feel simple.</strong></p><a class="drag-contact-cta" href="mailto:saeedshaffi@gmail.com"><span>Let’s talk</span><span aria-hidden="true">↗</span></a>`;
  playground.appendChild(card);

  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  let x=0;
  let y=0;
  let rotation=0;
  let pointerId=null;
  let startPointerX=0;
  let startPointerY=0;
  let startX=0;
  let startY=0;
  let lastPointerX=0;
  let lastPointerY=0;
  let lastPointerTime=0;
  let velocityX=0;
  let velocityY=0;
  let glideFrame=0;
  let glideTime=0;
  let resizeFrame=0;

  const paint=()=>{
    card.style.setProperty('--drag-card-x',`${x.toFixed(2)}px`);
    card.style.setProperty('--drag-card-y',`${y.toFixed(2)}px`);
    card.style.setProperty('--drag-card-rotate',`${rotation.toFixed(2)}deg`);
  };

  const limits=()=>{
    const inset=playground.clientWidth<520?12:22;
    return {
      minX:inset,
      minY:inset,
      maxX:Math.max(inset,playground.clientWidth-card.offsetWidth-inset),
      maxY:Math.max(inset,playground.clientHeight-card.offsetHeight-inset)
    };
  };

  const contain=(nextX,nextY)=>{
    const area=limits();
    return {
      x:clamp(nextX,area.minX,area.maxX),
      y:clamp(nextY,area.minY,area.maxY)
    };
  };

  const resetPosition=(animate=true)=>{
    const area=limits();
    card.classList.toggle('is-resetting',animate&&!reduceMotion);
    x=area.maxX;
    y=area.maxY;
    rotation=0;
    paint();
    if(animate&&!reduceMotion){
      window.setTimeout(()=>card.classList.remove('is-resetting'),560);
    }
  };

  const stopGlide=()=>{
    window.cancelAnimationFrame(glideFrame);
    glideFrame=0;
    glideTime=0;
    velocityX=0;
    velocityY=0;
    card.classList.remove('is-gliding');
  };

  const finishAtRest=()=>{
    stopGlide();
    const area=limits();
    rotation=reduceMotion?0:clamp((x-(area.minX+area.maxX)/2)*.016,-8,8);
    paint();
  };

  const glide=timestamp=>{
    if(!glideFrame)return;
    if(!glideTime)glideTime=timestamp;
    const elapsed=Math.min(34,Math.max(8,timestamp-glideTime))/1000;
    glideTime=timestamp;

    const area=limits();
    x+=velocityX*elapsed;
    y+=velocityY*elapsed;

    if(x<=area.minX||x>=area.maxX){
      x=clamp(x,area.minX,area.maxX);
      velocityX*=-.3;
    }
    if(y<=area.minY||y>=area.maxY){
      y=clamp(y,area.minY,area.maxY);
      velocityY*=-.3;
    }

    const damping=Math.pow(.9,elapsed*60);
    velocityX*=damping;
    velocityY*=damping;
    rotation=clamp(rotation*.82+velocityX*.013,-25,25);
    paint();

    if(Math.hypot(velocityX,velocityY)<22){
      finishAtRest();
      return;
    }
    glideFrame=window.requestAnimationFrame(glide);
  };

  const startGlide=()=>{
    if(reduceMotion||Math.hypot(velocityX,velocityY)<110){
      finishAtRest();
      return;
    }
    velocityX=clamp(velocityX,-1800,1800);
    velocityY=clamp(velocityY,-1800,1800);
    card.classList.add('is-gliding');
    glideTime=0;
    glideFrame=window.requestAnimationFrame(glide);
  };

  const beginDrag=event=>{
    if(event.button!==undefined&&event.button!==0)return;
    if(event.target instanceof Element&&event.target.closest('a,button'))return;
    stopGlide();
    pointerId=event.pointerId;
    startPointerX=event.clientX;
    startPointerY=event.clientY;
    startX=x;
    startY=y;
    lastPointerX=event.clientX;
    lastPointerY=event.clientY;
    lastPointerTime=event.timeStamp||performance.now();
    velocityX=0;
    velocityY=0;
    card.classList.remove('is-resetting');
    card.classList.add('is-dragging');
    document.body.classList.add('is-dragging-contact-card');
    card.setPointerCapture?.(pointerId);
    event.preventDefault();
  };

  const drag=event=>{
    if(pointerId===null||event.pointerId!==pointerId)return;
    const now=event.timeStamp||performance.now();
    const elapsed=Math.max(8,now-lastPointerTime);
    const instantX=(event.clientX-lastPointerX)/elapsed*1000;
    const instantY=(event.clientY-lastPointerY)/elapsed*1000;
    velocityX=velocityX*.55+instantX*.45;
    velocityY=velocityY*.55+instantY*.45;
    lastPointerX=event.clientX;
    lastPointerY=event.clientY;
    lastPointerTime=now;
    const next=contain(
      startX+(event.clientX-startPointerX),
      startY+(event.clientY-startPointerY)
    );
    x=next.x;
    y=next.y;
    rotation=reduceMotion?0:clamp((event.clientX-startPointerX)*.055,-25,25);
    paint();
    event.preventDefault();
  };

  const finishDrag=event=>{
    if(pointerId===null||(event.pointerId!==undefined&&event.pointerId!==pointerId))return;
    try{card.releasePointerCapture?.(pointerId)}catch(error){}
    pointerId=null;
    card.classList.remove('is-dragging');
    document.body.classList.remove('is-dragging-contact-card');
    const inside=contain(x,y);
    x=inside.x;
    y=inside.y;
    paint();
    startGlide();
  };

  const handleKey=event=>{
    const distance=event.shiftKey?64:24;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();
    stopGlide();
    let nextX=x;
    let nextY=y;
    if(event.key==='ArrowLeft')nextX-=distance;
    if(event.key==='ArrowRight')nextX+=distance;
    if(event.key==='ArrowUp')nextY-=distance;
    if(event.key==='ArrowDown')nextY+=distance;
    const inside=contain(nextX,nextY);
    x=inside.x;
    y=inside.y;
    rotation=reduceMotion?0:clamp((x-limits().maxX/2)*.025,-14,14);
    paint();
  };

  card.addEventListener('pointerdown',beginDrag);
  card.addEventListener('pointermove',drag,{passive:false});
  card.addEventListener('pointerup',finishDrag);
  card.addEventListener('pointercancel',finishDrag);
  card.addEventListener('keydown',handleKey);

  const handleResize=()=>{
    stopGlide();
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame=window.requestAnimationFrame(()=>{
      const inside=contain(x,y);
      x=inside.x;
      y=inside.y;
      paint();
    });
  };
  window.addEventListener('resize',handleResize,{passive:true});

  requestAnimationFrame(()=>{
    resetPosition(false);
    card.classList.add('is-visible');
  });

  draggableContactCleanup=()=>{
    stopGlide();
    window.cancelAnimationFrame(resizeFrame);
    window.removeEventListener('resize',handleResize);
    document.body.classList.remove('is-dragging-contact-card');
    card.remove();
  };
}

function initFooterContact(){
  const button=document.querySelector('.footer-copy-email');
  const toast=document.querySelector('.footer-copy-toast');
  if(!button||!toast||button.dataset.copyReady==='true')return;
  button.dataset.copyReady='true';
  let toastTimer=0;

  const fallbackCopy=value=>{
    const input=document.createElement('textarea');
    input.value=value;
    input.setAttribute('readonly','');
    input.style.position='fixed';
    input.style.opacity='0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  };

  button.addEventListener('click',async()=>{
    const email=button.dataset.copyEmail||'';
    try{
      if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(email);
      else fallbackCopy(email);
    }catch(error){
      fallbackCopy(email);
    }
    button.classList.add('is-copied');
    toast.classList.add('is-visible');
    button.setAttribute('aria-label','Email copied');
    window.clearTimeout(toastTimer);
    toastTimer=window.setTimeout(()=>{
      button.classList.remove('is-copied');
      toast.classList.remove('is-visible');
      button.setAttribute('aria-label','Copy email address');
    },1800);
  });
}

function render(){
  const path=location.hash.slice(1)||'/';
  if(path==='/work'){
    pendingScrollTarget='selected-work';
    location.replace('#/');
    return;
  }
  if(path==='/about'||path==='/resume-old'||path==='/resume'){
    (function(){const a=document.createElement('a');a.href='assets/SaeedShaffi_Resume.pdf';a.download='SaeedShaffi_Resume.pdf';document.body.appendChild(a);a.click();a.remove();})();
    location.replace('#/');
    return;
  }
  document.body.classList.toggle('home-active',path==='/');
  document.body.classList.toggle('resume-active',path==='/resume');
  document.body.classList.toggle('eyewa-case-active',path==='/case/eyewa');
  document.body.classList.toggle('harmony-case-active',path==='/case/system');
  document.body.classList.toggle('talon-case-active',path==='/case/talon');
  document.body.classList.toggle('uta-case-active',path==='/case/uta');
  let introPlayed=false;
  try{introPlayed=sessionStorage.getItem('homeIntroPlayed')==='1';}catch(e){}
  document.body.classList.toggle('is-return-visit',path==='/'&&introPlayed);
  if(path==='/'&&!introPlayed){try{sessionStorage.setItem('homeIntroPlayed','1');}catch(e){}}
  const routeTitles={'/case/kfh':'KFH Jazeel — Saeed Shaffi','/case/eyewa':'Eyewa Checkout — Saeed Shaffi','/case/system':'Harmony Design System — Saeed Shaffi','/case/talon':'Talon.One — Saeed Shaffi','/case/uta':'Designing Beyond Figma — Saeed Shaffi'};
  document.title=routeTitles[path]||'Saeed Shaffi, Product Designer';
  main.innerHTML=path.startsWith('/case/')?casePage(path.split('/')[2]):home();
  if(path==='/')separateHomeArchive();
  initKfhThumbnailMotion();
  initEyewaThumbnailMotion();
  initHomeRotatingWords();
  initHomeHeroMotion();
  initFooterContact();
  initDraggableContactCard();
  initShotLightbox();
  if(window.initEyewaCase)window.initEyewaCase();
  if(window.initHarmonyCase)window.initHarmonyCase();
  if(window.initTalonCase)window.initTalonCase();
  if(window.initUtaCase)window.initUtaCase();
  document.querySelectorAll('#site-nav a').forEach(a=>a.removeAttribute('aria-current'));
  const active=document.querySelector(`#site-nav a[href="#${path}"]`);
  if(active)active.setAttribute('aria-current','page');
  window.scrollTo(0,0);
  main.focus({preventScroll:true});
  if(pendingScrollTarget==='selected-work'){
    pendingScrollTarget='';
    requestAnimationFrame(scrollToSelectedWork);
  }
}

if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('hashchange',render);
render();
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('site-nav');
toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
nav.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
});
document.addEventListener('click',event=>{
  const origin=event.target instanceof Element?event.target:null;
  const trigger=origin?.closest('[data-scroll-target="selected-work"]');
  if(!trigger)return;
  event.preventDefault();
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  const path=location.hash.slice(1)||'/';
  if(path==='/'){
    scrollToSelectedWork();
    return;
  }
  pendingScrollTarget='selected-work';
  location.hash='#/';
});
