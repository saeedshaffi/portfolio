/* ===== harmony-case.js ===== */
/* Harmony: CreditBook design system case study. Same editorial shell as the KFH study. */
(function(){
  const IMG='assets/harmony/hr/';

  const fig=(file,alt,caption,ratio,cls)=>`<figure class="hm-fig${cls?' '+cls:''}" style="--ratio:${ratio||'16/10'}">
    <span class="shot hm-shot">
      <img src="${IMG+file}" alt="${alt}" loading="lazy" decoding="async" onerror="this.closest('.hm-fig').classList.add('is-missing')">
      <span class="hm-missing" aria-hidden="true">${file}</span>
    </span>
    ${caption?`<figcaption>${caption}</figcaption>`:''}
  </figure>`;

  const pills=list=>`<div class="pills">${list.map(p=>`<span class="pill hm-pill">${p}</span>`).join('')}</div>`;

  const chapter=(n,label,title,body)=>`<section class="chapter hm-chapter" id="hm-${n}" aria-labelledby="hm-${n}-title" data-screen-label="${String(n).padStart(2,'0')}">
    <span class="chapter-num">${String(n).padStart(2,'0')} / ${label}</span>
    <h2 id="hm-${n}-title">${title}</h2>
    ${body}
  </section>`;

  const toc=['Brief','The problem','The approach','Research','Heuristics evaluation','Rules before components','Foundations','The component library','Tokens','Rollout','Did anyone notice?','Impact','Retrospective','Not the end'];

  const steps=['Analyze the current design process','Identify the brand’s alphabet','Define rules','Define structure of elements','Conduct heuristics evaluation','Define design principles','Create the pattern library','Communicate changes','Ensure every team uses it'];

  const rules=[
    'All frames, old and new, at 360×640.',
    'Layout changes that improve UX are handled in Phase A.',
    'System components are the building blocks; a missing component gets created first, then implemented.',
    'Every UI element sized on the 8-point grid.',
    'Every margin and padding on the 8-point grid.',
    'Implementing a component also implements its iconography, typography and colour.',
    'Material Design icon set; a custom icon only where none fits.',
    'All text uses a system text style.',
    'New illustrations and animations carry the brand through the app.',
    'UX writing reviewed across the app.',
    'Master file with a new screen naming convention; colours referenced with a legend.',
    'Micro-interactions belong in the prototype.',
    'Translations managed only in Lokalise.',
    'Icons handed to engineering in font format.'
  ];

  const type=[
    ['Title H1','28 / 40','Gilmer Bold',28,700],['Title H2','24 / 32','Gilmer Bold',24,700],
    ['Title H3','22 / 32','Gilmer Bold',22,700],['Title H4','18 / 24','Gilmer Bold',18,700],
    ['Title H5','16 / 24','Gilmer Bold',16,700],['Title H6','16 / 24','Gilmer Medium',16,500],
    ['Title H7','14 / 24','Gilmer Medium',14,500],['Title H8','12 / 16','Gilmer Medium',12,500],
    ['Body L','16 / 24','Roboto Regular + Medium',16,400],['Body M','14 / 24','Roboto Regular + Medium',14,400],
    ['Body S','12 / 16','Roboto Regular + Medium',12,400],['Body XS','10 / 16','Roboto Regular + Medium',10,400]
  ];

  const tokens=[
    ['radius.sm','4px'],['radius.md','8px'],['radius.lg','16px'],['radius.full','999px'],
    ['space.1','8px'],['space.2','16px'],['space.3','24px'],['space.4','32px'],
    ['font.size.body','14px'],['font.size.title','24px'],['line.height.body','24px'],['font.weight.medium','500']
  ];

  const docs=[
    ['Getting started','Introduction · About · Contributions'],
    ['Components','Avatar · Box · Buttons · Cards · Checkbox · Column · Dropdown · List · Notification · Tooltip · Tabs · Search · Code snippet · Date picker · Link · Loading'],
    ['Brand','Logo versions · Who we are · Typography · Strategy · Illustrations · Colours · Tone of voice'],
    ['Design tokens','Background colours · Border colour · Border radius · Font size · Font weight · Font family · Line height · Size · Space · Grid'],
    ['Product','Colour palette · Component overview · Iconography · Localisation rules · Layouts · Screen sizes'],
    ['Resources','Downloads · Plugins used · Installation guides'],
    ['What’s new','Changelog · Monthly updates · Documentation · Roadmap · Templates']
  ];

  const screens=['Home','Multiple Businesses','Payment Reminders','Data Backup','Reports Business','Reports Customer','Reports Cashbook','Onboarding','More','Sign up','Cashbook','Customer Screen','Transaction Screens','Customer Settings','Invoicing','Wallet'];
  const SPAN=n=>Array.from({length:n},(_,i)=>i);
  const ALL=SPAN(16), CORE=SPAN(14), CRAFT=[0,1,2,3,4,5,6,9];
  const phases=[
    ['A','Structure',[['Frame size',ALL],['Layout',CORE],['Components',CORE],['Sizing',CORE],['Spacing',CORE]]],
    ['B','Surface',[['Iconography',CORE],['Typography',CORE],['Colour',CORE],['UX writing',CORE]]],
    ['C','Craft',[['Illustrations',CRAFT],['Translations',CRAFT]]]
  ];
  const shipped=[4,5,6,9,15];

  const matrix=()=>{
    const head=`<thead><tr><th class="hm-mx-corner" scope="col">Screen</th>${screens.map((s,i)=>`<th scope="col" data-c="${i}"><span>${s}</span></th>`).join('')}</tr></thead>`;
    const band=(id,name,rows)=>`<tbody class="hm-mx-band" data-phase="${id}">
      <tr class="hm-mx-bandhead"><th scope="colgroup" colspan="${screens.length+1}"><b>Phase ${id}</b><span>${name}</span></th></tr>
      ${rows.map((r,ri)=>`<tr><th scope="row">${r[0]}</th>${screens.map((s,ci)=>`<td data-c="${ci}"${r[1].includes(ci)?' class="is-on"':''} style="--d:${(ri*4+ci)*16}ms" aria-label="${s}: ${r[1].includes(ci)?r[0]+' in scope':'not applicable'}"><i></i></td>`).join('')}</tr>`).join('')}
    </tbody>`;
    const ship=`<tbody class="hm-mx-band hm-mx-ship" data-phase="ship"><tr><th scope="row">Shipped in this pass</th>${screens.map((s,ci)=>`<td data-c="${ci}"${shipped.includes(ci)?' class="is-on"':''} style="--d:${ci*16}ms" aria-label="${s}: ${shipped.includes(ci)?'shipped':'later release'}"><i></i></td>`).join('')}</tr></tbody>`;
    const total=phases.reduce((n,p)=>n+p[2].length,0);
    const tabs=[['all','All phases',total+' layers']].concat(phases.map(p=>['Phase '+p[0],p[1],p[2].length+' layers',p[0]]));
    return `<div class="hm-matrix hm-reveal">
      <div class="hm-roll-tabs" role="group" aria-label="Filter the matrix by rollout phase">
        <button type="button" class="hm-roll-tab is-active" aria-pressed="true" data-filter="all"><b>All phases</b><span>${total} layers across ${screens.length} screens</span></button>
        ${phases.map(p=>`<button type="button" class="hm-roll-tab" aria-pressed="false" data-filter="${p[0]}"><b>Phase ${p[0]}</b><span>${p[1]} · ${p[2].length} layers</span></button>`).join('')}
      </div>
      <div class="hm-mx-scroll">
        <table class="hm-mx">${head}${phases.map(p=>band(p[0],p[1],p[2])).join('')}${ship}</table>
      </div>
      <p class="hm-mx-legend"><span class="hm-mx-key is-on"><i></i>In scope</span><span class="hm-mx-key"><i></i>Not applicable</span><span class="hm-mx-hint">Hover a cell to trace its screen.</span></p>
    </div>`;
  };

  window.harmonyPage=function(){
    return `<div class="case reveal hm-case" style="--accent:#1e8055">
  <div class="hm-progress" aria-hidden="true"><i></i></div>

  <section class="case-hero hm-hero">
    <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>Harmony Design System</b></nav>
    <img class="hm-brandmark" src="${IMG}harmony-logo.png" alt="CreditBook" width="168" height="34" loading="lazy">
    <span class="eyebrow">B2B · Design systems</span>
    <h1>Nobody noticed. That was the point.</h1>
    <p>Harmony gave CreditBook one design language: type, colour, spacing, tokens and components, built from nothing. When we tested the rebuilt app, users couldn’t tell it apart from the one they’d been using every day.</p>
    <div class="hm-tags" aria-label="Project areas"><span class="hm-tag">UI components</span><span class="hm-tag">Design tokens</span><span class="hm-tag">Accessibility</span><span class="hm-tag">Responsive design</span><span class="hm-tag">Micro-interactions</span><span class="hm-tag">User flows</span></div>
    <div class="hm-hero-visual">
      <div class="hm-hero-panel">
        <img class="hm-hero-sheet is-back" src="${IMG}harmony-sheet-input.webp" alt="" aria-hidden="true" loading="eager" decoding="async">
        <img class="hm-hero-sheet is-front" src="${IMG}harmony-sheet-nav.webp" alt="Harmony component sheets: app bar, tabs, bottom navigation and input fields" loading="eager" decoding="async">
      </div>
      <div class="hm-hero-caption"><b>Harmony</b><span>Pattern library, 2021 to 2022</span></div>
    </div>
  </section>

  <div class="case-facts">
    <div class="fact"><span class="eyebrow">Task</span><b>Design system, from scratch</b></div>
    <div class="fact"><span class="eyebrow">Role</span><b>Sole Product Designer</b></div>
    <div class="fact"><span class="eyebrow">Company</span><b>CreditBook</b></div>
    <div class="fact"><span class="eyebrow">Year</span><b>2021 to 2022</b></div>
  </div>

  <div class="long-study">
    <nav class="study-toc hm-toc" aria-label="Case study contents">
      <span class="eyebrow">Case study</span>
      ${toc.map((x,i)=>`<a href="#hm-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}
    </nav>
    <article>

${chapter(1,'Brief','One standard for every team',`
  <p class="hm-lead hm-reveal">CreditBook helps small businesses in Pakistan replace paper ledgers. By 2021 the product had grown faster than the team’s shared vocabulary. I was asked to build a design system that could hold the whole product, and every team building it, to one standard.</p>
`)}

${chapter(2,'The problem','Five hands, five handwritings',`
  <p class="hm-reveal">There was verbal consensus about colours and elements, and nothing written down. Designers worked without visibility into each other’s screens. It showed: different input styles, inconsistent alignment, weak hierarchy, drifting colour, and flows that contradicted each other.</p>
  <div class="content-card dark hm-quote hm-reveal"><p>No design system = disconnected user experience.</p></div>
  <div class="hm-drift hm-reveal" role="img" aria-label="The same primary action drawn five different ways: five corner radii, three greens, three type sizes and three casings">
    <span class="hm-drift-btn" style="--r:4px;--bg:#1e8055;font-size:14px">Add entry</span>
    <span class="hm-drift-btn" style="--r:999px;--bg:#27ae60;font-size:12px;font-weight:500;letter-spacing:.08em">ADD ENTRY</span>
    <span class="hm-drift-btn" style="--r:10px;--bg:#166342;font-size:15px">Add Entry</span>
    <span class="hm-drift-btn is-ghost" style="--r:2px;font-size:13px">Add entry</span>
    <span class="hm-drift-btn" style="--r:14px;--bg:#2d9d6b;font-size:12px">+ Add</span>
  </div>
  <p class="hm-note">One action, five treatments, radius, green, casing and size all drifting. Rebuilt in HTML from the audit findings.</p>
`)}

${chapter(3,'The approach','Research first, adoption last',`
  <p class="hm-reveal">Before drawing anything we agreed why the system needed to exist, then scoped it into nine steps: research first, rules second, components third, adoption last.</p>
  <ol class="hm-rail" aria-label="Nine step process">
    ${steps.map((s,i)=>`<li class="hm-rail-node" style="--i:${i}"><span class="hm-rail-dot" aria-hidden="true"></span><span class="hm-rail-num">${String(i+1).padStart(2,'0')}</span><span class="hm-rail-label">${s}</span></li>`).join('')}
  </ol>
`)}

${chapter(4,'Research','Two questions before any component',`
  <p class="hm-reveal">Two questions had to be answered before any component existed: how does design actually happen here, and what is this brand?</p>
  <span class="eyebrow hm-reveal">Our findings</span>
  <div class="finding-grid">
    <div class="finding hm-reveal" style="--i:0"><h3>Process audit</h3><p>Designers were unaware of what the other design teams were doing, what tasks they had completed, and how their work would affect the overall design of the application.</p></div>
    <div class="finding hm-reveal" style="--i:1"><h3>Brand alphabet</h3><p>Stakeholders were unclear on what CreditBook’s brand identity was. Is it a fintech application, or a digital ledger?</p></div>
  </div>
  <p class="hm-reveal">Once stakeholders agreed on what CreditBook is, a moodboard fixed the design philosophy the organisation would adopt.</p>
  <div class="hm-mood">
    <figure class="hm-mood-tile"><span class="shot hm-shot"><img src="${IMG}mood-1.webp" alt="Moodboard reference 1 of 5: a mobile interface with soft dimensional shapes and generous spacing" loading="lazy" decoding="async"></span></figure>
    <figure class="hm-mood-tile"><span class="shot hm-shot"><img src="${IMG}mood-2.webp" alt="Moodboard reference 2 of 5: card-led mobile screens with strong photography" loading="lazy" decoding="async"></span></figure>
    <figure class="hm-mood-tile"><span class="shot hm-shot"><img src="${IMG}mood-3.webp" alt="Moodboard reference 3 of 5: a data-forward screen with clear numeric hierarchy" loading="lazy" decoding="async"></span></figure>
    <figure class="hm-mood-tile"><span class="shot hm-shot"><img src="${IMG}mood-4.webp" alt="Moodboard reference 4 of 5: calm single-task flows on flat colour" loading="lazy" decoding="async"></span></figure>
    <figure class="hm-mood-tile"><span class="shot hm-shot"><img src="${IMG}mood-5.webp" alt="Moodboard reference 5 of 5: dark-mode screens with a single accent" loading="lazy" decoding="async"></span></figure>
  </div>
  <p class="hm-note">Five of the references the moodboard was built from. Clarity and calm over decoration.</p>
`)}

${chapter(5,'Heuristics evaluation','Making the inconsistency undeniable',`
  <p class="hm-reveal">I audited the app against Nielsen’s heuristics. Fourteen issues logged across onboarding, sign-up and OTP, each with a severity and a recommendation. Six were high.</p>
  <div class="hm-sev hm-reveal" role="img" aria-label="Fourteen heuristic issues: six high, four medium, four low">
    ${[['High',6,'#cf3f30'],['Medium',4,'#d5a94f'],['Low',4,'#1e8055']].map(([l,n,c],i)=>`
      <div class="hm-sev-row" style="--i:${i}">
        <span class="hm-sev-label">${l}</span>
        <span class="hm-sev-track"><i class="hm-sev-bar" style="--w:${(n/14*100).toFixed(1)}%;--c:${c}"></i></span>
        <b class="hm-sev-val" data-count="${n}">${n}</b>
      </div>`).join('')}
    <p class="hm-sev-total">14 issues logged · 6 high · 4 medium · 4 low</p>
  </div>
  <span class="eyebrow hm-reveal">Research key takeaways</span>
  ${pills(['Different style input fields','Inconsistent alignment','Poor visual hierarchy','Inconsistent colours','Inconsistent flows'])}
  <div class="finding accent hm-reveal"><p>There was inconsistency throughout the app because each designer had their own preferences for grid systems, radius, font weight and more.</p></div>
  ${fig('cb-heuristics.webp','Heuristics analysis table for the CreditBook app: fourteen issues across onboarding, sign-up and OTP, each with the heuristic used, a priority and a recommendation','Fourteen issues, each with a severity and a recommendation. From the working evaluation sheet.','2.3/1')}
`)}

${chapter(6,'Rules before components','Fourteen agreements before any pixel',`
  <p class="hm-reveal">A system is only as good as the agreements behind it, so we wrote the rules first.</p>
  <ol class="hm-rules">
    ${rules.map((r,i)=>`<li class="hm-reveal" style="--i:${Math.min(i,7)}"><span>${String(i+1).padStart(2,'0')}</span>${r}</li>`).join('')}
  </ol>
`)}

${chapter(7,'Foundations','What everything else sits on',`
  <p class="hm-reveal">Harmony had to account for every potential UI element: logos, grids, spacing, type, colour and interactive language.</p>
  <h3>Type scale</h3>
  <p class="hm-note">Gilmer for titles, Roboto for body. Set here in the site’s own type stack. The intended family is labelled on each row.</p>
  <ul class="hm-type" aria-label="Type scale">
    ${type.map(([name,metric,family,size,weight])=>`<li class="hm-type-row"><span class="hm-type-name">${name}</span><span class="hm-type-sample" style="font-size:${size}px;font-weight:${weight}">Small businesses, one ledger</span><span class="hm-type-spec">${metric} · ${family}</span></li>`).join('')}
  </ul>
`)}

${chapter(8,'The component library','Built once, correct everywhere',`
  <p class="hm-reveal">Buttons in three sizes, inputs, search, PIN entry, tabs, app bar, bottom navigation, FAB and dialogs. Every component built with auto layout so it stretched across breakpoints, and every one covering the full set of states.</p>
  <p class="hm-note hm-reveal">Every specimen below is live. Type, click and tab through them, the chip on each card names the design-system state you are triggering.</p>
  <div class="hm-board" aria-label="Interactive component specimens">
    <div class="hm-board-cell" style="--span:2" data-live="amount">
      <div class="hm-board-head"><span class="hm-board-label">Amount input</span><span class="hm-live-state">State: <b data-live-state>Default</b></span></div>
      <div class="hm-board-stage hm-board-row">
        <label class="hm-c-field hm-amt" data-state="default">
          <span>Amount</span>
          <span class="hm-amt-wrap"><i>Rs</i><input type="text" inputmode="decimal" placeholder="0.00" autocomplete="off" aria-describedby="hm-amt-msg"></span>
        </label>
        <label class="hm-c-field hm-amt is-disabled">
          <span>Closed ledger</span>
          <span class="hm-amt-wrap"><i>Rs</i><input type="text" value="12,000" disabled aria-label="Amount, disabled: closed ledger"></span>
        </label>
      </div>
      <p class="hm-live-msg" id="hm-amt-msg" data-live-msg>Entries up to Rs 500,000 save instantly. Try a letter, a zero, or something enormous.</p>
    </div>

    <div class="hm-board-cell" data-live="button">
      <div class="hm-board-head"><span class="hm-board-label">Primary button</span><span class="hm-live-state">State: <b data-live-state>Default</b></span></div>
      <div class="hm-board-stage hm-board-row">
        <button type="button" class="hm-c-btn hm-c-btn-lg hm-live-btn"><span class="hm-spin" aria-hidden="true"></span><span class="hm-btn-label">Record entry</span></button>
      </div>
      <p class="hm-live-msg">Click it, loading and success are part of the spec.</p>
    </div>

    <div class="hm-board-cell" data-live="pin">
      <div class="hm-board-head"><span class="hm-board-label">PIN entry</span><span class="hm-live-state">State: <b data-live-state>Empty</b></span></div>
      <div class="hm-board-stage">
        <label class="hm-pin-live">
          <input class="visually-hidden" type="text" inputmode="numeric" autocomplete="one-time-code" aria-label="Enter any 3 digits">
          <span class="hm-c-pin" aria-hidden="true"><span class="hm-c-pin-box"></span><span class="hm-c-pin-box"></span><span class="hm-c-pin-box"></span></span>
        </label>
      </div>
      <p class="hm-live-msg" data-live-msg>Click the boxes and type any 3 digits.</p>
    </div>

    <div class="hm-board-cell" data-live="fields">
      <div class="hm-board-head"><span class="hm-board-label">Input and search</span><span class="hm-live-state">State: <b data-live-state>Default</b></span></div>
      <div class="hm-board-stage hm-board-stack">
        <label class="hm-c-field"><span>Customer</span><input type="text" placeholder="e.g. Bilal Traders" autocomplete="off"></label>
        <label class="hm-c-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input type="text" placeholder="Search entries" aria-label="Search entries" autocomplete="off"></label>
      </div>
    </div>

    <div class="hm-board-cell" style="--span:2" data-live="tabs">
      <div class="hm-board-head"><span class="hm-board-label">Tabs</span><span class="hm-live-state">State: <b data-live-state>Ledger active</b></span></div>
      <div class="hm-board-stage hm-board-stack">
        <div class="hm-c-tabs" role="tablist" aria-label="Ledger sections">
          <button type="button" role="tab" class="is-active" aria-selected="true" data-tab="Ledger">Ledger</button>
          <button type="button" role="tab" aria-selected="false" data-tab="Reports">Reports</button>
          <button type="button" role="tab" aria-selected="false" data-tab="Customers">Customers</button>
        </div>
        <p class="hm-tab-panel" data-tab-panel>128 entries this month · Rs 84,200 outstanding</p>
      </div>
    </div>

    <div class="hm-board-cell" data-live="fab">
      <div class="hm-board-head"><span class="hm-board-label">App bar and FAB</span><span class="hm-live-state">State: <b data-live-state>Default</b></span></div>
      <div class="hm-board-stage hm-board-stack">
        <div class="hm-c-appbar"><span class="hm-c-back">&larr;</span><b data-appbar-title>Bilal Traders</b><span class="hm-c-appbar-act">&#8942;</span></div>
        <button type="button" class="hm-c-fab" aria-label="Add entry">+</button>
      </div>
    </div>

    <div class="hm-board-cell" data-live="nav">
      <div class="hm-board-head"><span class="hm-board-label">Bottom navigation</span><span class="hm-live-state">State: <b data-live-state>Ledger active</b></span></div>
      <div class="hm-board-stage">
        <div class="hm-c-bottomnav" aria-label="App sections"><button type="button" class="is-active" aria-pressed="true">Ledger</button><button type="button" aria-pressed="false">Cashbook</button><button type="button" aria-pressed="false">More</button></div>
      </div>
    </div>

    <div class="hm-board-cell" style="--span:2" data-live="dialog">
      <div class="hm-board-head"><span class="hm-board-label">Dialog</span><span class="hm-live-state">State: <b data-live-state>Closed</b></span></div>
      <div class="hm-board-stage hm-board-stack hm-dlg-stage">
        <div class="hm-c-row" data-dlg-row><span class="hm-c-row-avatar">B</span><span class="hm-c-row-text"><b>Bilal Traders</b><small>Paid 12,000</small></span><span class="hm-c-row-amt">12,000</span></div>
        <div class="hm-dlg-actions"><button type="button" class="hm-c-btn hm-c-btn-ghost hm-c-btn-sm" data-dlg-open>Delete entry</button></div>
        <div class="hm-dlg-empty" data-dlg-empty hidden>Entry deleted. <button type="button" class="hm-dlg-reset" data-dlg-reset>Reset the demo</button></div>
        <div class="hm-dlg-overlay" data-dlg-overlay>
          <div class="hm-c-dialog" role="alertdialog" aria-modal="true" aria-labelledby="hm-dlg-t"><b id="hm-dlg-t">Delete this entry?</b><p>The amount will be removed from Bilal Traders&rsquo; balance.</p><div class="hm-c-dialog-acts"><button type="button" class="hm-c-btn hm-c-btn-ghost hm-c-btn-sm" data-dlg-cancel>Cancel</button><button type="button" class="hm-c-btn hm-c-btn-danger hm-c-btn-sm" data-dlg-confirm>Delete</button></div></div>
        </div>
      </div>
    </div>
  </div>
  <p class="hm-note">Specimens rebuilt in HTML from the Harmony spec. Sizing, radius and spacing all on the 8-point grid.</p>
  <div class="hm-grid-3">
    ${fig('cb-style-01.webp','Harmony Figma sheet: app bar variants, tabs and bottom navigation','App bar, tabs, bottom navigation.','1/1','hm-fig-sheet')}
    ${fig('cb-style-02.webp','Harmony Figma sheet: further component specimens from the style library','From the style library.','1/1','hm-fig-sheet')}
    ${fig('cb-style-03-ai.webp','Harmony Figma sheet: FAB and extended FAB component specimens from the style library','Floating action button and extended button components.','1/1','hm-fig-sheet')}
  </div>
  <p class="hm-note">The real Figma sheets the specimens above were rebuilt from.</p>

  <h3>Auto layout</h3>
  <p class="hm-reveal">Every component was built with auto layout, so one definition held at any width instead of a copy per breakpoint.</p>
  <div class="hm-stretch">
    <div class="hm-stretch-item" style="--w:320px"><span class="hm-board-label">320px</span><div class="hm-c-row"><span class="hm-c-row-avatar">B</span><span class="hm-c-row-text"><b>Bilal Traders</b><small>Paid 12,000</small></span><span class="hm-c-row-amt">12,000</span></div></div><div class="hm-stretch-item" style="--w:480px"><span class="hm-board-label">480px</span><div class="hm-c-row"><span class="hm-c-row-avatar">B</span><span class="hm-c-row-text"><b>Bilal Traders</b><small>Paid 12,000</small></span><span class="hm-c-row-amt">12,000</span></div></div><div class="hm-stretch-item" style="--w:100%"><span class="hm-board-label">Fill</span><div class="hm-c-row"><span class="hm-c-row-avatar">B</span><span class="hm-c-row-text"><b>Bilal Traders</b><small>Paid 12,000</small></span><span class="hm-c-row-amt">12,000</span></div></div>
  </div>

  <h3>Micro-interactions</h3>
  <p class="hm-reveal">States tell you what a component <em>is</em>. Micro-interactions tell you what just happened. Five were specified once and inherited everywhere: hover, press, focus, loading and confirmation. Each runs 150 to 250ms on the same easing curve, and every one is disabled under reduced motion.</p>
  <div class="hm-micro">
    <div class="hm-micro-item hm-reveal" style="--i:0" data-micro="lift">
      <div class="hm-micro-stage"><span class="hm-micro-card">Ledger entry</span></div>
      <b>Lift on hover</b>
      <span class="hm-micro-what">Card and list rows rise 4px with a shadow.</span>
      <span class="hm-micro-why">Tells a touch-first audience which blocks are tappable before they commit. The app had no hover language at all.</span>
    </div>
    <div class="hm-micro-item hm-reveal" style="--i:1" data-micro="press">
      <div class="hm-micro-stage"><button type="button" class="hm-micro-btn">Record entry</button></div>
      <b>Press feedback</b>
      <span class="hm-micro-what">Buttons scale to 0.97 for 120ms.</span>
      <span class="hm-micro-why">On low-end Android the network lag made taps feel dropped; the scale confirms receipt before the response lands.</span>
    </div>
    <div class="hm-micro-item hm-reveal" style="--i:2" data-micro="focus">
      <div class="hm-micro-stage"><button type="button" class="hm-micro-btn hm-micro-btn-ghost">Tab to me</button></div>
      <b>Focus ring</b>
      <span class="hm-micro-what">A 3px accent ring, never the browser default.</span>
      <span class="hm-micro-why">Keyboard and screen-reader users could not track position; the ring is part of the token set, so it can never drift.</span>
    </div>
    <div class="hm-micro-item hm-reveal" style="--i:3" data-micro="load">
      <div class="hm-micro-stage"><span class="hm-micro-skel"></span></div>
      <b>Loading</b>
      <span class="hm-micro-what">A 900ms shimmer over the shape the content will take.</span>
      <span class="hm-micro-why">Replaces a spinner with the layout itself, so the screen does not jump when data arrives.</span>
    </div>
    <div class="hm-micro-item hm-reveal" style="--i:4" data-micro="confirm">
      <div class="hm-micro-stage"><span class="hm-micro-confirm"><i></i>Saved</span></div>
      <b>Confirmation</b>
      <span class="hm-micro-what">A dot fills and a label swaps for 1.2s.</span>
      <span class="hm-micro-why">Entries save silently; users re-tapped because nothing acknowledged them. One dot ended the duplicates.</span>
    </div>
  </div>
  <p class="hm-note">Hover or focus a specimen to play it.</p>
`)}

${chapter(9,'Tokens','Tokens as the source of truth',`
  <p class="hm-reveal">The team kept asking the same questions. What’s the smallest radius? What size is button text? Figma Tokens answered them once. Global, light, dark and theme sets held colour, radius, spacing and type, and pushed a change to every component at once.</p>
  <ul class="hm-tokens" aria-label="Design tokens, click to copy">
    ${tokens.map((t,i)=>`<li><button type="button" class="hm-token" data-copy="${t[0]}" style="--i:${Math.min(i,7)}"><b>${t[0]}</b><span>${t[1]}</span></button></li>`).join('')}
  </ul>
  <p class="hm-copy-live visually-hidden" role="status" aria-live="polite"></p>
  ${fig('cb-tokens.webp','The Figma Tokens panel open beside the button, navigation and dialog component sheets, showing the global set with colour, background, foreground and state ramps','Global, light, dark and theme sets, pushing one change to every component.','4/3')}
`)}

${chapter(10,'Rollout','Adoption was planned, not hoped for',`
  <p class="hm-reveal">Every screen was mapped against every layer of the system, then released in three phases: structure first, surface second, craft last.</p>
  ${matrix()}
  ${fig('cb-implementation.webp','The original implementation-breakdown spreadsheet: phases A, B and C mapped against all sixteen screens','The working sheet the matrix above was drawn from.','3.7/1')}
  <h3>Documentation</h3>
  <div class="hm-docs">
    ${docs.map((d,i)=>`<div class="hm-doc hm-reveal" style="--i:${Math.min(i,7)}"><b>${d[0]}</b><p>${d[1]}</p></div>`).join('')}
  </div>
`)}

${chapter(11,'Did anyone notice?','Did anyone notice?',`
  <div class="content-card dark hm-validation">
    <p class="hm-validation-lead">April 2022, Lahore. Two long-standing users were handed a prototype rebuilt entirely in Harmony.</p>
    <ul class="hm-validation-list">
      <li style="--i:0">Both thought the demo and the app they use were exactly the same.</li>
      <li style="--i:1">No differences in typeface, colour or aesthetics were recognised.</li>
      <li style="--i:2">Neither hesitated approaching the rebuilt app to do their everyday tasks.</li>
    </ul>
    <p class="hm-validation-note">Two participants, directional, not statistical. But when the question is “does the rebuilt app still feel like your app?”, the people who use it every day are the only credible judges.</p>
    <p class="hm-validation-kicker">A design system succeeds when it disappears.</p>
  </div>
`)}

${chapter(12,'Impact','What the system returned',`
  <p class="hm-reveal">Six months of foundation work, as reported in the team&rsquo;s end-of-rollout review.</p>
  <div class="metrics hm-metrics">
    ${[['54%','Customer productivity','lift, per the end-of-rollout review'],['40%','Fewer inconsistencies','across the rebuilt screens'],['14','Heuristic issues','carried into the rollout backlog'],['6 mo.','Build and scale','from first audit to full rollout']].map((m,i)=>`<div class="metric hm-metric" style="--i:${i}"><strong data-value="${m[0]}">${m[0]}</strong><b>${m[1]}</b><span>${m[2]}</span></div>`).join('')}
  </div>
  <div class="content-card hm-metric-method hm-reveal">
    <h3>How the metrics were measured</h3>
    <p><strong>40% fewer inconsistencies:</strong> release QA logged 45 interface defects per release before Harmony and 27 after rollout. The calculation is <span class="hm-formula">(45 − 27) ÷ 45 × 100 = 40%</span>.</p>
    <p><strong>54% productivity lift:</strong> this is the figure recorded in the team&rsquo;s end-of-rollout review. I present it as a reported result because the original calculation worksheet is not part of this case-study archive.</p>
  </div>
`)}

${chapter(13,'Retrospective','What worked, what didn’t',`
  <div class="finding-grid hm-retro">
    <div class="finding hm-reveal" style="--i:0"><h3>What worked</h3><p>Focused backlog. Consistent feedback loops within the team. An implementation strategy that got better iteratively. Staying adaptive through the process.</p></div>
    <div class="finding hm-reveal" style="--i:1"><h3>What didn’t</h3><p>Underestimated timelines. The complexity of the process. One person on a whole system. Incremental work should have been planned up front. Implementation should have started earlier.</p></div>
    <div class="finding hm-reveal" style="--i:2"><h3>What I’d change</h3><p>Reference screens kept current so old screens don’t ship. A stricter screen naming convention. Reviewing the logic of screens before building out changes.</p></div>
  </div>
`)}

${chapter(14,'Not the end','This is not the end',`
  <p class="hm-lead hm-reveal">A design system never finishes. Harmony will keep growing, and it has already done what it was built for: saved time, and made consistency the default rather than the argument.</p>
  <div class="case-end hm-end">
    <p class="hm-end-statement">Consistency became the default, <em>not the achievement.</em></p>
    <div class="hm-end-row">
      <div class="hm-end-byline"><b>Case study by Saeed Shaffi</b><span>Harmony design system · CreditBook · 2021 to 2022</span></div>
      <a class="button primary hm-end-cta" href="#/" data-scroll-target="selected-work">Next: explore all work</a>
    </div>
  </div>
`)}

    </article>
  </div>
</div>`;
  };

  window.initHarmonyCase=function(){
    const root=document.querySelector('.hm-case');
    if(!root)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if(reduce){
      root.querySelectorAll('.hm-reveal,.hm-rail-node,.hm-sev-row,.hm-metric,.hm-validation-list li').forEach(el=>el.classList.add('is-in'));
      root.querySelectorAll('.hm-sev-bar').forEach(b=>b.style.width=b.style.getPropertyValue('--w'));
    }else{
      const io=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(!e.isIntersecting)return;
          e.target.classList.add('is-in');
          if(e.target.classList.contains('hm-sev')){
            e.target.querySelectorAll('.hm-sev-bar').forEach(b=>{b.style.width=b.style.getPropertyValue('--w');});
          }
          if(e.target.classList.contains('hm-metrics'))countUp(e.target);
          io.unobserve(e.target);
        });
      },{threshold:0.12});
      root.querySelectorAll('.hm-reveal,.hm-rail,.hm-sev,.hm-metrics,.hm-validation,.hm-type-row,.hm-token,.hm-fig,.hm-matrix').forEach(el=>io.observe(el));
    }

    function countUp(scope){
      scope.querySelectorAll('strong[data-value]').forEach(el=>{
        const raw=el.dataset.value;
        const num=parseFloat(raw);
        if(isNaN(num))return;
        const suffix=raw.replace(/^[\d.]+/,'');
        const start=performance.now(), dur=900;
        const step=now=>{
          const t=Math.min(1,(now-start)/dur);
          const eased=1-Math.pow(1-t,3);
          el.textContent=(num<10?(num*eased).toFixed(0):Math.round(num*eased))+suffix;
          if(t<1)requestAnimationFrame(step); else el.textContent=raw;
        };
        requestAnimationFrame(step);
      });
    }

    // Scroll spy
    const links=[...root.querySelectorAll('.hm-toc a')];
    const sections=links.map(a=>root.querySelector(a.getAttribute('href')));

    /* Chapter links scroll in place. Without this, the href hash (#hm-N) lands
       in the router, which re-renders the app shell and dumps the reader back
       on the home page. */
    links.forEach(a=>a.addEventListener('click',event=>{
      const section=root.querySelector(a.getAttribute('href'));
      if(!section)return;
      event.preventDefault();
      section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    }));

    /* Mobile TOC: collapse the 14 chapters behind a sticky trigger, matching
       the pattern KFH, Eyewa and Talon already use. Desktop is untouched
       (the trigger is display:none above 900px). */
    const tocEl=root.querySelector('.hm-toc');
    if(tocEl&&!tocEl.querySelector('.mobile-toc-trigger')&&links.length){
      const group=document.createElement('div');
      group.className='toc-links';group.id='hm-chapter-links';
      links.forEach(a=>group.appendChild(a));
      const trigger=document.createElement('button');
      trigger.className='mobile-toc-trigger';trigger.type='button';
      trigger.setAttribute('aria-expanded','false');
      trigger.setAttribute('aria-controls',group.id);
      trigger.innerHTML=`<span><small>Chapter</small><b class="mobile-toc-current">${links[0].textContent.trim()}</b></span><i aria-hidden="true"></i>`;
      trigger.addEventListener('click',()=>{const open=tocEl.classList.toggle('toc-open');trigger.setAttribute('aria-expanded',String(open));});
      group.addEventListener('click',()=>{tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');});
      tocEl.addEventListener('keydown',e=>{if(e.key!=='Escape')return;tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');trigger.focus();});
      tocEl.append(trigger,group);
    }
    const currentLabel=tocEl?tocEl.querySelector('.mobile-toc-current'):null;

    if(links.length){
      const spy=new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(!e.isIntersecting)return;
          const i=sections.indexOf(e.target);
          links.forEach((l,n)=>{
            l.classList.toggle('active',n===i);
            if(n===i)l.setAttribute('aria-current','true'); else l.removeAttribute('aria-current');
          });
          if(currentLabel&&links[i])currentLabel.textContent=links[i].textContent.trim();
        });
      },{rootMargin:'-96px 0px -70% 0px'});
      sections.forEach(s=>s&&spy.observe(s));
    }

    // Scroll progress
    const bar=root.querySelector('.hm-progress i');
    if(bar){
      const onScroll=()=>{
        const h=document.documentElement;
        const p=h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight);
        bar.style.transform='scaleX('+p.toFixed(4)+')';
      };
      window.addEventListener('scroll',onScroll,{passive:true});
      onScroll();
    }

    // Live specimen board
    const chip=(cell,s)=>{const b=cell.querySelector('[data-live-state]');if(b&&b.textContent!==s){b.textContent=s;const c=b.closest('.hm-live-state');c.classList.remove('is-tick');void b.offsetWidth;c.classList.add('is-tick')}};

    const amtCell=root.querySelector('[data-live=amount]');
    if(amtCell){
      const field=amtCell.querySelector('.hm-amt:not(.is-disabled)');
      const input=field.querySelector('input');
      const msg=amtCell.querySelector('[data-live-msg]');
      const base=msg.textContent;
      let hover=false,focus=false;
      const parse=v=>parseFloat(v.replace(/,/g,''));
      const update=()=>{
        const v=input.value.trim();let s='Default',err='';
        if(v){
          const n=parse(v);
          if(!/^[0-9.,]+$/.test(v)||isNaN(n))err='Numbers only \u2014 the ledger can\u2019t read that.';
          else if(n<=0)err='An entry needs an amount above zero.';
          else if(n>500000)err='Amounts above Rs 500,000 need owner approval.';
        }
        if(err)s='Error';else if(v)s='Filled';else if(focus)s='Focus';else if(hover)s='Hover';
        field.dataset.state=s.toLowerCase();
        msg.textContent=err||base;msg.classList.toggle('is-error',!!err);
        chip(amtCell,s);
      };
      input.addEventListener('focus',()=>{focus=true;update()});
      input.addEventListener('blur',()=>{focus=false;const v=input.value.trim();const n=parse(v);if(v&&/^[0-9.,]+$/.test(v)&&!isNaN(n)&&n>0&&n<=500000){input.value=n%1?n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}):n.toLocaleString('en-IN')}update()});
      input.addEventListener('input',update);
      field.addEventListener('mouseenter',()=>{hover=true;update()});
      field.addEventListener('mouseleave',()=>{hover=false;update()});
    }

    const btnCell=root.querySelector('[data-live=button]');
    if(btnCell){
      const btn=btnCell.querySelector('.hm-live-btn'),label=btn.querySelector('.hm-btn-label');
      btn.addEventListener('mouseenter',()=>{if(!btn.disabled)chip(btnCell,'Hover')});
      btn.addEventListener('mouseleave',()=>{if(!btn.disabled)chip(btnCell,'Default')});
      btn.addEventListener('focus',()=>{if(!btn.disabled)chip(btnCell,'Focus')});
      btn.addEventListener('blur',()=>{if(!btn.disabled)chip(btnCell,'Default')});
      btn.addEventListener('click',()=>{
        btn.disabled=true;btn.classList.add('is-loading');label.textContent='Saving\u2026';chip(btnCell,'Loading');
        setTimeout(()=>{btn.classList.remove('is-loading');btn.classList.add('is-success');label.textContent='Saved \u2713';chip(btnCell,'Success');
          setTimeout(()=>{btn.classList.remove('is-success');btn.disabled=false;label.textContent='Record entry';chip(btnCell,'Default')},1300);
        },900);
      });
    }

    const pinCell=root.querySelector('[data-live=pin]');
    if(pinCell){
      const pinput=pinCell.querySelector('input'),boxes=[...pinCell.querySelectorAll('.hm-c-pin-box')],pmsg=pinCell.querySelector('[data-live-msg]'),pbase=pmsg.textContent;
      let lock=false;
      const render=()=>{
        if(lock)return;
        const v=pinput.value;
        boxes.forEach((b,i)=>{b.textContent=i<v.length?'\u2022':'';b.classList.toggle('is-filled',i<v.length);b.classList.toggle('is-active',document.activeElement===pinput&&i===v.length&&v.length<3);b.classList.remove('is-ok')});
        if(v.length===3){
          lock=true;boxes.forEach(b=>{b.classList.add('is-ok');b.classList.remove('is-active')});chip(pinCell,'Complete');pmsg.textContent='PIN accepted.';
          setTimeout(()=>{lock=false;pinput.value='';pmsg.textContent=pbase;render();chip(pinCell,document.activeElement===pinput?'Active':'Empty')},1100);
        }else chip(pinCell,v.length?'Filling':(document.activeElement===pinput?'Active':'Empty'));
      };
      pinput.addEventListener('input',()=>{pinput.value=pinput.value.replace(/\D/g,'').slice(0,3);render()});
      pinput.addEventListener('focus',render);pinput.addEventListener('blur',render);
    }

    const fCell=root.querySelector('[data-live=fields]');
    if(fCell){
      const ins=[...fCell.querySelectorAll('input')];
      const upd=()=>{setTimeout(()=>{const a=document.activeElement;const focused=ins.includes(a);const filled=ins.some(i=>i.value.trim());chip(fCell,focused?'Focus':(filled?'Filled':'Default'))},0)};
      ins.forEach(i=>['focus','blur','input'].forEach(ev=>i.addEventListener(ev,upd)));
    }

    const tCell=root.querySelector('[data-live=tabs]');
    if(tCell){
      const ttabs=[...tCell.querySelectorAll('[data-tab]')],tpanel=tCell.querySelector('[data-tab-panel]');
      const content={Ledger:'128 entries this month \u00b7 Rs 84,200 outstanding',Reports:'Monthly summary ready \u00b7 income up 12%',Customers:'42 active customers \u00b7 3 overdue'};
      ttabs.forEach(t=>t.addEventListener('click',()=>{
        ttabs.forEach(x=>{const on=x===t;x.classList.toggle('is-active',on);x.setAttribute('aria-selected',on?'true':'false')});
        tpanel.classList.remove('is-swap');void tpanel.offsetWidth;tpanel.classList.add('is-swap');
        tpanel.textContent=content[t.dataset.tab];chip(tCell,t.dataset.tab+' active');
      }));
    }

    const fabCell=root.querySelector('[data-live=fab]');
    if(fabCell){
      const fab=fabCell.querySelector('.hm-c-fab'),title=fabCell.querySelector('[data-appbar-title]');let ft;
      fab.addEventListener('click',()=>{chip(fabCell,'Pressed');title.textContent='Entry added \u2713';clearTimeout(ft);ft=setTimeout(()=>{title.textContent='Bilal Traders';chip(fabCell,'Default')},1100)});
    }

    const nCell=root.querySelector('[data-live=nav]');
    if(nCell){
      const nbs=[...nCell.querySelectorAll('.hm-c-bottomnav button')];
      nbs.forEach(b=>b.addEventListener('click',()=>{nbs.forEach(x=>{const on=x===b;x.classList.toggle('is-active',on);x.setAttribute('aria-pressed',on?'true':'false')});chip(nCell,b.textContent+' active')}));
    }

    const dCell=root.querySelector('[data-live=dialog]');
    if(dCell){
      const dopen=dCell.querySelector('[data-dlg-open]'),overlay=dCell.querySelector('[data-dlg-overlay]'),row=dCell.querySelector('[data-dlg-row]'),dempty=dCell.querySelector('[data-dlg-empty]'),dcancel=dCell.querySelector('[data-dlg-cancel]'),dconfirm=dCell.querySelector('[data-dlg-confirm]'),dreset=dCell.querySelector('[data-dlg-reset]');
      const close=s=>{dCell.classList.remove('is-open');chip(dCell,s);dopen.focus()};
      dopen.addEventListener('click',()=>{dCell.classList.add('is-open');chip(dCell,'Open');dcancel.focus()});
      dcancel.addEventListener('click',()=>close('Cancelled'));
      overlay.addEventListener('click',e=>{if(e.target===overlay)close('Cancelled')});
      dCell.addEventListener('keydown',e=>{if(e.key==='Escape'&&dCell.classList.contains('is-open'))close('Cancelled')});
      dconfirm.addEventListener('click',()=>{dCell.classList.remove('is-open');row.classList.add('is-removed');dopen.parentElement.hidden=true;setTimeout(()=>{row.hidden=true;dempty.hidden=false},250);chip(dCell,'Deleted')});
      dreset.addEventListener('click',()=>{row.hidden=false;requestAnimationFrame(()=>row.classList.remove('is-removed'));dempty.hidden=true;dopen.parentElement.hidden=false;chip(dCell,'Closed')});
    }

    // Rollout matrix
    const mx=root.querySelector('.hm-mx');
    if(mx){
      const rtabs=[...root.querySelectorAll('.hm-roll-tab')];
      rtabs.forEach(t=>t.addEventListener('click',()=>{
        const f=t.dataset.filter;
        rtabs.forEach(x=>{const on=x===t;x.classList.toggle('is-active',on);x.setAttribute('aria-pressed',on?'true':'false');});
        mx.querySelectorAll('tbody[data-phase]').forEach(tb=>tb.classList.toggle('is-dim',f!=='all'&&tb.dataset.phase!==f&&tb.dataset.phase!=='ship'));
      }));
      const clear=()=>mx.querySelectorAll('.is-cross').forEach(e=>e.classList.remove('is-cross'));
      mx.addEventListener('pointermove',e=>{
        const td=e.target.closest('td[data-c]');
        clear();
        if(!td)return;
        td.closest('tr').classList.add('is-cross');
        mx.querySelectorAll('[data-c="'+td.dataset.c+'"]').forEach(x=>x.classList.add('is-cross'));
      });
      mx.addEventListener('pointerleave',clear);
    }

    // Token copy
    const live=root.querySelector('.hm-copy-live');
    root.querySelectorAll('.hm-token').forEach(btn=>{
      btn.addEventListener('click',async()=>{
        const value=btn.dataset.copy||'';
        try{ await navigator.clipboard.writeText(value); }catch(e){}
        btn.classList.add('is-copied');
        if(live)live.textContent=value+' copied';
        setTimeout(()=>btn.classList.remove('is-copied'),1200);
      });
    });
  };
})();
;
/* ===== eyewa-case.js ===== */
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

  const hifi=[['hifi-01.png','Sign in'],['hifi-02.webp','Contact information'],['hifi-03.webp','Shipping details'],['hifi-04.png','Order summary'],['hifi-05.png','Payment']];
  const proposed=[['prop-05.png','Sign in'],['prop-04.webp','Contact information'],['prop-03.webp','Shipping details'],['prop-02.png','Order summary'],['prop-01.webp','Payment']];
  const originals=[['orig-02.webp','Create account'],['orig-04.png','Contact information'],['orig-03.webp','Shipping method'],['orig-05.webp','Cart summary'],['orig-01.webp','Payment']];
  const lofi=[['lofi-04.webp','Login'],['lofi-03.webp','Contact information'],['lofi-02.webp','Shipping'],['lofi-01.webp','Summary']];

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
    ${[['fig/prop-05.png','Sign in'],['fig/prop-03.webp','Shipping details'],['fig/prop-01.webp','Payment']].map(([f,t],i)=>`<span class="ey-hero-shot" style="--h:${i}">${shot(A+f,'Redesigned checkout · '+t,t+' screen from the redesigned checkout')}</span>`).join('')}
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
  ${fig(`<img src="${F}benchmark-cards.webp" alt="Amazon, AliExpress, Walmart and Zalando" loading="lazy" decoding="async">`,'The four platforms studied, chosen because customers in the region use them weekly.','ey-fig-plain')}
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
  ${gallery([['orig-cart.webp','Cart'],['orig-contact.png','Contact information'],['orig-shipping.webp','Shipping method'],['orig-payment.png','Payment'],['orig-payment-2.webp','Payment · full page'],['orig-thankyou.webp','Order confirmation'],['orig-account.webp','Create account'],['orig-summary.png','Order summary']],4)}
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
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-a.webp','Cart heat map','Heat map of the cart screen')}</div>`,'Cart')}
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-b.webp','Contact information heat map','Heat map of the contact information screen')}</div>`,'Contact information')}
      ${cell(`<div class="ey-heatwrap ey-heatlive">${shot(F+'heat-c.webp','Shipping heat map','Heat map of the shipping method and address screen')}</div>`,'Shipping')}
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
  ${fig(shot(F+'imp-login-v2.webp','Improvements: login','Login screen across old design, first iteration and final design'),'Old design, first iteration and final design, left to right.','ey-fig-plain')}
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
    <div><figure class="ey-fig">${shot(F+'orig-payment-2.webp','Old design','Original payment screen showing the order summary, card fields, billing checkbox and trust mark in one long checkout step.')}<figcaption><b>Old design</b>Card fields, order summary and billing checkbox competing on one scroll, with the trust marks below the fold.</figcaption></figure></div>
    <div><figure class="ey-fig">${shot(F+'pay-final.webp','Final design','Payment method chosen first, three card fields, and the SSL assurance sitting directly above the pay button.')}<figcaption><b>Final design</b>Payment method chosen first, three card fields, and the SSL assurance sitting directly above the pay button.</figcaption></figure></div>
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
;
/* ===== talon-case.js ===== */
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

<section class="chapter" id="talon-3" data-screen-label="03"><span class="chapter-num">03 / Product research</span><h2 class="chapter-title">Understanding the product</h2><p>Since I had never operated a promotion engine, I started where Talon.One teaches its own customers: the documentation and the official YouTube channel. The tutorial series walked through building campaigns, coupon codes and referral programs, and gave me a working mental model of applications, campaigns, rules and effects.</p>${big('youtube.webp','Talon.One’s tutorial library, my crash course in how the promotion engine is meant to be used.','Talon.One YouTube channel with tutorial videos on campaigns, coupons and referrals',true)}<h3>Who relies on it</h3><p>The customer list explains the stakes. Enterprise brands run revenue-critical promotions through this tool. If campaign creation is confusing, the cost lands on every one of these teams.</p><figure class="media-block"><figcaption>A sample of the brands running promotions on Talon.One.</figcaption>${wall}</figure></section>

<section class="chapter" id="talon-4" data-screen-label="04"><span class="chapter-num">04 / User interviews</span><h2 class="chapter-title">Recruiting real users</h2><p>I had no access to Talon.One’s customers, so I recruited my own. On LinkedIn I contacted people who create or manage campaigns for a living, marketers, project managers and engineers at companies already using the product, including adidas and Zalando.</p>${big('outreach.webp','Outreach messages sent during the sprint. The adidas and Zalando contacts came from Talon.One’s own customer list.','LinkedIn messages sent to a marketing student, an adidas project manager and a Zalando engineer',true)}<h3>Potential customers</h3><p>I also interviewed teams at PriceOye and PayPro, two companies that run promotion campaigns today and match Talon.One’s target profile, to hear how they expect campaign creation to work.</p><figure class="media-block"><figcaption>Potential customers interviewed during the sprint.</figcaption>${chips([['customer-1.png','PriceOye'],['customer-2.png','PayPro']])}</figure><h3>What the interviews surfaced</h3>${bullet(['People creating campaigns think in steps: rules, then filters, then coupons, then activation.','New users could not tell how many steps campaign creation involved, or where they were in it.','Marketers leaned on tools they already knew, most named Google Ads as their reference point.'])}<div class="finding-grid tl-anim"><div class="finding tl-i"><strong><span class="tl-count" data-to="5">5</span><span></span></strong>interviews in three days</div><div class="finding tl-i"><strong><span class="tl-count" data-to="2">2</span><span></span></strong>user groups: marketers and engineers</div><div class="finding tl-i"><strong><span class="tl-count" data-to="4">4</span><span></span></strong>crucial issues in Create Campaign</div><div class="finding tl-i"><strong><span class="tl-count" data-to="52">52</span><span>/100</span></strong>Microsoft Clarity score on key screens</div></div></section>

<section class="chapter" id="talon-5" data-screen-label="05"><span class="chapter-num">05 / Flow mapping</span><h2 class="chapter-title">Mapping the existing flows</h2><p>Before changing anything, I mapped how the app is actually structured, applications, the sidebar, filters and campaigns, and traced every path a user can take to create a campaign.</p><figure class="media-block"><figcaption>The application structure, rebuilt from my flow map. The highlighted node is the campaign creation path.</figcaption>${flowMap}</figure><h3>The flow that mattered</h3><p>One branch carried the sprint: Create Campaign. It splits into “from scratch” and “from a template”, then asks for a name and optional features before landing on campaign detail.</p><figure class="media-block"><figcaption>Create Campaign, isolated, the flow the redesign focuses on.</figcaption>${flowSelected}</figure></section>

<section class="chapter" id="talon-6" data-screen-label="06"><span class="chapter-num">06 / Heuristic evaluation</span><h2 class="chapter-title">Heuristic evaluation</h2><p>I walked the Campaign Dashboard, campaign detail and Create Campaign screens against Nielsen’s heuristics, logging each problem with a priority and a recommendation. The single emergency-level finding: users cannot figure out the next steps to set up a new campaign.</p><figure class="media-block"><figcaption>The heuristics log, every problem, its heuristic, priority and recommendation.</figcaption>${heurTable}</figure></section>

<section class="chapter" id="talon-7" data-screen-label="07"><span class="chapter-num">07 / Data and benchmarks</span><h2 class="chapter-title">What the data showed</h2><p>Microsoft Clarity confirmed the heuristics with behavioural data. The campaign screens scored 52, lower clarity than 60% of the most popular websites, and the click maps showed attention scattered across the page instead of following a path.</p><figure class="media-block"><figcaption>Clarity score for the campaign screens, rebuilt from the Clarity report.</figcaption>${clarity}</figure><div class="content-card tl-score-method"><h3>How the score was measured</h3><p>The 52/100 value came directly from Microsoft Clarity&rsquo;s report for the original campaign screens. It is a third-party diagnostic score, not a percentage I calculated from the five interviews or from the redesigned prototype. I used the separate click heatmap to understand what the score looked like in behaviour: attention was dispersed, with no dominant path through the screen.</p></div>${big('clarity-heatmap.webp','Clicks spread thinly across campaign detail, no dominant path.','Campaign detail screen overlaid with click percentages from Microsoft Clarity')}<h2 class="section-title">Competitive analysis</h2><p>I compared how Viral Loops, Antavo and Google Ads handle the same job: setting up a campaign with rules and rewards.</p><figure class="media-block"><figcaption>The three products benchmarked against Talon.One.</figcaption>${chips([['comp-1.png','Viral Loops'],['comp-2.png','Antavo, loyalty programs for retail'],['comp-3.png','Google Ads']])}</figure><h3>Jakob’s law</h3><p>Users spend most of their time on other products, so they expect new tools to work like the ones they already know. Google Ads, the tool my interviewees knew best, walks users through campaign setup with a numbered stepper. That pattern became the backbone of the redesign.</p>${big('jakobs-law.png','Google Ads breaks campaign creation into four visible steps.','Google Ads campaign setup with numbered steps: select campaign settings, set up ad groups, create ads, review',true)}</section>

<section class="chapter" id="talon-8" data-screen-label="08"><span class="chapter-num">08 / Design and prototype</span><h2 class="chapter-title">From flows to interface</h2><h3>The redesigned flow</h3><p>The new Create Campaign journey follows the order users described in interviews: campaign, rules, cart item filters, coupons, activate. One decision per screen, with a stepper showing progress throughout.</p><figure class="media-block"><figcaption>The updated flow, a straight line where the original branched and doubled back.</figcaption>${flowUpdated}</figure><h3>Paper wireframes</h3><p>I sketched the stepper concept on paper first: numbered steps across the top, and the “from scratch / from template” choice as two large cards.</p>${big('paper-wireframes.webp','First pass on paper, steps along the top, two clear starting points.','Paper sketch of the Create Campaign screen with numbered steps and two cards for from scratch and from template',true)}<h3>Low and high fidelity wireframes</h3><p>The lo-fi pass places the stepper, name field and optional features; the hi-fi wireframe adds the four step breadcrumb and selected states.</p><figure class="media-block"><figcaption>The same screen, looping from lo-fi to hi-fi.</figcaption>${morph}</figure><h3>Before the redesign</h3><p>The original entry point: a bare empty state, an icon-only rail, and no hint of what happens after the button.</p>${big('before.webp','The original Campaigns screen.','Original Talon.One Campaigns screen with an empty state and Create Campaign button')}<h3>Improvements</h3>${bullet(['Icon navigation gained labels and clear active states, so users always know where they are.','Inactive items were visually quietened to keep focus on the current section.','Hover states preview where each item leads before users commit to a click.','A four step breadcrumb replaces the unmarked creation journey.'])}${big('improvements.png','Sidebar improvements, annotated.','Annotated sidebar comparison showing active tab treatment, quieter inactive tabs and hover behaviour')}<h2 class="section-title">Final interface</h2>${big('after.png','The redesigned Campaigns screen with labelled navigation and a clearer empty state.','Redesigned Campaigns screen with labelled navigation and a clearer empty state')}${big('prototype.png','The new Create a Campaign step, a four step breadcrumb replaces the unmarked journey.','Prototype of the redesigned Create a Campaign screen with stepper, selection cards, campaign name and features')}${big('rule-builder.png','Rule building in plain language, conditions on top, effects below.','Rule creation step with conditions and effects: 20% off with coupon, coupon code is valid, discount individual items')}</section>

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
;
/* ===== ai-system-case.js ===== */
/* AI Design System case study, aligned to the KFH editorial structure. */
(function(){
  const CASE_ASSET='assets/ai-system/sanitized/';
  const shot=(src,label,alt,cls='')=>`<figure class="media-block ai-system-evidence ${cls}"><figcaption>${label}</figcaption><div class="ai-system-shot"><img src="${CASE_ASSET}${src}" alt="${alt}" loading="lazy" decoding="async"></div></figure>`;
  const gallery=(items,label)=>`<figure class="media-block ai-system-evidence ai-system-evidence-gallery"><figcaption>${label}</figcaption><div class="ai-system-shot-grid">${items.map(([src,alt])=>`<div class="ai-system-shot"><img src="${CASE_ASSET}${src}" alt="${alt}" loading="lazy" decoding="async"></div>`).join('')}</div></figure>`;
  const bullet=x=>`<ul>${x.map(v=>`<li>${v}</li>`).join('')}</ul>`;
  const flow=(title,steps,cls)=>`<div><h4>${title}</h4><ol class="${cls||''}">${steps.map(s=>`<li><span>${s}</span></li>`).join('')}</ol></div>`;

  const contextData=[
    ['Component principles',['Components are reusable, never screen-specific.','Product logic stays outside primitive UI components.','Variants are explicit, never ad hoc CSS overrides.','Prefer existing project patterns over new abstractions.']],
    ['Design tokens',['Spacing comes from defined tokens only.','Colours map to semantic tokens, never arbitrary values.','Radius, borders and elevation follow system definitions.']],
    ['State behaviour',['Every interactive component accounts for default, hover, focus, filled, disabled, error and read only.','Loading and selected states are declared where applicable.']],
    ['Accessibility',['Interactive controls support keyboard navigation.','Focus states are visible.','Labels stay programmatically connected to controls.','Errors never depend on colour alone.','ARIA only where native semantics are insufficient.']],
    ['Resilience',['Long text and missing text must not break layout.','Validation must not unexpectedly shift layout.','Components survive realistic container constraints.']],
    ['Code quality',['Keep APIs understandable and predictable.','Prefer composition over endless boolean props.','Document non-obvious behaviour.']],
    ['Dependency rules',['Avoid unnecessary dependencies.','Never add a package for behaviour available through existing utilities without engineering approval.']],
    ['Migration safety',['Find, classify and map occurrences before replacing.','High risk instances always route through engineering review.']],
    ['AI guardrails',['Do not invent project APIs.','Do not assume a dependency exists.','Do not rewrite unrelated files.','Flag uncertainty and separate assumptions from verified detail.']],
    ['Known AI mistakes',['Every issue found in review becomes a rule here.','Repeated violations are tracked and fed back into context.']]
  ];

  const toc=['Brief and context','The challenge','Why Figma alone fails','The hypothesis','Winning the room','Engineering discovery','Governed AI context','The component loop','Migration at scale','Dual track roadmap','Outcomes and measurement','What I learned'];

  const ownershipBlock=`<section class="ai-system-ownership" aria-labelledby="ai-system-ownership-title">
    <span class="eyebrow">Scope and collaboration</span>
    <h2 id="ai-system-ownership-title">I expanded design ownership without removing engineering authority</h2>
    <p>The experiment worked because responsibility was explicit. I owned the system direction and the first implementation loop. Frontend engineers retained the decisions that protect the product.</p>
    <div class="ai-system-ownership-grid">
      <div><h3>What I owned</h3>${bullet(['Design system direction, foundations and component states.','Developer interviews and synthesis of acceptance criteria.','The AI workflow hypothesis and governed instruction layer.','Component pilots, review preparation and migration model.'])}</div>
      <div><h3>What engineering retained</h3>${bullet(['Architecture decisions and fit with the existing codebase.','Edge case, accessibility and maintainability validation.','Dependency approval, integration and production readiness.','Final review of generated implementation before adoption.'])}</div>
    </div>
  </section>`;

  const pushbackBlock=`<section class="ai-system-deepdive" aria-labelledby="ai-system-pushback-title">
    <span class="chapter-num">Decision evidence</span>
    <h2 id="ai-system-pushback-title">Pushback became the acceptance criteria</h2>
    <p>I treated concerns raised in developer interviews as design inputs. Each concern changed the workflow rather than becoming an objection to work around.</p>
    <div class="ai-system-decision-table" role="table" aria-label="Developer concerns and design responses">
      <div class="ai-system-decision-head" role="row"><b role="columnheader">Concern</b><b role="columnheader">What could go wrong</b><b role="columnheader">How I responded</b></div>
      <div class="ai-system-decision-row" role="row"><strong role="cell">Architecture drift</strong><span role="cell">Generated components might invent structures the product could not maintain.</span><span role="cell">I extracted existing patterns and made “prefer the current architecture” an explicit rule.</span></div>
      <div class="ai-system-decision-row" role="row"><strong role="cell">Dependency risk</strong><span role="cell">A convenient package could increase maintenance and security exposure.</span><span role="cell">Existing utilities became the default. Any new dependency required engineering approval.</span></div>
      <div class="ai-system-decision-row" role="row"><strong role="cell">Edge cases</strong><span role="cell">A visually correct component could still fail keyboard, validation or layout scenarios.</span><span role="cell">State, resilience and accessibility checks were added before integration.</span></div>
      <div class="ai-system-decision-row" role="row"><strong role="cell">Role clarity</strong><span role="cell">Designer implementation could sound like engineering replacement.</span><span role="cell">I clarified the handoff: design creates the first pass; engineering validates, integrates and approves.</span></div>
    </div>
  </section>`;

  const securityBlock=`<section class="ai-system-deepdive ai-system-security" aria-labelledby="ai-system-security-title">
    <span class="chapter-num">Security and trust</span>
    <h2 id="ai-system-security-title">AI was not the hardest part. Trust was.</h2>
    <p>Capability alone would not make the workflow adoptable. It needed technical trust, professional trust and information boundaries that were easy to explain and repeat.</p>
    <div class="ai-system-trust-types"><div><b>Technical trust</b><span>Will the output fit the architecture and survive review?</span></div><div><b>Professional trust</b><span>Are roles, accountability and final approval still clear?</span></div><div><b>Information trust</b><span>Can the task be completed without exposing unnecessary data?</span></div></div>
    <div class="ai-system-security-flow" aria-label="AI context security boundary"><div><small>Private environment</small><b>Product and repository context</b><span>Kept inside the organization</span></div><i aria-hidden="true">→</i><div><small>Minimum necessary context</small><b>Sanitized task packet</b><span>Patterns, constraints and acceptance rules only</span></div><i aria-hidden="true">→</i><div><small>Human gate</small><b>Engineering review</b><span>Validate, integrate or reject</span></div></div>
    <div class="ai-system-security-grid">
      <div><h3>Never included</h3>${bullet(['Customer information or production records.','Secrets, credentials or internal access details.','Complete repository access or unrelated source files.','Unnecessary proprietary names, links or business context.'])}</div>
      <div><h3>Working controls</h3>${bullet(['Provide only the context required for one component task.','Separate verified facts from assumptions and flag uncertainty.','Prefer approved patterns and dependencies already in use.','Require human review before generated work reaches integration.'])}</div>
    </div>
    <p class="ai-system-note">These were working controls for this initiative, not a claim of organization wide security certification.</p>
  </section>`;

  const pilotBlock=`<section class="ai-system-deepdive" aria-labelledby="ai-system-pilot-title">
    <span class="chapter-num">Detailed pilot</span>
    <h2 id="ai-system-pilot-title">The input pilot, end to end</h2>
    <p>The useful story was not that AI generated an input. It was how a component moved from design intent to an engineering reviewed system asset, and how the mistakes improved every component after it.</p>
    <ol class="ai-system-pilot-steps">
      <li><b>Choose the pilot</b><span>Select a common component with enough states to expose weak assumptions.</span></li><li><b>Define behaviour</b><span>Document focus, validation, disabled, read only, content and layout states.</span></li><li><b>Generate a first pass</b><span>Use only the task context and known project constraints.</span></li><li><b>Review with engineering</b><span>Inspect architecture fit, dependencies, accessibility and resilience.</span></li><li><b>Turn issues into rules</b><span>Record each review finding in the shared instruction layer.</span></li><li><b>Regenerate and validate</b><span>Apply the improved context, then route the result through the same human gate.</span></li>
    </ol>
    <h3>What review changed</h3><p class="ai-system-note">Representative, anonymized examples. Proprietary syntax and implementation details removed.</p>
    <div class="ai-system-code-evidence">
      <div><header><b>Dependency</b><span>Reject convenience that creates long term cost</span></header><div><small>First pass</small><code>import Input from "new form package"</code></div><div><small>Corrected rule</small><code>Use the existing field base. New packages require approval.</code></div></div>
      <div><header><b>Design tokens</b><span>Replace visual guesses with system semantics</span></header><div><small>First pass</small><code>borderColor = "#c9c8c4"</code></div><div><small>Corrected rule</small><code>borderColor = tokens.borderDefault</code></div></div>
      <div><header><b>Accessible behaviour</b><span>Make the contract explicit, not implied by appearance</span></header><div><small>First pass</small><code>Input placeholder="Work email"</code></div><div><small>Corrected rule</small><code>Input label="Work email" errorText="Required"</code></div></div>
    </div>
  </section>`;

  const maturityBlock=`<section class="ai-system-deepdive" aria-labelledby="ai-system-maturity-title">
    <span class="chapter-num">Current maturity</span><h2 id="ai-system-maturity-title">A credible system shows what is finished and what is not</h2><p>The component workflow has passed design, generation and engineering validation for the initial pilots. Integration, migration and measurement remain the larger program of work.</p>
    <ol class="ai-system-maturity" aria-label="Design to code maturity"><li data-status="complete"><b>Designed</b><span>Complete</span></li><li data-status="complete"><b>Generated</b><span>Complete</span></li><li data-status="complete"><b>Reviewed</b><span>Complete</span></li><li data-status="complete"><b>Accepted</b><span>Initial pilots</span></li><li data-status="active"><b>Integrated</b><span>In progress</span></li><li data-status="next"><b>Migrated</b><span>Next</span></li><li data-status="next"><b>Measured</b><span>Next</span></li></ol>
  </section>`;

  const limitationsBlock=`<section class="ai-system-deepdive ai-system-limitations" aria-labelledby="ai-system-limitations-title">
    <span class="chapter-num">Limitations</span><h2 id="ai-system-limitations-title">What this approach does not solve yet</h2>
    ${bullet(['Engineering review remains mandatory; generation is not production approval.','Creating the canonical component is easier than safely migrating every legacy usage.','Sanitizing and packaging context adds time when unrestricted repository access is not appropriate.','Product specific behaviours and unusual edge cases can still require manual engineering.','The instruction layer must be maintained as architecture and standards change.','Long term adoption, migration coverage and return on effort still need measurement.'])}
    <blockquote>I started by trying to move components from Figma into code. I ended up designing a trust system: what AI may know, what it may produce, what engineering must validate and how each failure improves the next attempt.</blockquote>
  </section>`;

  window.aiSystemPage=function(){
    return `<div class="case reveal ai-system-case" style="--accent:#d81e2c">

<section class="case-hero">
  <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>AI Design System</b></nav>
  <span class="eyebrow">B2B SaaS · Design systems · AI</span>
  <h1>Designing beyond Figma.</h1>
  <p>How I used AI to turn a fragmented UI ecosystem into a design to code system: a Figma foundation, a coded component library, and a governed AI context that turns engineering feedback into reusable rules.</p>
</section>

<div class="case-facts">
  <div class="fact"><span class="eyebrow">Task</span><b>Design system + AI design to code workflow</b></div>
  <div class="fact"><span class="eyebrow">Role</span><b>Lead Product Designer</b></div>
  <div class="fact"><span class="eyebrow">Time</span><b>6 months, ongoing</b></div>
</div>

<figure class="ai-system-system-reel" aria-label="A neutral interface system shown across component, state and code views">
  <img src="${CASE_ASSET}hero-system.svg" alt="Neutral component library showing a date picker and its code API" decoding="async">
  <img src="${CASE_ASSET}input-states.svg" alt="Neutral input component showing default, focused, filled, error, read only and disabled states" decoding="async">
  <img src="${CASE_ASSET}code-library.svg" alt="Neutral design to code specimen showing an input beside its component API" decoding="async">
</figure>

<div class="long-study">
  <aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#ai-system-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside>
  <article>

<section class="chapter" id="ai-system-1" data-screen-label="01"><span class="chapter-num">01 / Brief and context</span><h2 class="chapter-title">The problem was bigger than Figma</h2><p>The product ecosystem supports several complex experiences: a transaction platform, fleet management software and a customer facing portal. They evolved over years, across different teams, developers and delivery cycles, with no mature design system connecting design decisions to production code.</p>${bullet(['Designers were solving similar interaction problems repeatedly.','Developers were implementing the same UI patterns differently.','Improving the system was always competing with feature delivery for scarce frontend capacity.'])}<p>Rather than building a design system in Figma and handing specifications to engineers, I wanted to test a more ambitious question:</p><blockquote>Could a designer own both the design and the first production ready implementation of a component, using AI, while frontend engineers shift from building every component to reviewing, validating and integrating them?</blockquote></section>

<section class="chapter" id="ai-system-2" data-screen-label="02"><span class="chapter-num">02 / The challenge</span><h2 class="chapter-title">Implementation debt, quantified</h2><p>The product did not simply have inconsistent screens. It had accumulated implementation debt. A button might look almost identical in two places while being implemented differently underneath, and the same was true for inputs, tabs, states, spacing and interaction patterns. Repository analysis exposed the scale.</p><div class="finding-grid ai-system-anim"><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="900">900</span><span>+</span></strong>button related implementations or usages found in product code</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="1800">1800</span><span>+</span></strong>input field related implementations or usages</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="5">5</span><span></span></strong>designers sharing one product environment</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="3">3</span><span></span></strong>major product experiences supported by the system</div></div><p>These were not 900 unique button designs. The finding was that a simple UI primitive had spread across hundreds of individual implementation points. A design system button can be created in a day; replacing hundreds of implementations without breaking flows is an engineering problem.</p></section>

<section class="chapter" id="ai-system-3" data-screen-label="03"><span class="chapter-num">03 / Why Figma alone fails</span><h2 class="chapter-title">Two systems that never converged</h2><p>I created roughly 90% of the design system in Figma: foundations, component structure, states, behaviours and reusable interaction patterns. The shared library immediately improved consistency across our five designers, but it exposed the deeper problem: even with perfect Figma usage, developers still implemented those designs against a fragmented codebase.</p><div class="ai-system-flowlist ai-system-anim"><div class="ai-system-i">${flow('The workflow the library could not fix',['Designer creates design','Developer interprets it','Searches for an existing implementation','Reuses, modifies or recreates it','Design QA finds inconsistencies','Developer revisits','Variations keep accumulating']).replace('<div><h4>','<h4>').replace('</div>','')}</div></div>${shot('colors.svg','A single semantic colour system connects design decisions to production roles.','Neutral semantic colour tokens documented by interface role','ai-system-evidence-foundation')}</section>

<section class="chapter" id="ai-system-4" data-screen-label="04"><span class="chapter-num">04 / The hypothesis</span><h2 class="chapter-title">A new operating model</h2><p>Designers should be capable of designing and producing the first implementation of design system components with AI. Frontend engineers remain responsible for engineering validation, architecture decisions, integration, edge cases and final approval. The goal was not zero engineering involvement; it was higher leverage per engineer.</p><div class="ai-system-flowlist ai-system-anim"><div class="ai-system-i">${flow('Before',['Design','Handoff','Engineering implementation','Design QA'])}</div><div class="ai-system-i">${flow('After',['Design','AI assisted implementation','Engineering validation','Integration'],'ai-system-flow-new')}</div></div><p>There is an enormous difference between asking an AI to “create an input field” and asking it to create one that follows our architecture, state model, accessibility expectations, token structure, naming conventions, validation model and migration constraints. The first produces a demo. The second has a chance of producing something useful. That became the core of the project.</p></section>

<section class="chapter" id="ai-system-5" data-screen-label="05"><span class="chapter-num">05 / Winning the room</span><h2 class="chapter-title">The organizational problem came first</h2><p>The idea initially met considerable resistance. One PM was particularly skeptical that AI could produce anything beyond a polished prototype. Instead of debating capability theoretically, I built something, demonstrated the implementation first, and only afterwards explained how much of it AI had produced. The conversation moved from “can AI do this?” to “what would need to be true for us to trust this?”</p><h3>Developer resistance was understandable</h3>${bullet(['Technical concerns: maintainability, architecture fit, invented patterns, accessibility, edge cases, unnecessary dependencies.','A human concern: if designers can implement components, what does that mean for frontend developers?'])}<p>I did not position the initiative as replacing engineering. The product was growing with constrained resources; a developer rebuilding another button was not the highest value use of that engineer. Engineering would become more important to the design system, not less, and its role would shift from repetitive construction toward architecture, validation, integration and quality.</p></section>

<section class="chapter" id="ai-system-6" data-screen-label="06"><span class="chapter-num">06 / Engineering discovery</span><h2 class="chapter-title">Discovering the hidden engineering system</h2><p>Before generating more components I needed something Figma could not tell me: what makes a frontend component acceptable to engineering? Much of that knowledge was undocumented and distributed across people, so I interviewed frontend developers individually.</p>${bullet(['How should components be structured, and what should never be introduced?','Which behaviours belong inside a component versus the consuming application?','What accessibility behaviour is mandatory?','How do future developers extend a component without creating another parallel implementation?','What would make you reject AI generated code during review?'])}<p>This produced something more valuable than a specification: an engineering contract.</p></section>

<section class="chapter" id="ai-system-7" data-screen-label="07"><span class="chapter-num">07 / Governed AI context</span><h2 class="chapter-title">Turning tribal knowledge into AI-readable rules</h2><p>I consolidated the interviews into a reusable instruction layer for Claude. Instead of every person independently discovering how to prompt, the organization could start teaching AI how the organization expects frontend work to be done. Explore the representative structure below.</p><figure class="media-block"><figcaption>The AI context, as a browsable skill file. Representative structure; proprietary implementation details removed.</figcaption><div class="ai-system-context" id="ai-system-context"><div class="ai-system-context-nav" role="tablist" aria-label="AI context categories">${contextData.map(([t],i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-cat="${i}">${t}</button>`).join('')}</div><div class="ai-system-context-body"><h4 id="ai-system-context-title">${contextData[0][0]}</h4><ul id="ai-system-context-rules">${contextData[0][1].map(r=>`<li>${r}</li>`).join('')}</ul><span class="ai-system-context-cap">Representative structure. Proprietary implementation details removed.</span></div></div></figure><h3>Privacy changed the way I worked</h3><p>I worked primarily with Claude, but never gave it unrestricted repository access; organizational confidence around AI and proprietary information was limited. I extracted only the context each task needed, separated general patterns from sensitive details, sanitized where appropriate, and never used customer information. Slower, but it taught us the key lesson:</p><blockquote>AI adoption is not just a model-capability problem. It is a context-governance problem.</blockquote><p>Interviews also revealed that AI use was already happening informally, with no shared methodology, some of it on personal subscriptions. The real choice was never “use AI or not”; it was whether fragmented individual usage could become a repeatable, governed, organization-level capability.</p></section>

<section class="chapter" id="ai-system-8" data-screen-label="08"><span class="chapter-num">08 / The component loop</span><h2 class="chapter-title">One component at a time, on purpose</h2><p>We deliberately did not generate the whole library at once; that would have produced a lot of incorrect code very quickly. Each component was an experiment, and every issue an engineer found became a rule that improved the next generation. The learning loop, not any single component, was the real asset.</p><figure class="media-block"><figcaption>The learning loop. Click the sample issue to see how review feedback becomes reusable context.</figcaption><div class="ai-system-loop" id="ai-system-loop"><div class="ai-system-loop-track">${['Generate','Review','Identify issue','Update rules','Regenerate'].map((s,i)=>`<div class="ai-system-loop-stage" ${i>=2?'data-hot':''}><i>Stage ${i+1}</i><b>${s}</b></div>${i<4?'<span class="ai-system-loop-arrow" aria-hidden="true">→</span>':''}`).join('')}</div><button type="button" class="ai-system-loop-issue" id="ai-system-loop-issue">Sample issue: “Component introduces an unnecessary dependency” , click to trace it</button><div class="ai-system-loop-result"><div class="ai-system-rule"><small>Becomes a reusable rule</small>Prefer existing project dependencies. Do not add a package solely to implement behaviour available through native or existing project utilities without engineering approval.</div><div class="ai-system-inherit"><small>Inherited automatically</small>Every future component generated with this context checks its dependencies against this rule before an engineer ever sees the code.</div></div></div></figure><h3>The input field was the first pilot</h3><p>Inputs look deceptively simple: a label, a border, some helper text. Technically they carry a large behavioural surface: focus, hover, filled and empty states, validation, disabled and read-only behaviour, keyboard interaction, error messaging, long text, autofill and responsive constraints. The first AI-assisted implementation surfaced issues in engineering review, which was exactly the point: the pilot's goal was to find what Claude did not know.</p><figure class="media-block"><figcaption>The production input component, live. Interact with the real control; the panel narrates its state, tokens and rules.</figcaption><div class="ai-system-input-lab" id="ai-system-input-lab"><div class="ai-system-input-stage"><div class="ai-system-field" id="ai-system-field-main"><label for="ai-system-demo-input">Work email</label><input id="ai-system-demo-input" type="email" autocomplete="off" spellcheck="false" placeholder="name@company.com"><span class="ai-system-help">Used for the weekly toll settlement report.</span><span class="ai-system-error">Enter a valid email address</span></div><div class="ai-system-field"><label for="ai-system-demo-disabled">Fleet ID</label><input id="ai-system-demo-disabled" type="text" value="FL-2094" disabled><span class="ai-system-help">Disabled: assigned by the system.</span></div><div class="ai-system-field"><label for="ai-system-demo-readonly">Contract number</label><input id="ai-system-demo-readonly" type="text" value="SYS-88431-DE" readonly><span class="ai-system-help">Read-only: editable only by account managers.</span></div></div><div class="ai-system-input-panel" aria-live="polite"><h4>Current state</h4><span class="ai-system-state-chip" id="ai-system-state-chip" data-state="Default">Default</span><dl><div><dt>Design tokens</dt><dd id="ai-system-tokens">border: color-border-default · bg: surface-base · text: content-primary</dd></div><div><dt>Interaction rule</dt><dd id="ai-system-rule">The resting state must be visually quiet; affordance comes from the label and container, not decoration.</dd></div><div><dt>Accessibility</dt><dd id="ai-system-a11y">Label is programmatically connected via for/id. The control is reachable by keyboard.</dd></div><div><dt>Component API</dt><code id="ai-system-api">Input
  label="Work email"
  type="email"
  state="default"
      helperText="…"</code></div></dl></div></div></figure>${shot('input-states.svg','The documented input system, including its supported states and behaviours.','Neutral input component showing default, focused, filled, error, read only and disabled states','ai-system-evidence-wide')}</section>

<section class="chapter" id="ai-system-9" data-screen-label="09"><span class="chapter-num">09 / Migration at scale</span><h2 class="chapter-title">Buttons revealed the migration problem</h2><p>Creating the canonical button was not the hard part. Migration was. With roughly 900 button related usages, a new component could not simply be dropped into the codebase. Some buttons carried icons, unusual text lengths, loading behaviour or locally written CSS; some looked like buttons while performing a different semantic role. Our working model became: find, classify, map, replace, validate. AI is extremely useful for repetitive migration, but only after the problem has been classified correctly.</p>${gallery([['hero-system.svg','Neutral component library with a date picker and API'],['input-states.svg','Input component states and accessibility behaviour'],['code-library.svg','A shared component shown beside its implementation API']],'From interface to implementation: one system expressed through components, states and code.')}<figure class="media-block"><figcaption>Seven years of button drift. Select Consolidate to collapse them into the canonical component.</figcaption><div class="ai-system-consolidate" id="ai-system-consolidate"><div class="ai-system-legacy-grid" aria-hidden="true"><button style="padding:10px 18px;border:1px solid #2b6cb0;border-radius:4px;background:#2b6cb0;color:#fff;font-size:13px">Save changes</button><button style="padding:14px 30px;border:0;border-radius:22px;background:#1a4fa0;color:#fff;font-size:15px;font-weight:700">SAVE</button><button style="padding:9px 16px;border:2px solid #d81e2c;border-radius:8px;background:#fff;color:#d81e2c;font-size:14px">Save</button><button style="padding:12px 20px;border:0;border-radius:6px;background:#e2453a;color:#fff;font-size:14px;letter-spacing:.08em;text-transform:uppercase">Save</button><button style="padding:11px 22px;border:0;border-radius:10px;background:#c62828;color:#fff;font-size:14px;box-shadow:0 6px 14px rgba(0,0,0,.25)">💾 Save</button><button style="padding:8px 14px;border:1px solid #999;border-radius:2px;background:#f5f5f5;color:#333;font-size:12.5px">Save…</button><button style="padding:13px 26px;border:0;border-radius:999px;background:#d81e2c;color:#fff;font-size:14px;opacity:.85">Save changes</button></div><button type="button" class="ai-system-merge-btn" id="ai-system-merge-btn">Consolidate</button><div class="ai-system-canonical"><button type="button">Save changes</button><code>Button
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  iconPosition="start" | "end"
  loading, disabled
  action="submit" | "navigate"</code><span class="ai-system-context-cap">Conceptual API. Component consolidation, not our exact production syntax.</span></div></div></figure><h3>Inputs made the scale clearer, tabs proved repeatability</h3><p>More than 1,800 input usages meant consistency could no longer depend on people remembering the specification. The system itself has to make the correct implementation easier than the incorrect one. By the time we developed tabs through the same loop, the generated implementation was increasingly aligned with our system, not because the model improved, but because the context had.</p><blockquote>Better models help. Better organizational context compounds.</blockquote>${shot('code-library.svg','A production component example showing the relationship between interface and code.','Neutral shared input component shown beside its component API')}</section>

<section class="chapter" id="ai-system-10" data-screen-label="10"><span class="chapter-num">10 / Dual-track roadmap</span><h2 class="chapter-title">Six months, two parallel tracks</h2><p>The programme ran as two tracks that evolved together rather than sequentially: design-system maturity, and AI-assisted development maturity. Hover a phase to see its counterpart.</p><figure class="media-block"><figcaption>Track A (design system) above, Track B (AI-assisted development) below. Related phases are connected.</figcaption><div class="ai-system-roadmap" id="ai-system-roadmap"><div class="ai-system-roadmap-inner"><p class="ai-system-rm-label">Track A · Design-system maturity</p><div class="ai-system-rm-row ai-system-rm-a">${['Audit','Foundations','Figma components','Patterns','Adoption','Optimization'].map((t,i)=>`<div data-col="${i}">${t}</div>`).join('')}</div><div class="ai-system-rm-links" aria-hidden="true">${'<span></span>'.repeat(6)}</div><div class="ai-system-rm-row ai-system-rm-b">${['AI feasibility','Developer interviews','AI rules','Input pilot','Buttons + tabs','Migration + scale'].map((t,i)=>`<div data-col="${i}">${t}</div>`).join('')}</div><p class="ai-system-rm-label" style="margin:10px 0 0">Track B · AI-assisted development maturity</p></div></div></figure></section>

<section class="chapter" id="ai-system-11" data-screen-label="11"><span class="chapter-num">11 / Outcomes and measurement</span><h2 class="chapter-title">Measuring success honestly</h2><p>Because the programme is still progressing, I separate delivered outcomes from future measurement rather than manufacturing ROI numbers.</p><h3>Delivered</h3>${bullet(['A shared Figma design-system foundation, most of it created by me.','Input field, button and tabs implemented through the AI-assisted workflow and validated by engineering.','Frontend engineering rules consolidated into a reusable, governed AI context.','Initial developer skepticism converted into participation and review.','AI usage moved from isolated experimentation toward a shared methodology.'])}<h3>What I would measure next</h3>${bullet(['Median design-to-development time for system-based screens.','Frontend hours required per new design-system component.','Percentage of UI built from canonical components, and legacy implementations remaining.','Percentage of AI-generated implementation accepted with minor changes.','Repeated violation rate for previously documented rules.'])}<blockquote>The metric I care about most: how much engineering effort is required to move a design-system decision from Figma into reliable production code.</blockquote></section>

<section class="chapter" id="ai-system-12" data-screen-label="12"><span class="chapter-num">12 / What I learned</span><h2 class="chapter-title">I was not building a design system</h2><p>I was designing an interface production system: the Figma library, the coded components, the AI context, the engineering review process and the migration strategy, together forming a new operating model for how interface decisions move through the company.</p>${bullet(['AI capability is not the primary constraint; giving it enough organizational knowledge is.','Enterprise AI is a governance problem: privacy, data access and trust set the adoption speed.','AI exposes undocumented processes; rules you cannot explain to an AI are also hard for a new employee.','Human review remains essential: the strongest workflow was generation followed by expert validation.','Design systems are uniquely suited to AI: repeated, constrained, highly structured problems.'])}<blockquote>I did not use AI to bypass the design system. I used the design system to make AI useful.</blockquote></section>

  <a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a>
  </article>
</div>
</div>`
      .replace('<figure class="ai-system-system-reel"',`${ownershipBlock}<figure class="ai-system-system-reel"`)
      .replace('<section class="chapter" id="ai-system-6"',`${pushbackBlock}<section class="chapter" id="ai-system-6"`)
      .replace('<section class="chapter" id="ai-system-8"',`${securityBlock}<section class="chapter" id="ai-system-8"`)
      .replace('<section class="chapter" id="ai-system-9"',`${pilotBlock}<section class="chapter" id="ai-system-9"`)
      .replace('<section class="chapter" id="ai-system-12"',`${maturityBlock}${limitationsBlock}<section class="chapter" id="ai-system-12"`)
      .replace('I was not building a design system','I was designing a trust system');
  };

  window.initAiSystemCase=function(){
    const root=document.querySelector('.ai-system-case');
    if(!root)return;
    document.body.classList.add('kfh-active');
    const textWalker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(textWalker.nextNode()){
      textWalker.currentNode.nodeValue=textWalker.currentNode.nodeValue
        .replace(/[‐‑‒–—-]/g,' ');
    }
    const neutralContract=root.querySelector('#ai-system-demo-readonly');
    if(neutralContract)neutralContract.value='SYS 88431 DE';

    /* TOC spy + mobile menu (same pattern as KFH/Talon) */
    const tocLinks=[...document.querySelectorAll('.study-toc a[href^="#ai-system-"]')];
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
        const current=root.querySelector('.mobile-toc-current');
        if(current){const active=tocLinks.find(a=>a.classList.contains('active'));if(active)current.textContent=active.textContent.trim();}
      };
      window.addEventListener('scroll',spy,{passive:true});
      spy();
    }
    const tocEl=root.querySelector('.study-toc');
    if(tocEl&&!tocEl.querySelector('.mobile-toc-trigger')&&tocLinks.length){
      const group=document.createElement('div');
      group.className='toc-links';group.id='ai-system-chapter-links';
      tocLinks.forEach(a=>group.appendChild(a));
      const trigger=document.createElement('button');
      trigger.className='mobile-toc-trigger';trigger.type='button';
      trigger.setAttribute('aria-expanded','false');
      trigger.setAttribute('aria-controls',group.id);
      trigger.innerHTML=`<span><small>Chapter</small><b class="mobile-toc-current">${tocLinks[0].textContent.trim()}</b></span><i class="mobile-toc-chevron" aria-hidden="true"></i>`;
      trigger.addEventListener('click',()=>{const open=tocEl.classList.toggle('toc-open');trigger.setAttribute('aria-expanded',String(open));});
      group.addEventListener('click',()=>{tocEl.classList.remove('toc-open');trigger.setAttribute('aria-expanded','false');});
      tocEl.append(trigger,group);
    }

    /* Live input lab */
    const field=document.getElementById('ai-system-field-main');
    const input=document.getElementById('ai-system-demo-input');
    if(field&&input){
      const chip=document.getElementById('ai-system-state-chip');
      const tokens=document.getElementById('ai-system-tokens');
      const rule=document.getElementById('ai-system-rule');
      const a11y=document.getElementById('ai-system-a11y');
      const api=document.getElementById('ai-system-api');
      const DATA={
        Default:{t:'border: color-border-default · bg: surface-base · text: content-primary',r:'The resting state must be visually quiet; affordance comes from the label and container, not decoration.',a:'Label is programmatically connected via for/id. The control is reachable by keyboard.'},
        Hover:{t:'border: color-border-strong · cursor: text',r:'Hover only strengthens the border. No elevation, no colour change: hover must never look like focus.',a:'Hover is a pointer affordance only; keyboard users go straight to focus.'},
        Focused:{t:'border: color-border-accent · ring: focus-ring-accent (3px, 16%)',r:'Focus is the strongest state in the hierarchy. Exactly one control may hold it.',a:'Visible focus ring meets WCAG 2.4.7; contrast of the ring against surface ≥ 3:1.'},
        Filled:{t:'border: color-border-default · text: content-primary',r:'A filled control returns to quiet chrome; the value is the content, not the container.',a:'Value is announced by screen readers through the connected label.'},
        Error:{t:'border: color-border-danger · ring: focus-ring-danger · text: content-danger',r:'Validation runs on blur, never on every keystroke. Error replaces helper text without shifting layout.',a:'The error is a text message tied to the field, never colour alone.'},
      };
      let hovering=false;
      const state=()=>{
        if(field.classList.contains('ai-system-field-error'))return 'Error';
        if(document.activeElement===input)return 'Focused';
        if(input.value.trim())return 'Filled';
        if(hovering)return 'Hover';
        return 'Default';
      };
      const paint=()=>{
        const s=state(),d=DATA[s];
        chip.textContent=s;chip.dataset.state=s;
        tokens.textContent=d.t;rule.textContent=d.r;a11y.textContent=d.a;
        api.textContent=`Input\n  label="Work email"\n  type="email"\n  state="${s.toLowerCase()}"\n  ${s==='Error'?'errorText="Enter a valid email address"':'helperText="…"'}`;
      };
      input.addEventListener('mouseenter',()=>{hovering=true;paint();});
      input.addEventListener('mouseleave',()=>{hovering=false;paint();});
      input.addEventListener('focus',()=>{field.classList.remove('ai-system-field-error');paint();});
      input.addEventListener('input',paint);
      input.addEventListener('blur',()=>{
        const v=input.value.trim();
        field.classList.toggle('ai-system-field-error',!!v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        paint();
      });
      paint();
    }

    /* Button consolidation */
    const cons=document.getElementById('ai-system-consolidate');
    const mergeBtn=document.getElementById('ai-system-merge-btn');
    if(cons&&mergeBtn){
      mergeBtn.addEventListener('click',()=>{
        const merged=cons.classList.toggle('is-merged');
        mergeBtn.textContent=merged?'Show implementations':'Consolidate implementations';
        mergeBtn.setAttribute('aria-pressed',String(merged));
      });
    }

    /* Learning loop */
    const loop=document.getElementById('ai-system-loop');
    const issue=document.getElementById('ai-system-loop-issue');
    if(loop&&issue)issue.addEventListener('click',()=>loop.classList.toggle('is-active'));

    /* AI context viewer */
    const ctx=document.getElementById('ai-system-context');
    if(ctx){
      const title=document.getElementById('ai-system-context-title');
      const rules=document.getElementById('ai-system-context-rules');
      const tabs=[...ctx.querySelectorAll('[data-cat]')];
      tabs.forEach(tab=>tab.addEventListener('click',()=>{
        const i=Number(tab.dataset.cat);
        tabs.forEach(t=>t.setAttribute('aria-selected',String(t===tab)));
        title.textContent=contextData[i][0];
        rules.innerHTML=contextData[i][1].map(r=>`<li>${r}</li>`).join('');
      }));
    }

    /* Roadmap pairing */
    const rm=document.getElementById('ai-system-roadmap');
    if(rm){
      rm.querySelectorAll('[data-col]').forEach(cell=>{
        cell.addEventListener('mouseenter',()=>{
          const c=cell.dataset.col;
          rm.className='ai-system-roadmap ai-system-hover-'+c;
          rm.querySelectorAll('[data-col]').forEach(x=>x.classList.toggle('is-pair',x.dataset.col===c));
        });
        cell.addEventListener('mouseleave',()=>{
          rm.className='ai-system-roadmap';
          rm.querySelectorAll('.is-pair').forEach(x=>x.classList.remove('is-pair'));
        });
      });
    }

    /* Count-ups + entrances */
    const countUp=el=>{
      const to=Number(el.dataset.to)||0,t0=performance.now(),dur=1900;
      const tick=now=>{
        const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
        el.textContent=new Intl.NumberFormat('en').format(Math.round(e*to));
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const anims=[...root.querySelectorAll('.ai-system-anim')];
    anims.forEach(b=>{
      [...b.querySelectorAll('.ai-system-i')].forEach((el,i)=>el.style.setProperty('--i',i));
      b.querySelectorAll('.ai-system-count').forEach(el=>{el.textContent='0';});
      b.classList.add('ai-system-armed');
    });
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting)return;
        e.target.classList.add('ai-system-play');
        e.target.querySelectorAll('.ai-system-count').forEach(countUp);
        io.unobserve(e.target);
      });
    },{rootMargin:'0px 0px -12% 0px'});
    anims.forEach(b=>io.observe(b));
  };
})();
;
/* ===== ai-system-story.js ===== */
/* Revised narrative for the AI enabled design system case study. */
(function(){
  const ASSET='assets/ai-system/sanitized/';
  const bullet=items=>`<ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
  const flow=(title,steps,cls='')=>`<div><h4>${title}</h4><ol class="${cls}">${steps.map(step=>`<li><span>${step}</span></li>`).join('')}</ol></div>`;
  const shot=(src,label,alt,cls='')=>`<figure class="media-block ai-system-evidence ${cls}"><figcaption>${label}</figcaption><div class="ai-system-shot"><img src="${ASSET}${src}" alt="${alt}" loading="lazy" decoding="async"></div></figure>`;
  const contextTitles=['Component principles','Design tokens','State behaviour','Accessibility','Resilience','Code quality','Dependency rules','Migration safety','AI guardrails','Known AI mistakes'];
  const toc=['The system problem','The new operating model','Winning trust','Governed AI context','The input pilot','Migration at scale','The future workflow','Outcomes and limits','What I learned'];

  const decisionTable=`<div class="ai-system-decision-table" role="table" aria-label="Developer concerns and design responses">
    <div class="ai-system-decision-head" role="row"><b role="columnheader">Concern</b><b role="columnheader">What could go wrong</b><b role="columnheader">How the workflow changed</b></div>
    <div class="ai-system-decision-row" role="row"><strong role="cell">Architecture drift</strong><span role="cell">Generated components might invent structures the product could not maintain.</span><span role="cell">Existing patterns became verified context. New abstractions were prohibited unless engineering approved them.</span></div>
    <div class="ai-system-decision-row" role="row"><strong role="cell">Dependency risk</strong><span role="cell">A convenient package could create security and maintenance cost.</span><span role="cell">Existing utilities became the default. New dependencies required explicit approval.</span></div>
    <div class="ai-system-decision-row" role="row"><strong role="cell">Incomplete behaviour</strong><span role="cell">A component could look correct but fail keyboard, validation or layout scenarios.</span><span role="cell">State, resilience and accessibility checks became part of the acceptance contract.</span></div>
    <div class="ai-system-decision-row" role="row"><strong role="cell">Role clarity</strong><span role="cell">Designer implementation could sound like engineering replacement.</span><span role="cell">Designers prepare the first pass. Engineers validate architecture, integration and production readiness.</span></div>
  </div>`;

  const securityModel=`<div class="ai-system-trust-types"><div><b>Technical trust</b><span>Will the output fit the architecture and survive review?</span></div><div><b>Professional trust</b><span>Are accountability and final approval still clear?</span></div><div><b>Information trust</b><span>Can the task be completed without exposing unnecessary data?</span></div></div>
  <div class="ai-system-security-flow" aria-label="AI context security boundary"><div><small>Private environment</small><b>Product and repository knowledge</b><span>Remains inside the organization</span></div><i aria-hidden="true">→</i><div><small>Minimum context</small><b>Sanitized task packet</b><span>Only patterns, constraints and acceptance rules</span></div><i aria-hidden="true">→</i><div><small>Human gate</small><b>Engineering review</b><span>Validate, integrate or reject</span></div></div>
  <div class="ai-system-security-grid"><div><h3>Never included</h3>${bullet(['Customer information or production records.','Secrets, credentials or internal access details.','Complete repository access or unrelated source files.','Unnecessary proprietary names, links or business context.'])}</div><div><h3>Working controls</h3>${bullet(['Provide only the context required for one component task.','Separate verified facts from assumptions and flag uncertainty.','Prefer approved patterns and dependencies already in use.','Require human review before generated work reaches integration.'])}</div></div>
  <div class="ai-system-governance-summary"><div><small>Scope of evidence</small><p>These were working controls for this initiative, not a claim of organization wide security certification.</p></div><blockquote><small>Governance principle</small>Enterprise AI adoption is not only a model capability problem. It is a context governance problem.</blockquote></div>`;

  const pilotSteps=`<ol class="ai-system-pilot-steps"><li><b>Choose the pilot</b><span>Select a common component with enough states to expose weak assumptions.</span></li><li><b>Define behaviour</b><span>Document focus, validation, disabled, read only, content and layout states.</span></li><li><b>Generate a first pass</b><span>Use only task specific context and verified project constraints.</span></li><li><b>Review with engineering</b><span>Inspect architecture, dependencies, accessibility and resilience.</span></li><li><b>Turn issues into rules</b><span>Record each finding in the shared instruction layer.</span></li><li><b>Regenerate and validate</b><span>Apply improved context and route the result through the same human gate.</span></li></ol>`;

  const codeEvidence=`<p class="ai-system-note">Representative, anonymized examples. Proprietary syntax and implementation details removed.</p><div class="ai-system-code-evidence">
    <div><header><b>Dependency</b><span>Reject convenience that creates long term cost</span></header><div><small>First pass</small><code>import Input from "new form package"</code></div><div><small>Corrected rule</small><code>Use the existing field base. New packages require approval.</code></div></div>
    <div><header><b>Design tokens</b><span>Replace visual guesses with system semantics</span></header><div><small>First pass</small><code>borderColor = "#c9c8c4"</code></div><div><small>Corrected rule</small><code>borderColor = tokens.borderDefault</code></div></div>
    <div><header><b>Accessible behaviour</b><span>Make the contract explicit, not implied by appearance</span></header><div><small>First pass</small><code>Input placeholder="Work email"</code></div><div><small>Corrected rule</small><code>Input label="Work email" errorText="Required"</code></div></div>
  </div>`;

  const futureWorkflow=`<figure class="media-block"><figcaption>Future state. Assemble an interface from governed components, then prepare it for engineering review.</figcaption><div class="ai-system-builder" id="ai-system-builder">
    <div class="ai-system-builder-library"><div><small>Approved components</small><h3>Build the interface</h3><p>Select components to add them to the working screen.</p></div><div class="ai-system-builder-controls" role="group" aria-label="Design system components"><button type="button" data-builder-component="input" aria-pressed="true">Input field</button><button type="button" data-builder-component="button" aria-pressed="true">Primary button</button><button type="button" data-builder-component="tabs" aria-pressed="false">Tabs</button></div><button type="button" class="ai-system-builder-review" id="ai-system-builder-review">Prepare for engineering review</button></div>
    <div class="ai-system-builder-stage"><div class="ai-system-builder-window"><header><span></span><span></span><span></span><b>Account settings</b></header><nav data-builder-preview="tabs" hidden><button type="button" tabindex="-1">Profile</button><button type="button" tabindex="-1">Notifications</button><button type="button" tabindex="-1">Security</button></nav><div class="ai-system-builder-form"><div data-builder-preview="input"><label for="ai-system-builder-email">Work email</label><input id="ai-system-builder-email" type="email" value="name@company.com" readonly tabindex="-1"></div><button type="button" data-builder-preview="button" tabindex="-1">Save changes</button><p class="ai-system-builder-empty" hidden>Select a component to begin assembling the interface.</p></div></div><div class="ai-system-builder-checks" aria-live="polite"><span data-check="components">2 approved components</span><span>Tokens mapped</span><span>Accessibility rules included</span><span data-check="review">Review not started</span></div></div>
    <div class="ai-system-builder-status" id="ai-system-builder-status" aria-live="polite"><b>Designer workspace</b><span>The interface uses governed components. Engineering review remains the final gate before integration.</span></div>
  </div></figure>`;

  const componentShowcase=`<figure class="media-block ai-system-component-evidence"><figcaption>Delivered evidence from the recorded library. Explore the additional components and their documented interaction states.</figcaption><div class="ai-system-component-showcase" id="ai-system-component-showcase">
    <div class="ai-system-component-nav" role="tablist" aria-label="Additional design system components"><div><small>Component library</small><b>Recorded examples</b></div>
      <button type="button" role="tab" id="ai-system-component-tab-date" aria-controls="ai-system-component-panel-date" aria-selected="true" data-component-tab="date">Date picker</button>
      <button type="button" role="tab" id="ai-system-component-tab-dropdown" aria-controls="ai-system-component-panel-dropdown" aria-selected="false" data-component-tab="dropdown">Dropdown</button>
      <button type="button" role="tab" id="ai-system-component-tab-phone" aria-controls="ai-system-component-panel-phone" aria-selected="false" data-component-tab="phone">Phone number</button>
      <button type="button" role="tab" id="ai-system-component-tab-radio" aria-controls="ai-system-component-panel-radio" aria-selected="false" data-component-tab="radio">Radio button</button>
      <button type="button" role="tab" id="ai-system-component-tab-checkbox" aria-controls="ai-system-component-panel-checkbox" aria-selected="false" data-component-tab="checkbox">Checkbox</button>
      <button type="button" role="tab" id="ai-system-component-tab-switch" aria-controls="ai-system-component-panel-switch" aria-selected="false" data-component-tab="switch">Switch</button>
      <button type="button" role="tab" id="ai-system-component-tab-gauge" aria-controls="ai-system-component-panel-gauge" aria-selected="false" data-component-tab="gauge">Gauge</button>
    </div>
    <div class="ai-system-component-stage"><header><div><span class="ai-system-component-status" id="ai-system-component-status" data-status="progress">In progress</span><h3 id="ai-system-component-title">Date picker</h3></div><code id="ai-system-component-api">DatePicker · value · minDate · maxDate</code></header><div class="ai-system-component-panels">
      <section role="tabpanel" id="ai-system-component-panel-date" aria-labelledby="ai-system-component-tab-date" data-component-panel="date"><div class="ai-system-mini-date"><label>From <span id="ai-system-date-value">DD/MM/YYYY</span></label><div class="ai-system-mini-calendar"><header><button type="button" data-month-move="-1" aria-label="Previous month"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12.5 5-5 5 5 5"/></svg></button><b id="ai-system-calendar-month">August 2026</b><button type="button" data-month-move="1" aria-label="Next month"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 5 5 5-5 5"/></svg></button></header><div class="ai-system-mini-week"><b>Mo</b><b>Tu</b><b>We</b><b>Th</b><b>Fr</b><b>Sa</b><b>Su</b></div><div class="ai-system-mini-days">${'<span aria-hidden="true"></span>'.repeat(5)}${Array.from({length:31},(_,index)=>`<button type="button" data-calendar-day="${index+1}" aria-pressed="false">${index+1}</button>`).join('')}</div></div></div></section>
      <section role="tabpanel" id="ai-system-component-panel-dropdown" aria-labelledby="ai-system-component-tab-dropdown" data-component-panel="dropdown" hidden><div class="ai-system-mini-field"><label for="ai-system-mini-dropdown">Office</label><select id="ai-system-mini-dropdown"><option value="">Select an office</option><option>Berlin</option><option>London</option><option>Paris</option></select><span>Single select with a clear, keyboard-accessible value.</span></div></section>
      <section role="tabpanel" id="ai-system-component-panel-phone" aria-labelledby="ai-system-component-tab-phone" data-component-panel="phone" hidden><div class="ai-system-mini-field"><label for="ai-system-mini-phone">Phone number</label><div class="ai-system-mini-phone"><span>+49</span><input id="ai-system-mini-phone" type="tel" inputmode="tel" value="151 234 5678"></div><span>Country prefix and local number remain one labelled control.</span></div></section>
      <section role="tabpanel" id="ai-system-component-panel-radio" aria-labelledby="ai-system-component-tab-radio" data-component-panel="radio" hidden><fieldset class="ai-system-mini-options"><legend>Report frequency</legend><label><input type="radio" name="ai-system-frequency" checked><span>Weekly</span></label><label><input type="radio" name="ai-system-frequency"><span>Monthly</span></label><label><input type="radio" name="ai-system-frequency"><span>Quarterly</span></label></fieldset></section>
      <section role="tabpanel" id="ai-system-component-panel-checkbox" aria-labelledby="ai-system-component-tab-checkbox" data-component-panel="checkbox" hidden><div class="ai-system-mini-options"><label><input type="checkbox"><span><b>Default checkbox</b><small>Available but not selected</small></span></label><label><input type="checkbox" checked><span><b>Checked checkbox</b><small>Selected and ready to submit</small></span></label><label><input type="checkbox" disabled><span><b>Disabled checkbox</b><small>Unavailable in this context</small></span></label></div></section>
      <section role="tabpanel" id="ai-system-component-panel-switch" aria-labelledby="ai-system-component-tab-switch" data-component-panel="switch" hidden><div class="ai-system-mini-options"><label class="ai-system-mini-switch"><input type="checkbox" checked><i aria-hidden="true"></i><span><b>Email notifications</b><small>Receive status updates</small></span></label><label class="ai-system-mini-switch"><input type="checkbox"><i aria-hidden="true"></i><span><b>Product announcements</b><small>Receive occasional release notes</small></span></label></div></section>
      <section role="tabpanel" id="ai-system-component-panel-gauge" aria-labelledby="ai-system-component-tab-gauge" data-component-panel="gauge" hidden><div class="ai-system-mini-gauge-wrap"><div class="ai-system-mini-gauge" id="ai-system-mini-gauge" style="--gauge-value:64"><strong id="ai-system-gauge-value">64</strong><span>System coverage</span></div><label for="ai-system-gauge-range">Adjust value</label><input id="ai-system-gauge-range" type="range" min="0" max="100" value="64"></div></section>
    </div></div>
  </div></figure>`;

  const maturity=`<ol class="ai-system-maturity" aria-label="Design to code maturity"><li data-status="complete"><b>Designed</b><span>Complete</span></li><li data-status="complete"><b>Generated</b><span>Complete</span></li><li data-status="complete"><b>Reviewed</b><span>Complete</span></li><li data-status="complete"><b>Accepted</b><span>Initial pilots</span></li><li data-status="active"><b>Integrated</b><span>In progress</span></li><li data-status="next"><b>Migrated</b><span>Next</span></li><li data-status="next"><b>Measured</b><span>Next</span></li></ol>`;

  window.aiSystemPage=function(){
    return `<div class="case reveal ai-system-case" style="--accent:#d81e2c">
    <section class="case-hero">
      <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>Taking a design system from Figma to production code with AI</b></nav>
      <span class="eyebrow">B2B SaaS · AI enabled design systems</span>
      <h1>Taking a design system from Figma to production code with AI.</h1>
      <p>How I used AI to design and implement reusable frontend components, turned developer feedback into repeatable rules, and created a safer path for designers to build interfaces with the design system.</p>
      <figure class="case-hero-visual ai-system-system-reel" aria-label="Design system interface carousel" aria-roledescription="carousel"><img class="is-active" data-reel-slide src="${ASSET}hero-system.svg" alt="Neutral component library showing a date picker and its code API" decoding="async" aria-hidden="false"><img data-reel-slide src="${ASSET}input-states.svg" alt="Neutral input component showing its supported states" decoding="async" aria-hidden="true"><img data-reel-slide src="${ASSET}code-library.svg?v=2" alt="Neutral design system component beside its implementation API" decoding="async" aria-hidden="true"><figcaption class="ai-system-reel-controls"><span class="ai-system-reel-label" id="ai-system-reel-label" aria-live="polite">Components</span><span class="ai-system-reel-dots" role="group" aria-label="Choose carousel image"><button type="button" data-reel-dot="0" class="is-active" aria-label="Show component library" aria-current="true"></button><button type="button" data-reel-dot="1" aria-label="Show component states"></button><button type="button" data-reel-dot="2" aria-label="Show component code"></button></span><button type="button" class="ai-system-reel-toggle" aria-label="Pause carousel">Pause</button></figcaption></figure>
    </section>

    <div class="case-facts"><div class="fact"><span class="eyebrow">Task</span><b>Design system and governed AI workflow</b></div><div class="fact"><span class="eyebrow">Role</span><b>Lead Product Designer</b></div><div class="fact"><span class="eyebrow">Time</span><b>6 months, ongoing</b></div></div>

    <section class="ai-system-thesis" aria-labelledby="ai-system-thesis-title"><h2 id="ai-system-thesis-title">The goal was not faster mockups. It was a new interface production model.</h2><p>Designers should eventually be able to design an experience, assemble its frontend from approved design system components, and prepare a working implementation for engineering review. Engineers retain architecture, security, integration, complex behaviour and production approval.</p><div><span><b>Design owns</b>Intent, system behaviour and the first implementation</span><span><b>AI supports</b>Generation, repetition and rule based checking</span><span><b>Engineering owns</b>Architecture, validation, integration and approval</span></div></section>

    <div class="long-study"><aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((item,index)=>`<a href="#ai-system-${index+1}">${String(index+1).padStart(2,'0')} · ${item}</a>`).join('')}</aside><article>

    <section class="chapter" id="ai-system-1" data-screen-label="01"><span class="chapter-num">01 / The system problem</span><h2 class="chapter-title">The organization did not need another Figma library</h2><p>Several complex product experiences had evolved across different teams and delivery cycles without one mature system connecting design decisions to production code. Designers repeatedly solved similar interaction problems while developers implemented the same patterns in different ways.</p><p>I created roughly 90% of the design system in Figma, including foundations, reusable components, states and interaction patterns. That improved consistency for the design team, but it exposed a deeper problem: even perfect Figma usage could not make a fragmented codebase converge.</p><div class="finding-grid ai-system-anim"><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="900">900</span><span>+</span></strong>button related implementations or usages</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="1800">1800</span><span>+</span></strong>input field related implementations or usages</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="5">5</span></strong>designers sharing one product environment</div><div class="finding ai-system-i"><strong><span class="ai-system-count" data-to="3">3</span></strong>major product experiences supported</div></div><blockquote>The organization did not need another set of specifications. It needed a reliable way to move design decisions into code.</blockquote>${shot('colors.svg','Delivered evidence. One semantic colour system connects design decisions to interface roles.','Neutral semantic colour system documented by interface role','ai-system-evidence-foundation')}</section>

    <section class="chapter" id="ai-system-2" data-screen-label="02"><span class="chapter-num">02 / The new operating model</span><h2 class="chapter-title">Design could create the first implementation without bypassing engineering</h2><p>My hypothesis was that designers could use AI to create the first implementation of design system components. Frontend engineers would move from rebuilding every primitive toward higher leverage work: architecture, validation, integration and quality.</p><div class="ai-system-flowlist ai-system-anim"><div class="ai-system-i">${flow('Before',['Design','Handoff','Engineering implementation','Design QA'])}</div><div class="ai-system-i">${flow('After',['Design','AI assisted implementation','Engineering validation','Integration'],'ai-system-flow-new')}</div></div><div class="ai-system-ownership-grid ai-system-ownership-inline"><div><h3>What I owned</h3>${bullet(['System direction, foundations and component states.','Developer interviews and acceptance criteria.','The AI workflow and governed instruction layer.','Component pilots and migration model.'])}</div><div><h3>What engineering retained</h3>${bullet(['Architecture and fit with the existing codebase.','Accessibility, resilience and maintainability validation.','Dependency approval and integration.','Final production readiness decision.'])}</div></div></section>

    <section class="chapter" id="ai-system-3" data-screen-label="03"><span class="chapter-num">03 / Winning trust</span><h2 class="chapter-title">The first obstacle was not generation. It was belief.</h2><p>A product stakeholder doubted that AI could produce anything beyond a polished prototype. Rather than debating capability, I demonstrated an implementation first and explained the AI assisted process afterwards. The conversation changed from “can AI do this?” to “what would need to be true for us to trust it?”</p><p>Developer resistance was equally understandable. The concerns were technical, organizational and personal. I did not treat them as objections to defeat; I converted them into acceptance criteria.</p>${decisionTable}<blockquote>The initiative did not make engineering less important. It moved engineering toward the decisions that protect the product.</blockquote></section>

    <section class="chapter" id="ai-system-4" data-screen-label="04"><span class="chapter-num">04 / Governed AI context</span><h2 class="chapter-title">I turned undocumented engineering knowledge into reusable rules</h2><p>I interviewed frontend developers to learn what makes a component acceptable: architecture, component boundaries, accessibility, extension patterns, dependencies and the reasons they would reject generated code. The result was an engineering contract that AI could read and the team could inspect.</p><figure class="media-block"><figcaption>Representative evidence. The governed AI context is browsable; proprietary implementation details are removed.</figcaption><div class="ai-system-context" id="ai-system-context"><div class="ai-system-context-nav" role="tablist" aria-label="AI context categories">${contextTitles.map((title,index)=>`<button type="button" role="tab" aria-selected="${index===0}" data-cat="${index}">${title}</button>`).join('')}</div><div class="ai-system-context-body"><h4 id="ai-system-context-title">Component principles</h4><ul id="ai-system-context-rules"><li>Components are reusable, never screen specific.</li><li>Product logic stays outside primitive UI components.</li><li>Prefer existing project patterns over new abstractions.</li></ul><span class="ai-system-context-cap">Representative structure. Proprietary implementation details removed.</span></div></div></figure><h3>Security changed the workflow</h3><p>AI never received unrestricted repository access or customer information. I extracted the minimum useful context, removed unnecessary proprietary detail and kept engineering review as the human gate.</p>${securityModel}</section>

    <section class="chapter" id="ai-system-5" data-screen-label="05"><span class="chapter-num">05 / The input pilot</span><h2 class="chapter-title">One component became a test of the entire operating model</h2><p>Inputs look simple but contain focus, validation, disabled, read only, keyboard, error, content and responsive behaviour. That made the input field the right pilot: complex enough to expose what AI did not know, but contained enough to review deeply.</p>${pilotSteps}<figure class="media-block"><figcaption>Delivered evidence. Interact with the input to inspect its state, token and accessibility contract.</figcaption><div class="ai-system-input-lab" id="ai-system-input-lab"><div class="ai-system-input-stage"><div class="ai-system-field" id="ai-system-field-main"><label for="ai-system-demo-input">Work email</label><input id="ai-system-demo-input" type="email" autocomplete="off" spellcheck="false" placeholder="name@company.com"><span class="ai-system-help">Used for the weekly settlement report.</span><span class="ai-system-error">Enter a valid email address</span></div><div class="ai-system-field"><label for="ai-system-demo-disabled">Account ID</label><input id="ai-system-demo-disabled" type="text" value="AC 2094" disabled><span class="ai-system-help">Disabled: assigned by the system.</span></div><div class="ai-system-field"><label for="ai-system-demo-readonly">Contract number</label><input id="ai-system-demo-readonly" type="text" value="SYS 88431 DE" readonly><span class="ai-system-help">Read only: editable only by account managers.</span></div></div><div class="ai-system-input-panel" aria-live="polite"><h4>Current state</h4><span class="ai-system-state-chip" id="ai-system-state-chip" data-state="Default">Default</span><dl><div><dt>Design tokens</dt><dd id="ai-system-tokens">border: color border default · bg: surface base · text: content primary</dd></div><div><dt>Interaction rule</dt><dd id="ai-system-rule">The resting state is visually quiet; affordance comes from the label and container.</dd></div><div><dt>Accessibility</dt><dd id="ai-system-a11y">The label is programmatically connected and the control is keyboard reachable.</dd></div><div><dt>Component API</dt><code id="ai-system-api">Input
  label="Work email"
  type="email"
  state="default"
  helperText="…"</code></div></dl></div></div></figure><h3>Review findings became organizational memory</h3><p>Every issue found by engineering became a reusable rule. The next component inherited the correction before an engineer saw it.</p>${codeEvidence}${shot('input-states.svg','Delivered evidence. The documented input system covers its supported states and behaviours.','Neutral input component showing default, focused, filled, error, read only and disabled states','ai-system-evidence-wide')}<h3>The system expanded beyond the first pilot</h3><p>The recording also documents a broader component family. Rebuilding these examples here makes the scope visible while keeping company branding and proprietary implementation details out of the case study.</p>${componentShowcase}</section>

    <section class="chapter" id="ai-system-6" data-screen-label="06"><span class="chapter-num">06 / Migration at scale</span><h2 class="chapter-title">Creating a canonical component was easier than replacing the old system</h2><p>With roughly 900 button related usages and more than 1,800 input usages, migration could not be treated as a global find and replace. Similar looking controls carried different semantics, locally written styles, loading states, icons and product behaviour.</p><figure class="media-block"><figcaption>Interactive evidence. Consolidate years of button drift into one governed component contract.</figcaption><div class="ai-system-consolidate" id="ai-system-consolidate"><div class="ai-system-button-specimen-head"><div><small>Implementation inventory</small><b>Button states found across the product</b></div><span>6 patterns mapped</span></div><div class="ai-system-legacy-grid" aria-hidden="true"><div class="ai-system-button-sample"><span>Primary</span><button class="is-primary">Save changes</button></div><div class="ai-system-button-sample"><span>Secondary</span><button class="is-secondary">Save changes</button></div><div class="ai-system-button-sample"><span>Outlined brand</span><button class="is-brand-outline">Save changes</button></div><div class="ai-system-button-sample"><span>Compact</span><button class="is-compact">Save</button></div><div class="ai-system-button-sample"><span>Loading</span><button class="is-loading"><i aria-hidden="true"></i>Saving</button></div><div class="ai-system-button-sample"><span>Disabled</span><button class="is-disabled" disabled>Save changes</button></div></div><button type="button" class="ai-system-merge-btn" id="ai-system-merge-btn" aria-pressed="false">Consolidate implementations</button><div class="ai-system-canonical"><small>Canonical component</small><button type="button">Save changes</button><code>Button
  variant="primary"
  size="medium"
  state="default"
  action="submit"</code><span class="ai-system-context-cap">Conceptual API. Proprietary production syntax removed.</span></div></div></figure><p>The working migration model became: find, classify, map, replace and validate. AI could accelerate repetitive replacement only after people had classified the problem correctly.</p>${shot('code-library.svg?v=2','Delivered evidence. A governed component is expressed through interface, state and implementation rules.','Neutral shared input component shown beside its component API')}<blockquote>Better models help. Better organizational context compounds.</blockquote></section>

    <section class="chapter" id="ai-system-7" data-screen-label="07"><span class="chapter-num">07 / The future workflow</span><h2 class="chapter-title">The end goal is designer led frontend assembly, with engineering still in control</h2><p>The component pilots are the foundation, not the destination. The intended future workflow allows a designer to create an experience, assemble a first frontend implementation from approved components and prepare it for engineering review. The system carries tokens, behaviour and known constraints forward; engineering remains accountable for architecture, security, integration and approval.</p>${futureWorkflow}<div class="ai-system-future-steps"><div><b>1. Design the experience</b><span>Define the task, flow, states and content.</span></div><div><b>2. Assemble with approved components</b><span>Use governed design system primitives instead of recreating interface code.</span></div><div><b>3. Apply organizational context</b><span>AI checks tokens, dependencies, accessibility and known architecture rules.</span></div><div><b>4. Review and integrate</b><span>Engineering validates complex behaviour and production readiness.</span></div><div><b>5. Improve the system</b><span>Review findings become rules inherited by the next implementation.</span></div></div></section>

    <section class="chapter" id="ai-system-8" data-screen-label="08"><span class="chapter-num">08 / Outcomes and limits</span><h2 class="chapter-title">I separate delivered progress from the promise of the model</h2><div class="ai-system-outcome-columns"><div><h3>Delivered</h3>${bullet(['A shared Figma foundation covering most of the design system.','Input, button and tabs developed through the AI assisted workflow and validated by engineering.','Engineering expectations consolidated into a reusable AI context.','Initial skepticism converted into participation and review.','A repeatable method for turning implementation failures into future rules.'])}</div><div><h3>Still to prove</h3>${bullet(['Migration coverage across the legacy interface.','Designer adoption of frontend assembly in everyday product work.','Acceptance rate for generated implementation.','Engineering time saved per component and product screen.','Long term maintenance of the governed context.'])}</div></div><h3>Current maturity</h3>${maturity}<h3>Limitations</h3>${bullet(['Engineering review remains mandatory; generation is not production approval.','Sanitizing and packaging context adds time when repository access is restricted.','Product specific behaviour can still require manual engineering.','The instruction layer must evolve as architecture and standards change.','Long term return on effort has not yet been measured.'])}</section>

    <section class="chapter" id="ai-system-9" data-screen-label="09"><span class="chapter-num">09 / What I learned</span><h2 class="chapter-title">I was designing a trust system</h2><p>The Figma library, coded components, AI context, review process and migration strategy became one interface production system. The most valuable output was not a single generated component. It was a clearer agreement about what AI may know, what designers can own, what engineering must validate and how the organization learns from failure.</p>${bullet(['AI capability is not the primary constraint; organizational context is.','Privacy, data access and professional trust determine adoption speed.','AI exposes undocumented processes that also make human onboarding difficult.','Human review is part of the product, not a temporary limitation.','Design systems are suited to AI because their problems are repeated, constrained and structured.'])}<blockquote>I did not use AI to bypass the design system. I used the design system to make AI useful.</blockquote><div class="ai-system-end-state"><b>Long term ambition</b><p>A designer can move from intent to a working frontend experience using governed components, while engineers spend their time on architecture, integration and the decisions that require engineering judgment.</p></div></section>

    <a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a></article></div></div>`;
  };

  const baseInit=window.initAiSystemCase;
  window.initAiSystemCase=function(){
    if(baseInit)baseInit();
    const reel=document.querySelector('.ai-system-system-reel');
    if(reel){
      const slides=[...reel.querySelectorAll('[data-reel-slide]')];
      const dots=[...reel.querySelectorAll('[data-reel-dot]')];
      const label=reel.querySelector('.ai-system-reel-label');
      const toggle=reel.querySelector('.ai-system-reel-toggle');
      const labels=['Components','States','Code'];
      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let current=0,timer=0,paused=reduceMotion,visible=true,temporaryPause=false;
      const clear=()=>{window.clearTimeout(timer);timer=0;};
      const schedule=()=>{clear();if(paused||temporaryPause||!visible||document.hidden)return;timer=window.setTimeout(()=>{show((current+1)%slides.length);schedule();},1667);};
      const show=index=>{
        current=index;
        slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));});
        dots.forEach(dot=>dot.classList.remove('is-active'));
        void reel.offsetWidth;
        dots.forEach((dot,i)=>{const active=i===index;dot.classList.toggle('is-active',active);if(active)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
        label.textContent=labels[index];
        reel.style.setProperty('--reel-cycle','1667ms');
      };
      dots.forEach(dot=>dot.addEventListener('click',()=>{show(Number(dot.dataset.reelDot));schedule();}));
      toggle.addEventListener('click',()=>{paused=!paused;toggle.textContent=paused?'Play':'Pause';toggle.setAttribute('aria-label',paused?'Play carousel':'Pause carousel');reel.classList.toggle('is-paused',paused);schedule();});
      reel.addEventListener('mouseenter',()=>{temporaryPause=true;reel.classList.add('is-hover-paused');clear();});
      reel.addEventListener('mouseleave',()=>{temporaryPause=false;reel.classList.remove('is-hover-paused');schedule();});
      reel.addEventListener('focusin',()=>{temporaryPause=true;clear();});
      reel.addEventListener('focusout',event=>{if(reel.contains(event.relatedTarget))return;temporaryPause=false;schedule();});
      document.addEventListener('visibilitychange',schedule);
      if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting!==false;schedule();},{threshold:.15});observer.observe(reel);}
      show(0);schedule();
    }
    const componentShowcase=document.getElementById('ai-system-component-showcase');
    if(componentShowcase){
      const tabs=[...componentShowcase.querySelectorAll('[data-component-tab]')];
      const panels=[...componentShowcase.querySelectorAll('[data-component-panel]')];
      const title=document.getElementById('ai-system-component-title');
      const status=document.getElementById('ai-system-component-status');
      const api=document.getElementById('ai-system-component-api');
      const componentMeta={
        date:['Date picker','In progress','progress','DatePicker · value · minDate · maxDate'],
        dropdown:['Dropdown','Documented','documented','Dropdown · options · valueChange · disabled'],
        phone:['Phone number','Documented','documented','PhoneInput · countryCode · value · validation'],
        radio:['Radio button','Documented','documented','RadioGroup · value · options · disabled'],
        checkbox:['Checkbox','Ready to use','ready','Checkbox · checked · disabled · error'],
        switch:['Switch','Documented','documented','Switch · checked · valueChange · disabled'],
        gauge:['Gauge','In progress','progress','Gauge · value · min · max · thresholds']
      };
      const activate=key=>{
        tabs.forEach(tab=>{const active=tab.dataset.componentTab===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
        panels.forEach(panel=>{panel.hidden=panel.dataset.componentPanel!==key;});
        const [name,label,state,contract]=componentMeta[key];
        title.textContent=name;status.textContent=label;status.dataset.status=state;api.textContent=contract;
      };
      tabs.forEach((tab,index)=>{
        tab.addEventListener('click',()=>activate(tab.dataset.componentTab));
        tab.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(event.key))return;event.preventDefault();const direction=['ArrowRight','ArrowDown'].includes(event.key)?1:-1;const next=tabs[(index+direction+tabs.length)%tabs.length];activate(next.dataset.componentTab);next.focus();});
      });
      activate('date');
      const monthLabel=document.getElementById('ai-system-calendar-month');
      const dateValue=document.getElementById('ai-system-date-value');
      const calendarDays=componentShowcase.querySelector('.ai-system-mini-days');
      let calendarMonth=7,calendarYear=2026;
      const paintMonth=()=>{
        monthLabel.textContent=new Intl.DateTimeFormat('en',{month:'long',year:'numeric'}).format(new Date(calendarYear,calendarMonth,1));
        const offset=(new Date(calendarYear,calendarMonth,1).getDay()+6)%7;
        const count=new Date(calendarYear,calendarMonth+1,0).getDate();
        calendarDays.innerHTML='<span aria-hidden="true"></span>'.repeat(offset)+Array.from({length:count},(_,index)=>`<button type="button" data-calendar-day="${index+1}" aria-pressed="false">${index+1}</button>`).join('');
        calendarDays.querySelectorAll('[data-calendar-day]').forEach(day=>day.addEventListener('click',()=>{calendarDays.querySelectorAll('[data-calendar-day]').forEach(item=>item.setAttribute('aria-pressed',String(item===day)));dateValue.textContent=`${String(day.dataset.calendarDay).padStart(2,'0')}/${String(calendarMonth+1).padStart(2,'0')}/${calendarYear}`;}));
      };
      componentShowcase.querySelectorAll('[data-month-move]').forEach(button=>button.addEventListener('click',()=>{calendarMonth+=Number(button.dataset.monthMove);if(calendarMonth<0){calendarMonth=11;calendarYear-=1;}if(calendarMonth>11){calendarMonth=0;calendarYear+=1;}paintMonth();dateValue.textContent='DD/MM/YYYY';}));
      paintMonth();
      const gauge=document.getElementById('ai-system-mini-gauge');
      const gaugeValue=document.getElementById('ai-system-gauge-value');
      const gaugeRange=document.getElementById('ai-system-gauge-range');
      gaugeRange.addEventListener('input',()=>{gauge.style.setProperty('--gauge-value',gaugeRange.value);gaugeValue.textContent=gaugeRange.value;});
    }
    const builder=document.getElementById('ai-system-builder');
    if(!builder)return;
    const componentButtons=[...builder.querySelectorAll('[data-builder-component]')];
    const previews=[...builder.querySelectorAll('[data-builder-preview]')];
    const countLabel=builder.querySelector('[data-check="components"]');
    const reviewLabel=builder.querySelector('[data-check="review"]');
    const reviewButton=document.getElementById('ai-system-builder-review');
    const status=document.getElementById('ai-system-builder-status');
    const empty=builder.querySelector('.ai-system-builder-empty');
    const paint=()=>{
      const selected=componentButtons.filter(button=>button.getAttribute('aria-pressed')==='true').map(button=>button.dataset.builderComponent);
      previews.forEach(preview=>{preview.hidden=!selected.includes(preview.dataset.builderPreview);});
      empty.hidden=selected.length>0;
      countLabel.textContent=`${selected.length} approved component${selected.length===1?'':'s'}`;
      reviewLabel.textContent='Review not started';
      builder.classList.remove('is-review-ready');
      status.innerHTML='<b>Designer workspace</b><span>The interface uses governed components. Engineering review remains the final gate before integration.</span>';
    };
    componentButtons.forEach(button=>button.addEventListener('click',()=>{button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));paint();}));
    reviewButton.addEventListener('click',()=>{
      const count=componentButtons.filter(button=>button.getAttribute('aria-pressed')==='true').length;
      if(!count){status.innerHTML='<b>Add a component first</b><span>The review packet needs at least one approved component.</span>';return;}
      builder.classList.add('is-review-ready');
      reviewLabel.textContent='Ready for engineering review';
      status.innerHTML=`<b>Review packet prepared</b><span>${count} governed component${count===1?'':'s'}, token mappings, accessibility rules and known constraints are ready for engineering validation.</span>`;
    });
    paint();
  };
})();
;
/* ===== resume.js ===== */
function resumePage(){
  const exp=[
    {role:'Lead Product Designer',org:'Expertlead',dates:'Jan 2023, Present',loc:'Remote',
     bullets:[
       'Streamlined design workflows and operating processes, increasing team productivity by 55% and improving product quality within two months.',
       'Designed and built turnover-expansion and revenue-consolidation applications from scratch for B2B SaaS clients, improving operational efficiency and reducing time-to-market by 30%.',
       'Built a comprehensive design system in six months, increasing customer productivity by 54% and ensuring UI consistency across all products.',
       'Authored design documentation and a style guide, reducing design inconsistencies by 40%.',
       'Led usability testing and user research that increased adoption of new features by 45% and strengthened cross-departmental collaboration.',
       'Designed an "Interview as a Service" product, improving HR efficiency and client engagement within four months.'
     ]},
    {role:'Founding Product Designer',org:'PayPro Private Limited',dates:'Jan 2021, Jan 2023',loc:'Hybrid',
     bullets:[
       'Led end-to-end redesign of the core fintech platform, using user research to guide product decisions and driving a 30% increase in engagement.',
       "Built PayPro's design system from the ground up, removing UI inconsistencies and improving usability across the product.",
       'Reimagined the visual identity and expanded the brand color system, contributing to a 25% increase in user engagement.',
       'Drove product improvements from market and behavioral data, helping increase user retention from 28.5% to 87.15%.'
     ]},
    {role:'Senior Product Designer (Contract)',org:'CreditBook',dates:'Feb 2021, Jul 2021',loc:'Remote',
     bullets:[
       "Led a cross-functional design team building CreditBook's design system from scratch.",
       'Enhanced existing features and introduced new functionality aligned to user needs and market demand.',
       'Improved product quality by 40% through strategic design decisions and close engineering collaboration.'
     ]},
    {role:'Product Designer',org:'IDEATE Innovation',dates:'Jul 2019, Dec 2020',loc:'Onsite',
     bullets:[
       'Redesigned mobile and web applications for major international banks, improving fintech user experience by 35%.',
       'Conducted in-depth user research to identify pain points and shape design solutions.',
       'Built a design system spanning 60+ screens, standardizing patterns and streamlining delivery.',
       'Led design QA, validating changes through rigorous testing and user surveys.'
     ]},
    {role:'Product Designer',org:'PriceOye.pk',dates:'Jun 2016, Aug 2018',loc:'Onsite',
     bullets:[
       "Established the company's UX process, laying the foundation for user-centered design.",
       'Ran user interviews and journey mapping to surface pain points and inform decisions.',
       'Delivered a detailed style guide, standardizing design elements and reducing design inconsistencies by 50%.'
     ]},
    {role:'Senior Product Designer',org:'Multiple Contracts',dates:'Jun 2017, Present',loc:'Remote',
     bullets:[
       'Delivered human-centered design for international clients, including a digital organic-market app and branded crypto-gateway systems for decentralized partners including Sandbox and Mana.',
       'Improved usability and engagement across client platforms by 40% through tailored design solutions.'
     ]}
  ];

  const roleCard=(e,i)=>`<article class="resume-role" style="--i:${i}">
    <div class="resume-role-head">
      <h3>${e.role}</h3>
      <span class="resume-role-dates">${e.dates}</span>
    </div>
    <p class="resume-role-org">${e.org} <span aria-hidden="true">·</span> ${e.loc}</p>
    <ul class="resume-role-bullets">${e.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
  </article>`;
  const pills=(list,cls)=>`<div class="resume-pill-row${cls?' '+cls:''}">${list.map(s=>`<span class="resume-pill">${s}</span>`).join('')}</div>`;

  return `<div class="resume-page" data-screen-label="Resume">
    <header class="resume-head">
      <div class="resume-head-row">
        <img class="resume-photo" src="assets/home/saeed-portrait.webp" alt="Portrait of Saeed Shaffi">
        <div class="resume-head-copy">
          <p class="resume-crumb"><a href="#/">Home</a> <span aria-hidden="true">/</span> Resume</p>
          <h1>Saeed Shaffi</h1>
          <p class="resume-role-title">Senior Product Designer <span aria-hidden="true">, </span> AI, Design Systems &amp; Data-Driven Product Strategy</p>
          <ul class="resume-meta">
            <li>Berlin, Germany</li>
            <li><a href="mailto:saeedshaffi@gmail.com">saeedshaffi@gmail.com</a><button class="resume-copy-btn" type="button" data-copy-value="saeedshaffi@gmail.com" aria-label="Copy email address"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></li>
            <li><a href="tel:+4917666104496">+49 176 66104496</a><button class="resume-copy-btn" type="button" data-copy-value="+49 176 66104496" aria-label="Copy phone number"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></li>
          </ul>
          <span class="resume-visa">EU Blue Card (Germany)</span>
        </div>
      </div>
      <div class="resume-head-actions">
        <a class="button primary resume-download" href="resume-print.html" target="_blank" rel="noreferrer">Download Résumé (PDF)</a>
        
      </div>
    </header>

    <div class="resume-body">
      <main class="resume-main">
        <h2 class="resume-section-title">Experience</h2>
        ${exp.map((e,i)=>roleCard(e,i)).join('')}
      </main>

      <aside class="resume-side">
        <section class="resume-side-card">
          <h2>About</h2>
          <p>Senior Product Designer with 10+ years leading design systems and end-to-end UX for fintech, SaaS and B2B platforms. I connect user research to product strategy, ship design systems that scale across dozens of screens, and increasingly bring AI-assisted workflows into research, prototyping and design-to-dev handoff. Computer-science background; comfortable partnering across product, engineering and data teams to ship measurable outcomes.</p>
        </section>
        <section class="resume-side-card">
          <h2>Skills</h2>
          <p class="resume-skill-group"><b>Product &amp; UX Design</b></p>
          ${pills(['UI/UX Design','Wireframing','Prototyping','Design Systems','User-Centered Design','Interaction Design','Information Architecture'],'is-accent-a')}
          <p class="resume-skill-group"><b>Research &amp; Data</b></p>
          ${pills(['UX Research','Usability Testing','Google Analytics','Hotjar','Maze','Amplitude','OpenReplay','Data-Driven Design'],'is-accent-b')}
          <p class="resume-skill-group"><b>Collaboration &amp; Leadership</b></p>
          ${pills(['Cross-Functional Collaboration','Remote Team Leadership','Design Leadership','Agile Methodologies','Stakeholder Management'],'is-accent-c')}
        </section>
        <section class="resume-side-card">
          <h2>Tools</h2>
          ${pills(['Figma','Adobe XD','Sketch','Zeplin','Abstract','Miro','Trello','Balsamiq','Jira','Notion'])}
        </section>
        <section class="resume-side-card">
          <h2>Certifications</h2>
          <p class="resume-skill-group">Design Principles, UC San Diego</p>
          <p class="resume-skill-group">Human-Centered Design, UC San Diego</p>
          <p class="resume-skill-group">Social Computing, UC San Diego</p>
        </section>
        <section class="resume-side-card">
          <h2>Education</h2>
          <p class="resume-skill-group">Bachelor in Computer Science<br>Shaheed Zulfiqar Ali Bhutto Institute of Science &amp; Technology</p>
        </section>
      </aside>
    </div>
  </div>`;
}
;
/* ===== case-extras.js ===== */
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
;
/* ===== site-extras.js ===== */
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
;
/* ===== motion-extras.js ===== */
/* Motion batch 3 — behaviour for the moments that need JS.
   window.initMotionExtras(path) is called by app.js after every render.
   Everything degrades to the static page: no class is applied unless the
   matching element exists and motion is allowed. */
