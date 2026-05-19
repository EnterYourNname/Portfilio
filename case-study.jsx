const PROJECTS = window.PORTFOLIO_PROJECTS || [];

const ArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const ArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>
);

const MenuIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="#FFF5E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const ArrowUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

function currentProject() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("project");
  return PROJECTS.find(project => project.id === id) || PROJECTS[0];
}

function projectIndex(project) {
  return Math.max(0, PROJECTS.findIndex(item => item.id === project.id));
}

function splitTitle(title) {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  const midpoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midpoint).join(" "),
    words.slice(midpoint).join(" "),
  ];
}

function parseMarkdown(body) {
  const lines = body.split("\n");
  const sections = [];
  let current = { title: "Overview", lines: [] };

  lines.forEach((line) => {
    if (line.startsWith("# ")) return;
    if (line.startsWith("## ")) {
      if (current.lines.join("").trim()) sections.push(current);
      current = { title: line.replace(/^##\s+/, "").trim(), lines: [] };
      return;
    }
    current.lines.push(line);
  });

  if (current.lines.join("").trim()) sections.push(current);
  return sections;
}

function MarkdownSection({ section }) {
  const blocks = [];
  let list = [];

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul className="cs-list" key={`list-${blocks.length}`}>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
    list = [];
  };

  section.lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }
    flushList();
    blocks.push(<p key={`p-${index}`}>{line}</p>);
  });
  flushList();

  return (
    <section className="cs-section">
      <span className="pk-mono">{section.title}</span>
      <div className="cs-copy">{blocks}</div>
    </section>
  );
}

function CsHeader({ onMenuClick }) {
  return (
    <header className="pk-header">
      <div className="pk-avatar" aria-label="Andrii B." />
      <button className="pk-menu-btn" aria-label="Open menu" onClick={onMenuClick}>
        <MenuIcon />
      </button>
    </header>
  );
}

function Toolbar({ project }) {
  const index = projectIndex(project) + 1;
  const total = PROJECTS.length;
  return (
    <div className="cs-toolbar">
      <button className="cs-back" type="button" onClick={() => location.href = "index.html#work"}>
        <ArrowLeft />
        <span className="cs-back-label">Projects</span>
      </button>
      <span className="cs-counter">{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
  );
}

function HeroBlock({ project }) {
  return (
    <>
      <div className="cs-hero" data-screen-label="01 Hero">
        <div className="cs-eyebrow-row">
          <span className="pk-mono">{project.tags.join(" | ")}</span>
        </div>
        <h1 className="cs-title">
          {splitTitle(project.title).map(line => <span key={line}>{line}</span>)}
        </h1>
      </div>
      <div
        className="cs-hero-img"
        role="img"
        aria-label={`${project.title} hero image`}
        style={{ backgroundImage: `url('${project.hero || project.cover}')` }}
      />
    </>
  );
}

function MetaBlock({ project }) {
  const rows = [
    ["Industry", project.industry],
    ["Role", project.role],
    ["Tools", project.tools],
  ];

  return (
    <div className="cs-meta" data-screen-label="02 Meta">
      {rows.map(([label, value]) => (
        <div className="cs-meta-row" key={label}>
          <span className="cs-meta-label">{label}</span>
          <span className="cs-meta-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Gallery({ project }) {
  const items = project.gallery || [];
  if (!items.length) return null;

  return (
    <section data-screen-label="03 Gallery">
      <div className="cs-section" style={{ paddingBottom: 24 }}>
        <div className="cs-gallery-head">
          <span className="pk-mono">Gallery</span>
          <span className="pk-mono">{String(items.length).padStart(2, "0")} images</span>
        </div>
      </div>
      <div className="cs-gallery">
        {items.map((src, index) => (
          <div className="cs-gal-item" key={src}>
            <div className="cs-gal-figure wide" style={{ backgroundImage: `url('${src}')` }} />
            <div className="cs-gal-caption">
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <span className="lbl">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NextProject({ project }) {
  if (!PROJECTS.length) return null;
  const next = PROJECTS[(projectIndex(project) + 1) % PROJECTS.length];
  return (
    <section className="cs-next">
      <div className="cs-next-head">
        <span className="pk-mono">Next project</span>
      </div>
      <a className="cs-next-card" href={next.href}>
        <span className="img" style={{ backgroundImage: `url('${next.cover}')` }} />
        <span className="meta">
          <span className="sub">{next.meta}</span>
          <span className="title">{next.title}</span>
        </span>
      </a>
    </section>
  );
}

function Manifesto() {
  return (
    <div className="pk-manifesto">
      <span className="pk-mono">Manifesto</span>
      <h2>{"Designing with\npurpose, always."}</h2>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="pk-contact">
      <div className="pk-contact-cta-shell">
        <a className="pk-btn" href="contact.html">
          Contact me
          <ArrowRight />
        </a>
      </div>
      <div className="pk-email">
        <span className="lbl">or send me an email</span>
        <span className="addr">andrii.b.design@gmail.com</span>
      </div>
    </div>
  );
}

function FooterBlack({ onBackTop }) {
  return (
    <div className="pk-footer-black">
      <button className="pk-btn tertiary on-dark" onClick={onBackTop}>
        Back to top
        <ArrowUp />
      </button>
      <div className="pk-contact-row">
        <span className="lbl">Get in contact</span>
        <a className="pk-social-link" href="https://behance.net" aria-label="Behance" target="_blank" rel="noopener">
          <img src="design-system/assets/icons/behance.svg" alt="" width="32" height="32" />
        </a>
        <a className="pk-social-link" href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener">
          <img src="design-system/assets/icons/linkedin.svg" alt="" width="32" height="32" />
        </a>
      </div>
      <nav className="pk-footer-nav">
        <a href="index.html" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
        <a href="index.html#work" style={{ color: "inherit", textDecoration: "none" }}>Work</a>
        <a href="about.html" style={{ color: "inherit", textDecoration: "none" }}>About</a>
        <a href="contact.html" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
      </nav>
    </div>
  );
}

function FooterSection({ onBackTop }) {
  return (
    <footer className="pk-footer-bg">
      <Manifesto />
      <ContactBlock />
      <FooterBlack onBackTop={onBackTop} />
    </footer>
  );
}

function useReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = document.scrollingElement || document.documentElement;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function Progress() {
  const progress = useReadingProgress();
  return (
    <div className="cs-progress" aria-hidden="true">
      <div className="bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

function CaseStudyApp() {
  const [navOpen, setNavOpen] = React.useState(false);
  const project = currentProject();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  React.useEffect(() => {
    if (project) document.title = `${project.title} | Andrii B.`;
  }, [project]);

  if (!project) {
    return (
      <div className="app-shell">
        <div className="phone">
          <section className="cs-section">
            <h1 className="cs-title">Project not found</h1>
            <a className="pk-btn" href="index.html#work">Back to projects</a>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="phone" data-screen-label={`Project | ${project.title}`}>
        <Progress />
        <CsHeader onMenuClick={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <Toolbar project={project} />
        <HeroBlock project={project} />
        <MetaBlock project={project} />
        {parseMarkdown(project.body).map(section => (
          <MarkdownSection key={section.title} section={section} />
        ))}
        <Gallery project={project} />
        <NextProject project={project} />
        <FooterSection onBackTop={scrollTop} />
      </div>
    </div>
  );
}

Object.assign(window, { CaseStudyApp });
