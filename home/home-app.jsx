// Home — Portfolio page, based on Figma V02 (393px mobile canvas).

const EMAIL = "andrii.b.design@gmail.com";

// ────────────────────────────────────────────────────────────────
// Content
// ────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  { role: "Visual Designer",               place: "Neuffer GmbH & Co. KG", datesShort: "05.26 - present", datesFull: "May 2026 - present" },
  { role: "Freelance 3D & UI/UX Designer", place: "Freelance",             datesShort: "03.25 - 04.26",   datesFull: "Mar 2025 - Apr 2026" },
  { role: "Communication Designer",        place: "UP Designstudio",       datesShort: "03.23 - 09.24",   datesFull: "Mar 2023 - Sep 2024" },
  { role: "3D & Interior Designer",        place: "Spotless Agency",       datesShort: "12.18 - 03.23",   datesFull: "Dec 2018 - Mar 2023" },
  { role: "Product Designer",              place: "Merx",                  datesShort: "12.18 - 11.19",   datesFull: "Dec 2018 - Nov 2019" },
];

const SKILLS = [
  {
    title: "Product & UI/UX Design",
    detail: "User flows, wireframes, responsive interfaces, and clickable prototypes for clear digital journeys.",
    tools: "Figma, prototyping, design systems",
  },
  {
    title: "3D Visualization",
    detail: "Interior concepts, product scenes, spatial storytelling, and polished renderings.",
    tools: "Blender, rendering, arch-vis",
  },
  {
    title: "Brand & Visual Systems",
    detail: "Visual direction, identity assets, graphic layouts, and reusable rules for consistent communication.",
    tools: "Photoshop, brand systems, layout",
  },
  {
    title: "Web Experience Design",
    detail: "Portfolio pages, landing concepts, responsive structure, and conversion-focused content hierarchy.",
    tools: "UI/UX, web design, responsive design",
  },
  {
    title: "Spatial Capture & Presentation",
    detail: "Matterport tours and presentation-ready visuals for interiors, spaces, and real estate concepts.",
    tools: "Matterport, interior visualization",
  },
];

const PROJECT_FILTERS = ["All", "UI/UX", "3D"];

const TICKER_ITEMS = [
  "UI/UX Design", "Design Systems", "Figma", "Prototyping",
  "3D Visualization", "Blender", "3D Modeling", "Rendering",
  "Interior Visualization", "Matterport", "Brand Identity",
  "Photoshop", "Web Experiences", "Arch-Vis", "Product Rendering",
];

// ────────────────────────────────────────────────────────────────
// Icons
// ────────────────────────────────────────────────────────────────




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


// ────────────────────────────────────────────────────────────────
// Hero — full-bleed portrait with overlaid intro
// ────────────────────────────────────────────────────────────────

