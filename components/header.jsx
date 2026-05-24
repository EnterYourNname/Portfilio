const PkMenuIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7"  x2="20" y2="7"  />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

function SharedHeader({ onMenuClick, menuOpen }) {
  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 50);
      
      const header = document.querySelector('.pk-header');
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      
      const darkSections = document.querySelectorAll('.pk-footer-black, .hm-hero, .surface-dark, .am-experience.paper');
      let isDark = false;
      for (const sec of darkSections) {
        const secRect = sec.getBoundingClientRect();
        if (y >= secRect.top && y <= secRect.bottom) {
          isDark = true;
          break;
        }
      }
      
      if (isDark) {
        header.classList.add('theme-dark-bg');
        header.classList.remove('theme-light-bg');
      } else {
        header.classList.add('theme-light-bg');
        header.classList.remove('theme-dark-bg');
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine which nav link should be active based on current URL
  const path = window.location.pathname;
  const hash = window.location.hash;
  const isHome = path.endsWith("/") || path.endsWith("index.html");
  const isAbout = path.endsWith("about.html");
  const isContact = path.endsWith("contact.html");

  return (
    <React.Fragment>
      <div className="pk-avatar pk-site-avatar" aria-label="Andrii B." />
      <header className={`pk-header${compact ? " is-compact" : ""}`}>
        <nav className="pk-desktop-nav" aria-label="Primary navigation">
          <a href="index.html" aria-current={isHome && hash !== "#work" ? "page" : undefined}>Home</a>
          <a href="index.html#work" aria-current={isHome && hash === "#work" ? "page" : undefined}>Work</a>
          <a href="about.html" aria-current={isAbout ? "page" : undefined}>About</a>
          <a href="contact.html" aria-current={isContact ? "page" : undefined}>Contact</a>
        </nav>
        <button className="pk-menu-btn" type="button" aria-label="Open menu" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={onMenuClick}>
          <PkMenuIcon />
        </button>
      </header>
    </React.Fragment>
  );
}

Object.assign(window, { SharedHeader });
