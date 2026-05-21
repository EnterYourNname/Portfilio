// Home — Portfolio page, based on Figma V02 (393px mobile canvas).

const EMAIL = "andrii.b.design@gmail.com";

// ────────────────────────────────────────────────────────────────
// Content
// ────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  { role: "Visual Designer",               place: "Neuffer GmbH & Co. KG", dates: "05.26 – present" },
  { role: "Freelance 3D & UI/UX Designer", place: "Freelance",             dates: "03.25 – 04.26" },
  { role: "Communication Designer",        place: "UP Designstudio",       dates: "Mar 2023 – Sep 2024" },
  { role: "3D & Interior Designer",        place: "Spotless Agency",       dates: "Dec 2018 – Mar 2023" },
  { role: "Product Designer",              place: "Merx",                  dates: "Dec 2018 – Nov 2019" },
];

const SKILLS = [
  "UI/UX Design",
  "3D Design",
  "Graphic Design",
  "Website Design",
  "Arch-Vis.",
];

const PROJECT_FILTERS = ["All", "UI/UX", "3D"];

const TICKER_ITEMS = [
  "Blender", "3D Modeling", "Figma", "UI / UX", "Rendering",
  "Photoshop", "Matterport", "Arch-Vis", "Brand Systems",
];

// ────────────────────────────────────────────────────────────────
// Icons
// ────────────────────────────────────────────────────────────────

const HmMenuIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="#FFF5E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7"  x2="20" y2="7"  />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const HmArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>
);

const HmArrowUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

// ────────────────────────────────────────────────────────────────
// Header
// ────────────────────────────────────────────────────────────────

function HmHeader({ onMenuClick, menuOpen, compact }) {
  return (
    <React.Fragment>
      <div className="pk-avatar hm-site-avatar" aria-label="Andrii B." />
      <header className={`pk-header${compact ? " is-compact" : ""}`}>
        <nav className="hm-desktop-nav" aria-label="Primary navigation">
          <a href="index.html" aria-current="page">Home</a>
          <a href="index.html#work">Work</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </nav>
        <button className="pk-menu-btn" type="button" aria-label="Open menu" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={onMenuClick}>
          <HmMenuIcon />
        </button>
      </header>
    </React.Fragment>
  );
}

// ────────────────────────────────────────────────────────────────
// Hero — full-bleed portrait with overlaid intro
// ────────────────────────────────────────────────────────────────