function HmHero() {
  return (
    <section className="hm-hero" aria-label="Intro">
      <svg className="hm-svg-filter" aria-hidden="true" focusable="false">
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
            Digital<br /><span>Experience</span><br />Designer
          </h1>
          <p className="hm-lead">
            Designer with <strong>7 years</strong> across UI/UX, 3D &amp; brand. Stuttgart, DE. 🚀
          </p>
          <a className="pk-btn hm-hero-cta" href="/contact">
            Contact me
            <PkArrowRight />
          </a>
        </FadeCascade>
      </div>
      <span className="hm-scroll-cue" aria-hidden="true">(SCROLL)</span>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Ticker strip
// ────────────────────────────────────────────────────────────────

function HmTicker() {
  // Triple the row so wide screens keep a filled, seamless loop.
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [pendingPlay, setPendingPlay] = React.useState(false);
  const [consent, setConsent] = React.useState(() => localStorage.getItem('cookie-consent'));

  React.useEffect(() => {
    const handler = () => {
      const val = localStorage.getItem('cookie-consent');
      setConsent(val);
      if (val === null) { setIsPlaying(false); setPendingPlay(false); }
    };
    window.addEventListener('cookie-consent-change', handler);
    return () => window.removeEventListener('cookie-consent-change', handler);
  }, []);

  // Auto-play once consent is given after user tried to play
  React.useEffect(() => {
    if (pendingPlay && consent === 'accepted') {
      setIsPlaying(true);
      setPendingPlay(false);
    }
  }, [pendingPlay, consent]);

  const handlePlay = () => {
    if (consent === 'accepted') {
      setIsPlaying(true);
    } else if (consent === null) {
      setPendingPlay(true);
    }
  };

  const openFromKeyboard = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    handlePlay();
  };

  const resetConsent = () => {
    localStorage.removeItem('cookie-consent');
    window.dispatchEvent(new Event('cookie-consent-change'));
  };

  if (consent === 'declined') {
    return (
      <div className="hm-reel hm-reel--blocked">
        <p>Video unavailable — cookies declined.</p>
        <button className="hm-reel--blocked-btn" onClick={resetConsent}>
          Change cookie settings
        </button>
      </div>
    );
  }

  if (isPlaying && consent === 'accepted') {
    return (
      <div className="hm-reel hm-reel--playing">
        <iframe
          src="https://player.vimeo.com/video/1082557519?title=0&byline=0&portrait=0&autoplay=1"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="Work Reel"
        ></iframe>
      </div>
    );
  }

  if (pendingPlay) {
    return (
      <div className="hm-reel hm-reel--blocked">
        <p>Respond to the cookie banner to play the video.</p>
      </div>
    );
  }

  return (
    <div className="hm-reel" role="button" tabIndex={0}
      aria-label="Play work reel" onClick={handlePlay}
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
  // Default visible count is 3, EXCEPT in the 2-column range (900–1179.98px)
  // where 4 fills two even rows (2 + 2) instead of an uneven 2 + 1. The upper
  // bound matches the 3-column breakpoint (≥1180px) so there's no awkward gap.
  const [defaultCount, setDefaultCount] = React.useState(3);
  const toggleBtnRef = React.useRef(null);
  const isCollapsing = React.useRef(false);
  const projects = window.PORTFOLIO_PROJECTS || [];

  React.useEffect(() => {
    if (!showAllProjects && isCollapsing.current) {
      isCollapsing.current = false;
      toggleBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showAllProjects]);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (max-width: 1179.98px)");
    const update = () => setDefaultCount(mq.matches ? 4 : 3);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const matchingProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));
  const visibleProjects = showAllProjects
    ? matchingProjects
    : matchingProjects.slice(0, defaultCount);
  const count = String(visibleProjects.length).padStart(2, "0");
  const total = String(matchingProjects.length).padStart(2, "0");

  return (
    <section id="work" className="hm-section hm-work-section" aria-labelledby="work-title">
      <div className="hm-section-head">
        <span className="pk-mono">Projects</span>
        <span className="hm-section-count">{count} / {total}</span>
      </div>
      <h2 id="work-title" className="hm-section-title">Work.</h2>
      <div
        className="hm-chips pk-toggle-group"
        role="radiogroup"
        aria-label="Project filters"
        onKeyDown={(e) => {
          const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (!next) return;
          e.preventDefault();
          const i = PROJECT_FILTERS.indexOf(activeFilter);
          const ni = (i + next + PROJECT_FILTERS.length) % PROJECT_FILTERS.length;
          setActiveFilter(PROJECT_FILTERS[ni]);
          setShowAllProjects(false);
          e.currentTarget.querySelectorAll('[role="radio"]')[ni]?.focus();
        }}
      >
        {PROJECT_FILTERS.map(filter => (
          <button
            key={filter}
            className="pk-toggle"
            type="button"
            role="radio"
            aria-checked={activeFilter === filter}
            tabIndex={activeFilter === filter ? 0 : -1}
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
      {matchingProjects.length > defaultCount && (
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
          {showAllProjects ? "Show less" : "All projects"} <PkArrowRight size={14} />
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
  const project = projects.find(item => item.id === "beer-box") || projects[0];

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
          View full project <PkArrowRight size={14} />
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
            aria-label={`${project.title} — open project (preview ${index + 1})`}
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
        <span className="pk-mono">Experience</span>
        <span className="hm-section-count">7 years</span>
      </div>
      <h2 className="hm-section-title">Work history.</h2>
      <div className="hm-xp-list">
        {EXPERIENCE.map((x, i) => (
          <div className="hm-xp-row" key={i}>
            <span className="hm-xp-role">{x.role}</span>
            <div className="hm-xp-meta">
              <span className="hm-xp-place">{x.place}</span>
              <span className="hm-xp-dates hm-xp-dates-short">{x.datesShort}</span>
              <span className="hm-xp-dates hm-xp-dates-full">{x.datesFull}</span>
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
    <section className="hm-section hm-skills-section">
      <div className="hm-section-head">
        <span className="pk-mono">Skills</span>
      </div>
      <h2 className="hm-section-title">What I bring.</h2>
      <div className="hm-skills-list">
        {SKILLS.map((s, i) => (
          <div className="hm-skill-row" key={s.title}>
            <span className="hm-skill-num">0{i + 1}</span>
            <span className="hm-skill-name">{s.title}</span>
            <span className="hm-skill-detail">{s.detail}</span>
            <span className="hm-skill-tools">{s.tools}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Manifesto + Footer
// ────────────────────────────────────────────────────────────────



// ────────────────────────────────────────────────────────────────
// Page root
// ────────────────────────────────────────────────────────────────

function HomeApp() {
  const [navOpen, setNavOpen] = React.useState(false);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  React.useEffect(() => {
    const updateNavMode = () => {
      // Logic for layout updates
    };

    updateNavMode();
    window.addEventListener("scroll", updateNavMode, { passive: true });
    return () => window.removeEventListener("scroll", updateNavMode);
  }, []);

  // Hash scroll: sections like #work are rendered by React, so the browser's
  // native scroll-to-hash fires before the target exists (the "Work" nav link
  // didn't scroll on first click). This effect runs after the tree is mounted
  // and on every hashchange, so the first click scrolls reliably.
  React.useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 30) {
          requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
    };

    scrollToHash(); // initial mount (e.g. landing on /#work or after a reload)
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="hm-shell">
      <div className="hm-phone">
        <SharedHeader 
          menuOpen={navOpen} 
          onMenuClick={() => setNavOpen(true)} 
        />

        {/* Shared nav overlay — loaded via nav/nav.jsx */}
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <HmHero />
        <HmTicker />
        <HmReel />
        <HmProjects />
        <HmFeaturedProject />
        <HmExperience />
        <HmSkills />
        <SharedFooter onScrollTop={scrollTop} />
      </div>
    </div>
  );
}

Object.assign(window, { HomeApp });
