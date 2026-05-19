// Contact page — mobile (393px), form-only, centered.
// "Say [avatar] Hello" headline, four fields, success state.

const AVATAR = "design-system/assets/avatar.jpg";
const EMAIL = "andrii.b.design@gmail.com";

// ────────────────────────────────────────────────────────────────
// Icons
// ────────────────────────────────────────────────────────────────

const CtMenuIcon = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="#FFF5E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>;

const CtArrowLeft = ({ size = 16 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>;

const CtArrowRight = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>;

const CtArrowUp = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>;

const CtCheck = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>;


const StarIcon = ({ size = 56 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3 C 12 8.5, 8.5 12, 3 12 C 8.5 12, 12 15.5, 12 21 C 12 15.5, 15.5 12, 21 12 C 15.5 12, 12 8.5, 12 3 Z"
          stroke="currentColor" strokeWidth="1.6"
          strokeLinejoin="round" strokeLinecap="round" />
  </svg>;


// ────────────────────────────────────────────────────────────────
// Header
// ────────────────────────────────────────────────────────────────

function CtHeader({ onMenuClick }) {
  return (
    <header className="pk-header" style={{ position: "static" }}>
      <div className="pk-avatar" aria-label="Andrii B." />
      <button className="pk-menu-btn" aria-label="Open menu" onClick={onMenuClick}><CtMenuIcon /></button>
    </header>);

}

function CtToolbar() {
  return (
    <div className="ct-toolbar">
      <button className="ct-back" onClick={() => history.back()}>
        <CtArrowLeft />
        <span className="lbl">Back</span>
      </button>
      <span className="ct-counter">Contact</span>
    </div>);

}

// ────────────────────────────────────────────────────────────────
// Form
// ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm({ onSent }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please add your name.";
    if (!email.trim()) e.email = "Email is required.";else
    if (!EMAIL_RE.test(email)) e.email = "That doesn't look like a valid email.";
    if (!message.trim()) e.message = "A short note helps me reply faster.";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      onSent({ name, email, phone, message });
    }
  };

  // Clear an individual field's error as the user types
  const clearError = (key) => {
    if (errors[key]) setErrors((prev) => {
      const next = { ...prev };delete next[key];return next;
    });
  };

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate style={{ padding: "32px 16px" }}>
      {/* Full name */}
      <div className="ct-field">
        <label className="ct-label" htmlFor="ct-name">
          Full name<span className="req">*</span>
        </label>
        <input
          id="ct-name" type="text" autoComplete="name"
          className={"ct-input" + (errors.name ? " is-error" : "")}
          placeholder="Andrii Borysov"
          value={name}
          onChange={(e) => {setName(e.target.value);clearError("name");}} />
        
        {errors.name && <span className="ct-error">{errors.name}</span>}
      </div>

      {/* Email */}
      <div className="ct-field">
        <label className="ct-label" htmlFor="ct-email">
          Email<span className="req">*</span>
        </label>
        <input
          id="ct-email" type="email" autoComplete="email" inputMode="email"
          className={"ct-input" + (errors.email ? " is-error" : "")}
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {setEmail(e.target.value);clearError("email");}} />
        
        {errors.email && <span className="ct-error">{errors.email}</span>}
      </div>

      {/* Phone (optional) */}
      <div className="ct-field">
        <label className="ct-label" htmlFor="ct-phone">Phone number</label>
        <div className="ct-phone-row">
          <div className="ct-prefix" aria-label="Country code: Germany">
            <span className="flag" aria-hidden="true" />
            <span>+49</span>
          </div>
          <input
            id="ct-phone" type="tel" autoComplete="tel" inputMode="tel"
            className="ct-input"
            placeholder="151 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
          
        </div>
      </div>

      {/* Message */}
      <div className="ct-field">
        <label className="ct-label" htmlFor="ct-message">
          Message<span className="req">*</span>
        </label>
        <textarea
          id="ct-message" rows={5}
          className={"ct-textarea" + (errors.message ? " is-error" : "")}
          placeholder="Tell me a bit about what you have in mind."
          value={message}
          onChange={(e) => {setMessage(e.target.value);clearError("message");}} />
        
        {errors.message && <span className="ct-error">{errors.message}</span>}
      </div>

      {/* Submit */}
      <button type="submit" className="pk-btn ct-submit">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          Send
          <CtArrowRight />
        </span>
      </button>
    </form>);

}

