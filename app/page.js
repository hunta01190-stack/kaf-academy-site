import HeroSlider from "./HeroSlider";
import slides from "./slides";
import trialConfig from "./trialConfig";

const programs = [
  {
    tag: "1-ON-1",
    title: "Private Lessons",
    text: "Personalized instruction based on each student's level, pace, and goals.",
  },
  {
    tag: "MAX 6 KIDS",
    title: "Small Group Lessons",
    text: "Small classes with focused coaching and individual feedback for every child.",
  },
  {
    tag: "8 LEVELS",
    title: "Step-by-Step Curriculum",
    text: "A structured 8-level curriculum that builds strong fundamentals one skill at a time.",
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
    `Yes. Trial classes run ${trialConfig.scheduleText.replace(" · ", ", ").replace(/^Every/, "every")}, with up to ${trialConfig.maxStudents} students. The trial is $${trialConfig.price} with rental gear, or $${trialConfig.priceWithOwnGear} if your child has their own skates and protective gear. You can cancel for a full refund up to ${trialConfig.refundDaysBefore} days before class, and if you enroll in regular classes afterward, you get $${trialConfig.enrollmentCredit} off your first month.`,
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

const locations = [
  {
    name: "Shakerag Park",
    city: "Johns Creek",
    address: "10945 Rogers Circle, Johns Creek, GA",
    map: "https://www.google.com/maps/search/?api=1&query=Shakerag+Park+10945+Rogers+Circle+Johns+Creek+GA",
  },
  {
    name: "Union Hill Park",
    city: "Alpharetta",
    address: "1590 Little Pine Trail, Alpharetta, GA 30005",
    map: "https://www.google.com/maps/search/?api=1&query=Union+Hill+Park+1590+Little+Pine+Trail+Alpharetta+GA+30005",
  },
];

const ticker = [
  "PRIVATE LESSONS",
  "SMALL GROUPS",
  "8 LEVELS",
  "EVERY SATURDAY",
  "KOREAN + ENGLISH",
  "SUWANEE · JOHNS CREEK · ALPHARETTA",
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="shell nav__inner">
          <a className="brand" href="#top" aria-label="KAF Academy home">
            <img src="/kaf-logo.png" alt="" />
            <span>KAF ACADEMY</span>
          </a>

          <nav className="nav__links" aria-label="Main">
            <a className="pill" href="#about">About</a>
            <a className="pill" href="#programs">Programs</a>
            <a className="pill" href="#schedule">Schedule</a>
            <a className="pill" href="#faq">FAQ</a>
          </nav>

          <a className="pill pill--dark" href="/trial">
            Book a Trial
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">INLINE SKATING LESSONS · SUWANEE, GA</p>

            <h1 className="hero__title">
              ROLL.
              <br />
              FALL.
              <br />
              GET UP.
            </h1>

            <p className="hero__lead">
              Inline skating lessons for kids 4+ and adults. Learn step by step
              through 8 levels — in Korean or English.
            </p>

            <div className="hero__actions">
              <a className="btn" href="/trial">
                Book a trial class →
              </a>
              <span className="hero__ko" lang="ko">
                한국어 수업 OK
              </span>
            </div>
          </div>

          <div className="hero__media">
            <HeroSlider slides={slides} />
            <span className="sticker sticker--pop hero__sticker-a">
              Ages 4+ welcome
            </span>
            <span className="sticker hero__sticker-b">MAX 6 KIDS</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i}>
              {item}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className="about" id="about">
        <div className="shell">
          <p className="eyebrow">ABOUT US</p>

          <div className="about__grid">
            <div>
              <h2 className="about__title">
                Kids Are
                <br />
                <span className="about__mark">the Future.</span>
              </h2>
              <p className="about__ko" lang="ko">
                KAF는 &lsquo;Kids Are the Future&rsquo;의 약자입니다.
              </p>
            </div>

            <div className="about__text">
              <p className="about__lead">
                KAF Academy started from one simple belief: the children we
                coach today are the future of tomorrow. That belief is in our
                name.
              </p>
              <p>
                Our classes are fun first. Kids come to move, play, and laugh
                with their friends — because children who enjoy sports keep
                coming back to them.
              </p>
              <p>
                But every lesson is also a chance to grow. Through sports,
                children learn to listen, to respect their friends and coaches,
                and to take responsibility for their own effort — habits that
                point them in the right direction in life.
              </p>
              <p>
                Most of all, we teach them not to give up easily. Every child
                falls when learning to skate. What matters is getting back up
                and trying again.
              </p>
            </div>
          </div>

          <div className="pillars">
            <article className="pillar">
              <span className="pillar__num">01</span>
              <h3>Fun First</h3>
              <p>Every class is built to be enjoyed, so kids love to move.</p>
              <p className="pillar__ko" lang="ko">즐거운 운동 수업</p>
            </article>
            <article className="pillar">
              <span className="pillar__num">02</span>
              <h3>The Right Direction</h3>
              <p>Respect, focus, and responsibility, learned through sport.</p>
              <p className="pillar__ko" lang="ko">운동으로 배우는 올바른 삶의 방향</p>
            </article>
            <article className="pillar">
              <span className="pillar__num">03</span>
              <h3>Never Give Up</h3>
              <p>Fall, get up, try again. Small wins build real confidence.</p>
              <p className="pillar__ko" lang="ko">쉽게 포기하지 않는 마음</p>
            </article>
          </div>
        </div>
      </section>

      <section className="programs" id="programs">
        <div className="shell">
          <p className="eyebrow">LEVEL-BASED PROGRAMS</p>
          <div className="section-head">
            <h2>
              Learn at the right level.
              <br />
              Progress with confidence.
            </h2>
            <p>
              Inline skating lessons for ages 4+, with private coaching or
              small-group classes limited to 6 students.
            </p>
          </div>

          <div className="cards">
            {programs.map((item, i) => (
              <article className="card" key={item.title}>
                <span className="card__num">0{i + 1}</span>
                <span className="card__tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="/trial">Book a trial class →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="schedule" id="schedule">
        <div className="shell schedule__grid">
          <div>
            <p className="eyebrow">SATURDAY SCHEDULE</p>
            <h2>
              Structured lessons.
              <br />
              Consistent progress.
            </h2>
            <p className="schedule__lead">
              60-minute lessons every Saturday: warm-up, posture and balance
              training, skating drills, and cool-down. Times and locations may
              vary with weather, enrollment, or training needs.
            </p>

            <div className="times">
              <div className="times__item">
                <strong>SATURDAY</strong>
                <span>12:00 PM – 7:00 PM</span>
              </div>
              <div className="times__item">
                <strong>CLASS</strong>
                <span>60 minutes</span>
              </div>
            </div>
          </div>

          <div className="locations">
            {locations.map((loc) => (
              <a
                key={loc.name}
                className="location"
                href={loc.map}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="location__city">{loc.city}</span>
                <strong>{loc.name}</strong>
                <span>{loc.address}</span>
                <span className="location__link">Open in Maps →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="values" aria-label="Our values">
        <div className="shell values__grid">
          {["COURAGE", "DISCIPLINE", "RESPECT", "GROWTH"].map((value, i) => (
            <div className="value" key={value}>
              <b>0{i + 1}</b>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="shell">
          <p className="eyebrow">FAQ</p>
          <h2>Before your first class.</h2>

          <div className="faq__list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="shell cta__inner">
          <div>
            <p className="eyebrow eyebrow--pop">READY TO START?</p>
            <h2>
              Build confidence.
              <br />
              One challenge at a time.
            </h2>
            <p>
              Trial classes: {trialConfig.scheduleText}. ${trialConfig.price}{" "}
              (${trialConfig.priceWithOwnGear} with your own gear), and $
              {trialConfig.enrollmentCredit} off your first month when you
              enroll. Questions? Contact us in Korean or English.
            </p>
          </div>

          <div className="cta__actions">
            <a className="btn btn--light" href="/trial">
              Book a trial class →
            </a>
            <a className="cta__email" href="mailto:contact@kafinline.com">
              contact@kafinline.com
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer__inner">
          <div className="brand">
            <img src="/kaf-logo.png" alt="" />
            <span>KAF ACADEMY</span>
          </div>
          <p>
            Kids Are the Future · Suwanee, Georgia ·{" "}
            <a href="mailto:contact@kafinline.com">contact@kafinline.com</a>
          </p>
          <p>© {new Date().getFullYear()} KAF Academy</p>
        </div>
      </footer>
    </main>
  );
}
