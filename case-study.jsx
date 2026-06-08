const PROJECTS = window.PORTFOLIO_PROJECTS || [];

// (Back arrow now lives in the shared BackToolbar component.)

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

// Split gallery into early (before text) and late (after text) groups.
// ≤3 images  → no split, all go at the end.
// 4–8 images → last 3 always at end; rest go early.
// >8 images  → equal halves (ceiling in early, floor in late).
function galleryGroups(images) {
  const total = images.length;
  if (total <= 3) return { early: [], late: images };
  if (total <= 8) return { early: images.slice(0, total - 3), late: images.slice(total - 3) };
  const mid = Math.ceil(total / 2);
  return { early: images.slice(0, mid), late: images.slice(mid) };
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



function Toolbar({ project }) {
  const index = projectIndex(project) + 1;
  const total = PROJECTS.length;
  const counter = `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  // Shared toolbar (window.BackToolbar). Case-study keeps the "Projects" label
  // (back to the work list) and the NN / 08 counter.
  return <BackToolbar label="Projects" href="/#work" counter={counter} />;
}

function HeroBlock({ project, onOpen }) {
  const [ratioClass, setRatioClass] = React.useState("auto");
  const heroSrc = project.hero || project.cover;

  React.useEffect(() => {
    if (!heroSrc) return;
    const image = new Image();
    image.onload = () => {
      const ratio = image.naturalWidth / image.naturalHeight;
      if (ratio >= 1.45) setRatioClass("wide");
      else if (ratio <= 0.82) setRatioClass("portrait");
      else setRatioClass("square");
    };
    image.src = heroSrc;
  }, [heroSrc]);

  return (
    <>
      <div className="cs-hero" data-screen-label="01 Hero">
        <FadeCascade>
          <div className="cs-eyebrow-row">
            <span className="pk-mono">{project.tags.join(" | ")}</span>
          </div>
          <h1 className="cs-title">
            {splitTitle(project.title).map(line => <span key={line}>{line}</span>)}
          </h1>
        </FadeCascade>
      </div>
      <div
        className={`cs-hero-img ${ratioClass} cs-zoomable`}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} hero image full size`}
        style={{ backgroundImage: `url('${heroSrc}')` }}
        onClick={() => onOpen(heroSrc)}
        onKeyDown={e => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onOpen(heroSrc);
        }}
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

// Early images block — no header, sits between Meta and body text.
function GalleryEarly({ items, startIndex, project, onOpen }) {
  if (!items.length) return null;
  const showCaptions = project.showGalleryCaptions === true;
  return (
    <div className="cs-gallery cs-gallery-early">
      {items.map((src, i) => (
        <GalleryItem
          key={src}
          src={src}
          number={String(startIndex + i + 1).padStart(2, "0")}
          label={`${project.title} image ${startIndex + i + 1}`}
          onOpen={onOpen}
          showCaption={showCaptions}
        />
      ))}
    </div>
  );
}

// Main gallery block — shows header with total image count.
function Gallery({ project, items, totalCount, startIndex, onOpen }) {
  if (!items || !items.length) return null;
  const total = totalCount || items.length;
  const showCaptions = project.showGalleryCaptions === true;
  return (
    <section className="cs-gallery-section" data-screen-label="03 Gallery">
      <div className="cs-section">
        <div className="cs-gallery-head">
          <span className="pk-mono">Gallery</span>
          <span className="pk-mono">{String(total).padStart(2, "0")} images</span>
        </div>
      </div>
      <div className="cs-gallery">
        {items.map((src, i) => (
          <GalleryItem
            key={src}
            src={src}
            number={String((startIndex || 0) + i + 1).padStart(2, "0")}
            label={`${project.title} image ${(startIndex || 0) + i + 1}`}
            onOpen={onOpen}
            showCaption={showCaptions}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ src, number, label, onOpen, showCaption }) {
  const [ratioClass, setRatioClass] = React.useState("auto");

  React.useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const ratio = image.naturalWidth / image.naturalHeight;
      if (ratio >= 1.45) {
        setRatioClass("wide");
      } else if (ratio <= 0.82) {
        setRatioClass("portrait");
      } else {
        setRatioClass("square");
      }
    };
    image.src = src;
  }, [src]);

  return (
    <div className="cs-gal-item">
      <div
        className={`cs-gal-figure ${ratioClass} cs-zoomable`}
        style={{ backgroundImage: `url('${src}')` }}
        role="button"
        tabIndex={0}
        aria-label={`View ${label} full size`}
        onClick={() => onOpen(src)}
        onKeyDown={e => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onOpen(src);
        }}
      />
      <div className={`cs-gal-caption${showCaption ? " is-visible" : ""}`}>
        <span className="num">{number}</span>
        <span className="lbl">{label}</span>
      </div>
    </div>
  );
}

function Lightbox({ src, onClose }) {
  React.useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="cs-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Full image">
      <button className="cs-lightbox-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>
      <img
        className="cs-lightbox-img"
        src={src}
        alt=""
        onClick={onClose}
      />
    </div>
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
  const [lightboxSrc, setLightboxSrc] = React.useState(null);
  const project = currentProject();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  React.useEffect(() => {
    if (project) document.title = `${project.title} | Andrii Borysov`;
  }, [project]);

  if (!project) {
    return (
      <div className="app-shell">
        <div className="phone">
          <section className="cs-section">
            <h1 className="cs-title">Project not found</h1>
            <a className="pk-btn" href="/#work">Back to projects</a>
          </section>
        </div>
      </div>
    );
  }

  const allImages = project.gallery || [];
  const { early, late } = galleryGroups(allImages);
  const sections = parseMarkdown(project.body);
  const [firstSection, ...restSections] = sections;

  return (
    <div className="app-shell">
      <div className="phone" data-screen-label={`Project | ${project.title}`}>
        <Progress />
        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
        <SharedHeader menuOpen={navOpen} onMenuClick={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <Toolbar project={project} />
        <HeroBlock project={project} onOpen={setLightboxSrc} />
        <MetaBlock project={project} />
        {firstSection && <MarkdownSection key={firstSection.title} section={firstSection} />}
        {early.length > 0 && (
          <GalleryEarly
            items={early}
            startIndex={0}
            project={project}
            onOpen={setLightboxSrc}
          />
        )}
        {restSections.map(section => (
          <MarkdownSection key={section.title} section={section} />
        ))}
        <Gallery
          project={project}
          items={late}
          totalCount={allImages.length}
          startIndex={early.length}
          onOpen={setLightboxSrc}
        />
        <NextProject project={project} />
        <SharedFooter onScrollTop={scrollTop} />
      </div>
    </div>
  );
}

Object.assign(window, { CaseStudyApp });