// ────────────────────────────────────────────────────────────────
// Success state
// ────────────────────────────────────────────────────────────────

function SuccessState({ name, onAgain }) {
  return (
    <section className="ct-success" data-screen-label="04 Sent">
      <span className="checkmark" aria-hidden="true"><CtCheck /></span>
      <span className="pk-mono">Sent</span>
      <h2>{name ? `Thanks, ${name.split(" ")[0]}.` : "Thanks for reaching out."}</h2>
      <p>
        Your note is on its way. I&rsquo;ll get back to you within 24&ndash;48 hours,
        usually sooner. Meanwhile, feel free to dig around the rest of the work.
      </p>
      <button className="ct-again" onClick={onAgain}>Send another message</button>
    </section>);

}

// ────────────────────────────────────────────────────────────────
// Direct contact (email + socials) — sits below the form
// ────────────────────────────────────────────────────────────────

function DirectContact() {
  return (
    <section className="ct-direct" data-screen-label="03 Direct">
      <span className="pk-mono">Or skip the form</span>
      <a className="ct-email-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <div className="ct-socials">
        <a className="ct-social" href="#behance" aria-label="Behance">
          <img src="design-system/assets/icons/behance.svg" alt="" width="40" height="40" />
        </a>
        <a className="ct-social" href="#linkedin" aria-label="LinkedIn">
          <img src="design-system/assets/icons/linkedin.svg" alt="" width="40" height="40" />
        </a>
      </div>
    </section>);

}

// ────────────────────────────────────────────────────────────────
// Manifesto + footer (reused)
// ────────────────────────────────────────────────────────────────

function CtManifestoFooter() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="pk-footer-bg" data-screen-label="05 Manifesto + Footer">
      <div className="pk-manifesto">
        <span className="pk-mono">Manifesto</span>
        <h2>{"Designing with\npurpose, always."}</h2>
      </div>
      <div className="pk-contact">
        <div className="pk-email">
          <span className="lbl">or send me an email</span>
          <span className="addr">{EMAIL}</span>
        </div>
      </div>
      <div className="pk-footer-black">
        <button className="pk-btn tertiary on-dark" onClick={scrollTop}>Back to top <CtArrowUp /></button>
        <div className="pk-contact-row">
          <span className="lbl">Get in contact</span>
          <a className="pk-social-link" href="#behance" aria-label="Behance">
            <img src="design-system/assets/icons/behance.svg" alt="" width="32" height="32" />
          </a>
          <a className="pk-social-link" href="#linkedin" aria-label="LinkedIn">
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

// Social link inline styles (same shape used on other pages)
const __ctSocialStyle = document.createElement('style');
__ctSocialStyle.textContent = `
  .pk-social-link { display:inline-flex; width:32px; height:32px; line-height:0; cursor:pointer; transition: transform 200ms cubic-bezier(0.22,1,0.36,1); }
  .pk-social-link:hover { transform: scale(1.08); }
  .pk-social-link img { width:32px; height:32px; display:block; }
`;
document.head.appendChild(__ctSocialStyle);

// ────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────

function ContactApp() {
  const [sent, setSent] = React.useState(false);
  const [sentBy, setSentBy] = React.useState("");
  const [navOpen, setNavOpen] = React.useState(false);

  const handleSent = ({ name }) => {
    setSentBy(name);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleAgain = () => {
    setSent(false);
    setSentBy("");
  };

  return (
    <div className="ct-shell">
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="ct-phone" data-screen-label="Contact">
        <CtHeader onMenuClick={() => setNavOpen(true)} />
        <CtToolbar />

        <section className="ct-hero" data-screen-label="01 Hero">
          <span className="pk-mono">Contact</span>
          <h1 className="ct-hello">
            <span className="ct-star" aria-hidden="true"><StarIcon /></span>
            <span>Let&rsquo;s Talk!</span>
          </h1>
          <p className="ct-lead">
            Feel free to contact me for collaboration, questions, or just to say hi!
          </p>
        </section>

        {sent ?
        <SuccessState name={sentBy} onAgain={handleAgain} /> :

        <ContactForm onSent={handleSent} />
        }

        <CtManifestoFooter />
      </div>
    </div>);

}

Object.assign(window, { ContactApp });