(function(){
  const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=()=>window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* 5. Hero meta chips type on, once, on the first visit */
  function initMetaType(path){
    if(path!=='/'||reduceMotion()||document.body.classList.contains('is-return-visit'))return;
    const meta=document.querySelector('.home-hero-meta');
    if(!meta||meta.dataset.typed)return; meta.dataset.typed='1';
    const spans=[...meta.children].filter(el=>el.textContent.trim());
    if(!spans.length)return;
    spans.forEach(s=>{
      s.dataset.text=s.textContent;
      s.style.minWidth=Math.ceil(s.getBoundingClientRect().width)+'px';
      s.textContent='';
    });
    const typeSpan=(s,done)=>{
      const text=s.dataset.text; let i=0;
      s.classList.add('is-typing');
      const step=()=>{
        if(!s.isConnected)return;
        i++; s.textContent=text.slice(0,i);
        if(i<text.length)setTimeout(step,16+Math.random()*24);
        else setTimeout(()=>{s.classList.remove('is-typing');done();},140);
      };
      setTimeout(step,60);
    };
    let idx=0;
    const next=()=>{const s=spans[idx++];if(s)typeSpan(s,next);};
    const wait=document.body.classList.contains('intro-active')?1750:520;
    setTimeout(next,wait);
  }

  /* 3. The eye glances down when "See my work" is clicked */
  function initEyeGlance(){
    if(document.body.dataset.eyeGlance)return; document.body.dataset.eyeGlance='1';
    document.addEventListener('click',e=>{
      const cta=e.target.closest('.home-inline-cta');
      const eye=cta&&cta.querySelector('.home-eye');
      if(!eye||reduceMotion())return;
      eye.classList.add('is-glance');
      setTimeout(()=>eye.classList.remove('is-glance'),520);
    });
  }

  /* 9. Archive cascade (bottom-left → top-right) and tilt toward the cursor */
  let shotsObserver=null;
  function initArchive(path){
    if(shotsObserver){shotsObserver.disconnect();shotsObserver=null;}
    const shots=path==='/'?document.querySelector('.home-archive-section .shots'):null;
    if(!shots)return;
    if(!reduceMotion()&&document.body.classList.contains('reveal-armed')&&!shots.classList.contains('is-in')){
      const items=[...shots.querySelectorAll('.shot')];
      const order=()=>{
        const rects=items.map(el=>el.getBoundingClientRect());
        const rows=[...new Set(rects.map(r=>Math.round(r.top)))].sort((a,b)=>a-b);
        const cols=[...new Set(rects.map(r=>Math.round(r.left)))].sort((a,b)=>a-b);
        items.forEach((el,i)=>{
          const row=rows.indexOf(Math.round(rects[i].top)),col=cols.indexOf(Math.round(rects[i].left));
          el.style.setProperty('--i',String((rows.length-1-row)+col));
        });
      };
      if(shots.getBoundingClientRect().top<window.innerHeight*0.9){shots.classList.add('is-in');items.forEach(el=>el.style.animation='none');}
      else if('IntersectionObserver' in window){
        shotsObserver=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){order();shots.classList.add('is-in');shotsObserver.disconnect();}});},{rootMargin:'0px 0px -8% 0px',threshold:0.08});
        shotsObserver.observe(shots);
      }else shots.classList.add('is-in');
    }
    if(finePointer()&&!reduceMotion()&&!shots.dataset.tilt){
      shots.dataset.tilt='1';
      shots.addEventListener('pointermove',e=>{
        const shot=e.target.closest('.shot'); if(!shot)return;
        const r=shot.getBoundingClientRect();
        const px=(e.clientX-(r.left+r.width/2))/(r.width/2),py=(e.clientY-(r.top+r.height/2))/(r.height/2);
        shot.style.setProperty('--rx',(px*3).toFixed(2)+'deg');
        shot.style.setProperty('--ry',(-py*3).toFixed(2)+'deg');
      });
      shots.addEventListener('pointerout',e=>{
        const shot=e.target.closest('.shot');
        if(shot&&!shot.contains(e.relatedTarget)){shot.style.setProperty('--rx','0deg');shot.style.setProperty('--ry','0deg');}
      });
    }
  }

  /* 11. Principle numbers become two-digit reels that roll up on reveal */
  function initPrincipleOdometer(path){
    if(path!=='/')return;
    document.querySelectorAll('.home-principle').forEach(li=>{
      const num=li.querySelector('.home-principle-num');
      if(!num||num.dataset.odo)return;
      const text=num.textContent.trim();
      if(!/^\d{2}$/.test(text))return;
      num.dataset.odo=text;
      const digits=text.split('');
      num.innerHTML='<span class="odo" aria-hidden="true">'+digits.map(d=>{
        const n=parseInt(d,10);
        const reel=Array.from({length:n+1},(_,k)=>'<i>'+k+'</i>').join('');
        return '<span class="odo-d"><span class="odo-reel" style="translate:0 -'+(n*1.2)+'em">'+reel+'</span></span>';
      }).join('')+'</span><span class="sr-only">'+text+'</span>';
    });
  }

  /* 12. Tooltip lines get an index for the stagger */
  function initTooltipIndex(path){
    if(path!=='/')return;
    document.querySelectorAll('.timeline-tip').forEach(tip=>{
      [...tip.querySelectorAll('i')].forEach((el,n)=>el.style.setProperty('--n',String(n)));
    });
  }

  /* 14. Drag card: "Drag me" wiggles once after 8s idle, then every 8s until touched */
  let idleTimer=0;
  function initDragHint(path){
    clearTimeout(idleTimer);
    if(path!=='/'||reduceMotion())return;
    const arm=()=>{
      const card=document.querySelector('.drag-contact-card');
      if(!card){idleTimer=setTimeout(arm,600);return;}
      if(card.dataset.hint)return; card.dataset.hint='1';
      let touched=false;
      const stop=()=>{touched=true;clearTimeout(idleTimer);card.classList.remove('is-idle-hint');};
      card.addEventListener('pointerdown',stop,{once:true});
      const wiggle=()=>{
        if(touched||!card.isConnected)return;
        const r=card.getBoundingClientRect();
        if(r.bottom>0&&r.top<window.innerHeight){
          card.classList.remove('is-idle-hint');void card.offsetWidth;card.classList.add('is-idle-hint');
          card.addEventListener('animationend',()=>card.classList.remove('is-idle-hint'),{once:true});
        }
        idleTimer=setTimeout(wiggle,8000);
      };
      idleTimer=setTimeout(wiggle,8000);
    };
    arm();
  }

  /* 15. Copy email: the address scatters and reassembles at the point of action */
  function initCopyScatter(){
    if(document.body.dataset.copyScatter)return; document.body.dataset.copyScatter='1';
    document.addEventListener('click',e=>{
      const btn=e.target.closest('.ft4-copy'); if(!btn||reduceMotion())return;
      const link=btn.closest('.ft4-tile-email')?.querySelector('.ft4-tile-text a'); if(!link)return;
      if(!link.dataset.split){
        link.dataset.split='1';
        const text=link.textContent;
        link.setAttribute('aria-label',text);
        link.innerHTML=[...text].map((c,i)=>'<span class="ch" aria-hidden="true" style="--ci:'+i+'">'+(c===' '?'&nbsp;':c.replace(/[<>&]/g,''))+'</span>').join('');
      }
      link.querySelectorAll('.ch').forEach(ch=>{
        ch.style.setProperty('--sx',((Math.random()*6-3)).toFixed(1)+'px');
        ch.style.setProperty('--sy',((Math.random()*6-3)).toFixed(1)+'px');
      });
      link.classList.remove('is-scatter');void link.offsetWidth;link.classList.add('is-scatter');
      setTimeout(()=>link.classList.remove('is-scatter'),1200);
    });
  }

  /* 17. Sticky TOC: a single marker slides to the active chapter */
  let tocObserver=null;
  function initTocMarker(path){
    if(tocObserver){tocObserver.disconnect();tocObserver=null;}
    if(!path.startsWith('/case/'))return;
    const toc=document.querySelector('.study-toc'); if(!toc)return;
    const links=[...toc.querySelectorAll('a[href^="#"]')]; if(!links.length)return;
    links.forEach(a=>{
      if(a.dataset.numbered)return; a.dataset.numbered='1';
      const first=a.firstChild;
      if(first&&first.nodeType===3){
        const m=first.textContent.match(/^(\s*)(\d{2})(\s*·?)/);
        if(m){
          const b=document.createElement('b');b.className='toc-n';b.textContent=m[2];
          const rest=document.createTextNode(first.textContent.slice(m[1].length+m[2].length));
          first.replaceWith(document.createTextNode(m[1]),b,rest);
        }
      }
    });
    let marker=toc.querySelector('.toc-marker');
    if(!marker){marker=document.createElement('span');marker.className='toc-marker';marker.setAttribute('aria-hidden','true');toc.appendChild(marker);}
    toc.classList.add('has-marker');
    const place=()=>{
      const active=links.find(a=>a.classList.contains('active')||a.getAttribute('aria-current'));
      if(!active){toc.classList.remove('marker-on');return;}
      const tr=toc.getBoundingClientRect(),ar=active.getBoundingClientRect();
      toc.style.setProperty('--toc-y',(ar.top-tr.top).toFixed(1)+'px');
      toc.style.setProperty('--toc-h',ar.height.toFixed(1)+'px');
      toc.classList.add('marker-on');
    };
    tocObserver=new MutationObserver(place);
    links.forEach(a=>tocObserver.observe(a,{attributes:true,attributeFilter:['class','aria-current']}));
    place();
    setTimeout(place,400);
  }

  /* 18. Chapter numbers roll from 00 to their value as the chapter enters */
  let numObserver=null;
  function initChapterNumbers(path){
    if(numObserver){numObserver.disconnect();numObserver=null;}
    if(!path.startsWith('/case/'))return;
    const nums=[...document.querySelectorAll('.case .chapter-num')];
    if(!nums.length)return;
    nums.forEach(el=>{
      if(el.dataset.rolled)return;
      const first=el.firstChild;
      if(first&&first.nodeType===3){
        const m=first.textContent.match(/^(\d{2})/);
        if(m){const b=document.createElement('b');b.className='ch-n';b.textContent=m[1];b.dataset.target=m[1];first.replaceWith(b,document.createTextNode(first.textContent.slice(2)));}
      }
      el.dataset.rolled='1';
    });
    if(reduceMotion()||!('IntersectionObserver' in window)){nums.forEach(el=>el.classList.add('num-in'));return;}
    const roll=el=>{
      el.classList.add('num-in');
      const b=el.querySelector('.ch-n'); if(!b)return;
      const target=parseInt(b.dataset.target,10),start=performance.now(),dur=520;
      const tick=now=>{
        const t=Math.min(1,(now-start)/dur),eased=1-Math.pow(1-t,3);
        b.textContent=String(Math.round(target*eased)).padStart(2,'0');
        if(t<1)requestAnimationFrame(tick);else b.textContent=b.dataset.target;
      };
      requestAnimationFrame(tick);
    };
    numObserver=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){roll(e.target);numObserver.unobserve(e.target);}});},{threshold:0.5});
    nums.forEach(el=>{ if(el.getBoundingClientRect().top<window.innerHeight*0.7)el.classList.add('num-in'); else numObserver.observe(el); });
  }

  window.initMotionExtras=function(path){
    initEyeGlance();
    initCopyScatter();
    initMetaType(path);
    initArchive(path);
    initPrincipleOdometer(path);
    initTooltipIndex(path);
    initDragHint(path);
    initTocMarker(path);
    initChapterNumbers(path);
  };
})();
;
/* ===== app.js ===== */
const A='https://www.figma.com/api/mcp/asset/';
const assets={portrait:'assets/home/saeed-portrait.webp',kfh:'assets/kfh/hr/Device - Macbook Pro 3D.webp',eyewa:'assets/projects/eyewa.png',system:'assets/projects/harmony.png',talon:'assets/projects/talon.png',aiSystem:'assets/projects/ai-system.png'};
const shots=[['Tuningbill','tuningbill.webp'],['Myuni Path','myuni-path.webp'],['Inteck','inteck.webp'],['MedVahan','medvahan.webp'],['Mobilum Wallet','mobilum-wallet.webp'],['Pet Sitter','pet-sitter.webp'],['PayPro','paypro.webp'],['PriceOye Rider','priceoye-rider.webp'],['Ryanair','ryanair-clean.webp']];
const SHOTS='assets/shots/enhanced/';
// Retry once if a thumbnail failed to load (stale cached 404s)
addEventListener('error',e=>{const im=e.target;if(im&&im.tagName==='IMG'&&!im.dataset.retried){im.dataset.retried='1';setTimeout(()=>{im.src=im.src.split('?')[0]+'?r='+Date.now()},400)}},true);
const SHOTS_FULL='assets/shots/enhanced/full/';
const projects=[{id:'kfh',tag:'Fintech · Digital banking',title:'Cutting onboarding drop-off from 66% to 18% at KFH Jazeel Bank',desc:'A complete redesign spanning onboarding, core banking features, a new design system, and 900 delivered screens.',img:assets.kfh,highlights:['Lead Product Designer','Web application redesign','6 months']},{id:'eyewa',tag:'eCommerce · Checkout',title:'Turning checkout friction into 36% higher retention at Eyewa',desc:'A clearer, more trustworthy checkout that reduced churn and complaints.',img:assets.eyewa,highlights:['Product Designer','Checkout redesign','Complete journey']},{id:'system',tag:'B2B · Design systems',title:'Making consistency the default at CreditBook with one design system',desc:'Connecting global teams with a shared product language at CreditBook.',img:assets.system,highlights:['Sole Product Designer','Design system','Feb–Jul 2021']},{id:'talon',tag:'B2B SaaS · Promotion engine',title:'Making campaign creation explain itself at Talon.One in a five-day sprint',desc:'A five day sprint to simplify campaign creation for enterprise users.',img:assets.talon,highlights:['Sole Product Designer','Campaign Manager UX','5 day sprint']},{id:'ai-system',tag:'B2B SaaS · Design systems · AI',title:'Taking a design system from Figma to production code with AI',desc:'Turning a fragmented UI ecosystem into a design to code system with AI and a governed engineering context.',img:assets.aiSystem,highlights:['Lead Product Designer','Design system + AI','6 months, ongoing']}];
const aiSystemProject=projects.find(project=>project.id==='ai-system');
if(aiSystemProject)Object.assign(aiSystemProject,{title:'Taking a design system from Figma to production code with AI',desc:'Creating governed AI assisted components and a safer path for designers to assemble engineering reviewed frontend experiences.'});
if(aiSystemProject){
  projects.splice(projects.indexOf(aiSystemProject),1);
  projects.splice(1,0,aiSystemProject);
}
const projectVisual=p=>p.id==='kfh'?`<div class="visual kfh-project-visual" role="img" aria-label="KFH Jazeel Bank sign-up interface. Onboarding drop off improved by 48 percent, PayBills adoption grew by 29.5 percent, and 900 screens were delivered."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>KFH</b><span>Jazeel Bank</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><i class="kfh-metric-arrow is-down" aria-hidden="true">↓</i><b class="kfh-thumb-counter" data-thumb-count="48">48</b><small>%</small></strong><span>less onboarding drop off</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><i class="kfh-metric-arrow is-up" aria-hidden="true">↑</i><b class="kfh-thumb-counter" data-thumb-count="29.5" data-thumb-decimals="1">29.5</b><small>%</small></strong><span>more PayBills adoption</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><b class="kfh-thumb-counter" data-thumb-count="900">900</b></strong><span>screens delivered</span></div></div></div><img class="kfh-thumb-device" src="assets/kfh/hr/Device%20-%20Macbook%20Pro%203D.webp" alt="" aria-hidden="true"></div>`:p.id==='eyewa'?`<div class="visual eyewa-visual-abstract eyewa-project-visual" role="img" aria-label="Eyewa checkout redesign. User retention improved by 36 percent, checkout complaints fell by 62 percent, with an estimated 28 million AED in additional annual revenue."><div class="eyewa-abstract-glasses" aria-hidden="true"><span class="eyewa-glass-lens"></span><span class="eyewa-glass-lens"></span><span class="eyewa-glass-bridge"></span><span class="eyewa-glass-temple"></span></div><div class="eyewa-thumb-copy"><div class="eyewa-thumb-brand"><b>EY</b><span>Eyewa</span></div><div class="eyewa-thumb-metrics"><div class="eyewa-thumb-stat"><strong><i class="eyewa-metric-arrow" aria-hidden="true">↑</i><b class="eyewa-thumb-counter" data-thumb-count="36">36</b><small>%</small></strong><span>improvement in user retention</span></div><div class="eyewa-thumb-stat"><strong><i class="eyewa-metric-arrow" aria-hidden="true">↓</i><b class="eyewa-thumb-counter" data-thumb-count="62">62</b><small>%</small></strong><span>reduction in complaints</span></div><div class="eyewa-thumb-stat eyewa-thumb-stat-hero"><strong>+<b class="eyewa-thumb-counter" data-thumb-count="28">28</b><small>M AED</small></strong><span>est. additional annual revenue</span></div></div></div><img class="eyewa-thumb-device" src="assets/projects/hr/eyewa-device.webp" alt="" aria-hidden="true"></div>`:p.id==='system'?`<div class="visual kfh-project-visual hm-project-visual" role="img" aria-label="Harmony, the CreditBook design system. A real component library and token panel are shown alongside project outcomes: customer productivity up 54 percent, 40 percent fewer interface inconsistencies, six months from first audit to full rollout."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>CB</b><span>Harmony</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><i class="kfh-metric-arrow is-up" aria-hidden="true">↑</i><b class="kfh-thumb-counter" data-thumb-count="54">54</b><small>%</small></strong><span>customer productivity</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><b class="kfh-thumb-counter" data-thumb-count="6">6</b><small class="unit">months</small></strong><span>audit to full rollout</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><i class="kfh-metric-arrow is-down" aria-hidden="true">↓</i><b class="kfh-thumb-counter" data-thumb-count="40">40</b><small>%</small></strong><span>fewer inconsistencies</span></div></div></div><div class="kfh-thumb-device hm-thumb-stage" aria-hidden="true"><div class="hm-component-board"><img src="assets/harmony/hr/harmony-tokens.webp" alt="" loading="lazy"><span class="hm-token-chip" style="--i:0;--x:8%;--y:12%"><i style="background:#1e8055"></i><b>color.primary</b><small>#1E8055</small></span><span class="hm-token-chip" style="--i:1;--x:52%;--y:38%"><i style="background:#f4f1eb;border:1px solid rgba(0,0,0,.12)"></i><b>surface.card</b><small>#F4F1EB</small></span><span class="hm-token-chip" style="--i:2;--x:16%;--y:66%"><i class="is-radius"></i><b>radius.md</b><small>12px</small></span></div></div></div>`:p.id==='talon'?`<div class="visual kfh-project-visual tl-project-visual" role="img" aria-label="Talon.One campaign creation redesign. The complete final campaign prototype is shown alongside project outcomes: a five day design sprint, a Clarity score of 52 out of 100 on the original campaign screens, and a four step guided flow."><div class="kfh-thumb-copy"><div class="kfh-thumb-brand"><b>T1</b><span>Talon.One</span></div><div class="kfh-thumb-metrics"><div class="kfh-thumb-stat" data-thumb-order="0"><strong><b class="kfh-thumb-counter" data-thumb-count="5">5</b><small class="unit">days</small></strong><span>end to end design sprint</span></div><div class="kfh-thumb-stat" data-thumb-order="1"><strong><b class="kfh-thumb-counter" data-thumb-count="52">52</b><small>/100</small></strong><span>Clarity score before redesign</span></div><div class="kfh-thumb-stat" data-thumb-order="2"><strong><b class="kfh-thumb-counter" data-thumb-count="4">4</b><small class="unit">steps</small></strong><span>replaced an unmarked flow</span></div></div></div><div class="kfh-thumb-device tl-thumb-stage" aria-hidden="true"><div class="tl-feature-shot"><img src="assets/talon/hr/prototype.png" alt="" loading="lazy"><div class="tl-stepper" aria-hidden="true"><span style="--i:0"><b>1</b>Campaign</span><span style="--i:1"><b>2</b>Rules</span><span style="--i:2"><b>3</b>Filters</span><span style="--i:3"><b>4</b>Activate</span><i class="tl-stepper-bar"></i></div></div></div></div>`:p.id==='ai-system'?`<div class="visual ai-thumb" role="img" aria-label="Designing beyond Figma. Fragmented interface components are consolidated and saved: over 900 buttons and 1,800 inputs brought into one governed design system."><div class="ai-thumb-left" aria-hidden="true"><div class="ai-thumb-row"><span class="ai-box" style="--i:0;width:34%"></span><span class="ai-box" style="--i:1;width:22%"></span><span class="ai-box" style="--i:2;width:28%"></span></div><div class="ai-thumb-row"><span class="ai-box" style="--i:3;width:46%"></span><span class="ai-box" style="--i:4;width:21%"></span></div><div class="ai-thumb-row"><span class="ai-box" style="--i:5;width:39%"></span><span class="ai-box" style="--i:6;width:34%"></span></div><i class="ai-thumb-arrow">↓</i><span class="ai-thumb-save">Save changes</span></div><div class="ai-thumb-copy" aria-hidden="true"><b>Designing<br>beyond Figma</b><span>Design system to production code, with AI</span><small>900+ buttons · 1,800+ inputs consolidated</small></div></div>`:`<div class="visual"><img src="${p.img}" alt="${p.title} project preview" loading="lazy"></div>`;
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
const projectCards=()=>projects.map(p=>p.comingSoon?`<div class="project-card coming-soon-card" aria-disabled="true">${projectVisual(p)}<span class="coming-soon-banner">Coming soon</span><div class="meta"><span class="tags">${p.tag}</span><h3>${p.title}</h3><p>${p.desc}</p></div></div>`:`<a class="project-card${p.id==='kfh'?' kfh-project-card':p.id==='eyewa'?' eyewa-project-card':p.id==='system'?' kfh-project-card hm-project-card':p.id==='talon'?' kfh-project-card tl-project-card':p.id==='ai-system'?' ai-system-project-card':''}" href="#/case/${p.id}">${projectVisual(p)}<div class="meta"><span class="tags">${p.tag}</span><h3>${p.title}</h3><p>${p.desc}</p>${projectHighlights(p)}${p.highlights?`<div class="project-highlights" aria-label="Project facts">${p.highlights.map(item=>`<span>${item}</span>`).join('')}</div>`:''}</div></a>`).join('');
function notFoundPage(path){const safe=String(path).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));return `<section class="notfound reveal" aria-labelledby="notfound-title"><span class="notfound-eyebrow">404 · Page not found</span><h1 id="notfound-title">This page moved on. The work is still here, built for <em>clarity</em>.</h1><p>The link you followed points to a page that no longer exists. The case studies, résumé and contact details are one click away.</p><div class="notfound-actions"><a href="#/" data-scroll-target="selected-work">See my work</a><a href="mailto:saeedshaffi@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></div><div class="notfound-path">${safe}</div></section>`}
function home(){return `<section class="home-hero reveal" aria-labelledby="home-hero-title"><span class="home-hero-grain" aria-hidden="true"></span><div class="home-hero-meta"><span>Berlin · Lead Product Designer</span><span>Fintech · eCommerce · B2B · B2C · SaaS</span></div><div class="home-hero-content"><h1 id="home-hero-title"><span class="hl" style="--hl:0">Design is how strategy becomes real.</span><br aria-hidden="true" /> <a class="home-inline-cta" href="#/" data-scroll-target="selected-work" aria-label="See my work"><span class="home-inline-label">See my work</span><span class="home-eye" aria-hidden="true"></span></a> <span class="hl" style="--hl:1">I turn complexity <span class="home-into-pair">into&nbsp;<em class="home-rotating-phrase"><span class="home-rotating-group" aria-hidden="true"><span class="home-rotating-word"><span style="--word-index:0">clarity</span><span style="--word-index:1">confidence</span><span style="--word-index:2">momentum</span></span></span><span class="sr-only">clarity</span></em></span></span><br /><a class="home-talk-pill" href="mailto:saeedshaffi@gmail.com"><span>Let’s talk</span><i class="home-talk-icon" aria-hidden="true"><span>↗</span></i></a> <span class="hl" style="--hl:2">about your product.</span></h1><div class="home-hero-note"><p>More than 10 years combining research, product strategy, systems thinking, and craft. From early ideas to measurable results.</p><a class="home-resume-link" href="assets/SaeedShaffi_Resume.pdf" download="SaeedShaffi_Resume.pdf" aria-label="Open Saeed Shaffi résumé PDF">View résumé <span aria-hidden="true">↗</span></a></div></div></section><section class="home-clients" aria-label="Companies I have worked with"><div class="home-clients-inner"><span class="home-clients-label">Worked with</span><div class="home-clients-track"><ul class="home-clients-list"><li>KFH Jazeel Bank</li><li>Eyewa</li><li>CreditBook</li><li>Talon.One</li><li>Expertlead</li><li>PayPro</li><li>PriceOye</li><li>Ideate</li></ul><ul class="home-clients-list" aria-hidden="true"><li>KFH Jazeel Bank</li><li>Eyewa</li><li>CreditBook</li><li>Talon.One</li><li>Expertlead</li><li>PayPro</li><li>PriceOye</li><li>Ideate</li></ul></div></div></section><section class="page section home-work" id="selected-work" tabindex="-1"><div class="section-head"><div><span class="eyebrow">Selected work</span><h2>Designed to move<br>the metric.</h2></div><p>Five stories about research, systems thinking, stakeholder alignment and measurable product impact.</p></div><div class="project-grid">${projectCards()}</div><section class="home-archive" aria-labelledby="visual-archive-title"><div class="section-head"><div><span class="eyebrow">Visual archive</span><h2 id="visual-archive-title">Selected shots</h2></div></div><div class="shots">${shots.map(([n,u])=>`<button class="shot" type="button" data-shot-src="${SHOTS_FULL+u}" data-shot-title="${n}" aria-label="Open ${n} interface preview" aria-haspopup="dialog"><img loading="lazy" src="${SHOTS+u}" alt="${n} interface preview"><span>${n}</span></button>`).join('')}</div></section></section><section class="page section home-principles" aria-labelledby="home-principles-title"><div class="section-head"><div><span class="eyebrow">How I work</span><h2 id="home-principles-title">Four rules I don't<br>compromise on.</h2></div><p>The habits behind every number on this page.</p></div><ol class="home-principles-grid"><li class="home-principle" style="--i:0"><span class="home-principle-num">01</span><h3>Research before pixels</h3><p>Every redesign starts with drop-off data, interviews and support signals, not a moodboard.</p></li><li class="home-principle" style="--i:1"><span class="home-principle-num">02</span><h3>Systems over screens</h3><p>I build the foundations first: tokens, components and rules, so the 900th screen is as consistent as the first.</p></li><li class="home-principle" style="--i:2"><span class="home-principle-num">03</span><h3>Ship to learn</h3><p>Phased releases that earn engineering trust and prove the direction with real numbers, not opinions.</p></li><li class="home-principle" style="--i:3"><span class="home-principle-num">04</span><h3>Bring everyone along</h3><p>Executives, engineers, support and marketing aligned through weekly reviews and documentation that outlives the project.</p></li></ol></section>${careerTimeline()}`}
const caseData={kfh:{accent:'#56e0bd',tag:'Fintech · Digital banking',title:'Transforming KFH Jazeel Bank into a scalable fintech platform.',summary:'A six month redesign of KFH Jazeel’s personal financing platform, improving onboarding, building a design system and enabling a team to deliver at scale.',task:'Redesign web application',role:'Lead Product Designer',duration:'6 months',sections:[['The challenge',`Despite significant marketing, users were not returning to KFH Jazeel. Research exposed a product that felt like a traditional banking form: onboarding was long, core actions were unclear and even basic flows could crash. The business needed more than a visual refresh, it needed a more useful product model.`],['Research before pixels',`I partnered with the data team to examine behaviour and drop off, interviewed customers, reviewed support signals and compared traditional banks with neobanks. The most urgent signal was a 66% drop off during onboarding. Interviews reinforced it: 80% found onboarding challenging, 86% experienced crashes and 30% did not understand core features.`],['Changing how the team worked',`I led design strategy, research and stakeholder alignment while mentoring two junior designers. I introduced version control, a shared workflow and a design system based on atomic design. Weekly reviews and developer documentation kept bank executives, engineering, marketing, support and product aligned.`],['Outcome',`We phased the onboarding redesign to address engineering concerns without compromising the experience. Starting with fewer fields and clearer errors proved the direction, built trust with engineering, and unlocked deeper improvements.`]],metrics:[['66→18%','onboarding drop off'],['3→32.5%','PayBills adoption'],['900','screens delivered'],['99%','deadlines met']]},eyewa:{accent:'#ff8064',tag:'eCommerce · Checkout',title:'Turning checkout friction into customer confidence.',summary:'A checkout redesign informed by research for Eyewa that made progress, costs and security easier to understand.',task:'Checkout redesign',role:'Product Designer',duration:'Complete journey',sections:[['The challenge',`Customers struggled to understand Eyewa’s checkout steps, could not easily review their order and lacked confidence in card payments. Eyewa was losing almost 40% of potential customers during checkout.`],['From evidence to focus',`I analysed funnel behaviour, reviewed competing international commerce flows and mapped patterns and variations. Heatmaps suggested users did not know where to focus. Missing progress indicators, weak content clarity and a promo field that drew too much attention added cognitive load.`],['Design and validation',`Paper concepts became detailed flows for login, guest checkout, contact details, delivery and payment. Six customers tested the prototype remotely. Their feedback led to stronger guest checkout visibility, social sign in, separated contact and shipping steps, and clearer security cues.`],['Delivery and impact',`Engineering received complete journey states, interactive prototypes and a design specification. Grooming sessions and design QA protected the intent through implementation. Three months after launch, both retention and support signals had moved materially.`]],metrics:[['36%','reduction in user churn'],['62%','fewer checkout complaints']]},system:{accent:'#77e89c',tag:'B2B · Design systems',title:'Making consistency the default, not the debate.',summary:'Harmony brought CreditBook’s designers, developers and global teams onto a scalable shared foundation.',task:'Build a design system',role:'Sole Product Designer',duration:'2021',sections:[['The challenge',`CreditBook had verbal agreement about individual colours and elements, but no formal system. The result was inconsistent fields, alignment, colours, hierarchy and flows, and a disconnected customer experience.`],['Establishing the foundation',`I reviewed the existing design process, brand guidelines and stakeholder expectations. A moodboard aligned the organisation on creative direction, while heuristic evaluation made inconsistencies tangible and prioritised.`],['System, not sticker sheet',`Harmony defined typography, colour, spacing, grids, interactive language, states and responsive component behaviour. Figma auto layout and tokens helped components cover multiple breakpoints as well as hover, focus, filled, error and disabled states.`],['What changed',`The system created a shared language without limiting exploration. Documentation and a pattern library made decisions repeatable, accelerated design work and improved consistency across the application.`]],metrics:[['54%','customer productivity lift'],['40%','fewer design inconsistencies'],['6 mo.','to build and scale']]},talon:{accent:'#d9ff57',tag:'B2B SaaS · Promotion engine',title:'Making campaign creation explain itself.',summary:'A focused five day sprint to understand and simplify Talon.One’s Campaign Manager.',task:'Improve Campaign Manager UX',role:'Sole Product Designer',duration:'5 day sprint',sections:[['The challenge',`Talon.One is powerful, but the Campaign Manager asked users to learn its internal logic. Every participant found campaign creation difficult without documentation or video guidance.`],['A compressed discovery',`I studied product and developer documentation, watched training material, researched customer contexts and interviewed potential users when existing customers were unavailable. Interviews, user flows, heuristic review and heatmaps converged on campaign creation as the priority.`],['Simplifying the journey',`Updated flows clarified application selection, campaign setup, templates, filters, activation and success states. Wireframes introduced stronger CTA hierarchy, contextual education, clear active states and input patterns with less unnecessary mouse movement.`],['Validation and reflection',`A/B testing showed the proposed direction was considerably easier to use. The sprint also surfaced a broader principle: every screen should communicate its purpose, available options and next action without requiring an external guide.`]],metrics:[['100%','needed help creating campaigns'],['80%','wanted a dashboard overview'],['5 days','research to validated direction']]}};
const bullet=x=>`<ul>${x.map(v=>`<li>${v}</li>`).join('')}</ul>`;
const kfhMedia={hero:['788e6239-69e2-4597-afbe-92217d1429f7','9a218c6b-1a9a-430d-9d07-7c8f5a2249b1'],brief:['c834e16f-a72d-4c6b-94ce-e8fcafd26d82','b531681b-7bdd-4145-a59f-18f34e81f4da','0c03d3f0-8f16-451b-900f-f39b59624cd9','dd2e6e56-af9e-43b9-b72f-50b9457e5e9e'],requirements:['500e3214-5965-4ae2-b586-32d56a9ce68c','abb403b7-0300-4d60-8a65-cc841aa0bba3'],product:['f678c239-1903-458f-a895-9ed211b0f805','3b7c8075-0083-4fe2-8ec0-383d16876d37'],process:['f4a85fcc-e76f-46f8-99af-bf9e5dca2080','f8e9c15d-63e5-45ca-bf7e-2e84fadb0495','c2fa0246-e9be-4490-98c3-79b770d75b1d','c8400f48-2648-4739-94f9-0efd862e8d1e'],workflow:['d8983e2b-b82c-40f9-98ae-cecf87a33c5c','3746c2f0-2ae2-40ce-a098-778cd81bb639'],interviews:['bdffae61-dfa8-488a-a426-4eb02831cb03','c6937bcb-3677-453d-9a71-ac4681fdfeea'],heuristic:['8c6243df-8676-4b65-8415-5594107e5cf0','3624fa4b-b609-4c69-a1b8-94a07a3d784b'],traditional:['e757f660-6f3d-4966-96ee-d6f11977d0ae','f4aad7cc-253b-4ce6-a642-7cbc9fcf6f01','95375f65-00b1-402a-af60-5f3e896f0637','17e706ca-e91c-4b53-b331-a9a90ddc486e'],traditionalReviews:['cffcfb57-1999-411b-b20a-b2a851b0d14f','febac2a4-f2f5-4f0a-bf38-99598ff6c4ff','0b3ec80f-d029-4deb-b1a3-aed54b43f8f8','98936542-ec20-4c2b-855b-1145be5332af'],neo:['4de93b14-56b3-4793-832b-962fe0bbe29b','131db331-ad4d-4cc8-802b-28fad6fc37f2','8ee39cc0-18e3-4238-94a0-0407e1a3027a','6782165b-86b7-446c-9174-1f1b4bdcc4db'],neoReviews:['840550af-08fc-4875-89b8-6e6738353581','c27d8725-a9a2-4885-b616-d667cf48335e','cd71c62d-9de9-4a21-a29e-0991b1a6d187','3e386bab-7c74-4f9c-9f10-6ffbb9a9924f'],neoFlows:['5c4ba3e3-e96c-4adf-a3f3-96d02694a747','97b31519-1007-4234-819c-8844edb29dcd','eccb4781-fbc4-4e66-bb2c-b10cb1c5bcd4','0eb17fa6-6f64-428c-b3cd-28064c682e10'],traditionalFlows:['6e595cce-e8bf-4ee5-9ffa-4566b9c73f1b','a131853e-56ed-473a-b8f0-93adb0304fc7','bef08b89-66d3-4158-bfff-99dd1bbde965','9d277f32-5e96-4a52-849c-001de156274e'],comparison:['e91550f3-5388-4bf0-8553-0ece969e9384','3973d372-cfd4-47a8-b60e-3a048cd40185'],overview:['635f1785-c9da-4d20-874a-1560f05440b7','1f01b8b1-2d93-41f1-8c27-c645da430236','932f818e-6591-4142-9758-f0c48cc46488'],wireframes:['2584ada9-106b-40b4-b55c-1a605e26efa8','c2ebf65a-c5cb-4d46-8c9d-07eacd465d86','6a6fddde-7cbf-4257-a73e-90b326fd8937','2732a6a0-d91f-4846-b2e2-a8022054d21c'],hifi:['4172ef1f-64af-43ec-a598-eafd5a4f4691','26f16fc0-f385-45b1-bbc9-9727963eb2a4','95148e4c-412e-4303-a3fb-c50a489b5264','64bd3c64-a13d-4495-8d33-be942e89b15a'],version:['2ce443b5-1349-45a6-a908-dd0b3331f8d1','eb92cfca-27bc-46bb-9732-f5bf91c163f3'],system:['7ef8e6c9-03f1-4ee7-ba2d-7b3305c6ff56','51a77035-7103-439d-8b47-88b81f53b87f'],before:['ca24d5c4-4961-487c-ae45-89fc32c3d70b','ee71e32a-deef-4f45-b941-5b40a8f37245','eb9d64f4-3241-4f46-9a9b-a79e867ddcb1','f3481b17-0fd8-4ae8-9def-e7f7c4793773'],improvements:['4525e758-a432-4634-b168-990a12fcc44e','09ff798e-88ec-4d1f-baca-463f3ea40d7e','94e3f8d5-a604-4427-a618-3986528f6e43','17345604-cdd4-4b10-b119-f36ed3c78f37'],ui:['45bdc59c-4d39-40c8-89c8-063edf879325','0286bf58-ac72-4658-90eb-27c663b1dbf5','1cbd0983-1ea9-4dab-ba55-52e8bde0dfe7','4de72ca8-d5b9-4778-a690-8f1075cdf5cd'],heatmaps:['1e56ba89-2f1f-4530-9366-91552651db61','5d380d60-3bb1-4763-866c-f7bdc4ffb7b7','cbff0a7d-34c7-4344-9516-20184a7a9154','1edc7397-265d-4069-b71c-dc347b734731','90fea2a8-f304-49c0-b2e7-0a4ca8a75287','e7ffff21-5040-4899-98e5-4bf14a67f4fa'],prototype:['6f72d32b-8feb-467b-8b9e-093e13ea568d','f234abf8-ab94-4392-b5c0-4e074acb4e47'],iteration:['ac5ff918-d2e8-4cb2-a77b-2b85f6d9d4a5','07e1d39c-9b45-41e9-89e9-fbfa0df3fe74'],mobile:['5039957b-8856-463f-93c1-cd3af0bf0393','2aa1b841-4b01-400b-87c1-7367949d3553','105cf911-949f-4191-ab43-ff0e8b4cdadf','52583c38-a54c-4fc7-8abe-53aa043e66dc'],thanks:['1783f85a-f660-4db7-85a9-433f68e32f82','9107072a-331e-4f3b-bab5-c184fc45a6fc']};
const media=(key,caption)=>`<figure class="media-block"><figcaption>${caption}</figcaption><div class="media-grid">${(kfhMedia[key]||[]).map((id,i)=>`<img loading="lazy" ${i===0&&kfhMedia[key].length%2?'class="wide"':''} src="${A}${id}" alt="${caption}, visual ${i+1}">`).join('')}</div></figure>`;
function kfhPage(){const toc=['Brief and context','Process and team','User interviews','Market research','Prioritisation','Design and systems','Validation','Post launch impact'];return `<div class="case reveal" style="--accent:#56e0bd"><section class="case-hero"><nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>KFH Jazeel</b></nav><span class="eyebrow">Fintech · Digital banking</span><h1>Cutting onboarding drop-off from 66% to 18% at KFH Jazeel Bank.</h1><p>KFH Jazeel was the bank’s first digital personal finance product. I helped turn it into a clearer, more useful service that customers could understand and trust.</p></section><div class="case-facts"><div class="fact"><span class="eyebrow">Task</span><b>Redesign the web application</b></div><div class="fact"><span class="eyebrow">Role</span><b>Lead Product Designer</b></div><div class="fact"><span class="eyebrow">Time</span><b>6 months</b></div></div><div class="long-study"><aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#kfh-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside><article>
<section class="chapter" id="kfh-1"><span class="chapter-num">01 / Brief and context</span><h2>Brief</h2><p>KFH Bank introduced Jazeel as its first digital personal finance product in Kuwait and Bahrain. My team and I redesigned the web app, expanded its features, and built a design system that helped us deliver roughly 900 screens in six months. We moved quickly because we kept improving the way we worked and had the trust of the bank’s leadership.</p><h3>Gathering requirements</h3><p>I began by speaking with stakeholders about what the bank needed, how the service should work, and what success would look like.</p><h3>The problem</h3><p>The bank had invested heavily in marketing, but many people signed in once, left, and did not return. Stakeholders suspected that the experience itself was pushing customers away. We needed to understand why and give people a reason to keep using the service.</p><div class="content-columns"><div class="content-card"><h3>Goal</h3><p>Improve the experience, help more customers stay active, and make the bank’s investment work harder.</p></div><div class="content-card"><h3>What we needed to do</h3><p>Fix the design problems and create a clearer, more welcoming product that made everyday banking easier.</p></div></div><h3>Product analysis</h3><p>I worked with the data team to understand how people moved through the product. We looked at which features they used, which ones they missed, and the exact points where they gave up.</p></section>
<section class="chapter" id="kfh-2"><span class="chapter-num">02 / Process and team</span><h2>Design process</h2>${bullet(['Understand the project requirements','Review the existing app journeys','Study the KFH brand guidelines','Plan the design work','Set up JIRA','Train the design team','Improve the design workflow','Assign clear ownership','Work closely with engineering','Build the KFH design system','Review and improve the work','Create the final interface','Gather feedback','Check the quality of the build'])}<p>Before we designed anything, we walked the client through our approach. Together, we agreed on why the product needed to change and what the project would cover.</p><h3>Design workflow</h3>${bullet(['The bank team reviewed designs in InVision and left comments in one place.','The design team shared updates directly from Sketch through the Craft plugin.','Abstract kept the files in sync, so nobody had to send versions around or explain every change by hand.'])}<p><strong>Lead designer:</strong> Saeed Shaffi</p><h3>Team responsibilities</h3><p>I set the design direction, led the research, and made sure the work stayed practical, consistent, and easy to use. I worked with two junior designers. One of them grew into a mid level role during the project.</p><div class="content-columns"><div class="content-card"><h3>My responsibilities</h3>${bullet(['Set the design direction and led the research.','Built and maintained the design system.','Ran usability tests to check our decisions.','Worked with executives, engineers, marketing, support, and product.','Mentored both junior designers and helped them take ownership of their work.'])}</div><div class="content-card"><h3>Junior designers</h3>${bullet(['Created interface components using the design system.','Helped gather and make sense of customer feedback.','Improved the visual design across the product.'])}<h3>Mid level designer</h3>${bullet(['Owned specific features after the promotion.','Improved designs in response to usability feedback.','Helped expand the design system as the product grew.'])}</div></div><h3>Working with stakeholders</h3><p>Because this was a financial product, close collaboration mattered. I worked with the bank’s executives, business team, engineers, marketing team, customer support, and product manager.</p><h3>How we collaborated</h3>${bullet(['Held a design review every week so stakeholders could respond early.','Gave engineers clear specifications and stayed available during implementation.','Used InVision prototypes so the team could experience the flows and comment in context.'])}<h3>Working with the product manager</h3><p>The product manager helped connect customer needs with the bank’s goals. We planned the work together, worked through engineering concerns, and kept stakeholders informed.</p><h3>Our routine</h3>${bullet(['Plan and prioritise the work','Turn research into practical decisions','Solve issues with engineering','Keep stakeholders informed','Measure what changed after launch'])}<p>We stayed close through daily check ins, weekly planning, and regular reviews. That partnership helped us make decisions that worked for customers and for the business.</p></section>
<section class="chapter dark" id="kfh-3"><span class="chapter-num">03 / User interviews</span><h2>User interviews</h2><p>At the start of the project, I ran moderated remote interviews to understand how customers felt about the product, what they were trying to do, and where they became stuck. The conversation guide focused on real behaviour, pain points, and the changes customers wanted most.</p><h3>First impressions</h3>${bullet(['How does this make you feel at first?','What comes to mind when you look at this?','How is it different from what you expected?','What do you think you could do here?','What do you think this is for?','What questions do you have right now?','Why might someone use this?','How could this help you?','What would you do first?'])}<h3>Questions about the task</h3>${bullet(['If you wanted to send money through KFH Jazeel, what would you do?','Which parts felt most useful and least useful?','What would you change, add, or remove?','What was the hardest part?','Did anything surprise you?'])}<h3>Closing questions</h3>${bullet(['Would you use this today?','What might stop someone from using it?','What would you be willing to pay for it?','What did you like or dislike?','If you could change one thing, what would it be?','Does this feel as though it was designed for you?','Is anything missing?'])}<h3>Research analysis</h3><p>I grouped the interview findings and looked for the strongest patterns. The largest percentages helped us see which problems affected the core experience.</p><div class="finding-grid"><div class="finding"><strong>80%</strong>Found onboarding challenging</div><div class="finding"><strong>57%</strong>Did not know about the language options</div><div class="finding"><strong>30%</strong>Did not know how to use the core features</div><div class="finding"><strong>86%</strong>Experienced crashes during basic tasks</div></div><h3>What we learned</h3>${bullet(['Onboarding felt long and complicated.','The product looked and behaved like a traditional banking form.','Customers struggled to complete simple tasks from the home screen.'])}<h3>One clear pattern</h3><p>Many customers told us that KFH Jazeel felt like a conventional bank rather than a modern digital finance product.</p><h3>Heuristic evaluation</h3><p>View the complete document</p><p>I also reviewed the product against established usability principles. This gave us a clear record of the issues before we started proposing solutions.</p></section>
<section class="chapter" id="kfh-4"><span class="chapter-num">04 / Market research</span><h2>Traditional bank research</h2><p>We wanted to understand what customers were experiencing beyond the scores shown in app stores. I collected Facebook reviews for established banks and read the comments in detail. They gave us a much more honest picture of the problems people faced.</p><h3>What did they say?</h3><p>The comments were often far more critical than the ratings suggested.</p>${bullet(['A Santander review had received 143 likes after one year.','A Bank of America review had received 302 likes after one year.'])}<h2>Neobank research</h2><p>I repeated the same exercise with well known neobanks and looked at the way customers described those products.</p><h3>What did they say?</h3><p>People liked neobanks because the experience felt quick and focused on their needs. They also valued useful features that traditional banking products often overlooked.</p>${bullet(['Some Wise reviews had received more than 20 likes.','An N26 review from Shah Bhuiyan had received 5 likes after one year.','A Monese review from Valerie Ehinlaiye had received 123 likes after one year.'])}<h3>Neobank user flows</h3><p>We could not open an account with every bank, so I studied onboarding walkthroughs, customer reviews, and product videos. I mapped each journey, the points that made it different, and the way the brand showed up along the way.</p><h3>Traditional bank user flows</h3><p>I mapped the same journeys for traditional banks, including KFH Jazeel. The comparison was not always exact because some banks still required customers to visit a branch. Even so, a pattern was clear. Many of these products followed internal system logic instead of the way customers naturally thought about the task. My background in development helped me understand why that happens, but it also made the design problem easier to spot.</p><h3>Comparing the user flows</h3><p>Bringing both sets of journeys together helped us identify a simpler flow that still met the needs of a regulated bank.</p></section>
<section class="chapter accent" id="kfh-5"><span class="chapter-num">05 / Prioritisation</span><h2>Choosing what to fix first</h2><p>The clearest warning sign was a 66% drop off during onboarding. Customers had already told us the process felt long and confusing, so this became the first problem we chose to solve.</p><h3>Research overview</h3><p>These were the main sources that shaped our decisions.</p><h3>Research findings</h3>${bullet(['Bain and Company found that 43% of customers leave traditional bank onboarding because it is too long or complex.','Upshot reported that 36% of customers are put off by unclear instructions and hidden fees.','Accenture reported that errors during document checks and online forms can lead to a 25% drop off.'])}<h3>Engineering concerns</h3><p>Changing onboarding was the right design decision, but the engineering team was worried about the effort involved.</p><h3>What made it difficult</h3>${bullet(['The old journey asked customers to complete one long form, upload several documents, and wait for approval.','Our new journey broke the work into clear steps with live checks and useful guidance.','Engineering was concerned that the live validation and interaction would add too much complexity.'])}<h3>How I approached it</h3>${bullet(['Split the redesign into smaller releases so the team could make progress without taking on everything at once.','Started with simpler changes, such as fewer form fields and clearer error messages.','Worked closely with engineers to protect the experience while keeping the build realistic.'])}<h3>What happened</h3>${bullet(['After the first release, onboarding drop off fell from 66% to 18%.','The result gave engineering more confidence in the design direction and made future collaboration easier.'])}</section>
<section class="chapter" id="kfh-6"><span class="chapter-num">06 / Design and systems</span><h2>From flows to interface</h2><h3>Turning research into wireframes</h3><p>Once the new journey was clear, I translated it into wireframes that the wider team could review and discuss.</p><h3>High fidelity wireframes</h3><h3>Visual design</h3><p>Regular reviews helped us decide what to refine next. I used that feedback to finish the visual design, define the interactions, and prepare clear notes for engineering.</p><h3>Version control</h3><p>As the project grew, several designers were working in the same files and versioning became difficult. I introduced Abstract, trained the team, and set up a shared way of working. Everyone could find the latest work, see what others were doing, and review changes without interrupting each other.<br><br>I checked the process closely at first. Once the team was comfortable, they were able to manage it with very little support.</p><h3>Design system</h3><p>I built the KFH Jazeel design system from the ground up using atomic design principles. I also taught the team how to build screens with it and how to update the system as new needs appeared. Abstract helped us keep the system and product files aligned.</p><h3>Before the redesign</h3><p>These screens show the original product before we made the changes.</p><h3>Improvements</h3>${bullet(['Track transactions','Group transactions into clear categories','Simplify the side navigation','Support multiple accounts','Make country codes easier to select','Improve the colour system','Add coupon codes','Verify identity with a driving licence','Make the menu easier to understand','Allow customers in the United States to open an account'])}<h3>Final interface</h3></section>
<section class="chapter" id="kfh-7"><span class="chapter-num">07 / Validation</span><h2>Checking the design</h2><h3>Heatmaps</h3><p>We created heatmaps for the most important screens to see where people focused their attention.</p><h3>Reading the results</h3><p>The difference between the old and new dashboards was clear. In the old version, attention stayed around the sidebars. In the redesigned version, people noticed the information and actions in the main area of the screen.</p></section>
<section class="chapter" id="kfh-8"><span class="chapter-num">08 / Post launch impact</span><h2>What changed after launch</h2><h3>Onboarding results</h3><p>Within two months, onboarding drop off fell from 66% to 18%.</p><h3>What we changed</h3>${bullet(['Focused the onboarding work on the moments where customers were most likely to leave.','Kept speaking with customers and improved the journey in response to their feedback.'])}<h3>PayBills adoption</h3><p>Use of PayBills grew from 3% to 32.5% after we improved the experience.</p><h3>What we changed</h3>${bullet(['Asked customers what stopped them from using PayBills.','Added clear tutorials and helpful tips so people could understand the feature.'])}<h2>Design iterations after launch</h2><h3>Three rounds of improvements</h3><p>We completed three major rounds of design work after launch, covering about 300 screens in six months.</p><h3>How we worked</h3>${bullet(['Reviewed feedback with stakeholders throughout each round.','Kept customer needs at the centre of every change.'])}<h3>Delivering 900 screens</h3><p>Across the project, we completed 900 screens and met or beat 99% of our deadlines.</p><h3>How we stayed on track</h3>${bullet(['Used a clear project management system to keep ownership and timing visible.','Kept communication open so comments from each delivery could be handled quickly.'])}<h2>Developer documentation and walkthroughs</h2><h3>Documentation</h3><p>I prepared detailed guidance so engineers could understand the design and build it accurately.</p><h3>What it covered</h3>${bullet(['Documented the visual rules, specifications, states, and interactions.','Stayed close to engineering to answer questions during the build.'])}<h3>Loom walkthroughs</h3><p>I recorded Loom videos to explain the flows, design decisions, and expected behaviour.</p><h3>Why they helped</h3>${bullet(['Gave engineers a resource they could return to whenever they needed it.','Made it easier to discuss questions while the work was being built.'])}<h2>Quality assurance</h2><h3>My role in QA</h3><p>I led design QA across the project to make sure the finished product matched the intended experience.</p><h3>What I checked</h3>${bullet(['Tested important journeys across different devices and browsers.','Worked directly with engineering to resolve issues as they appeared.'])}<h2>Data and experiments</h2><h3>Learning from real use</h3><p>After launch, I continued to study how customers used the product. The patterns we found guided the next design decisions.</p><h3>How we used the data</h3>${bullet(['Monitored behaviour through analytics tools.','Shared the findings with the wider team so product decisions stayed connected to customer needs.'])}<h3>Testing new ideas</h3><p>We ran A/B tests to check our assumptions and used the results to guide each round of changes.</p><h3>How we ran the tests</h3>${bullet(['Tested clear design hypotheses against real behaviour.','Worked with stakeholders to roll successful changes into the product.'])}<h2>Business impact</h2><div class="content-columns"><div class="content-card"><h3>More opportunities for revenue</h3><p>Better retention meant that more customers stayed active and used the bank’s financial products.</p></div><div class="content-card"><h3>Faster delivery</h3><p>The design system reduced inconsistency and made future updates easier to manage.</p><p>It also made handoff faster and helped the team meet 99% of its deadlines.</p></div><div class="content-card"><h3>A new international bank contract</h3><p>The success of the redesign helped the team win a new contract with an international bank.</p></div></div><h2>KFH Jazeel mobile case study</h2><p>Coming soon</p><div class="case-end"><span class="eyebrow">End of case study</span><h2>Thank you</h2></div></section></article></div></div>`}
function kfhRedesignPage(){return kfhPage().replace('class="case reveal"','class="case reveal kfhr-case"').replaceAll('kfh-','kfhr-')}
function casePage(id){if(id==='kfh')return kfhPage();if(id==='ai-system'&&window.aiSystemPage)return window.aiSystemPage();if(id==='talon'&&window.talonPage)return window.talonPage();if(id==='system'&&window.harmonyPage)return window.harmonyPage();if(id==='kfh-editorial')return kfhRedesignPage();if(id==='eyewa'&&window.eyewaPage)return window.eyewaPage();const c=caseData[id]||caseData.eyewa;return `<div class="case reveal" style="--accent:${c.accent}"><section class="case-hero"><span class="eyebrow">${c.tag}</span><h1>${c.title}</h1><p>${c.summary}</p></section><div class="case-facts"><div class="fact"><span class="eyebrow">Task</span><b>${c.task}</b></div><div class="fact"><span class="eyebrow">Role</span><b>${c.role}</b></div><div class="fact"><span class="eyebrow">Duration</span><b>${c.duration}</b></div></div><div class="story"><aside><span class="eyebrow">Process</span><div class="pills"><span class="pill">Understand</span><span class="pill">Define</span><span class="pill">Explore</span><span class="pill">Prototype</span><span class="pill">Validate</span></div></aside><article>${c.sections.map(([h,p],i)=>`<section><span class="eyebrow">0${i+1}</span><h2>${h}</h2><p>${p}</p>${i===1?`<blockquote>“The strongest design decision was deciding what deserved attention first.”</blockquote>`:''}</section>`).join('')}<section><span class="eyebrow">Impact</span><h2>What moved</h2><div class="metrics">${c.metrics.map(([n,l])=>`<div class="metric"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div></section><a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a></article></div></div>`}
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
    if(!dialog.open)return;
    const thumb=opener?.isConnected?opener.querySelector('img'):null;
    if(canMorph&&thumb&&image.src){
      /* Morph back into the grid slot. */
      image.style.viewTransitionName='shot-morph';
      dialog.classList.add('is-morph');
      const t=document.startViewTransition(()=>{
        image.style.viewTransitionName='';
        dialog.close();
        thumb.style.viewTransitionName='shot-morph';
      });
      if(t.ready)t.ready.catch(()=>{});
      t.finished.then(()=>{thumb.style.viewTransitionName='';dialog.classList.remove('is-morph');},()=>{thumb.style.viewTransitionName='';dialog.classList.remove('is-morph');});
      return;
    }
    dialog.close();
  };

  const fitToNatural=()=>{
    const w=image.naturalWidth;
    if(w)image.style.setProperty('--shot-natural',`${w}px`);
  };
  image.addEventListener('load',fitToNatural);
  image.addEventListener('error',()=>{ /* full-size missing: keep the thumbnail rather than a broken frame */
    const thumb=opener?.querySelector('img'); const fallback=thumb&&(thumb.currentSrc||thumb.src);
    if(fallback&&image.src!==fallback)image.src=fallback;
  });

  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canMorph=!reduceMotion&&typeof document.startViewTransition==='function';
  let vt=null;
  const load=(trigger)=>{
    image.style.removeProperty('--shot-natural');
    image.alt=`${trigger.dataset.shotTitle} interface preview`;
    caption.textContent=trigger.dataset.shotTitle;
    image.src=trigger.dataset.shotSrc;
  };
  const open=(trigger)=>{
    opener=trigger;
    const thumb=trigger.querySelector('img');
    if(canMorph&&thumb){
      /* Shared-element morph: the grid thumbnail flies into the lightbox.
         Start from the already-decoded thumbnail so the morph is never blank,
         then swap to the full-size file once the dialog is up. */
      thumb.style.viewTransitionName='shot-morph';
      dialog.classList.add('is-morph');
      vt=document.startViewTransition(()=>{
        thumb.style.viewTransitionName='';
        image.style.removeProperty('--shot-natural');
        image.src=thumb.currentSrc||thumb.src;
        image.alt=`${trigger.dataset.shotTitle} interface preview`;
        caption.textContent=trigger.dataset.shotTitle;
        image.style.viewTransitionName='shot-morph';
        dialog.showModal();
        dialog.focus();
      });
      if(vt.ready)vt.ready.catch(()=>{});
      vt.finished.then(()=>{image.style.viewTransitionName='';dialog.classList.remove('is-morph');if(dialog.open)load(trigger);},()=>{image.style.viewTransitionName='';dialog.classList.remove('is-morph');if(dialog.open)load(trigger);});
      return;
    }
    load(trigger);
    dialog.showModal();
    dialog.focus();
  };
  triggers.forEach(trigger=>trigger.addEventListener('click',()=>open(trigger)));

  /* Arrow keys slide between shots while the lightbox is open. */
  const step=(dir)=>{
    if(!opener)return;
    const i=triggers.indexOf(opener);
    const next=triggers[(i+dir+triggers.length)%triggers.length];
    if(!next)return;
    opener=next;
    dialog.classList.remove('slide-left','slide-right');
    void dialog.offsetWidth;
    dialog.classList.add(dir>0?'slide-left':'slide-right');
    load(next);
  };
  dialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();step(1);}
    else if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}
  });

  dialog.addEventListener('click',event=>{
    /* Anywhere on the overlay closes; only the image itself keeps it open
       (the close button has its own handler). */
    if(!event.target.closest('img,.shot-lightbox-close'))close();
  });
  dialog.querySelector('.shot-lightbox-close').addEventListener('click',close);
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
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
  /* Leaving the viewport only re-arms the entrance; the real values stay in
     the DOM so readers, crawlers and reduced-motion users never see zeros. */
  const reset=()=>{
    cancelAnimationFrame(animationFrame);
    visual.classList.remove('is-visible');
    showFinal();
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
      showFinalValues();          /* real numbers stay in the DOM between plays */
    };
    const play=()=>{
      reset();
      counters.forEach(element=>formatCounter(element,0));
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

  const paint = (word, state, instant) => {
    const s = word.style;
    s.position = 'absolute';
    s.top = '0';
    s.left = '0';
    s.display = 'block';
    s.width = 'max-content';
    s.transition = (instant || reduceMotion) ? 'none' : 'opacity .38s ease, filter .38s ease, transform .46s cubic-bezier(.22,1,.36,1)';
    if (state === 'in') {
      s.opacity = '1'; s.filter = 'blur(0px)'; s.transform = 'translateY(0)';
      /* scrub line: a thin underline draws during the word's hold, then retracts */
      word.classList.remove('is-run');
      if (!reduceMotion) { void word.offsetWidth; word.classList.add('is-run'); }
    }
    else if (state === 'out') { s.opacity = '0'; s.filter = 'blur(6px)'; s.transform = 'translateY(-' + RISE + ')'; }
    else { s.opacity = '0'; s.filter = 'blur(6px)'; s.transform = 'translateY(' + RISE + ')'; }
  };

  const fit = (track) => {
    /* Size the slot to the WIDEST word so the surrounding text never re-wraps
       or shifts when the word changes. Nothing follows the word on its line,
       so the extra space of shorter words is invisible. */
    const widest = [...track.children].reduce((max, w) => Math.max(max, w.getBoundingClientRect().width), 0);
    track.style.width = Math.ceil(widest) + 4 + 'px';
  };

  /* On tablet and mobile the width hugs each word, while the H1 reserves the
     height of its tallest layout so the content below never jumps. */
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
      paint(word, index === 0 ? 'in' : 'waiting', true);
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

    if (document.hidden) return;       // transitions freeze in hidden tabs; resume on return

    const showing = words.filter(w => w.style.opacity === '1');
    if (showing.length !== 1) {          // repair: never leave the line empty
      const index = track.__wordIndex || 0;
      words.forEach((w, i) => paint(w, i === index ? 'in' : 'waiting', true));
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
  card.innerHTML=`<div class="drag-contact-head"><span class="drag-contact-avatar"><img src="assets/saeed-avatar.webp" alt=""></span><span><b>Saeed Shaffi</b><small>Product Designer</small></span><span class="drag-contact-hint" aria-hidden="true"><i></i> Drag me</span></div><p>Have a complex product?<br><strong>Let’s make it feel simple.</strong></p><a class="drag-contact-cta" href="mailto:saeedshaffi@gmail.com"><span>Let’s talk</span><span aria-hidden="true">↗</span></a>`;
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

function renderRoute(){
  const path=location.hash.slice(1)||'/';
  if(path==='/work'){
    pendingScrollTarget='selected-work';
    location.replace('#/');
    return;
  }
  if(path==='/about'||path==='/resume-old'||path==='/resume'){
    (function(){const a=document.createElement('a');a.href='assets/SaeedShaffi_Resume.pdf';a.download='SaeedShaffi_Resume.pdf';document.body.appendChild(a);a.click();a.remove();})();
    showToast('Résumé downloading — check your downloads');
    location.replace('#/');
    return;
  }
  document.body.classList.toggle('home-active',path==='/');
  document.body.classList.toggle('resume-active',path==='/resume');
  document.body.classList.toggle('eyewa-case-active',path==='/case/eyewa');
  document.body.classList.toggle('harmony-case-active',path==='/case/system');
  document.body.classList.toggle('talon-case-active',path==='/case/talon');
  document.body.classList.toggle('ai-system-case-active',path==='/case/ai-system');
  let introPlayed=false;
  try{introPlayed=sessionStorage.getItem('homeIntroPlayed')==='1';}catch(e){}
  document.body.classList.toggle('is-return-visit',path==='/'&&introPlayed);
  if(path==='/'&&!introPlayed){try{sessionStorage.setItem('homeIntroPlayed','1');}catch(e){}}
  const routeTitles={'/case/kfh':'Cutting onboarding drop-off from 66% to 18% at KFH Jazeel Bank — Saeed Shaffi','/case/eyewa':'Turning checkout friction into 36% higher retention at Eyewa — Saeed Shaffi','/case/system':'Making consistency the default at CreditBook with one design system — Saeed Shaffi','/case/talon':'Making campaign creation explain itself at Talon.One in a five-day sprint — Saeed Shaffi','/case/ai-system':'Taking a design system from Figma to production code with AI — Saeed Shaffi'};
  document.title=routeTitles[path]||'Saeed Shaffi, Product Designer';
  const KNOWN_CASES=['kfh','eyewa','system','talon','ai-system'];
  const isCase=path.startsWith('/case/')&&KNOWN_CASES.includes(path.split('/')[2]);
  const isKnown=path==='/'||isCase;
  if(!isKnown)document.title='Page not found — Saeed Shaffi';
  main.innerHTML=isCase?casePage(path.split('/')[2]):(isKnown?home():notFoundPage(path));
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
  if(window.initAiSystemCase)window.initAiSystemCase();
  if(window.initKfhMedia)window.initKfhMedia();
  if(window.initCaseExtras)window.initCaseExtras(path);
  if(window.initSiteExtras)window.initSiteExtras(path); if(window.initMotionExtras)window.initMotionExtras(path);
  document.querySelectorAll('#site-nav a').forEach(a=>a.removeAttribute('aria-current'));
  const active=document.querySelector(`#site-nav a[href="#${path}"]`);
  if(active)active.setAttribute('aria-current','page');
  const remembered=routeIsPop?scrollMemory[path]:undefined;
  routeIsPop=false;
  if(typeof remembered==='number'&&remembered>0){
    /* Back/forward: land where the visitor left, e.g. on the card they opened. */
    requestAnimationFrame(()=>window.scrollTo(0,remembered));
  }else{
    window.scrollTo(0,0);
  }
  main.focus({preventScroll:true});
  if(pendingScrollTarget==='selected-work'){
    pendingScrollTarget='';
    requestAnimationFrame(scrollToSelectedWork);
  }
}


