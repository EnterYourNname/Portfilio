// Kuckoo Configurator — case study page.
// Continues the V02 mobile frame: 393px canvas, sticky header,
// manifesto + footer reused at the bottom.

const HERO_IMG = "design-system/assets/project-kuckoo.png";
// Hero on THIS page is a Vimeo video (background mode: autoplay, loop, muted,
// no controls). Other project pages keep a still image.
const HERO_VIDEO_ID = "1082557519";

// Gallery: two interior renders stacked, then a wide exterior shot.
const GALLERY = [
{ src: "design-system/assets/kuckoo-interior-day.jpg",
  shape: "wide", num: "01", label: "Interior · daylight" },
{ src: "design-system/assets/kuckoo-interior-night.jpg",
  shape: "wide", num: "02", label: "Interior · night mode" },
{ src: "design-system/assets/kuckoo-exterior.jpg",
  shape: "wide", num: "03", label: "Exterior · mountains" }];


// ──────────────────────────────────────────────────────────────────────────
// Tiny inline icons (kept local to the case-study so it's self-contained)
// ──────────────────────────────────────────────────────────────────────────

const ArrowLeft = ({ size = 16 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>;

const ArrowRight = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>;

const MenuIcon = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="#FFF5E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>;

const ArrowUp = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>;


// ──────────────────────────────────────────────────────────────────────────
// Header (matches the home frame)
// ──────────────────────────────────────────────────────────────────────────

function CsHeader({ onMenuClick }) {
  return (
    <header className="pk-header">
      <div className="pk-avatar" aria-label="Andrii B." />
      <button className="pk-menu-btn" aria-label="Open menu" onClick={onMenuClick}>
        <MenuIcon />
      </button>
    </header>);

}

// ──────────────────────────────────────────────────────────────────────────
// Hero: back link → eyebrow → title → tag pills → image
// ──────────────────────────────────────────────────────────────────────────

function Toolbar() {
  return (
    <div className="cs-toolbar">
      <button className="cs-back" onClick={() => location.href = "index.html"}>
        <ArrowLeft />
        <span className="cs-back-label">Projects</span>
      </button>
      <span className="cs-counter">02 / 12</span>
    </div>);

}

function HeroBlock() {
  return (
    <>
      <div className="cs-hero" data-screen-label="01 Hero">
        <div className="cs-eyebrow-row">
          <span className="pk-mono">Showcase</span>
        </div>
        <h1 className="cs-title">
          <span>Kuckoo</span>
          <span>Configurator</span>
        </h1>
      </div>
      <div className="cs-hero-video" aria-label="Kuckoo configurator hero reel">
        <iframe
          src={`https://player.vimeo.com/video/${HERO_VIDEO_ID}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
          title="Kuckoo configurator hero reel"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen />
        
      </div>
    </>);

}

// ──────────────────────────────────────────────────────────────────────────
// Meta block — industry / role / year / client / tools
// ──────────────────────────────────────────────────────────────────────────

function MetaBlock() {
  const rows = [
  ["Industry", "Travel & Leisure"],
  ["Client", "Kuckoo Camper"],
  ["Role", "3D & UI/UX Design"],
  ["Year", "2024"],
  ["Duration", "4 months"]];

  return (
    <div className="cs-meta" data-screen-label="02 Meta">
      {rows.map(([k, v]) =>
      <div className="cs-meta-row" key={k}>
          <span className="cs-meta-label">{k}</span>
          <span className="cs-meta-value">{v}</span>
        </div>
      )}
    </div>);

}

// ──────────────────────────────────────────────────────────────────────────
// Overview
// ──────────────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <section className="cs-section" data-screen-label="04 Overview" style={{ padding: "48px 16px" }}>
      <span className="pk-mono">My role</span>
      <h2>From blueprints to renders.</h2>
      <div>
        <p>
          I translated manufacturer blueprints and CAD models into accurate
          3D models and materials in Blender.
        </p>
        <p>
          Then built immersive 360° renders with custom, AI-generated HDRI
          backgrounds tuned to the camper&rsquo;s real-world context.
        </p>
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────────────────
// Deliverables — orange-numbered rows, echo of the Skills list
// ──────────────────────────────────────────────────────────────────────────

function Deliverables() {
  const items = [
  "360° interior renders",
  "Custom HDRI background (AI-generated)",
  "3D modeling and rendering of camper components",
  "Material setup and lighting design",
  "Design concept and visual direction"];

  return (
    <section className="cs-section" data-screen-label="05 Deliverables" style={{ padding: "48px 16px" }}>
      <span className="pk-mono">Deliverables</span>
      <h2>What I delivered.</h2>
      <div className="cs-deliverables">
        {items.map((it, i) =>
        <div className="cs-del-row" key={i}>
            <span className="cs-del-num">0{i + 1}</span>
            <span className="cs-del-text">{it}</span>
          </div>
        )}
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────────────────
// Tools — small pills, dot-prefixed
// ──────────────────────────────────────────────────────────────────────────

function Tools() {
  const tools = [
  { name: "Blender", icon: "design-system/assets/icons/tool-blender.svg" },
  { name: "Photoshop", icon: "design-system/assets/icons/tool-photoshop.svg" },
  { name: "Figma", icon: "design-system/assets/icons/tool-figma.svg" },
  { name: "Matterport", icon: "design-system/assets/icons/tool-matterport.svg" }];

  return (
    <section className="cs-section" data-screen-label="07 Tools" style={{ padding: "48px 16px" }}>
      <span className="pk-mono">Tools</span>
      <h2 style={{ fontSize: 28 }}>Tools.</h2>
      <div className="cs-tools">
        {tools.map((t) =>
        <span key={t.name} className="cs-tool">
            <img className="cs-tool-icon" src={t.icon} alt="" />
            {t.name}
          </span>
        )}
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────────────────
// Gallery — mixed rhythm: one full-bleed, a pair, one tall
// ──────────────────────────────────────────────────────────────────────────

function GalFigure({ item }) {
  const cls = "cs-gal-figure " + item.shape + (item.src ? "" : " placeholder");
  const style = item.src ?
  { backgroundImage: `url('${item.src}')` } :
  undefined;
  return (
    <div className={cls} style={style}>
      {!item.src &&
      <div className="ph-inner">
          <span className="ph-mono">Image {item.num}</span>
          <span className="ph-note">Drop the Framer URL into <code>GALLERY[{Number(item.num) - 1}].src</code></span>
        </div>
      }
    </div>);

}

function GalCaption({ num, label }) {
  return (
    <div className="cs-gal-caption">
      <span className="num">{num}</span>
      <span className="lbl">{label}</span>
    </div>);

}

function Gallery() {
  const [a, b, c] = GALLERY;
  return (
    <section data-screen-label="03 Gallery">
      <div className="cs-section" style={{ paddingBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="pk-mono">Gallery</span>
          <span className="pk-mono" style={{ color: "var(--ink-muted)" }}>03 / 03</span>
        </div>
        <h2>Renders.</h2>
      </div>

      <div className="cs-gallery">
        {/* Images 1+2 flush — shared caption below image 2 */}
        <div className="cs-gal-item">
          <GalFigure item={a} />
        </div>
        <div className="cs-gal-item">
          <GalFigure item={b} />
          <GalCaption num={b.num} label="Interior · daylight / night mode" />
        </div>
        <div className="cs-gal-item">
          <GalFigure item={c} />
          <GalCaption num={c.num} label={c.label} />
        </div>
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────────────────
// Disclaimer / collaboration note
// ──────────────────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <section data-screen-label="06 Disclaimer" style={{ padding: "16px 0px" }}>
      <div className="cs-disclaimer">
        <span className="pk-mono">A note on credit</span>
        <p>
          This project was completed in collaboration with the team at <strong>UP Designstudio</strong>.
          Final implementation is owned by Kuckoo Camper and their development partners.
          What you see here is the design and 3D direction I led during the engagement.
        </p>
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────────────────
// Outro + next-project peek
// ──────────────────────────────────────────────────────────────────────────

function Outro() {
  return (
    <section className="cs-outro" data-screen-label="09 Outro" style={{ gap: "32px", padding: "32px 16px" }}>
      <span className="pk-mono">Outro</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: "20px", width: "350px" }}>{"Thank you for\nscrolling 🚀"}</h2>
        <button className="pk-btn tertiary" onClick={() => location.href = "index.html"}>
          Back to projects
        </button>
      </div>
    </section>);

}


// ──────────────────────────────────────────────────────────────────────────
// Manifesto + footer — reproduced inline so the page is self-contained
// (matches portfolio.css selectors)
// ──────────────────────────────────────────────────────────────────────────

function Manifesto() {
  return (
    <div className="pk-manifesto">
      <span className="pk-mono">Manifesto</span>
      <h2>{"Designing with\npurpose, always."}</h2>
    </div>);

}

function ContactBlock() {
  return (
    <div className="pk-contact">
      <div className="pk-contact-cta-shell">
        <button className="pk-btn">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            Contact me
            <ArrowRight />
          </span>
        </button>
      </div>
      <div className="pk-email">
        <span className="lbl">or send me an email</span>
        <span className="addr">andrii.b.design@gmail.com</span>
      </div>
    </div>);

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
        <a className="pk-social-link" href="#behance" aria-label="Behance">
          <img src="design-system/assets/icons/behance.svg" alt="" width="32" height="32" />
        </a>
        <a className="pk-social-link" href="#linkedin" aria-label="LinkedIn">
          <img src="design-system/assets/icons/linkedin.svg" alt="" width="32" height="32" />
        </a>
      </div>
      <div className="pk-more">
        <span className="lbl">More about me</span>
        <div className="icons">
          <img src="design-system/assets/icons/mountain-snow.svg" alt="" />
          <img src="design-system/assets/icons/tent-tree.svg" alt="" />
          <img src="design-system/assets/icons/camera.svg" alt="" />
        </div>
      </div>
      <nav className="pk-footer-nav">
        <a href="index.html" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
        <a href="index.html#work" style={{ color: "inherit", textDecoration: "none" }}>Work</a>
        <a href="about.html" style={{ color: "inherit", textDecoration: "none" }}>About</a>
        <a href="contact.html" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
      </nav>
    </div>);

}

function FooterSection({ onBackTop }) {
  return (
    <footer className="pk-footer-bg" data-screen-label="10 Manifesto + Footer">
      <Manifesto />
      <ContactBlock />
      <FooterBlack onBackTop={onBackTop} />
    </footer>);

}

// ──────────────────────────────────────────────────────────────────────────
// Reading progress bar — quiet orange hairline at top
// ──────────────────────────────────────────────────────────────────────────

function useReadingProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = document.scrollingElement || document.documentElement;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? el.scrollTop / max * 100 : 0;
      setP(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}

function Progress() {
  const p = useReadingProgress();
  return (
    <div className="cs-progress" aria-hidden="true">
      <div className="bar" style={{ width: p + "%" }} />
    </div>);

}

// ──────────────────────────────────────────────────────────────────────────
// Page shell
// ──────────────────────────────────────────────────────────────────────────

function CaseStudyApp() {
  const [navOpen, setNavOpen] = React.useState(false);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="app-shell">
      <div className="phone" data-screen-label="Project · Kuckoo Configurator">
        <Progress />
        <CsHeader onMenuClick={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
        <Toolbar />
        <HeroBlock />
        <MetaBlock />
        <Gallery />
        <Overview />
        <Deliverables />
        <Disclaimer />
        <Tools />
        <Outro />
        <FooterSection onBackTop={scrollTop} />
      </div>
    </div>);

}

Object.assign(window, { CaseStudyApp });