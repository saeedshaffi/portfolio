(function () {
  const base = 'assets/kfh/hr/';

  const localAssets = {
    hero: ['Device - Macbook Pro 3D.png'],
    requirements: ['optimized/requirement-gathering-v2.svg'],
    product: ['optimized/product-analysis.jpg'],
    process: ['Design Process.png'],
    workflow: ['Design Workflow.png'],
    heuristic: ['optimized/heuristic-evaluation.jpg'],
    traditional: [
      'Traditional banks logos/Rectangle 3.png',
      'Traditional banks logos/Rectangle 3-1.png',
      'Traditional banks logos/Rectangle 3-2.png',
      'Traditional banks logos/Rectangle 3-3.png',
      'Traditional banks logos/Rectangle 3-4.png',
      'Traditional banks logos/Rectangle 3-5.png',
      'Traditional banks logos/Rectangle 3-6.png',
      'Traditional banks logos/Rectangle 3-7.png'
    ],
    neo: [
      'Neo Banks/Wise.png',
      'Neo Banks/N26.png',
      'Neo Banks/Monese.png',
      'Neo Banks/Rectangle 3.png',
      'Neo Banks/Rectangle 3-1.png',
      'Neo Banks/Rectangle 3-3.png',
      'Neo Banks/Rectangle 3-4.png',
      'Neo Banks/Rectangle 3-5.png'
    ],
    neoFlows: ['optimized/neobank-userflows.jpg'],
    comparison: ['optimized/flow-comparison.jpg'],
    hifi: ['HiFi wireframes/Component 7.png'],
    version: ['optimized/version-control.jpg'],
    system: ['ds.png', 'DS Kapple.png'],
    before: [
      'Before/image 90.png',
      'Before/image 91.png'
    ],
    improvements: ['optimized/interface-improvements.jpg'],
    ui: ['optimized/final-ui.jpg'],
    heatmaps: ['optimized/heatmap-validation.jpg'],
    mobile: ['optimized/mobile-preview.jpg']
  };

  const mediaDimensions = {
    hero: [[1536, 1024]],
    requirements: [[1756, 1772]],
    product: [[1720, 1736]],
    process: [[3520, 2418]],
    workflow: [[3840, 1640]],
    heuristic: [[3516, 1192]],
    traditional: Array.from({ length: 8 }, () => [660, 300]),
    neo: [[300, 300], [300, 300], [300, 300], ...Array.from({ length: 5 }, () => [660, 300])],
    neoFlows: [[3690, 2070]],
    comparison: [[3520, 1704]],
    hifi: [[1760, 878]],
    version: [[2380, 2160]],
    improvements: [[3520, 1756]],
    ui: [[3520, 1756]],
    heatmaps: [[3116, 2318]],
    mobile: [[1756, 588]]
  };

  const gifDimensions = {
    interviews: [900, 449],
    priority: [1000, 1009],
    findings: [1000, 740],
    system: [1200, 720],
    before: [900, 514],
    adoption: [900, 980],
    iteration: [1200, 599]
  };

  const intrinsicAttributes = (dimensions) => dimensions ? ` width="${dimensions[0]}" height="${dimensions[1]}"` : '';

  const altText = {
    hero: ['KFH Jazeel sign up experience presented on a 3D MacBook Pro'],
    requirements: ['Stakeholder questionnaire used for the KFH Jazeel redesign'],
    product: ['Product analysis board mapping KFH Jazeel features and user behaviour'],
    process: ['The KFH Jazeel design process and planning workflow'],
    workflow: ['Collaboration workflow connecting the bank, design team and development team'],
    heuristic: ['Heuristic evaluation of the original KFH Jazeel experience'],
    traditional: ['Chase logo', 'Morgan Stanley logo', 'State Street logo', 'Santander logo', 'Bank of America logo', 'Standard Chartered logo', 'Wells Fargo logo', 'Barclays logo'],
    neo: ['Wise logo', 'N26 logo', 'Monese logo', 'Neobank considered in the competitive review', 'Neobank considered in the competitive review', 'Neobank considered in the competitive review', 'Neobank considered in the competitive review', 'Neobank considered in the competitive review'],
    neoFlows: ['Mapped onboarding and product flows across the neobanks in the research sample'],
    comparison: ['Comparison of traditional bank and neobank user flows'],
    hifi: ['High fidelity wireframes for the redesigned KFH Jazeel journey'],
    version: ['Version control workflow introduced for the KFH Jazeel design team'],
    system: ['KFH Jazeel design system structure', 'Kapple design system foundations and component architecture'],
    before: Array.from({ length: 2 }, (_, index) => `Original KFH Jazeel interface, screen ${index + 1} of 2`),
    improvements: ['Annotated KFH Jazeel interface improvements'],
    ui: ['Final KFH Jazeel interface across key journeys'],
    heatmaps: ['Attention heatmap for the redesigned KFH Jazeel sign in experience'],
    mobile: ['Preview of the forthcoming KFH Jazeel mobile case study']
  };

  const notes = {
    hero: 'The redesigned experience in use.',
    requirements: 'The questions I used to understand what stakeholders and customers needed.',
    product: 'A closer look at feature use, missed actions, and the points where people left.',
    process: 'The plan we used from early research through design QA.',
    workflow: '',
    heuristic: 'A record of the usability issues we found before designing solutions.',
    traditional: 'Eight established banks were included in the review.',
    neo: 'We also reviewed digital banking products built around self service.',
    neoFlows: 'Open the image to follow the full journey.',
    comparison: 'Both sets of journeys shown at the same scale.',
    hifi: 'Use the arrows, trackpad, or swipe to follow the journey.',
    version: 'One shared source for the latest design work.',
    system: 'The foundations and components that helped the team work at scale.',
    before: 'The original interface before we redesigned it.',
    improvements: 'The changes we made and the problems they addressed.',
    ui: 'The finished product across its main journeys.',
    heatmaps: 'Attention moved towards the main task and action.',
    mobile: 'A separate mobile case study is in progress.'
  };

  const railKeys = new Set(['hifi', 'system', 'before', 'improvements', 'ui']);
  const logoKeys = new Set(['traditional', 'neo']);

  const imageItem = (key, path, index) => {
    const src = `${base}${encodeURI(path)}`;
    const alt = altText[key]?.[index] || `${key} case study evidence`;
    const size = intrinsicAttributes(mediaDimensions[key]?.[index]);
    if (logoKeys.has(key)) return `<div class="media-open media-static"><img${size} loading="lazy" decoding="async" src="${src}" alt="${alt}"></div>`;
    const overlay = key === 'mobile' ? '<span class="coming-soon-overlay">Coming soon</span>' : '';
    return `<div class="media-open media-static"><img${size} loading="lazy" decoding="async" src="${src}" alt="${alt}">${overlay}</div>`;
  };

  const gallery = (key, caption) => {
    const items = localAssets[key] || [];
    const isRail = railKeys.has(key) && items.length > 1;
    const isAnimatedDiagram = key === 'process' || key === 'workflow';
    const classes = isRail ? 'media-rail' : `media-grid${logoKeys.has(key) ? ' logo-grid' : ''}`;
    const controls = isRail && items.length > 1
      ? `<div class="rail-controls"><span class="rail-progress" aria-live="polite">1 / ${items.length}</span><div><button type="button" data-rail-dir="-1" aria-label="Previous ${caption}">←</button><button type="button" data-rail-dir="1" aria-label="Next ${caption}">→</button></div></div>`
      : '';
    const note = notes[key] ? `<p>${notes[key]}</p>` : '';
    const itemsMarkup = items.map((path, index) => imageItem(key, path, index)).join('');
    const diagramMarkup = isAnimatedDiagram
      ? `<div class="diagram-motion-stage diagram-${key}" data-diagram-motion>${itemsMarkup}<span class="diagram-pulse pulse-one" aria-hidden="true"></span><span class="diagram-pulse pulse-two" aria-hidden="true"></span><span class="diagram-pulse pulse-three" aria-hidden="true"></span><span class="diagram-pulse pulse-four" aria-hidden="true"></span><span class="diagram-pulse pulse-five" aria-hidden="true"></span><button class="diagram-replay" type="button" aria-label="Replay ${caption} animation">Replay <span aria-hidden="true">↻</span></button></div>`
      : itemsMarkup;
    return `<figure class="media-block media-${key}${isRail ? ' rail-shell' : ''}"><div class="media-heading"><figcaption>${caption}</figcaption>${note}</div>${controls}<div class="${classes}"${isRail ? ` tabindex="0" aria-label="${caption} gallery"` : ''}>${diagramMarkup}</div></figure>`;
  };

  const videoBlock = (key, caption, source, poster, description) => `<figure class="media-block video-block media-${key}"><div class="media-heading"><figcaption>${caption}</figcaption><p>${description}</p></div><video controls preload="metadata" playsinline poster="${base}${encodeURI(poster)}" aria-label="${caption}"><source src="${base}${encodeURI(source)}" type="video/mp4">Your browser does not support embedded video.</video><p class="motion-note">Pause, replay, or use the timeline whenever you need to.</p></figure>`;

  const gifBlock = (key, caption, source, poster, description, alt) => {
    const src = `${base}${encodeURI(source)}`;
    const posterSrc = `${base}${encodeURI(poster)}`;
    const size = intrinsicAttributes(gifDimensions[key]);
    return `<figure class="media-block gif-block media-${key}"><div class="media-heading"><figcaption>${caption}</figcaption><p>${description}</p></div><div class="gif-stage"><div class="media-open media-static"><img${size} class="animated-evidence" loading="lazy" decoding="async" src="${src}" data-gif-src="${src}" data-poster-src="${posterSrc}" alt="${alt}"></div><button class="gif-toggle" type="button" aria-pressed="false" aria-label="Pause ${caption}"><span>Pause animation</span></button></div><p class="motion-note">Pause or replay this sequence at any time.</p></figure>`;
  };

  const heroVisual = () => {
    const src = `${base}${encodeURI(localAssets.hero[0])}`;
    const alt = altText.hero[0];
    const size = intrinsicAttributes(mediaDimensions.hero[0]);
    return `<figure class="case-hero-visual"><figcaption class="visually-hidden">The redesigned KFH Jazeel experience</figcaption><div class="media-open media-static"><img${size} decoding="async" fetchpriority="high" src="${src}" alt="${alt}"></div></figure>`;
  };

  const questionnaireArtifact = () => {
    const questions = [
      ['01', 'What is your role on Jazeel?', 'Head of Digital Channels. I own the app roadmap and sign off on releases with Compliance.', ''],
      ['02', 'Why does the mobile app need to be redesigned?', 'Onboarding drop-off. Around 60% of sign-ups never finish and the branch teams end up doing it manually. Also the app has not changed since 2019 and it shows.', 'Asked for the funnel export, received 3 months, not 12.'],
      ['03', 'Who is the main audience?', 'Kuwaiti and expat 18 to 30, first salary account. Not the same as our KFH Online customer.', ''],
      ['04', 'Which three features should we keep as-is?', 'Card freeze, salary transfer, and the goal pots. Card freeze is the only thing people mention in reviews.', 'Only two were in the current build, pots were a Figma concept.'],
      ['05', 'Who do you compare yourselves to?', 'Weyay day to day. Boubyan for the tone. Internally people keep bringing up Revolut, though we cannot match the licence.', '']
    ];
    const fields = questions.map(([number, question, answer, note]) => `<div class="questionnaire-row"><span>${number}</span><div><strong>${question}</strong><p class="questionnaire-answer">${answer}</p>${note ? `<p class="questionnaire-note">${note}</p>` : ''}</div></div>`).join('');
    return `<figure class="media-block media-requirements questionnaire-figure"><div class="media-heading"><figcaption>Gathering requirements</figcaption><p>${notes.requirements}</p></div><div class="questionnaire-scene" role="img" aria-label="Completed stakeholder questionnaire returned during KFH Jazeel discovery"><article class="questionnaire-paper"><header><div><span>Discovery · Form 01</span><h4>Stakeholder questionnaire</h4></div><p>Sent 14 Feb<br><b>Returned 19 Feb</b></p></header><p class="questionnaire-intro">Returned by <b>N. Al-Otaibi</b>, Head of Digital Channels. Answers left verbatim; my follow-ups are in the margin.</p><div class="questionnaire-fields">${fields}</div><footer><span>5 of 5 answered</span><span>Page 1 of 2</span><i aria-hidden="true"></i></footer></article></div></figure>`;
  };

  const reviewCards = (type) => {
    const traditional = [
      ['Santander', 'Agnieszka Walczak', '“I can’t log in to the bank. It has been two days now.”'],
      ['Bank of America', 'Jacob Kellum', '“Want a bank who doesn’t refund fraud claims? Go with Bank of America.”'],
      ['Santander', 'Christine Zaher', '“I have been trying to get a response since 26 June. This is unacceptable customer service.”']
    ];
    const neo = [
      ['Wise', 'Ênel Räd', '“Thank you so much Wise for the great service. Kudos!”'],
      ['Wise', 'Sue Iruge', '“The borderless account is amazing. I don’t know what I’d do without it.”'],
      ['N26', 'Elpida Chq', '“Is there any charge per month? Is opening a new account easy?”'],
      ['Monese', 'Kudzai Kumbweya', '“I have been trying to contact the bank about issues, but I can’t speak to someone.”']
    ];
    const cards = type === 'traditional' ? traditional : neo;
    const title = type === 'traditional' ? 'Traditional bank customer reviews' : 'Neobank customer reviews';
    const cardMarkup = cards.map(([brand, author, quote]) => `<blockquote class="review-card" role="listitem"><span>${brand}</span><p>${quote}</p><cite>${author}</cite></blockquote>`).join('');
    return `<figure class="media-block quote-evidence quote-marquee-shell"><div class="media-heading"><figcaption>${title}</figcaption><p>These comments were transcribed from the Facebook reviews used in the research.</p></div><div class="quote-marquee" tabindex="0" aria-label="${title}. Reviews move automatically and pause while hovered or focused."><div class="quote-marquee-track" style="--marquee-duration:${cards.length * 9}s"><div class="quote-marquee-group" role="list">${cardMarkup}</div><div class="quote-marquee-group" aria-hidden="true">${cardMarkup}</div></div></div><p class="marquee-note">Reviews move automatically · hover or focus to pause</p></figure>`;
  };

  const impactSummary = `<section class="case-impact-summary" aria-labelledby="impact-summary-title"><div class="impact-summary-copy"><span class="eyebrow">Results</span><h2 id="impact-summary-title">The product improved, and so did the way we delivered it.</h2><p>These are the results that mattered most. The story below shows how the research and design decisions led to them.</p><a href="#kfh-1" class="case-jump">Read the case study <span aria-hidden="true">↓</span></a></div><div class="case-impact-grid"><div class="impact-card impact-onboarding" style="--impact-order:0"><span class="impact-index">01 · Retention</span><strong aria-label="Onboarding drop off reduced from 66 percent to 18 percent"><span class="counter" aria-hidden="true" data-count="18">0</span><span class="impact-unit" aria-hidden="true">%</span></strong><span class="impact-caption">onboarding drop off</span><div class="impact-track" aria-hidden="true" style="--impact-from:66%;--impact-to:18%"><i></i><b></b></div><span class="impact-foot"><span class="impact-was">was 66%</span><span class="impact-delta">−48 pts</span></span></div><div class="impact-card impact-adoption" style="--impact-order:1"><span class="impact-index">02 · Adoption</span><strong aria-label="PayBills adoption increased from 3 percent to 32.5 percent"><span class="counter" aria-hidden="true" data-count="32.5" data-decimals="1">0.0</span><span class="impact-unit" aria-hidden="true">%</span></strong><span class="impact-caption">PayBills adoption</span><div class="impact-track" aria-hidden="true" style="--impact-from:3%;--impact-to:32.5%"><i></i><b></b></div><span class="impact-foot"><span class="impact-was">was 3%</span><span class="impact-delta">+29.5 pts</span></span></div><div class="impact-card impact-delivery" style="--impact-order:2"><span class="impact-index">03 · Scale</span><strong aria-label="900 screens delivered"><span class="counter" aria-hidden="true" data-count="900">0</span><span class="impact-unit" aria-hidden="true"></span></strong><span class="impact-caption">screens delivered</span><div class="impact-track impact-track-solo" aria-hidden="true" style="--impact-to:100%"><b></b></div><span class="impact-foot"><span class="impact-was">iOS, Android and web</span></span></div><div class="impact-card impact-deadlines" style="--impact-order:3"><span class="impact-index">04 · Delivery</span><strong aria-label="99 percent of deadlines met or beaten"><span class="counter" aria-hidden="true" data-count="99">0</span><span class="impact-unit" aria-hidden="true">%</span></strong><span class="impact-caption">deadlines met or beaten</span><div class="impact-track impact-track-solo" aria-hidden="true" style="--impact-to:99%"><b></b></div><span class="impact-foot"><span class="impact-was">across six months</span></span></div></div></section>`;

  const priorityDecision = `<section class="priority-decision" aria-label="How research informed prioritisation"><span class="eyebrow">What we learned and what we changed</span><div class="decision-track"><div><b>01 · Signal</b><strong>66% drop off</strong><p>Onboarding was where we were losing the most people.</p></div><div><b>02 · Evidence</b><strong>Too long and unclear</strong><p>Customers described crashes, form fatigue, and actions they could not understand.</p></div><div><b>03 · Decision</b><strong>Start small</strong><p>We began with fewer fields and clearer error messages.</p></div><div><b>04 · Delivery</b><strong>Work in stages</strong><p>We added live guidance in steps that engineering could manage.</p></div><div><b>05 · Result</b><strong>18% drop off</strong><p>The first release showed that the approach worked.</p></div></div></section>`;

  const researchOverview = `<section class="research-overview" aria-label="Research methods at a glance"><div><span>01</span><strong>Behavioural data</strong><p>We looked at feature use, missed actions, and onboarding drop off.</p></div><div><span>02</span><strong>User interviews</strong><p>We listened to customers describe their habits, frustrations, and expectations.</p></div><div><span>03</span><strong>Market research</strong><p>We compared reviews and journeys from traditional banks and neobanks.</p></div><div><span>04</span><strong>Heuristic review</strong><p>We documented usability issues before making design decisions.</p></div></section>`;

  const onboardingResult = `<div class="result-panel result-onboarding"><div class="result-before" style="--result-value:66%"><span class="eyebrow">Before launch</span><strong aria-label="66 percent"><span class="counter" aria-hidden="true" data-count="66">66</span><span aria-hidden="true">%</span></strong><p>Customers leaving during onboarding</p><i class="result-meter" aria-hidden="true"></i></div><span class="result-arrow" aria-hidden="true">→</span><div class="result-after" style="--result-value:18%"><span class="eyebrow">Two months later</span><strong aria-label="18 percent"><span class="counter" aria-hidden="true" data-count="18">18</span><span aria-hidden="true">%</span></strong><p>Onboarding drop off</p><i class="result-meter" aria-hidden="true"></i></div></div>`;
  const adoptionResult = `<div class="result-panel result-adoption"><div class="result-before" style="--result-value:3%"><span class="eyebrow">Before improvement</span><strong aria-label="3 percent"><span class="counter" aria-hidden="true" data-count="3">3</span><span aria-hidden="true">%</span></strong><p>PayBills adoption</p><i class="result-meter" aria-hidden="true"></i></div><span class="result-arrow" aria-hidden="true">→</span><div class="result-after" style="--result-value:32.5%"><span class="eyebrow">After improvement</span><strong aria-label="32.5 percent"><span class="counter" aria-hidden="true" data-count="32.5" data-decimals="1">32.5</span><span aria-hidden="true">%</span></strong><p>PayBills adoption</p><i class="result-meter" aria-hidden="true"></i></div></div>`;

  const adoptionStory = `<section class="feature-adoption-story" aria-label="PayBills adoption increased from 3 percent before improvement to 32.5 percent after improvement"><div class="adoption-story-heading"><span class="eyebrow">PayBills adoption</span><p>What changed after we made the feature easier to understand.</p></div><div class="adoption-chart" role="img" aria-label="Bar graph showing PayBills adoption at 3 percent before improvement and 32.5 percent after improvement, on a scale from 0 to 40 percent"><div class="adoption-y-axis" aria-hidden="true"><span>40%</span><span>30%</span><span>20%</span><span>10%</span><span>0%</span></div><div class="adoption-plot"><div class="adoption-bars"><div class="adoption-bar adoption-bar-before"><strong>3<span>%</span></strong><i class="adoption-bar-fill" style="--bar-height: 7.5%"></i></div><div class="adoption-bar adoption-bar-after"><strong>32.5<span>%</span></strong><i class="adoption-bar-fill" style="--bar-height: 81.25%"></i></div></div></div><div aria-hidden="true"></div><div class="adoption-chart-labels"><div><strong>Before the changes</strong><span>PayBills adoption</span></div><div><strong>After the changes</strong><span>PayBills adoption</span></div></div></div></section>`;

  const verifiedFindings = `<div class="finding-grid verified-findings" aria-label="Verified user interview findings from the source Figma case study"><div class="finding" style="--finding-order:0;--finding-value:80%"><strong aria-label="80 percent"><span class="counter" aria-hidden="true" data-count="80">80</span><span aria-hidden="true">%</span></strong><span>Found onboarding difficult</span><i class="finding-meter" aria-hidden="true"></i></div><div class="finding" style="--finding-order:1;--finding-value:57%"><strong aria-label="57 percent"><span class="counter" aria-hidden="true" data-count="57">57</span><span aria-hidden="true">%</span></strong><span>Did not know they could change the language</span><i class="finding-meter" aria-hidden="true"></i></div><div class="finding" style="--finding-order:2;--finding-value:30%"><strong aria-label="30 percent"><span class="counter" aria-hidden="true" data-count="30">30</span><span aria-hidden="true">%</span></strong><span>Did not know how to use the main features</span><i class="finding-meter" aria-hidden="true"></i></div><div class="finding" style="--finding-order:3;--finding-value:86%"><strong aria-label="86 percent"><span class="counter" aria-hidden="true" data-count="86">86</span><span aria-hidden="true">%</span></strong><span>Experienced crashes during basic tasks</span><i class="finding-meter" aria-hidden="true"></i></div></div>`;

  const findingStory = `<section class="research-finding-story" aria-label="Onboarding funnel research finding"><div class="finding-story-meta"><span class="eyebrow">Funnel assessment</span><button class="finding-replay" type="button" aria-label="Replay onboarding insight animation">Replay animation <span aria-hidden="true">↻</span></button></div><div class="finding-story-stage"><div class="finding-gauge" role="img" aria-label="66 percent of sign-ups dropped off during onboarding, categorised as critical"><svg viewBox="0 0 220 220" aria-hidden="true"><circle class="finding-gauge-track" cx="110" cy="110" r="84" pathLength="100"></circle><circle class="finding-gauge-progress" cx="110" cy="110" r="84" pathLength="100"></circle><circle class="finding-gauge-marker" cx="110" cy="26" r="5"></circle></svg><div class="finding-score"><strong data-finding-score>66</strong><span>% drop off</span></div></div><div class="finding-story-copy"><span class="finding-status">Critical drop-off</span><h4>Critical drop-off</h4><p class="finding-range">Two of every three sign-ups never finished</p><p>The funnel data showed applicants stalling inside onboarding itself: long forms, unclear errors and crashes before the first success moment.</p></div></div><div class="finding-benchmark"><div><span>Interview signal</span><strong aria-label="86 percent"><b data-finding-benchmark>86</b><small aria-hidden="true">%</small></strong></div><div class="finding-benchmark-track" aria-hidden="true"><i></i></div><p>86% of interviewed customers had experienced crashes during onboarding.</p></div></section>`;

  const synthesis = `<aside class="research-synthesis"><span class="eyebrow">What the comparison told us</span><h3>Customers wanted the reassurance of a bank without the friction of a traditional banking product.</h3><div><p><strong>Traditional banks</strong> often relied on long forms and journeys shaped around internal processes.</p><p><strong>Neobanks</strong> showed people that banking could feel quick, clear, and easy to manage on their own.</p></div><p class="synthesis-decision"><strong>Our direction:</strong> make onboarding simpler while keeping the sense of trust people expect from a bank.</p></aside>`;

  function renameHeading(root, from, to, scope = root) {
    const heading = [...scope.querySelectorAll('h2,h3')].find((element) => element.textContent.trim() === from);
    if (heading) heading.textContent = to;
    return heading;
  }

  function addAfterHeading(root, heading, html) {
    const target = [...root.querySelectorAll('h2,h3')].find((element) => element.textContent.trim() === heading);
    if (target) target.insertAdjacentHTML('afterend', html);
  }

  function addAfterSectionContent(heading, html) {
    let boundary = heading.nextElementSibling;
    while (boundary && !/^H[23]$/.test(boundary.tagName)) boundary = boundary.nextElementSibling;
    if (boundary) boundary.insertAdjacentHTML('beforebegin', html);
    else heading.parentElement.insertAdjacentHTML('beforeend', html);
  }

  function wrapRange(start, end, label) {
    if (!start || !end || start.parentElement !== end.parentElement) return;
    const details = document.createElement('details');
    details.className = 'study-deep-dive';
    details.innerHTML = `<summary><span class="deep-dive-label">${label}</span><span class="deep-dive-icon" aria-hidden="true">+</span></summary><div class="deep-dive-content"></div>`;
    start.parentElement.insertBefore(details, start);
    const content = details.querySelector('.deep-dive-content');
    let current = start;
    while (current && current !== end) {
      const next = current.nextElementSibling;
      content.appendChild(current);
      current = next;
    }
  }

  function removeRequestedProcessCopy(root) {
    const processChapter = root.querySelector('#kfh-2');
    if (!processChapter) return;
    const processHeading = [...processChapter.querySelectorAll('h2')].find((heading) => heading.textContent.trim() === 'Design process');
    if (processHeading?.nextElementSibling?.tagName === 'UL') processHeading.nextElementSibling.remove();
    const workflowHeading = [...processChapter.querySelectorAll('h3')].find((heading) => heading.textContent.trim() === 'Design workflow');
    let current = workflowHeading?.nextElementSibling;
    while (current && !/^H[23]$/.test(current.tagName)) {
      const next = current.nextElementSibling;
      if (current.tagName === 'UL' || current.textContent.trim().startsWith('Designer:')) current.remove();
      current = next;
    }
  }

  function enhanceProductAnalysis(root) {
    const heading = [...root.querySelectorAll('#kfh-1 h3')].find((element) => element.textContent.trim() === 'Product analysis');
    const figure = heading?.nextElementSibling;
    const paragraph = figure?.nextElementSibling;
    if (!heading || !figure?.classList.contains('media-product') || paragraph?.tagName !== 'P') return;
    const layout = document.createElement('div');
    layout.className = 'product-analysis-layout';
    const copy = document.createElement('div');
    copy.className = 'product-analysis-copy';
    heading.parentElement.insertBefore(layout, heading);
    layout.append(copy, figure);
    copy.append(heading, paragraph);
  }

  function enhanceTeamStructure(root) {
    const chapter = root.querySelector('#kfh-2');
    if (!chapter || chapter.querySelector('.team-roles-story')) return;
    const headings = [...chapter.querySelectorAll('h3')];
    const findHeading = (label) => headings.find((heading) => heading.textContent.trim() === label);

    const teamHeading = findHeading('Team responsibilities');
    const teamIntro = teamHeading?.nextElementSibling;
    const roleGrid = teamIntro?.nextElementSibling;
    if (teamHeading && teamIntro?.tagName === 'P' && roleGrid?.classList.contains('content-columns')) {
      const roles = document.createElement('section');
      roles.className = 'team-roles-story';
      roles.setAttribute('aria-labelledby', 'kfh-team-roles-title');
      teamHeading.id = 'kfh-team-roles-title';
      teamHeading.parentElement.insertBefore(roles, teamHeading);

      const header = document.createElement('header');
      header.className = 'team-roles-heading';
      header.innerHTML = '<span class="eyebrow">Role ownership</span>';
      header.append(teamHeading, teamIntro);

      roleGrid.classList.add('role-ownership-grid');
      const cards = [...roleGrid.children];
      cards.forEach((card, index) => {
        card.classList.add('role-ownership-card', index === 0 ? 'role-card-lead' : 'role-card-team');
        card.insertAdjacentHTML('afterbegin', `<span class="role-card-label">${index === 0 ? 'Lead product designer' : 'Design team'}</span>`);
      });
      roles.append(header, roleGrid);
    }

    const stakeholderHeading = findHeading('Working with stakeholders');
    const stakeholderIntro = stakeholderHeading?.nextElementSibling;
    const collaborationHeading = findHeading('How we collaborated');
    const collaborationList = collaborationHeading?.nextElementSibling;
    const managerHeading = findHeading('Working with the product manager');
    const managerIntro = managerHeading?.nextElementSibling;
    const routineHeading = findHeading('Our routine');
    const routineList = routineHeading?.nextElementSibling;
    const routineClose = routineList?.nextElementSibling;
    if (!stakeholderHeading || stakeholderIntro?.tagName !== 'P' || !collaborationHeading || collaborationList?.tagName !== 'UL' || !managerHeading || managerIntro?.tagName !== 'P' || !routineHeading || routineList?.tagName !== 'UL') return;

    const partnership = document.createElement('section');
    partnership.className = 'collaboration-story';
    partnership.setAttribute('aria-labelledby', 'kfh-collaboration-title');
    stakeholderHeading.id = 'kfh-collaboration-title';
    stakeholderHeading.parentElement.insertBefore(partnership, stakeholderHeading);

    const partnershipHeader = document.createElement('header');
    partnershipHeader.className = 'collaboration-heading';
    partnershipHeader.innerHTML = '<span class="eyebrow">Cross functional partnership</span>';
    partnershipHeader.append(stakeholderHeading, stakeholderIntro);

    const partnershipGrid = document.createElement('div');
    partnershipGrid.className = 'collaboration-grid';
    const makeCard = (index, heading, ...content) => {
      const card = document.createElement('article');
      card.className = 'collaboration-card';
      card.insertAdjacentHTML('beforeend', `<span class="collaboration-index">0${index}</span>`);
      card.append(heading, ...content.filter(Boolean));
      return card;
    };
    partnershipGrid.append(
      makeCard(1, collaborationHeading, collaborationList),
      makeCard(2, managerHeading, managerIntro),
      makeCard(3, routineHeading, routineList, routineClose?.tagName === 'P' ? routineClose : null)
    );
    partnership.append(partnershipHeader, partnershipGrid);
  }

  function enhanceVersionControl(root) {
    const chapter = root.querySelector('#kfh-6');
    if (!chapter || chapter.querySelector('.version-control-feature')) return;
    const heading = [...chapter.querySelectorAll('h3')].find((element) => element.textContent.trim() === 'Version control');
    const figure = heading?.nextElementSibling;
    const paragraph = figure?.nextElementSibling;
    if (!heading || !figure?.classList.contains('media-version') || paragraph?.tagName !== 'P') return;

    const feature = document.createElement('section');
    feature.className = 'version-control-feature';
    feature.setAttribute('aria-labelledby', 'kfh-version-control-title');
    heading.id = 'kfh-version-control-title';
    heading.parentElement.insertBefore(feature, heading);

    const visual = document.createElement('div');
    visual.className = 'version-control-visual';
    figure.querySelector('.media-heading')?.remove();
    figure.classList.add('version-control-media');
    visual.appendChild(figure);

    const copy = document.createElement('div');
    copy.className = 'version-control-copy';
    copy.innerHTML = '<span class="eyebrow">One shared source of truth</span>';
    copy.append(heading, paragraph);
    feature.append(visual, copy);
  }

  function linkCompleteDocument(root) {
    const paragraph = [...root.querySelectorAll('#kfh-3 p')].find((element) => element.textContent.trim() === 'View the complete document');
    if (!paragraph) return;
    paragraph.className = 'document-link-wrap';
    paragraph.innerHTML = `<a class="document-link" href="${base}${encodeURI('Heuristic Evaluation.png')}" target="_blank" rel="noreferrer">See the full heuristic evaluation <span aria-hidden="true">↗</span></a>`;
  }

  function initSectionMotion(root) {
    const targets = [...root.querySelectorAll('.case-impact-grid, .result-panel')];
    if (!targets.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    root.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .22) {
          entry.target.classList.add('is-visible');
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: [0, .22] });
    targets.forEach((target) => observer.observe(target));
  }

  function structureChapters(root) {
    root.querySelectorAll('.chapter').forEach((chapter, index) => {
      chapter.dataset.chapterIndex = String(index + 1).padStart(2, '0');
      const headings = [...chapter.children].filter((element) => element.tagName === 'H2');
      headings.forEach((heading, headingIndex) => {
        heading.classList.add(headingIndex === 0 ? 'chapter-title' : 'section-title');
        if (headingIndex === 0) {
          heading.id ||= `${chapter.id}-title`;
          chapter.setAttribute('aria-labelledby', heading.id);
        }
      });
      const title = headings[0];
      let candidate = title?.nextElementSibling;
      while (candidate && !/^H[23]$/.test(candidate.tagName)) {
        if (candidate.tagName === 'P' && !candidate.classList.contains('motion-note')) {
          candidate.classList.add('chapter-lede');
          break;
        }
        candidate = candidate.nextElementSibling;
      }
    });
  }

  function enhanceBusinessImpact(root) {
    const chapter = root.querySelector('#kfh-8');
    const heading = [...(chapter?.querySelectorAll(':scope > h2') || [])]
      .find((element) => element.textContent.trim() === 'Business impact');
    const grid = heading?.nextElementSibling;
    if (!heading || !grid?.classList.contains('content-columns')) return;

    const section = document.createElement('section');
    section.className = 'business-impact-success';
    heading.id = 'kfh-business-impact-title';
    section.setAttribute('aria-labelledby', heading.id);
    heading.parentElement.insertBefore(section, heading);

    const headingWrap = document.createElement('header');
    headingWrap.className = 'business-impact-heading';
    headingWrap.innerHTML = '<span class="eyebrow">Project outcomes</span>';
    headingWrap.appendChild(heading);

    grid.classList.add('business-impact-grid');
    grid.setAttribute('role', 'list');
    [...grid.children].forEach((card, index) => {
      card.classList.add('impact-success-card');
      card.style.setProperty('--impact-order', index);
      card.setAttribute('role', 'listitem');
      card.insertAdjacentHTML('afterbegin', `<span class="impact-success-mark" aria-hidden="true"><b>0${index + 1}</b><i>✓</i></span>`);
    });

    section.append(headingWrap, grid);
  }

  function initMobileToc(root) {
    const toc = root.querySelector('.study-toc');
    if (!toc || toc.querySelector('.mobile-toc-trigger')) return;
    const links = [...toc.querySelectorAll(':scope > a')];
    if (!links.length) return;
    const linkGroup = document.createElement('div');
    linkGroup.className = 'toc-links';
    linkGroup.id = 'kfh-chapter-links';
    links.forEach((link) => linkGroup.appendChild(link));
    const trigger = document.createElement('button');
    trigger.className = 'mobile-toc-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', linkGroup.id);
    trigger.innerHTML = `<span><small>Chapter</small><b class="mobile-toc-current">${links[0].textContent.trim()}</b></span><i class="mobile-toc-chevron" aria-hidden="true"></i>`;
    trigger.addEventListener('click', () => {
      const open = toc.classList.toggle('toc-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    linkGroup.addEventListener('click', () => {
      toc.classList.remove('toc-open');
      trigger.setAttribute('aria-expanded', 'false');
    });
    toc.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      toc.classList.remove('toc-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    });
    toc.append(trigger, linkGroup);
  }

  function initGifControls(root) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('.gif-block').forEach((figure) => {
      const image = figure.querySelector('.animated-evidence');
      const toggle = figure.querySelector('.gif-toggle');
      if (!image || !toggle) return;
      const label = figure.querySelector('figcaption')?.textContent || 'animation';
      let userPaused = reducedMotion;
      const setPaused = (paused) => {
        if (paused) image.src = image.dataset.posterSrc;
        else image.src = `${image.dataset.gifSrc}?replay=${Date.now()}`;
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${label}`);
        toggle.querySelector('span').textContent = `${paused ? 'Play' : 'Pause'} animation`;
        figure.classList.toggle('is-paused', paused);
      };
      setPaused(true);
      if (!reducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            if (!userPaused) setPaused(false);
          } else {
            setPaused(true);
          }
        }, { rootMargin: '160px 0px', threshold: 0 });
        observer.observe(figure);
      } else if (!reducedMotion) {
        setPaused(false);
      }
      toggle.addEventListener('click', () => {
        const nextPaused = toggle.getAttribute('aria-pressed') !== 'true';
        userPaused = nextPaused;
        setPaused(nextPaused);
      });
    });
  }

  function initFindingStory(root) {
    const story = root.querySelector('.research-finding-story');
    if (!story) return;
    const score = story.querySelector('[data-finding-score]');
    const benchmark = story.querySelector('[data-finding-benchmark]');
    const replay = story.querySelector('.finding-replay');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scoreFrame;
    const reset = () => {
      if (scoreFrame) window.cancelAnimationFrame(scoreFrame);
      scoreFrame = undefined;
      story.classList.remove('finding-animate');
      story.classList.add('finding-reset');
      score.textContent = reducedMotion ? '66' : '0';
      benchmark.textContent = reducedMotion ? '86' : '0';
    };
    const run = () => {
      reset();
      if (reducedMotion) {
        story.classList.remove('finding-reset');
        story.classList.add('finding-animate');
        return;
      }
      void story.offsetWidth;
      story.classList.remove('finding-reset');
      story.classList.add('finding-animate');
      const start = performance.now();
      const duration = 1050;
      const frame = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        score.textContent = String(Math.round(66 * eased));
        benchmark.textContent = String(Math.round(86 * eased));
        if (progress < 1) scoreFrame = window.requestAnimationFrame(frame);
        else scoreFrame = undefined;
      };
      scoreFrame = window.requestAnimationFrame(frame);
    };
    replay.addEventListener('click', run);
    if (reducedMotion || !('IntersectionObserver' in window)) run();
    else {
      let active = false;
      reset();
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= .3 && !active) {
          active = true;
          run();
        } else if (!entry.isIntersecting && active) {
          active = false;
          reset();
        }
      }, { threshold: [0, .3] });
      observer.observe(story);
    }
  }

  function initFindingMetrics(root) {
    const grid = root.querySelector('.verified-findings');
    if (!grid) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      grid.classList.add('is-metric-animated');
      return;
    }
    grid.classList.add('metrics-motion-ready');
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRatio >= .24) {
        grid.classList.add('is-metric-animated');
      } else if (!entry.isIntersecting) {
        grid.classList.remove('is-metric-animated');
      }
    }, { threshold: [0, .24], rootMargin: '0px 0px -8% 0px' });
    observer.observe(grid);
  }

  function initDiagramMotion(root) {
    const stages = [...root.querySelectorAll('[data-diagram-motion]')];
    if (!stages.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stages.forEach((stage) => {
      const replay = stage.querySelector('.diagram-replay');
      const run = () => {
        stage.classList.remove('is-diagram-animated');
        void stage.offsetWidth;
        stage.classList.add('is-diagram-animated');
      };
      replay?.addEventListener('click', run);
      if (reducedMotion) {
        stage.classList.add('is-diagram-complete');
        if (replay) replay.hidden = true;
        return;
      }
      stage.classList.add('diagram-motion-ready');
      if (!('IntersectionObserver' in window)) {
        run();
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= .28) {
          if (!stage.classList.contains('is-diagram-animated')) run();
        } else if (!entry.isIntersecting) {
          stage.classList.remove('is-diagram-animated');
        }
      }, { threshold: [0, .28], rootMargin: '0px 0px -8% 0px' });
      observer.observe(stage);
    });
  }

  function initCounters(root) {
    const counters = [...root.querySelectorAll('.counter')];
    if (!counters.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setFinal = (counter) => {
      const value = Number(counter.dataset.count);
      counter.textContent = value.toFixed(Number(counter.dataset.decimals || 0));
    };
    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(setFinal);
      return;
    }
    const animationFrames = new WeakMap();
    const reset = (counter) => {
      const frame = animationFrames.get(counter);
      if (frame) window.cancelAnimationFrame(frame);
      animationFrames.delete(counter);
      delete counter.dataset.counted;
      counter.textContent = Number(0).toFixed(Number(counter.dataset.decimals || 0));
    };
    const animate = (counter) => {
      if (counter.dataset.counted) return;
      counter.dataset.counted = 'true';
      const target = Number(counter.dataset.count);
      const decimals = Number(counter.dataset.decimals || 0);
      const start = performance.now();
      const duration = target >= 100 ? 1100 : 850;
      const frame = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) animationFrames.set(counter, window.requestAnimationFrame(frame));
        else {
          animationFrames.delete(counter);
          setFinal(counter);
        }
      };
      animationFrames.set(counter, window.requestAnimationFrame(frame));
    };
    counters.forEach(reset);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .55) {
          animate(entry.target);
        } else if (!entry.isIntersecting) {
          reset(entry.target);
        }
      });
    }, { threshold: [0, .55] });
    counters.forEach((counter) => observer.observe(counter));
  }

  function initEditorialMotion(root) {
    const targets = [...root.querySelectorAll([
      '.case-impact-summary > *',
      '.case-facts > *',
      '.chapter > .chapter-title',
      '.chapter > .section-title',
      '.chapter > h3',
      '.chapter > .chapter-lede',
      '.chapter > .media-block',
      '.chapter > .content-columns',
      '.chapter > .finding-grid',
      '.chapter > .research-overview',
      '.chapter > .priority-decision',
      '.chapter > .product-analysis-layout',
      '.chapter > .result-panel',
      '.chapter > .feature-adoption-story',
      '.chapter > .research-finding-story',
      '.chapter > .research-synthesis',
      '.chapter > .business-impact-success'
    ].join(','))];
    if (!targets.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    root.classList.add('editorial-motion-ready');
    targets.forEach((target) => target.classList.add('editorial-reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .08) {
          entry.target.classList.add('is-visible');
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: [0, .08], rootMargin: '0px 0px -7% 0px' });
    targets.forEach((target) => observer.observe(target));
  }

  function initRails(root) {
    root.querySelectorAll('.rail-shell').forEach((shell) => {
      const rail = shell.querySelector('.media-rail');
      const progress = shell.querySelector('.rail-progress');
      const items = [...rail.children];
      const update = () => {
        const max = Math.max(1, rail.scrollWidth - rail.clientWidth);
        const index = Math.min(items.length - 1, Math.round((rail.scrollLeft / max) * (items.length - 1)));
        if (progress) progress.textContent = `${index + 1} / ${items.length}`;
      };
      shell.querySelectorAll('[data-rail-dir]').forEach((button) => button.addEventListener('click', () => {
        rail.scrollBy({ left: Number(button.dataset.railDir) * rail.clientWidth * 0.82, behavior: 'smooth' });
      }));
      rail.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  function initLightbox(root) {
    document.querySelectorAll('.kfh-lightbox').forEach((element) => element.remove());
    const dialog = document.createElement('dialog');
    dialog.className = 'kfh-lightbox';
    dialog.setAttribute('aria-label', 'Expanded case study media');
    dialog.innerHTML = `<button type="button" class="lightbox-close" aria-label="Close image">×</button><div><img alt=""><p></p></div>`;
    document.body.appendChild(dialog);
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('p');
    root.querySelectorAll('[data-full-src]').forEach((button) => button.addEventListener('click', () => {
      image.src = button.dataset.fullSrc;
      image.alt = button.dataset.fullAlt;
      caption.textContent = button.dataset.fullAlt;
      dialog.showModal();
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  }

  function initReadingProgress(root) {
    if (!root) return;
    document.querySelectorAll('.reading-progress').forEach((element) => element.remove());
    if (window.__kfhProgressHandler) window.removeEventListener('scroll', window.__kfhProgressHandler);
    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<span></span>';
    document.body.appendChild(progress);
    const fill = progress.firstElementChild;
    const links = [...root.querySelectorAll('.study-toc a')];
    const chapters = [...root.querySelectorAll('.chapter')];
    const currentLabel = root.querySelector('.mobile-toc-current');
    let ticking = false;
    const update = () => {
      const start = root.querySelector('.long-study').offsetTop;
      const end = root.offsetTop + root.offsetHeight - window.innerHeight;
      const value = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
      fill.style.transform = `scaleX(${value})`;
      const active = [...chapters].reverse().find((chapter) => chapter.getBoundingClientRect().top <= 190) || chapters[0];
      links.forEach((link) => {
        const current = link.getAttribute('href') === `#${active.id}`;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      const activeLink = links.find((link) => link.classList.contains('active'));
      if (currentLabel && activeLink) currentLabel.textContent = activeLink.textContent.trim();
      ticking = false;
    };
    window.__kfhProgressHandler = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', window.__kfhProgressHandler, { passive: true });
    update();
  }

  function hydrateKfhMedia() {
    if (location.hash !== '#/case/kfh') return;
    document.body.classList.add('kfh-active');
    const root = document.querySelector('main');
    const caseRoot = root?.querySelector('.case');
    if (!root || !caseRoot || caseRoot.dataset.kfhLocalMediaReady) return;
    caseRoot.dataset.kfhLocalMediaReady = 'true';
    root.querySelectorAll('.media-block').forEach((element) => element.remove());

    const designChapter = root.querySelector('#kfh-6');
    designChapter?.querySelector(':scope > ul')?.remove();
    removeRequestedProcessCopy(root);

    const findingGrid = root.querySelector('#kfh-3 .finding-grid');
    if (findingGrid) findingGrid.outerHTML = verifiedFindings;
    const redundantComingSoon = [...root.querySelectorAll('#kfh-8 p')].find((element) => element.textContent.trim() === 'Coming Soon');
    if (redundantComingSoon) redundantComingSoon.remove();

    const interviewChapter = root.querySelector('#kfh-3');
    wrapRange(
      [...interviewChapter.querySelectorAll('h3')].find((heading) => heading.textContent.trim() === 'First impressions'),
      [...interviewChapter.querySelectorAll('h3')].find((heading) => heading.textContent.trim() === 'Research analysis'),
      'View the complete interview guide'
    );
    const impactChapter = root.querySelector('#kfh-8');
    wrapRange(
      [...impactChapter.querySelectorAll('h2')].find((heading) => heading.textContent.trim() === 'Developer documentation and walkthroughs'),
      [...impactChapter.querySelectorAll('h2')].find((heading) => heading.textContent.trim() === 'Business impact'),
      'Read about implementation, QA, and testing'
    );

    const hero = root.querySelector('.case-hero');
    hero.insertAdjacentHTML('beforeend', heroVisual());
    hero.insertAdjacentHTML('afterend', impactSummary);

    [
      ['Gathering requirements', questionnaireArtifact()],
      ['Product analysis', gallery('product', 'Product analysis')],
      ['Design process', gallery('process', 'Design process and planning')],
      ['Design workflow', gallery('workflow', 'How the team worked together')],
      ['User interviews', gifBlock('interviews', 'How the interviews worked', 'animated/user-interviews.gif', 'optimized/user-interviews-poster.jpg', 'A short look at how the interviews were run and organised.', 'Animated sequence of the KFH Jazeel user interviews')],
      ['Heuristic evaluation', gallery('heuristic', 'Heuristic evaluation')],
      ['Traditional bank research', gallery('traditional', 'Traditional bank research')],
      ['Neobank research', gallery('neo', 'Neobank research')],
      ['Neobank user flows', gallery('neoFlows', 'Neobank user flows')],
      ['Comparing the user flows', gallery('comparison', 'Comparing traditional bank and neobank journeys')],
      ['Choosing what to fix first', priorityDecision + gifBlock('priority', 'How we chose the first problem', 'animated/prioritizing-tasks.gif', 'optimized/prioritizing-tasks-poster.jpg', 'Research helped us turn a large problem into a practical first release.', 'Animated KFH Jazeel task prioritisation sequence')],
      ['Research overview', researchOverview],
      ['Research findings', findingStory],
      ['High fidelity wireframes', gallery('hifi', 'High fidelity wireframes')],
      ['Version control', gallery('version', 'Version control workflow')],
      ['Design system', gifBlock('system', 'KFH Jazeel design system', 'animated/design-system.gif', 'optimized/design-system-poster.jpg', 'The shared foundations and components used across the product.', 'Animated overview of the Kapple design system foundations and architecture')],
      ['Before the redesign', gifBlock('before', 'Original screens', 'animated/original-screens.gif', 'optimized/original-screens-poster.jpg', 'The product before the redesign.', 'Animated sequence of the original KFH Jazeel interface')],
      ['Improvements', gallery('improvements', 'Interface improvements')],
      ['Final interface', gallery('ui', 'Final interface')],
      ['Heatmaps', gallery('heatmaps', 'Heatmap validation')],
      ['Design iterations after launch', gifBlock('iteration', 'Design iterations after launch', 'animated/iterative-progress.gif', 'optimized/iterative-progress-poster.jpg', 'The interface changed through three major rounds of improvements.', 'Animated sequence of KFH Jazeel design iterations after launch')],
      ['KFH Jazeel mobile case study', gallery('mobile', 'KFH Jazeel mobile product')]
    ].forEach(([heading, html]) => addAfterHeading(root, heading, html));

    enhanceProductAnalysis(root);
    enhanceTeamStructure(root);
    enhanceVersionControl(root);
    linkCompleteDocument(root);

    const market = root.querySelector('#kfh-4');
    market.classList.add('research-comparison');
    const reviewHeadings = [...market.querySelectorAll('h3')].filter((heading) => heading.textContent.trim() === 'What did they say?');
    if (reviewHeadings[0]) addAfterSectionContent(reviewHeadings[0], reviewCards('traditional'));
    if (reviewHeadings[1]) addAfterSectionContent(reviewHeadings[1], reviewCards('neo'));
    market.insertAdjacentHTML('beforeend', synthesis);

    addAfterHeading(root, 'Onboarding results', onboardingResult);
    addAfterHeading(root, 'PayBills adoption', adoptionResult + adoptionStory);

    enhanceBusinessImpact(root);
    structureChapters(root);
    initMobileToc(root);

    root.querySelectorAll('.study-toc a, .case-jump').forEach((link) => link.addEventListener('click', (event) => {
      const section = document.getElementById(link.getAttribute('href').replace('#', ''));
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }));

    initRails(root);
    initGifControls(root);
    initFindingStory(root);
    initFindingMetrics(root);
    initDiagramMotion(root);
    initCounters(root);
    initSectionMotion(root);
    initEditorialMotion(root);
    initReadingProgress(caseRoot);
  }

  function handleRouteChange() {
    document.body.classList.toggle('kfh-active', location.hash === '#/case/kfh' || location.hash === '#/case/talon' || location.hash === '#/case/uta');
    if (location.hash !== '#/case/kfh') {
      document.querySelectorAll('.reading-progress, .kfh-lightbox').forEach((element) => element.remove());
      if (window.__kfhProgressHandler) window.removeEventListener('scroll', window.__kfhProgressHandler);
      window.__kfhProgressHandler = null;
      return;
    }
    hydrateKfhMedia();
  }

  window.addEventListener('hashchange', () => setTimeout(handleRouteChange, 0));
  document.body.classList.toggle('kfh-active', location.hash === '#/case/kfh' || location.hash === '#/case/talon' || location.hash === '#/case/uta');
  setTimeout(handleRouteChange, 0);
})();