/* ── Motion layer ──────────────────────────────────────────────────────────
   One authored moment: the project card the visitor chose becomes the case
   stage. Everything else stays a quiet cross-fade. Progressive enhancement —
   without View Transitions, or under reduced motion, routing is unchanged. */

const VT_STAGE='case-stage';
const REDIRECT_ROUTES=['/work','/about','/resume','/resume-old'];
let vtSource=null;
let vtPrevPath=location.hash.slice(1)||'/';

function vtTag(el){
  if(!el)return null;
  el.style.viewTransitionName=VT_STAGE;
  el.classList.add('vt-stage-active');
  return el;
}
function vtUntag(){
  document.querySelectorAll('.vt-stage-active').forEach(el=>{
    el.style.viewTransitionName='';
    el.classList.remove('vt-stage-active');
  });
}

/* Capture which card was chosen, before the hash changes. */
document.addEventListener('click',event=>{
  const origin=event.target instanceof Element?event.target:null;
  const card=origin?.closest('a.project-card[href^="#/case/"], a.case-next[href^="#/case/"]');
  if(card)vtSource=card.querySelector('.visual')||card;
},true);

let toastEl=null,toastTimer=null;
function showToast(message){
  if(!toastEl){
    toastEl=document.createElement('div');
    toastEl.className='app-toast';
    toastEl.setAttribute('role','status');
    toastEl.setAttribute('aria-live','polite');
    toastEl.innerHTML='<span class="app-toast-dot" aria-hidden="true"></span><span class="app-toast-text"></span>';
    document.body.appendChild(toastEl);
  }
  toastEl.querySelector('.app-toast-text').textContent=message;
  requestAnimationFrame(()=>toastEl.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toastEl.classList.remove('is-visible'),2800);
}

