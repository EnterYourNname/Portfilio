const FooterArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="arrow">
    <path d="M5 12h14" stroke="currentColor" />
    <path d="m12 5 7 7-7 7" stroke="currentColor" />
  </svg>
);

const FooterArrowUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

function SharedFooter({ onScrollTop }) {
  const EMAIL = "andrii.b.design@gmail.com";
  return (
    <footer className="pk-footer-bg">
      <div className="pk-manifesto">
        <span className="pk-mono">Manifesto</span>
        <h2>{"Designing with\npurpose, always."}</h2>
      </div>
      <div className="pk-contact">
        <div className="pk-contact-cta-shell">
          <a className="pk-btn" href="contact.html">
            Contact me
            <FooterArrowRight />
          </a>
        </div>
        <div className="pk-email">
          <span className="lbl">or send me an email</span>
          <span className="addr">{EMAIL}</span>
        </div>
      </div>
      <div className="pk-footer-black">
        <button className="pk-link" onClick={onScrollTop}>
          Back to top <FooterArrowUp />
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
          <a href="index.html">Home</a>
          <a href="index.html#work">Work</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </nav>
        <nav className="pk-footer-legal">
          <a href="impressum.html">Impressum</a>
          <a href="privacy.html">Privacy policy</a>
          <button
            className="pk-footer-cookie-btn"
            onClick={() => {
              localStorage.removeItem('cookie-consent');
              window.dispatchEvent(new Event('cookie-consent-change'));
            }}
          >
            Cookie settings
          </button>
        </nav>
      </div>
    </footer>
  );
}

Object.assign(window, { SharedFooter });
