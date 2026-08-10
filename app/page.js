const programs = [
  { level: "Starter", age: "Age 4+", text: "A safe, playful introduction to movement, balance, and confidence." },
  { level: "Foundation", age: "Elementary", text: "Level-based coaching that builds technique, discipline, and teamwork." },
  { level: "Performance", age: "Youth & Adults", text: "Focused training for students ready to improve speed, control, and endurance." },
];

const faqs = [
  ["Who can join?", "Children age 4 through elementary school are our primary students. Adult lessons may also be arranged."],
  ["When are classes held?", "Classes open by level and enrollment on Saturdays between 12:00 PM and 6:00 PM."],
  ["Which languages are available?", "Coaching is available in both Korean and English."],
  ["Where are lessons held?", "Lessons are based in the Suwanee area of Georgia. Exact locations are confirmed with enrolled families."],
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="KAF Academy home">
          <img src="/kaf-logo.png" alt="KAF Academy logo" />
          <span>KAF ACADEMY</span>
        </a>
        <nav>
          <a href="#about">About</a><a href="#programs">Programs</a><a href="#schedule">Schedule</a><a href="#faq">FAQ</a>
        </nav>
        <a className="button small" href="#contact">Book a Trial</a>
      </header>

     <section className="kaf-hero" id="top">
  <img
    className="kaf-hero__image"
    src="/images/hero-original.png"
    alt="A child practicing inline skating at KAF Academy"
  />

  <div className="kaf-hero__panel" aria-hidden="true" />

  <div className="shell kaf-hero__layout">
    <div className="kaf-hero__content">
      <p className="kaf-hero__eyebrow">
        INLINE SKATING LESSONS · SUWANEE, GA
      </p>

      <h1 className="kaf-hero__title">
        NEVER
        <br />
        <span>GIVE UP.</span>
      </h1>

      <p className="kaf-hero__description">
        Build balance. Grow confidence.
        <br />
        Keep moving forward.
      </p>

      <a className="kaf-hero__button" href="#contact">
        BOOK A TRIAL CLASS
      </a>

      <div className="kaf-hero__facts">
        <span>WEEKEND CLASSES</span>
        <span>KOREAN + ENGLISH</span>
        <span>AGES 4+ &amp; ADULTS</span>
      </div>
    </div>
  </div>
</section>
      <section className="statement" id="about">
        <div className="shell split">
          <p className="eyebrow">OUR PURPOSE</p>
          <h2>More than a sports class.</h2>
          <p>We teach children to keep trying, move with confidence, respect others, and enjoy the process of learning. The first program begins with inline skating, with room to grow into broader youth sports education.</p>
        </div>
      </section>

      <section className="programs" id="programs">
        <div className="shell">
          <p className="eyebrow orange">LEVEL-BASED PROGRAMS</p>
          <div className="section-head"><h2>Find the right starting point.</h2><p>New class times are opened as groups form.</p></div>
          <div className="cards">
            {programs.map((item, i) => <article className="card" key={item.level}><span>0{i+1}</span><p className="age">{item.age}</p><h3>{item.level}</h3><p>{item.text}</p><a href="#contact">Ask about availability →</a></article>)}
          </div>
        </div>
      </section>

      <section className="schedule" id="schedule">
        <div className="shell schedule-grid">
          <div><p className="eyebrow">SATURDAY SCHEDULE</p><h2>Classes built around each level.</h2><p>Lessons run between noon and 6 PM. The final schedule depends on enrollment, level, and coach availability.</p></div>
          <div className="schedule-card">
            <div><strong>DAY</strong><span>Every Saturday</span></div>
            <div><strong>TIME</strong><span>12:00 PM – 6:00 PM</span></div>
            <div><strong>LOCATION</strong><span>Suwanee, Georgia</span></div>
            <div><strong>LANGUAGE</strong><span>Korean & English</span></div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="shell values-grid"><div><b>01</b><span>COURAGE</span></div><div><b>02</b><span>DISCIPLINE</span></div><div><b>03</b><span>RESPECT</span></div><div><b>04</b><span>GROWTH</span></div></div>
      </section>

      <section className="faq shell" id="faq">
        <p className="eyebrow orange">FAQ</p><h2>Before your first class.</h2>
        <div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="cta" id="contact">
        <div className="shell"><p className="eyebrow">READY TO START?</p><h2>Build confidence.<br/>One challenge at a time.</h2><p>Trial booking form, phone number, email, and exact location will be connected in the next development step.</p><a className="button light" href="mailto:hello@kafacademy.com">Contact KAF Academy</a></div>
      </section>

      <footer className="footer shell"><div className="brand"><img src="/kaf-logo.png" alt="KAF Academy" /><span>KAF ACADEMY</span></div><p>Kids Are the Future · Suwanee, Georgia</p><p>© 2026 KAF Academy</p></footer>
    </main>
  );
}
