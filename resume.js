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
