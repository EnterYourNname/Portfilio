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
  const normPath = path.replace(/\/$/, "") || "/";
  const isHome = normPath === "/" || normPath.endsWith("/index");
  const isAbout = normPath.endsWith("/about");
  const isContact = normPath.endsWith("/contact");

  return (
    <React.Fragment>
      <div className="pk-avatar pk-site-avatar" aria-label="Andrii B." />
      <header className={`pk-header${compact ? " is-compact" : ""}`}>
        <nav className="pk-desktop-nav" aria-label="Primary navigation">
          <a href="/" aria-current={isHome && hash !== "#work" ? "page" : undefined}>Home</a>
          <a href="/#work" aria-current={isHome && hash === "#work" ? "page" : undefined}>Work</a>
          <a href="/about" aria-current={isAbout ? "page" : undefined}>About</a>
          <a href="/contact" aria-current={isContact ? "page" : undefined}>Contact</a>
          {/* CV button — hidden behind window.CV_ENABLED (set in nav.jsx) until
              the CV PDF is added. Flip that flag to true to show it. */}
          {window.CV_ENABLED && (
          <a className="pk-nav-cv" href="design-system/assets/andrii-borysov-cv.pdf"
             target="_blank" rel="noopener" aria-label="Open CV (PDF, opens in a new tab)">
            CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6" /><path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
          )}
        </nav>
        <button className="pk-menu-btn" type="button" aria-label="Open menu" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={onMenuClick}>
          <PkMenuIcon />
        </button>
      </header>
    </React.Fragment>
  );
}

Object.assign(window, { SharedHeader });