function HmHero() {
  return (
    <section className="hm-hero" aria-label="Intro">
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="motion-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16 0" />
        </filter>
      </svg>
      <video 
        className="hm-hero-video-bg" 
        autoPlay 
        loop 
        muted 
        playsInline 
        poster="design-system/assets/hero-bg-motion-blur-Image.jpg">
        <source src="design-system/assets/hero-bg-motion-blur.mp4?v=4" type="video/mp4" />
      </video>
      <div className="hm-hero-content">
        <FadeCascade>
          <span className="hm-eyebrow">Hi, I&rsquo;m Andrii</span>
          <h1 className="hm-headline">
            Digital Experience<br />Designer
          </h1>
          <p className="hm-lead">
            Designer with <strong>7 years</strong> across UI/UX, 3D &amp; brand. Stuttgart, DE. 🚀
          </p>
          <a className="pk-btn hm-hero-cta" href="contact.html">
            Contact me
            <HmArrowRight />
          </a>
        </FadeCascade>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Ticker strip
// ────────────────────────────────────────────────────────────────

function HmTicker() {
  // Duplicate so the seamless loop works
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="hm-ticker" aria-hidden="true">
      <div className="hm-ticker-track">
        {items.map((t, i) => (
          <span key={i} className="hm-ticker-item">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Work reel
// ────────────────────────────────────────────────────────────────

function HmReel() {
  const open = () => window.open("https://vimeo.com/1082557519", "_blank");
  const openFromKeyboard = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    open();
  };
  return (
    <div className="hm-reel" role="button" tabIndex={0}
      aria-label="Play work reel" onClick={open}
      onKeyDown={openFromKeyboard}>
      <div className="hm-reel-img" />
      <div className="hm-reel-overlay">
        <div className="hm-reel-play"><PlayIcon /></div>
        <span className="hm-reel-label">Work reel</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Projects
// ────────────────────────────────────────────────────────────────

function HmProjects() {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const toggleBtnRef = React.useRef(null);
  const isCollapsing = React.useRef(false);
  const projects = window.PORTFOLIO_PROJECTS || [];

  React.useEffect(() => {
    if (!showAllProjects && isCollapsing.current) {
      isCollapsing.current = false;
      toggleBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showAllProjects]);
  const matchingProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));
  const visibleProjects = showAllProjects
    ? matchingProjects
    : matchingProjects.slice(0, 3);
  const count = String(visibleProjects.length).padStart(2, "0");
  const total = String(matchingProjects.length).padStart(2, "0");

  return (
    <section id="work" className="hm-section hm-work-section" aria-labelledby="work-title">
      <div className="hm-section-head">
        <span className="pk-mono">Projects</span>
        <span className="hm-section-count">{count} / {total}</span>
      </div>
      <h2 id="work-title" className="hm-section-title">Work.</h2>
      <div className="hm-chips" role="group" aria-label="Project filters">
        {PROJECT_FILTERS.map(filter => (
          <button
            key={filter}
            className={`hm-chip${activeFilter === filter ? " active" : ""}`}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => {
              setActiveFilter(filter);
              setShowAllProjects(false);
            }}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="hm-projects" aria-live="polite">
        {visibleProjects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
      {matchingProjects.length > 3 && (
        <button
          ref={toggleBtnRef}
          className="pk-link"
          type="button"
          onClick={() => {
            if (showAllProjects) {
              isCollapsing.current = true;
              setShowAllProjects(false);
            } else {
              setShowAllProjects(true);
            }
          }}
          aria-expanded={showAllProjects}
        >
          {showAllProjects ? "Show less" : "All projects"} <HmArrowRight size={14} />
        </button>
      )}
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Experience
// ────────────────────────────────────────────────────────────────

function HmFeaturedProject() {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const project = projects.find(item => item.id === "mealmate") || projects[0];

  if (!project) return null;

  const featuredImages = [project.hero || project.cover, ...(project.gallery || [])]
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section className="hm-featured-section" aria-labelledby="featured-project-title">
      <div className="hm-featured-copy">
        <span className="pk-mono">Featured project</span>
        <h2 id="featured-project-title" className="hm-featured-title">{project.title}</h2>
        <div className="hm-featured-tags" aria-label="Project categories">
          <span>{project.industry}</span>
          <span>{project.role}</span>
        </div>
        <p>
          A nutrition product concept focused on clear meal tracking, personal goals,
          and readable health feedback across mobile screens.
        </p>
        <a className="pk-link" href={project.href}>
          View full project <HmArrowRight size={14} />
        </a>
      </div>

      <dl className="hm-featured-facts" aria-label={`${project.title} project details`}>
        <div>
          <dt>Industry</dt>
          <dd>{project.industry}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{project.tools}</dd>
        </div>
      </dl>

      <div className="hm-featured-gallery" aria-label={`${project.title} preview images`}>
        {featuredImages.map((src, index) => (
          <a
            key={`${src}-${index}`}
            className={`hm-featured-img hm-featured-img-${index + 1}`}
            href={project.href}
            aria-label={`Open ${project.title} case study`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>
    </section>
  );
}

function HmExperience() {
  return (
    <section className="hm-xp-section">
      <div className="hm-section-head">
        <span className="pk-mono" style={{ color: "rgba(255,245,232,0.55)" }}>Experience</span>
        <span className="hm-section-count">7 years</span>
      </div>
      <h2 className="hm-section-title" style={{ color: "var(--cream)" }}>Work history.</h2>
      <div className="hm-xp-list">
        {EXPERIENCE.map((x, i) => (
          <div className="hm-xp-row" key={i}>
            <span className="hm-xp-role">{x.role}</span>
            <div className="hm-xp-meta">
              <span className="hm-xp-place">{x.place}</span>
              <span className="hm-xp-dates">{x.dates}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Skills
// ────────────────────────────────────────────────────────────────

function HmSkills() {
  return (
    <section className="hm-section" style={{ paddingBottom: 64 }}>
      <div className="hm-section-head">
        <span className="pk-mono">Skills</span>
      </div>
      <h2 className="hm-section-title">What I do.</h2>
      <div className="hm-skills-list">
        {SKILLS.map((s, i) => (
          <div className="hm-skill-row" key={s}>
            <span className="hm-skill-name">{s}</span>
            <span className="hm-skill-num">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Manifesto + Footer
// ────────────────────────────────────────────────────────────────

function HmFooter({ onScrollTop }) {
  return (
    <footer className="pk-footer-bg">
      <div className="pk-manifesto">
        <span className="pk-mono">Manifesto</span>
        <h2>{"Designing with\npurpose, always."}</h2>
      </div>
      <div className="pk-contact">
        <div className="pk-contact-cta-shell">
          <a className="pk-btn" href="contact.html" style={{ display:"inline-flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            Contact me
            <HmArrowRight />
          </a>
        </div>
        <div className="pk-email">
          <span className="lbl">or send me an email</span>
          <span className="addr">{EMAIL}</span>
        </div>
      </div>
      <div className="pk-footer-black">
        <button className="pk-link" style={{ color: "var(--cream)" }} onClick={onScrollTop}>
          Back to top <HmArrowUp />
        </button>
        <div className="pk-contact-row">
          <span className="lbl">Get in contact</span>
          <a className="pk-social-link" href="https://www.behance.net/artandrewkim" aria-label="Behance" target="_blank" rel="noopener">
            <img src="design-system/assets/icons/behance.svg"  alt="" width="32" height="32" />
          </a>
          <a className="pk-social-link" href="https://www.linkedin.com/in/andrii-b-ui-ux/" aria-label="LinkedIn" target="_blank" rel="noopener">
            <img src="design-system/assets/icons/linkedin.svg" alt="" width="32" height="32" />
          </a>
        </div>
        <nav className="pk-footer-nav">
          <a href="index.html"       style={{ color:"inherit", textDecoration:"none" }}>Home</a>
          <a href="index.html#work"  style={{ color:"inherit", textDecoration:"none" }}>Work</a>
          <a href="about.html"       style={{ color:"inherit", textDecoration:"none" }}>About</a>
          <a href="contact.html"     style={{ color:"inherit", textDecoration:"none" }}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────
// Page root
// ────────────────────────────────────────────────────────────────

function HomeApp() {
  const [navOpen, setNavOpen] = React.useState(false);
  const [navCompact, setNavCompact] = React.useState(false);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  React.useEffect(() => {
    const updateNavMode = () => {
      const scrollY = window.scrollY || 0;
      setNavCompact(current => {
        if (!current && scrollY > 120) return true;
        if (current && scrollY < 64) return false;
        return current;
      });
    };

    updateNavMode();
    window.addEventListener("scroll", updateNavMode, { passive: true });
    return () => window.removeEventListener("scroll", updateNavMode);
  }, []);

  return (
    <div className="hm-shell">
      <div className="hm-phone">
        <HmHeader menuOpen={navOpen} compact={navCompact} onMenuClick={() => setNavOpen(true)} />

        {/* Shared nav overlay — loaded via nav/nav.jsx */}
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <HmHero />
        <HmTicker />
        <HmReel />
        <HmProjects />
        <HmFeaturedProject />
        <HmExperience />
        <HmSkills />
        <HmFooter onScrollTop={scrollTop} />
      </div>
    </div>
  );
}

Object.assign(window, { HomeApp });
