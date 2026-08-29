/* Harmony: CreditBook design system case study. Same editorial shell as the KFH study. */
(function(){
  const IMG='assets/harmony/hr/';

  const fig=(file,alt,caption,ratio,cls)=>`<figure class="hm-fig${cls?' '+cls:''}" style="--ratio:${ratio||'16/10'}">
    <button type="button" class="shot hm-shot" data-shot-src="${IMG+file}" data-shot-title="${caption||alt}">
      <img src="${IMG+file}" alt="${alt}" loading="lazy" decoding="async" onerror="this.closest('.hm-fig').classList.add('is-missing')">
      <span class="hm-missing" aria-hidden="true">${file}</span>
    </button>
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
        <img class="hm-hero-sheet is-back" src="${IMG}harmony-sheet-input.png" alt="" aria-hidden="true" loading="eager" decoding="async">
        <img class="hm-hero-sheet is-front" src="${IMG}harmony-sheet-nav.png" alt="Harmony component sheets: app bar, tabs, bottom navigation and input fields" loading="eager" decoding="async">
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
    <figure class="hm-mood-tile"><button type="button" class="shot hm-shot" data-shot-src="${IMG}mood-1.png" data-shot-title="Moodboard reference 1"><img src="${IMG}mood-1.png" alt="Moodboard reference 1 of 5: a mobile interface with soft dimensional shapes and generous spacing" loading="lazy" decoding="async"></button></figure>
    <figure class="hm-mood-tile"><button type="button" class="shot hm-shot" data-shot-src="${IMG}mood-2.png" data-shot-title="Moodboard reference 2"><img src="${IMG}mood-2.png" alt="Moodboard reference 2 of 5: card-led mobile screens with strong photography" loading="lazy" decoding="async"></button></figure>
    <figure class="hm-mood-tile"><button type="button" class="shot hm-shot" data-shot-src="${IMG}mood-3.png" data-shot-title="Moodboard reference 3"><img src="${IMG}mood-3.png" alt="Moodboard reference 3 of 5: a data-forward screen with clear numeric hierarchy" loading="lazy" decoding="async"></button></figure>
    <figure class="hm-mood-tile"><button type="button" class="shot hm-shot" data-shot-src="${IMG}mood-4.png" data-shot-title="Moodboard reference 4"><img src="${IMG}mood-4.png" alt="Moodboard reference 4 of 5: calm single-task flows on flat colour" loading="lazy" decoding="async"></button></figure>
    <figure class="hm-mood-tile"><button type="button" class="shot hm-shot" data-shot-src="${IMG}mood-5.png" data-shot-title="Moodboard reference 5"><img src="${IMG}mood-5.png" alt="Moodboard reference 5 of 5: dark-mode screens with a single accent" loading="lazy" decoding="async"></button></figure>
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
  ${fig('cb-heuristics.png','Heuristics analysis table for the CreditBook app: fourteen issues across onboarding, sign-up and OTP, each with the heuristic used, a priority and a recommendation','Fourteen issues, each with a severity and a recommendation. From the working evaluation sheet.','2.3/1')}
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
    ${fig('cb-style-01.png','Harmony Figma sheet: app bar variants, tabs and bottom navigation','App bar, tabs, bottom navigation.','1/1','hm-fig-sheet')}
    ${fig('cb-style-02.png','Harmony Figma sheet: further component specimens from the style library','From the style library.','1/1','hm-fig-sheet')}
    ${fig('cb-style-03-ai.png','Harmony Figma sheet: FAB and extended FAB component specimens from the style library','Floating action button and extended button components.','1/1','hm-fig-sheet')}
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
  ${fig('cb-tokens.png','The Figma Tokens panel open beside the button, navigation and dialog component sheets, showing the global set with colour, background, foreground and state ramps','Global, light, dark and theme sets, pushing one change to every component.','4/3')}
`)}

${chapter(10,'Rollout','Adoption was planned, not hoped for',`
  <p class="hm-reveal">Every screen was mapped against every layer of the system, then released in three phases: structure first, surface second, craft last.</p>
  ${matrix()}
  ${fig('cb-implementation.png','The original implementation-breakdown spreadsheet: phases A, B and C mapped against all sixteen screens','The working sheet the matrix above was drawn from.','3.7/1')}
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
    if(links.length){
      const spy=new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(!e.isIntersecting)return;
          const i=sections.indexOf(e.target);
          links.forEach((l,n)=>{
            l.classList.toggle('active',n===i);
            if(n===i)l.setAttribute('aria-current','true'); else l.removeAttribute('aria-current');
          });
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