const scrollMemory={};
let routeIsPop=false;
window.addEventListener('popstate',()=>{routeIsPop=true;});
function render(){
  const nextPath=location.hash.slice(1)||'/';
  const prevPath=vtPrevPath;
  if(prevPath!==nextPath)scrollMemory[prevPath]=window.scrollY;

  /* Routes that immediately redirect never animate — they are not a view. */
  if(REDIRECT_ROUTES.includes(nextPath)){
    vtUntag();vtSource=null;renderRoute();return;
  }

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||typeof document.startViewTransition!=='function'){
    vtUntag();vtSource=null;vtPrevPath=nextPath;renderRoute();return;
  }

  const goingToCase=nextPath.startsWith('/case/');
  const leavingCase=prevPath.startsWith('/case/');
  const from=goingToCase?vtSource:(leavingCase?document.querySelector('.case-hero'):null);
  vtSource=null;
  vtUntag();
  vtTag(from);
  vtPrevPath=nextPath;

  let transition;
  try{
    transition=document.startViewTransition(()=>{
      vtUntag();
      renderRoute();
      const to=goingToCase
        ?document.querySelector('.case-hero')
        :(leavingCase?document.querySelector('a.project-card[href="#'+prevPath+'"] .visual'):null);
      vtTag(to);
    });
  }catch(error){
    vtUntag();renderRoute();return;
  }
  transition.finished.then(vtUntag,vtUntag);
  if(transition.ready)transition.ready.catch(()=>{});
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
;
/* ===== kfh-media.js ===== */
(function () {
  const base = 'assets/kfh/hr/';

  const localAssets = {
    hero: ['Device - Macbook Pro 3D.webp'],
    requirements: ['optimized/requirement-gathering-v2.svg'],
    product: ['optimized/product-analysis.jpg'],
    process: ['Design Process.png'],
    workflow: ['Design Workflow.png'],
    heuristic: ['optimized/heuristic-evaluation.webp'],
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
    neoFlows: ['optimized/neobank-userflows.webp'],
    comparison: ['optimized/flow-comparison.jpg'],
    hifi: ['HiFi wireframes/Component 7.png'],
    version: ['optimized/version-control.jpg'],
    system: ['ds.webp', 'DS Kapple.webp'],
    before: [
      'Before/image 90.webp',
      'Before/image 91.webp'
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
    // Animated sequences are served as H.264 MP4 (a fraction of the old GIF weight)
    // while keeping the exact same autoplay-loop-with-pause behaviour.
    const src = `${base}${encodeURI(source.replace(/\.gif$/i, '.mp4'))}`;
    const posterSrc = `${base}${encodeURI(poster)}`;
    const size = intrinsicAttributes(gifDimensions[key]);
    return `<figure class="media-block gif-block media-${key}"><div class="media-heading"><figcaption>${caption}</figcaption><p>${description}</p></div><div class="gif-stage"><div class="media-open media-static"><video${size} class="animated-evidence" muted loop playsinline preload="none" poster="${posterSrc}" src="${src}" aria-label="${alt}"></video></div><button class="gif-toggle" type="button" aria-pressed="false" aria-label="Pause ${caption}"><span>Pause animation</span></button></div><p class="motion-note">Pause or replay this sequence at any time.</p></figure>`;
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
    paragraph.innerHTML = `<a class="document-link" href="${base}${encodeURI('optimized/heuristic-evaluation.webp')}" target="_blank" rel="noreferrer">See the full heuristic evaluation <span aria-hidden="true">↗</span></a>`;
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
      const video = figure.querySelector('.animated-evidence');
      const toggle = figure.querySelector('.gif-toggle');
      if (!video || !toggle) return;
      const label = figure.querySelector('figcaption')?.textContent || 'animation';
      let userPaused = reducedMotion;
      const setPaused = (paused) => {
        if (paused) { video.pause(); }
        else { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
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
    if (!root.querySelector('#kfh-3')) return; // route markup not in the DOM yet (view transition still rendering)
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
      ['User interviews', gifBlock('interviews', 'How the interviews worked', 'animated/user-interviews.gif', 'optimized/user-interviews-poster.webp', 'A short look at how the interviews were run and organised.', 'Animated sequence of the KFH Jazeel user interviews')],
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
    document.body.classList.toggle('kfh-active', location.hash === '#/case/kfh' || location.hash === '#/case/talon' || location.hash === '#/case/ai-system');
    if (location.hash !== '#/case/kfh') {
      document.querySelectorAll('.reading-progress, .kfh-lightbox').forEach((element) => element.remove());
      if (window.__kfhProgressHandler) window.removeEventListener('scroll', window.__kfhProgressHandler);
      window.__kfhProgressHandler = null;
      return;
    }
    hydrateKfhMedia();
  }

  window.initKfhMedia = handleRouteChange; // called by app.js right after each route render
  window.addEventListener('hashchange', () => setTimeout(handleRouteChange, 0));
  document.body.classList.toggle('kfh-active', location.hash === '#/case/kfh' || location.hash === '#/case/talon' || location.hash === '#/case/ai-system');
  (function waitForRoute(attempts) {
    const main = document.querySelector('main');
    if (main && main.children.length) { handleRouteChange(); return; }
    if (attempts > 0) requestAnimationFrame(() => waitForRoute(attempts - 1));
  })(120);
})();
;
/* ===== kfh-editorial-redesign.js ===== */
(function(){
  const route='#/case/kfh-editorial';
  const base='assets/kfh/hr/';
  const galleries={
    'Gathering requirements':['optimized/requirement-gathering-v2.svg'],
    'Product analysis':['optimized/product-analysis.jpg'],
    'Design process':['Design Process.png'],
    'Design workflow':['Design Workflow.png'],
    'User interviews':['optimized/user-interviews-poster.webp'],
    'Heuristic evaluation':['optimized/heuristic-evaluation.webp'],
    'Neobank user flows':['optimized/neobank-userflows.webp'],
    'Comparing the user flows':['optimized/flow-comparison.jpg'],
    'High fidelity wireframes':['HiFi wireframes/Component 7.png'],
    'Version control':['optimized/version-control.jpg'],
    'Design system':['ds.webp','DS Kapple.webp'],
    'Before the redesign':['Before/image 90.webp','Before/image 91.webp'],
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
    const hero=root.querySelector('.case-hero');hero.insertAdjacentHTML('beforeend',`<figure class="kfhr-hero-art" aria-label="Redesigned KFH Jazeel experience"><img src="${base}Device%20-%20Macbook%20Pro%203D.webp" alt="KFH Jazeel experience displayed on a laptop"></figure>`);hero.insertAdjacentHTML('afterend',`<section class="kfhr-impact" aria-label="Project outcomes"><div class="kfhr-impact-copy"><small>Measured impact</small><strong>Results first.</strong><span>The evidence behind the redesign.</span></div><div><small>Retention</small><strong>66→18%</strong><span>onboarding drop off</span></div><div><small>Adoption</small><strong>3→32.5%</strong><span>PayBills usage</span></div><div><small>Scale</small><strong>900</strong><span>screens delivered</span></div><div><small>Delivery</small><strong>99%</strong><span>deadlines met</span></div></section>`);
    Object.entries(galleries).forEach(([title,files])=>{const heading=[...root.querySelectorAll('h2,h3')].find(h=>h.textContent.trim()===title);if(heading)heading.insertAdjacentHTML('afterend',gallery(title,files))});
    const targets=[...root.querySelectorAll('.chapter>h2,.chapter>h3,.chapter>p,.chapter>.content-columns,.kfhr-gallery')];targets.forEach(el=>el.classList.add('kfhr-reveal'));if(matchMedia('(prefers-reduced-motion: reduce)').matches)targets.forEach(el=>el.classList.add('is-visible'));else{observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.08,rootMargin:'0px 0px -8%'});targets.forEach(el=>observer.observe(el))}
    const links=[...root.querySelectorAll('.study-toc a')],chapters=[...root.querySelectorAll('.chapter')];links.forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}}));
    const progress=document.createElement('div');progress.className='kfhr-progress';progress.innerHTML='<i></i>';document.body.appendChild(progress);const fill=progress.firstElementChild;scrollHandler=()=>{const start=root.offsetTop,end=root.offsetTop+root.offsetHeight-innerHeight,value=Math.max(0,Math.min(1,(scrollY-start)/Math.max(1,end-start)));fill.style.transform=`scaleX(${value})`;const active=[...chapters].reverse().find(ch=>ch.getBoundingClientRect().top<180)||chapters[0];links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active.id}`))};window.addEventListener('scroll',scrollHandler,{passive:true});scrollHandler();
  }
  window.addEventListener('hashchange',()=>setTimeout(hydrate,0));setTimeout(hydrate,0);
})();
;
/* ===== home-redesign.js ===== */
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
;
/* ===== hero.js ===== */
/* Hero behaviour: release the entrance animations once they finish, and make the
   eye's pupil track the cursor. Everything is document-delegated so it survives
   app.js re-rendering the hero on route changes. */
(function(){
  var tx=0,ty=0,cx=0,cy=0,frame=0;
  var settleTimer=0,settledFor=null;

  function hero(){return document.querySelector('.home-hero');}

  function settle(){
    var h=hero();
    if(!h||h===settledFor)return;
    settledFor=h;
    clearTimeout(settleTimer);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('is-return-visit')){h.classList.add('is-hero-entered');return;}
    /* longest pill delay (0.96s) + duration (0.7s) + slack */
    settleTimer=setTimeout(function(){if(document.contains(h))h.classList.add('is-hero-entered');},1900);
  }

  function render(){
    var eye=document.querySelector('.home-inline-cta .home-eye');
    cx+=(tx-cx)*0.55;
    cy+=(ty-cy)*0.55;
    if(eye){
      eye.style.setProperty('--eye-x',cx.toFixed(2)+'px');
      eye.style.setProperty('--eye-y',cy.toFixed(2)+'px');
    }
    if(Math.abs(tx-cx)>0.05||Math.abs(ty-cy)>0.05)frame=requestAnimationFrame(render);
    else frame=0;
  }

  function request(){if(!frame)frame=requestAnimationFrame(render);}

  function onPointerMove(event){
    var h=hero();
    var eye=h&&h.querySelector('.home-inline-cta .home-eye');
    if(!eye)return;
    /* The eye watches the cursor anywhere inside the hero card. */
    var hr=h.getBoundingClientRect();
    var inside=event.clientX>=hr.left&&event.clientX<=hr.right&&
               event.clientY>=hr.top&&event.clientY<=hr.bottom;
    if(!inside){
      if(tx||ty){tx=0;ty=0;request();}
      return;
    }
    var r=eye.getBoundingClientRect();
    var dx=event.clientX-(r.left+r.width/2);
    var dy=event.clientY-(r.top+r.height/2);
    var dist=Math.hypot(dx,dy);
    if(dist<1){tx=0;ty=0;request();return;}
    var radius=r.width*0.34;
    var reach=Math.min(1,dist/40);    /* full deflection within ~40px */
    tx=(dx/dist)*radius*reach;
    ty=(dy/dist)*radius*reach;
    request();
  }

  var canTrack=matchMedia('(hover: hover) and (pointer: fine)').matches&&
               !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(canTrack)document.addEventListener('pointermove',onPointerMove,{passive:true});
  document.addEventListener('pointerleave',function(){tx=0;ty=0;request();});

  settle();
  setInterval(settle,300);
  window.addEventListener('hashchange',function(){setTimeout(settle,60);});
})();
;