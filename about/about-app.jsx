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




const AmArrowUp = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>;


// ────────────────────────────────────────────────────────────────
// Shared sub-components
// ────────────────────────────────────────────────────────────────



function AmSkills() {
  // Skills render as inline tag-meta text (uppercase, tracked, pipe-separated),
  // matching the project-card tag style — not .pk-tag pills.
  return (
    <span className="pk-tag-meta am-skills-meta">{ABOUT.skills.join("  |  ")}</span>);

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
      <span key={c} className="pk-tag">{c}</span>
      )}
    </div>);

}

// ────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────

function AboutPage() {
  const [navOpen, setNavOpen] = React.useState(false);
  return (
    <div className="am-shell">
      <div className="am-phone" data-screen-label="About me">
        <SharedHeader menuOpen={navOpen} onMenuClick={() => setNavOpen(true)} />
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

        <div className="am-fade-grid">
          <FadeCascade>
            <section className="am-intro" data-screen-label="01 Intro">
              <span className="pk-mono">About me</span>
              <h1 className="am-display">Hi, I&rsquo;m Andrii</h1>
            </section>

            <div className="am-portrait square inset"
            style={{ backgroundImage: `url('${PORTRAIT}')` }}
            aria-label="Portrait of Andrii" />

            <section className="am-section am-lead-section" data-screen-label="02 Lead">
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
        </div>

        <section className="am-section" data-screen-label="04 Skills">
          <span className="pk-mono">Skills</span>
          <AmSkills />
        </section>

        <SharedFooter onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
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
