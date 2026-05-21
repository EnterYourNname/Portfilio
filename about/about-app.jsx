// About Me — standalone mobile page (393px), based on the "data-first"
// direction. Reuses tokens from colors_and_type.css and components from
// portfolio.css; .am-* classes live in about/about.css.

// ────────────────────────────────────────────────────────────────
// Content
// ────────────────────────────────────────────────────────────────

const ABOUT = {
  name: "Andrii",
  location: "Stuttgart, DE",
  yearsXp: "7 years",
  nowRole: "Visual Designer",
  nowPlace: "Neuffer",
  langs: "English · Ukrainian · German",
  available: "Open to freelance",

  bio: [
  "For seven years I've been telling stories with pixels. Print, brand systems, websites, 3D worlds — the medium shifts; the curiosity doesn't.",
  "Right now I'm a visual designer at Neuffer in Stuttgart, with freelance 3D and AI work on the side. I believe good design comes from caring about the small stuff: hierarchy, type, the way a render feels in the right light.",
  "Outside of work I'm usually on a trail, in the mountains, or at the climbing gym."],


  skills: [
  "UI/UX Design",
  "3D Design",
  "Graphic Design",
  "Website Design",
  "Arch-Vis."],


  experience: [
  { role: "Visual Designer", place: "Neuffer GmbH & Co. KG", dates: "05.26 - present" },
  { role: "Freelance 3D & UI/UX Designer", place: "Freelance", dates: "03.25 - 04.26" },
  { role: "Communication Designer", place: "UP Designstudio", dates: "Mar 2023 - Sep 2024" },
  { role: "3D & Interior Designer", place: "Spotless Agency", dates: "Dec 2018 - Mar 2023" },
  { role: "Product Designer", place: "Merx", dates: "Dec 2018 - Nov 2019" }],


  interests: [
  { icon: "design-system/assets/icons/mountain-snow-dark.svg", name: "Snowboarding" },
  { icon: "design-system/assets/icons/tent-tree-dark.svg", name: "Hiking & camping" },
  { icon: "design-system/assets/icons/camera-dark.svg", name: "Bouldering" }],


  interestChips: ["Travel", "Hiking", "Bouldering", "Snowboarding"]
};

const PORTRAIT = "design-system/assets/portrait-andrew.jpg";

// ────────────────────────────────────────────────────────────────
// Tiny inline icons
// ────────────────────────────────────────────────────────────────

const AmMenuIcon = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="#FFF5E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>;

const AmArrowRight = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>;

const AmArrowUp = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>;


// ────────────────────────────────────────────────────────────────
// Shared sub-components
// ────────────────────────────────────────────────────────────────

function AmHeader({ onMenuClick, menuOpen }) {
  return (
    <header className="am-header">
      <div className="am-avatar" aria-label="Andrii B." />
      <button className="am-menu-btn" type="button" aria-label="Open menu" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={onMenuClick}><AmMenuIcon /></button>
    </header>);

}

function AmSkillChips() {
  return (
    <div className="am-skill-chips">
      {ABOUT.skills.map((s) => <span key={s} className="am-skill-chip" style={{ backgroundColor: "rgb(0, 0, 0)", color: "rgb(255, 255, 255)", height: "40px" }}>{s}</span>)}
    </div>);

}

function AmExperienceList() {
  return (
    <div className="am-xp-list">
      {ABOUT.experience.map((x, i) =>
      <div className="am-xp" key={i}>
          <div className="am-xp-role">{x.role}</div>
          <div className="am-xp-meta"><span>{x.place}</span><span>{x.dates}</span></div>
        </div>
      )}
    </div>);

}

function AmBeyondChips() {
  return (
    <div className="am-beyond-chips">
      {ABOUT.interestChips.map((c) =>
      <span key={c} className="am-chip">{c}</span>
      )}
    </div>);

}

function AmManifestoFooter() {
  return (
    <footer className="pk-footer-bg" style={{ marginTop: 0 }}>
      <div className="pk-manifesto">
        <span className="pk-mono">Manifesto</span>
        <h2>{"Designing with\npurpose, always."}</h2>
      </div>
      <div className="pk-contact">
        <div className="pk-contact-cta-shell">
          <button className="pk-btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              Contact me
              <AmArrowRight />
            </span>
          </button>
        </div>
        <div className="pk-email">
          <span className="lbl">or send me an email</span>
          <span className="addr">andrii.b.design@gmail.com</span>
        </div>
      </div>
      <div className="pk-footer-black">
        <button className="pk-link" style={{ color: "var(--cream)" }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <AmArrowUp /></button>
        <div className="pk-contact-row">
          <span className="lbl">Get in contact</span>
          <a className="pk-social-link" href="https://www.behance.net/artandrewkim" aria-label="Behance" target="_blank" rel="noopener">
            <img src="design-system/assets/icons/behance.svg" alt="" width="32" height="32" />
          </a>
          <a className="pk-social-link" href="https://www.linkedin.com/in/andrii-b-ui-ux/" aria-label="LinkedIn" target="_blank" rel="noopener">
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
    </footer>);

}

// ────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────

function AboutPage() {
  const [navOpen, setNavOpen] = React.useState(false);
  return (
    <div className="am-shell">
      <div className="am-phone" data-screen-label="About me">
        <AmHeader menuOpen={navOpen} onMenuClick={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

        <FadeCascade>
          <section className="am-intro" style={{ paddingBottom: 16 }} data-screen-label="01 Intro">
            <span className="pk-mono">About me</span>
            <h1 className="am-display" style={{ fontSize: 42 }}>Hi, I&rsquo;m Andrii</h1>
          </section>

          <div className="am-portrait square inset"
          style={{ backgroundImage: `url('${PORTRAIT}')` }}
          aria-label="Portrait of Andrii" />

          <section className="am-section" style={{ paddingTop: 32, paddingBottom: 8 }} data-screen-label="02 Lead">
            <p className="am-lead">Visual storyteller from Stuttgart. Seven years across UI/UX, 3D, and interior design - with one eye on what AI does to craft.
            </p>
          </section>

          <div className="am-meta" data-screen-label="03 Meta">
            <div className="am-meta-row"><span className="lbl">Location</span><span className="val">{ABOUT.location}</span></div>
            <div className="am-meta-row"><span className="lbl">Now</span><span className="val">{ABOUT.nowRole} · {ABOUT.nowPlace}</span></div>
            <div className="am-meta-row"><span className="lbl">Experience</span><span className="val">{ABOUT.yearsXp}</span></div>
            <div className="am-meta-row"><span className="lbl">Languages</span><span className="val">{ABOUT.langs}</span></div>
            <div className="am-meta-row"><span className="lbl">Available</span><span className="val">{ABOUT.available}</span></div>
          </div>
        </FadeCascade>

        <section className="am-section" data-screen-label="04 Skills">
          <span className="pk-mono">Skills</span>
          <AmSkillChips />
        </section>

        <AmManifestoFooter />
      </div>
    </div>);

}

// Social link styles (shared with the case-study page)
const __amSocialStyle = document.createElement('style');
__amSocialStyle.textContent = `
  .pk-social-link { display:inline-flex; width:32px; height:32px; line-height:0; cursor:pointer; transition: transform 200ms cubic-bezier(0.22,1,0.36,1); }
  .pk-social-link:hover { transform: scale(1.08); }
  .pk-social-link img { width:32px; height:32px; display:block; }
`;
document.head.appendChild(__amSocialStyle);

Object.assign(window, { AboutPage });
