const programs = [
  {
    level: "Private Lessons",
    age: "1-on-1 Coaching",
    text: "Personalized instruction based on each student's level, pace, and goals.",
  },
  {
    level: "Small Group Lessons",
    age: "Up to 6 Students",
    text: "Small classes designed to provide focused coaching, individual feedback, and a better learning environment.",
  },
  {
    level: "8-Level Curriculum",
    age: "Step-by-Step Progression",
    text: "Students learn through a structured 8-level curriculum that builds strong fundamentals and develops skills step by step.",
  },
];

const faqs = [
  [
    "Can complete beginners join?",
    "Absolutely. KAF Academy welcomes children ages 4 and up, including students who have never skated before. Every child develops at a different pace, so progress may vary depending on age, coordination, physical ability, and practice.",
  ],
  [
    "What equipment does my child need?",
    "For safety, all students must have inline skates, a helmet, knee pads, elbow pads, and wrist guards.",
  ],
  [
    "Do you offer equipment rentals?",
    "Yes. Rental equipment is available when needed. However, students who plan to continue lessons are encouraged to have their own skates and protective gear for proper fit, comfort, and consistency.",
  ],
  [
    "Do you offer trial classes?",
    "Yes. Trial classes are planned to begin in September 2026. More information about scheduling, pricing, and registration will be announced soon.",
  ],
  [
    "What happens if it rains?",
    "Because lessons are held outdoors, classes may be canceled due to rain or unsafe weather conditions. When KAF Academy cancels a class because of weather, families will be offered either a make-up class or a class credit applied toward the following month's tuition, depending on scheduling availability.",
  ],
  [
    "What if my child misses a class?",
    "Regular monthly enrollment is based on four classes per month. When the calendar includes a fifth class week, that additional week may be used for a make-up lesson, subject to scheduling availability.",
  ],
  [
    "Can parents watch the lesson?",
    "Yes. Parents are welcome to watch their child's lesson.",
  ],
  [
    "Where are classes held?",
    "Families may generally choose between Shakerag Park and Union Hill Park based on convenience. The location may occasionally need to change because of weather, scheduling, or the student's level and training needs.",
  ],
  [
    "Are lessons available in Korean and English?",
    "Yes. KAF Academy provides instruction in both Korean and English. Students and parents can communicate in whichever language is more comfortable for them.",
  ],
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
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#schedule">Schedule</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="button small" href="#contact">
          Book a Trial
        </a>
      </header>

      <section className="kaf-hero" id="top">
        <img
          className="kaf-hero__image"
          src="/Images/hero-original.png"
          alt="A child practicing inline skating at KAF Academy"
        />

        <div className="kaf-hero__panel" aria-hidden="true" />

        <div className="shell kaf-hero__layout">
          <div className="kaf-hero__content">
            <div className="kaf-hero__brand">
              <img src="/kaf-logo.png" alt="KAF Academy" />
              <span>KAF ACADEMY</span>
            </div>

            <p className="kaf-hero__eyebrow">
              INLINE SKATING LESSONS · SUWANEE, GA
            </p>

            <h1 className="kaf-hero__title">
              <span className="kaf-hero__never">NEVER</span>
              <br />
              <span className="kaf-hero__give">GIVE UP.</span>
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

          <h2>
            Building skills for skating.
            <br />
            Building strength for life.
          </h2>

          <p>
            At KAF Academy, we believe sports are more than physical activity.
            They are an opportunity for children to learn how to focus, keep
            trying, and experience the confidence that comes from their own
            effort and progress.
            <br />
            <br />
            Through inline skating, we help children face challenges, overcome
            fear, and discover what they are capable of when they don't give up.
            <br />
            <br />
            <strong>Kids Are the Future.</strong> We believe the lessons
            children learn today help shape the people they become tomorrow.
            Our goal is to help each child grow with confidence, perseverance,
            and focus — so they can become strong individuals who positively
            contribute to the people and the world around them.
          </p>
        </div>
      </section>

      <section className="programs" id="programs">
        <div className="shell">
          <p className="eyebrow orange">
            LEVEL-BASED INLINE SKATING PROGRAMS
          </p>

          <div className="section-head">
            <h2>
              Learn at the right level.
              <br />
              Progress with confidence.
            </h2>

            <p>
              Inline skating lessons for ages 4+, with private coaching or
              small-group classes limited to a maximum of 6 students.
            </p>
          </div>

          <div className="cards">
            {programs.map((item, i) => (
              <article className="card" key={item.level}>
                <span>0{i + 1}</span>
                <p className="age">{item.age}</p>
                <h3>{item.level}</h3>
                <p>{item.text}</p>
                <a href="#contact">Ask about availability →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="schedule" id="schedule">
        <div className="shell schedule-grid">
          <div>
            <p className="eyebrow">WEEKEND SCHEDULE</p>

            <h2>
              Structured lessons.
              <br />
              Consistent progress.
            </h2>

            <p>
              KAF Academy offers 60-minute inline skating lessons on Saturdays
              and Sundays. Each class includes warm-up, posture and balance
              training, skating instruction, and cool-down exercises.
              Families may generally choose the location that is most
              convenient for them. Class times and locations may vary depending
              on scheduling, weather, enrollment, or training needs.
            </p>
          </div>

          <div className="schedule-card">
            <div>
              <strong>DAYS</strong>
              <span>Saturday &amp; Sunday</span>
            </div>

            <div>
              <strong>SATURDAY</strong>
              <span>12:00 PM – 7:00 PM</span>
            </div>

            <div>
              <strong>SUNDAY</strong>
              <span>9:00 AM – 1:00 PM</span>
            </div>

            <div>
              <strong>CLASS LENGTH</strong>
              <span>60 Minutes</span>
            </div>

            <div>
              <strong>LOCATIONS</strong>
              <span>
                Shakerag Park — Johns Creek
                <br />
                10945 Rogers Circle
                <br />
                <br />
                Union Hill Park — Alpharetta
                <br />
                1590 Little Pine Trail, Alpharetta, GA 30005
              </span>
            </div>

            <div>
              <strong>LANGUAGE</strong>
              <span>Korean &amp; English</span>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="shell values-grid">
          <div>
            <b>01</b>
            <span>COURAGE</span>
          </div>
          <div>
            <b>02</b>
            <span>DISCIPLINE</span>
          </div>
          <div>
            <b>03</b>
            <span>RESPECT</span>
          </div>
          <div>
            <b>04</b>
            <span>GROWTH</span>
          </div>
        </div>
      </section>

      <section className="faq shell" id="faq">
        <p className="eyebrow orange">FAQ</p>
        <h2>Before your first class.</h2>

        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell">
          <p className="eyebrow">READY TO START?</p>

          <h2>
            Build confidence.
            <br />
            One challenge at a time.
          </h2>

          <p>
            Trial classes are planned to begin in September 2026. For questions
            about lessons, equipment, locations, or upcoming trial availability,
            contact KAF Academy.
          </p>

          <a
            className="button light"
            href="mailto:contact@kafinline.com"
          >
            Email KAF Academy
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand">
          <img src="/kaf-logo.png" alt="KAF Academy" />
          <span>KAF ACADEMY</span>
        </div>

        <p>Kids Are the Future · Suwanee, Georgia</p>
        <p>© 2026 KAF Academy</p>
      </footer>
    </main>
  );
}