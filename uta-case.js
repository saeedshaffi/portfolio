/* UTA "Designing Beyond Figma" case study — KFH editorial structure, UTA Edenred accent. */
(function(){
  const slot=(id,label,ratio)=>`<figure class="media-block"><figcaption>${label}</figcaption><image-slot id="${id}" class="uta-slot" shape="rounded" radius="14"${ratio?` style="aspect-ratio:${ratio}"`:''} placeholder="Drop a Figma export here: ${label}"></image-slot></figure>`;
  const bullet=x=>`<ul>${x.map(v=>`<li>${v}</li>`).join('')}</ul>`;
  const flow=(title,steps,cls)=>`<div><h4>${title}</h4><ol class="${cls||''}">${steps.map(s=>`<li><span>${s}</span></li>`).join('')}</ol></div>`;

  const contextData=[
    ['Component principles',['Components are reusable, never screen-specific.','Product logic stays outside primitive UI components.','Variants are explicit, never ad hoc CSS overrides.','Prefer existing project patterns over new abstractions.']],
    ['Design tokens',['Spacing comes from defined tokens only.','Colours map to semantic tokens, never arbitrary values.','Radius, borders and elevation follow system definitions.']],
    ['State behaviour',['Every interactive component accounts for default, hover, focus, filled, disabled, error and read-only.','Loading and selected states are declared where applicable.']],
    ['Accessibility',['Interactive controls support keyboard navigation.','Focus states are visible.','Labels stay programmatically connected to controls.','Errors never depend on colour alone.','ARIA only where native semantics are insufficient.']],
    ['Resilience',['Long text and missing text must not break layout.','Validation must not unexpectedly shift layout.','Components survive realistic container constraints.']],
    ['Code quality',['Keep APIs understandable and predictable.','Prefer composition over endless boolean props.','Document non-obvious behaviour.']],
    ['Dependency rules',['Avoid unnecessary dependencies.','Never add a package for behaviour available through existing utilities without engineering approval.']],
    ['Migration safety',['Find, classify and map occurrences before replacing.','High-risk instances always route through engineering review.']],
    ['AI guardrails',['Do not invent project APIs.','Do not assume a dependency exists.','Do not rewrite unrelated files.','Flag uncertainty and separate assumptions from verified detail.']],
    ['Known AI mistakes',['Every issue found in review becomes a rule here.','Repeated violations are tracked and fed back into context.']]
  ];

  const toc=['Brief and context','The challenge','Why Figma alone fails','The hypothesis','Winning the room','Engineering discovery','Governed AI context','The component loop','Migration at scale','Dual-track roadmap','Outcomes and measurement','What I learned'];

  window.utaPage=function(){
    return `<div class="case reveal uta-case" style="--accent:#d81e2c">

<section class="case-hero">
  <nav class="case-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/" data-scroll-target="selected-work">Work</a><span aria-hidden="true">/</span><b>UTA · Designing Beyond Figma</b></nav>
  <span class="eyebrow">B2B SaaS · Design systems · AI</span>
  <h1>Designing beyond Figma.</h1>
  <p>How I used AI to turn a fragmented UI ecosystem into a design-to-code system at UTA: a Figma foundation, a coded component library, and a governed AI context that turns engineering feedback into reusable rules.</p>
  <figure class="case-hero-visual"><figcaption class="visually-hidden">The UTA design system</figcaption><div class="media-open"><image-slot id="uta-hero" shape="rounded" radius="18" placeholder="Drop the design system cover here (Figma export)"></image-slot></div></figure>
</section>

<div class="case-facts">
  <div class="fact"><span class="eyebrow">Task</span><b>Design system + AI design-to-code workflow</b></div>
  <div class="fact"><span class="eyebrow">Role</span><b>Lead Product Designer</b></div>
  <div class="fact"><span class="eyebrow">Time</span><b>6 months, ongoing</b></div>
</div>

<div class="long-study">
  <aside class="study-toc"><span class="eyebrow">Case study</span>${toc.map((x,i)=>`<a href="#uta-${i+1}">${String(i+1).padStart(2,'0')} · ${x}</a>`).join('')}</aside>
  <article>

<section class="chapter" id="uta-1" data-screen-label="01"><span class="chapter-num">01 / Brief and context</span><h2 class="chapter-title">The problem was bigger than Figma</h2><p>The UTA portal supports several complex products: the tolling platform, fleet management software and the customer-facing portal. They evolved over years, across different teams, developers and delivery cycles, with no mature design system connecting design decisions to production code.</p>${bullet(['Designers were solving similar interaction problems repeatedly.','Developers were implementing the same UI patterns differently.','Improving the system was always competing with feature delivery for scarce frontend capacity.'])}<p>Rather than building a design system in Figma and handing specifications to engineers, I wanted to test a more ambitious question:</p><blockquote>Could a designer own both the design and the first production-ready implementation of a component, using AI, while frontend engineers shift from building every component to reviewing, validating and integrating them?</blockquote></section>

<section class="chapter" id="uta-2" data-screen-label="02"><span class="chapter-num">02 / The challenge</span><h2 class="chapter-title">Implementation debt, quantified</h2><p>UTA did not simply have inconsistent screens. It had accumulated implementation debt. A button might look almost identical in two places while being implemented differently underneath, and the same was true for inputs, tabs, states, spacing and interaction patterns. Repository analysis exposed the scale.</p><div class="finding-grid uta-anim"><div class="finding uta-i"><strong><span class="uta-count" data-to="900">900</span><span>+</span></strong>button-related implementations or usages found in product code</div><div class="finding uta-i"><strong><span class="uta-count" data-to="1800">1800</span><span>+</span></strong>input-field-related implementations or usages</div><div class="finding uta-i"><strong><span class="uta-count" data-to="5">5</span><span></span></strong>designers sharing one product environment</div><div class="finding uta-i"><strong><span class="uta-count" data-to="3">3</span><span></span></strong>major product experiences supported by the system</div></div><p>These were not 900 unique button designs. The finding was that a simple UI primitive had spread across hundreds of individual implementation points. A design-system button can be created in a day; replacing hundreds of implementations without breaking flows is an engineering problem.</p></section>

<section class="chapter" id="uta-3" data-screen-label="03"><span class="chapter-num">03 / Why Figma alone fails</span><h2 class="chapter-title">Two systems that never converged</h2><p>I created roughly 90% of the design system in Figma: foundations, component structure, states, behaviours and reusable interaction patterns. The shared library immediately improved consistency across our five designers, but it exposed the deeper problem: even with perfect Figma usage, developers still implemented those designs against a fragmented codebase.</p><div class="uta-flowlist uta-anim"><div class="uta-i">${flow('The workflow the library could not fix',['Designer creates design','Developer interprets it','Searches for an existing implementation','Reuses, modifies or recreates it','Design QA finds inconsistencies','Developer revisits','Variations keep accumulating']).replace('<div><h4>','<h4>').replace('</div>','')}</div></div>${slot('uta-figma-lib','The Figma system: foundations, components, variants and states.','16/8')}</section>

<section class="chapter" id="uta-4" data-screen-label="04"><span class="chapter-num">04 / The hypothesis</span><h2 class="chapter-title">A new operating model</h2><p>Designers should be capable of designing and producing the first implementation of design-system components with AI. Frontend engineers remain responsible for engineering validation, architecture decisions, integration, edge cases and final approval. The goal was not zero engineering involvement; it was higher leverage per engineer.</p><div class="uta-flowlist uta-anim"><div class="uta-i">${flow('Before',['Design','Handoff','Engineering implementation','Design QA'])}</div><div class="uta-i">${flow('After',['Design','AI-assisted implementation','Engineering validation','Integration'],'uta-flow-new')}</div></div><p>There is an enormous difference between asking an AI to “create an input field” and asking it to create one that follows our architecture, state model, accessibility expectations, token structure, naming conventions, validation model and migration constraints. The first produces a demo. The second has a chance of producing something useful. That became the core of the project.</p></section>

<section class="chapter" id="uta-5" data-screen-label="05"><span class="chapter-num">05 / Winning the room</span><h2 class="chapter-title">The organizational problem came first</h2><p>The idea initially met considerable resistance. One PM was particularly skeptical that AI could produce anything beyond a polished prototype. Instead of debating capability theoretically, I built something, demonstrated the implementation first, and only afterwards explained how much of it AI had produced. The conversation moved from “can AI do this?” to “what would need to be true for us to trust this?”</p><h3>Developer resistance was understandable</h3>${bullet(['Technical concerns: maintainability, architecture fit, invented patterns, accessibility, edge cases, unnecessary dependencies.','A human concern: if designers can implement components, what does that mean for frontend developers?'])}<p>I did not position the initiative as replacing engineering. UTA was growing with constrained resources; a developer rebuilding another button was not the highest-value use of that engineer. Engineering would become more important to the design system, not less, and its role would shift from repetitive construction toward architecture, validation, integration and quality.</p></section>

<section class="chapter" id="uta-6" data-screen-label="06"><span class="chapter-num">06 / Engineering discovery</span><h2 class="chapter-title">Discovering the hidden engineering system</h2><p>Before generating more components I needed something Figma could not tell me: what makes a frontend component acceptable to UTA engineering? Much of that knowledge was undocumented and distributed across people, so I interviewed frontend developers individually.</p>${bullet(['How should components be structured, and what should never be introduced?','Which behaviours belong inside a component versus the consuming application?','What accessibility behaviour is mandatory?','How do future developers extend a component without creating another parallel implementation?','What would make you reject AI-generated code during review?'])}<p>This produced something more valuable than a specification: an engineering contract.</p></section>

<section class="chapter" id="uta-7" data-screen-label="07"><span class="chapter-num">07 / Governed AI context</span><h2 class="chapter-title">Turning tribal knowledge into AI-readable rules</h2><p>I consolidated the interviews into a reusable instruction layer for Claude. Instead of every person independently discovering how to prompt, the organization could start teaching AI how UTA expects frontend work to be done. Explore the representative structure below.</p><figure class="media-block"><figcaption>The AI context, as a browsable skill file. Representative structure; proprietary implementation details removed.</figcaption><div class="uta-context" id="uta-context"><div class="uta-context-nav" role="tablist" aria-label="AI context categories">${contextData.map(([t],i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-cat="${i}">${t}</button>`).join('')}</div><div class="uta-context-body"><h4 id="uta-context-title">${contextData[0][0]}</h4><ul id="uta-context-rules">${contextData[0][1].map(r=>`<li>${r}</li>`).join('')}</ul><span class="uta-context-cap">Representative structure. Proprietary implementation details removed.</span></div></div></figure><h3>Privacy changed the way I worked</h3><p>I worked primarily with Claude, but never gave it unrestricted repository access; organizational confidence around AI and proprietary information was limited. I extracted only the context each task needed, separated general patterns from sensitive details, sanitized where appropriate, and never used customer information. Slower, but it taught us the key lesson:</p><blockquote>AI adoption is not just a model-capability problem. It is a context-governance problem.</blockquote><p>Interviews also revealed that AI use was already happening informally, with no shared methodology, some of it on personal subscriptions. The real choice was never “use AI or not”; it was whether fragmented individual usage could become a repeatable, governed, organization-level capability.</p></section>

<section class="chapter" id="uta-8" data-screen-label="08"><span class="chapter-num">08 / The component loop</span><h2 class="chapter-title">One component at a time, on purpose</h2><p>We deliberately did not generate the whole library at once; that would have produced a lot of incorrect code very quickly. Each component was an experiment, and every issue an engineer found became a rule that improved the next generation. The learning loop, not any single component, was the real asset.</p><figure class="media-block"><figcaption>The learning loop. Click the sample issue to see how review feedback becomes reusable context.</figcaption><div class="uta-loop" id="uta-loop"><div class="uta-loop-track">${['Generate','Review','Identify issue','Update rules','Regenerate'].map((s,i)=>`<div class="uta-loop-stage" ${i>=2?'data-hot':''}><i>Stage ${i+1}</i><b>${s}</b></div>${i<4?'<span class="uta-loop-arrow" aria-hidden="true">→</span>':''}`).join('')}</div><button type="button" class="uta-loop-issue" id="uta-loop-issue">Sample issue: “Component introduces an unnecessary dependency” , click to trace it</button><div class="uta-loop-result"><div class="uta-rule"><small>Becomes a reusable rule</small>Prefer existing project dependencies. Do not add a package solely to implement behaviour available through native or existing project utilities without engineering approval.</div><div class="uta-inherit"><small>Inherited automatically</small>Every future component generated with this context checks its dependencies against this rule before an engineer ever sees the code.</div></div></div></figure><h3>The input field was the first pilot</h3><p>Inputs look deceptively simple: a label, a border, some helper text. Technically they carry a large behavioural surface: focus, hover, filled and empty states, validation, disabled and read-only behaviour, keyboard interaction, error messaging, long text, autofill and responsive constraints. The first AI-assisted implementation surfaced issues in engineering review, which was exactly the point: the pilot's goal was to find what Claude did not know.</p><figure class="media-block"><figcaption>The production input component, live. Interact with the real control; the panel narrates its state, tokens and rules.</figcaption><div class="uta-input-lab" id="uta-input-lab"><div class="uta-input-stage"><div class="uta-field" id="uta-field-main"><label for="uta-demo-input">Work email</label><input id="uta-demo-input" type="email" autocomplete="off" spellcheck="false" placeholder="name@company.com"><span class="uta-help">Used for the weekly toll settlement report.</span><span class="uta-error">Enter a valid email address</span></div><div class="uta-field"><label for="uta-demo-disabled">Fleet ID</label><input id="uta-demo-disabled" type="text" value="FL-2094" disabled><span class="uta-help">Disabled: assigned by the system.</span></div><div class="uta-field"><label for="uta-demo-readonly">Contract number</label><input id="uta-demo-readonly" type="text" value="UTA-88431-DE" readonly><span class="uta-help">Read-only: editable only by account managers.</span></div></div><div class="uta-input-panel" aria-live="polite"><h4>Current state</h4><span class="uta-state-chip" id="uta-state-chip" data-state="Default">Default</span><dl><div><dt>Design tokens</dt><dd id="uta-tokens">border: color-border-default · bg: surface-base · text: content-primary</dd></div><div><dt>Interaction rule</dt><dd id="uta-rule">The resting state must be visually quiet; affordance comes from the label and container, not decoration.</dd></div><div><dt>Accessibility</dt><dd id="uta-a11y">Label is programmatically connected via for/id. The control is reachable by keyboard.</dd></div><div><dt>Component API</dt><code id="uta-api">Input
  label="Work email"
  type="email"
  state="default"
  helperText="…"</code></div></dl></div></div></figure></section>

<section class="chapter" id="uta-9" data-screen-label="09"><span class="chapter-num">09 / Migration at scale</span><h2 class="chapter-title">Buttons revealed the migration problem</h2><p>Creating the canonical button was not the hard part. Migration was. With roughly 900 button-related usages, a new component could not simply be dropped into the codebase. Some buttons carried icons, unusual text lengths, loading behaviour or locally written CSS; some looked like buttons while performing a different semantic role. Our working model became: find, classify, map, replace, validate. AI is extremely useful for repetitive migration, but only after the problem has been classified correctly.</p><figure class="media-block"><figcaption>Seven years of button drift. Select Consolidate to collapse them into the canonical component.</figcaption><div class="uta-consolidate" id="uta-consolidate"><div class="uta-legacy-grid" aria-hidden="true"><button style="padding:10px 18px;border:1px solid #2b6cb0;border-radius:4px;background:#2b6cb0;color:#fff;font-size:13px">Save changes</button><button style="padding:14px 30px;border:0;border-radius:22px;background:#1a4fa0;color:#fff;font-size:15px;font-weight:700">SAVE</button><button style="padding:9px 16px;border:2px solid #d81e2c;border-radius:8px;background:#fff;color:#d81e2c;font-size:14px">Save</button><button style="padding:12px 20px;border:0;border-radius:6px;background:#e2453a;color:#fff;font-size:14px;letter-spacing:.08em;text-transform:uppercase">Save</button><button style="padding:11px 22px;border:0;border-radius:10px;background:#c62828;color:#fff;font-size:14px;box-shadow:0 6px 14px rgba(0,0,0,.25)">💾 Save</button><button style="padding:8px 14px;border:1px solid #999;border-radius:2px;background:#f5f5f5;color:#333;font-size:12.5px">Save…</button><button style="padding:13px 26px;border:0;border-radius:999px;background:#d81e2c;color:#fff;font-size:14px;opacity:.85">Save changes</button></div><button type="button" class="uta-merge-btn" id="uta-merge-btn">Consolidate</button><div class="uta-canonical"><button type="button">Save changes</button><code>Button
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  iconPosition="start" | "end"
  loading, disabled
  action="submit" | "navigate"</code><span class="uta-context-cap">Conceptual API. Component consolidation, not our exact production syntax.</span></div></div></figure><h3>Inputs made the scale clearer, tabs proved repeatability</h3><p>More than 1,800 input usages meant consistency could no longer depend on people remembering the specification. The system itself has to make the correct implementation easier than the incorrect one. By the time we developed tabs through the same loop, the generated implementation was increasingly aligned with our system, not because the model improved, but because the context had.</p><blockquote>Better models help. Better organizational context compounds.</blockquote>${slot('uta-components','Canonical components: input, button and tabs, designed in Figma and implemented through the governed AI workflow.','16/7')}</section>

<section class="chapter" id="uta-10" data-screen-label="10"><span class="chapter-num">10 / Dual-track roadmap</span><h2 class="chapter-title">Six months, two parallel tracks</h2><p>The programme ran as two tracks that evolved together rather than sequentially: design-system maturity, and AI-assisted development maturity. Hover a phase to see its counterpart.</p><figure class="media-block"><figcaption>Track A (design system) above, Track B (AI-assisted development) below. Related phases are connected.</figcaption><div class="uta-roadmap" id="uta-roadmap"><div class="uta-roadmap-inner"><p class="uta-rm-label">Track A · Design-system maturity</p><div class="uta-rm-row uta-rm-a">${['Audit','Foundations','Figma components','Patterns','Adoption','Optimization'].map((t,i)=>`<div data-col="${i}">${t}</div>`).join('')}</div><div class="uta-rm-links" aria-hidden="true">${'<span></span>'.repeat(6)}</div><div class="uta-rm-row uta-rm-b">${['AI feasibility','Developer interviews','AI rules','Input pilot','Buttons + tabs','Migration + scale'].map((t,i)=>`<div data-col="${i}">${t}</div>`).join('')}</div><p class="uta-rm-label" style="margin:10px 0 0">Track B · AI-assisted development maturity</p></div></div></figure></section>

<section class="chapter" id="uta-11" data-screen-label="11"><span class="chapter-num">11 / Outcomes and measurement</span><h2 class="chapter-title">Measuring success honestly</h2><p>Because the programme is still progressing, I separate delivered outcomes from future measurement rather than manufacturing ROI numbers.</p><h3>Delivered</h3>${bullet(['A shared Figma design-system foundation, most of it created by me.','Input field, button and tabs implemented through the AI-assisted workflow and validated by engineering.','Frontend engineering rules consolidated into a reusable, governed AI context.','Initial developer skepticism converted into participation and review.','AI usage moved from isolated experimentation toward a shared methodology.'])}<h3>What I would measure next</h3>${bullet(['Median design-to-development time for system-based screens.','Frontend hours required per new design-system component.','Percentage of UI built from canonical components, and legacy implementations remaining.','Percentage of AI-generated implementation accepted with minor changes.','Repeated violation rate for previously documented rules.'])}<blockquote>The metric I care about most: how much engineering effort is required to move a design-system decision from Figma into reliable production code.</blockquote></section>

<section class="chapter" id="uta-12" data-screen-label="12"><span class="chapter-num">12 / What I learned</span><h2 class="chapter-title">I was not building a design system</h2><p>I was designing an interface production system: the Figma library, the coded components, the AI context, the engineering review process and the migration strategy, together forming a new operating model for how interface decisions move through the company.</p>${bullet(['AI capability is not the primary constraint; giving it enough organizational knowledge is.','Enterprise AI is a governance problem: privacy, data access and trust set the adoption speed.','AI exposes undocumented processes; rules you cannot explain to an AI are also hard for a new employee.','Human review remains essential: the strongest workflow was generation followed by expert validation.','Design systems are uniquely suited to AI: repeated, constrained, highly structured problems.'])}<blockquote>I did not use AI to bypass the design system. I used the design system to make AI useful.</blockquote></section>

  <a class="button primary" href="#/" data-scroll-target="selected-work">Next: explore all work</a>
  </article>
</div>
</div>`;
  };

  window.initUtaCase=function(){
    const root=document.querySelector('.uta-case');
    if(!root)return;
    document.body.classList.add('kfh-active');

    /* TOC spy + mobile menu (same pattern as KFH/Talon) */
    const tocLinks=[...document.querySelectorAll('.study-toc a[href^="#uta-"]')];
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
      group.className='toc-links';group.id='uta-chapter-links';
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
    const field=document.getElementById('uta-field-main');
    const input=document.getElementById('uta-demo-input');
    if(field&&input){
      const chip=document.getElementById('uta-state-chip');
      const tokens=document.getElementById('uta-tokens');
      const rule=document.getElementById('uta-rule');
      const a11y=document.getElementById('uta-a11y');
      const api=document.getElementById('uta-api');
      const DATA={
        Default:{t:'border: color-border-default · bg: surface-base · text: content-primary',r:'The resting state must be visually quiet; affordance comes from the label and container, not decoration.',a:'Label is programmatically connected via for/id. The control is reachable by keyboard.'},
        Hover:{t:'border: color-border-strong · cursor: text',r:'Hover only strengthens the border. No elevation, no colour change: hover must never look like focus.',a:'Hover is a pointer affordance only; keyboard users go straight to focus.'},
        Focused:{t:'border: color-border-accent · ring: focus-ring-accent (3px, 16%)',r:'Focus is the strongest state in the hierarchy. Exactly one control may hold it.',a:'Visible focus ring meets WCAG 2.4.7; contrast of the ring against surface ≥ 3:1.'},
        Filled:{t:'border: color-border-default · text: content-primary',r:'A filled control returns to quiet chrome; the value is the content, not the container.',a:'Value is announced by screen readers through the connected label.'},
        Error:{t:'border: color-border-danger · ring: focus-ring-danger · text: content-danger',r:'Validation runs on blur, never on every keystroke. Error replaces helper text without shifting layout.',a:'The error is a text message tied to the field, never colour alone.'},
      };
      let hovering=false;
      const state=()=>{
        if(field.classList.contains('uta-field-error'))return 'Error';
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
      input.addEventListener('focus',()=>{field.classList.remove('uta-field-error');paint();});
      input.addEventListener('input',paint);
      input.addEventListener('blur',()=>{
        const v=input.value.trim();
        field.classList.toggle('uta-field-error',!!v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        paint();
      });
      paint();
    }

    /* Button consolidation */
    const cons=document.getElementById('uta-consolidate');
    const mergeBtn=document.getElementById('uta-merge-btn');
    if(cons&&mergeBtn){
      mergeBtn.addEventListener('click',()=>{
        const merged=cons.classList.toggle('is-merged');
        mergeBtn.textContent=merged?'Reset':'Consolidate';
      });
    }

    /* Learning loop */
    const loop=document.getElementById('uta-loop');
    const issue=document.getElementById('uta-loop-issue');
    if(loop&&issue)issue.addEventListener('click',()=>loop.classList.toggle('is-active'));

    /* AI context viewer */
    const ctx=document.getElementById('uta-context');
    if(ctx){
      const title=document.getElementById('uta-context-title');
      const rules=document.getElementById('uta-context-rules');
      const tabs=[...ctx.querySelectorAll('[data-cat]')];
      tabs.forEach(tab=>tab.addEventListener('click',()=>{
        const i=Number(tab.dataset.cat);
        tabs.forEach(t=>t.setAttribute('aria-selected',String(t===tab)));
        title.textContent=contextData[i][0];
        rules.innerHTML=contextData[i][1].map(r=>`<li>${r}</li>`).join('');
      }));
    }

    /* Roadmap pairing */
    const rm=document.getElementById('uta-roadmap');
    if(rm){
      rm.querySelectorAll('[data-col]').forEach(cell=>{
        cell.addEventListener('mouseenter',()=>{
          const c=cell.dataset.col;
          rm.className='uta-roadmap uta-hover-'+c;
          rm.querySelectorAll('[data-col]').forEach(x=>x.classList.toggle('is-pair',x.dataset.col===c));
        });
        cell.addEventListener('mouseleave',()=>{
          rm.className='uta-roadmap';
          rm.querySelectorAll('.is-pair').forEach(x=>x.classList.remove('is-pair'));
        });
      });
    }

    /* Count-ups + entrances */
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
    const anims=[...root.querySelectorAll('.uta-anim')];
    anims.forEach(b=>{
      [...b.querySelectorAll('.uta-i')].forEach((el,i)=>el.style.setProperty('--i',i));
      b.classList.add('uta-armed');
    });
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting)return;
        e.target.classList.add('uta-play');
        e.target.querySelectorAll('.uta-count').forEach(countUp);
        io.unobserve(e.target);
      });
    },{rootMargin:'0px 0px -12% 0px'});
    anims.forEach(b=>io.observe(b));
  };
})();
