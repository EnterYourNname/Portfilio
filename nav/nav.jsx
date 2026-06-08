// ─────────────────────────────────────────────────────────────────────────
// CV nav button — feature flag. The CV link is fully built (desktop nav in
// header.jsx, mobile overlay below, styles in portfolio.css/nav.css) but kept
// HIDDEN until the CV PDF exists. TO ENABLE: (1) add the PDF at
// design-system/assets/andrii-borysov-cv.pdf, (2) set this to true, (3) bump
// the nav.jsx + header.jsx cache versions. Read at render time by both navs.
// ─────────────────────────────────────────────────────────────────────────
window.CV_ENABLED = false;

// Shared navigation overlay — exposes window.NavOverlay
(function () {
  // Main website nav per CLAUDE.md: only Home, Work, About, Contact.
  // "Work" anchors to the projects section on the home page; project
  // detail pages are opened by clicking project cards, not from nav.
  const PAGES = [
    { label: "Home",    href: "/" },
    { label: "Work",    href: "/#work" },
    { label: "About",   href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const NAV_ID = "site-navigation";

  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );

  function NavOverlay({ open, onClose }) {
    const closeButtonRef = React.useRef(null);

    React.useEffect(() => {
      document.body.style.overflow = open ? "hidden" : "";
      return () => { document.body.style.overflow = ""; };
    }, [open]);

    React.useEffect(() => {
      if (!open) return undefined;

      const previouslyFocused = document.activeElement;
      const handleKeyDown = (event) => {
        if (event.key === "Escape") onClose();
      };

      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => closeButtonRef.current?.focus());

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus?.();
      };
    }, [open, onClose]);

    if (!open) return null;

    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const currentHash = window.location.hash;
    const isCurrentPage = (page) => {
      const [pagePath, pageHash = ""] = page.href.split("#");
      const hash = pageHash ? `#${pageHash}` : "";
      const normPath = pagePath.replace(/\/$/, "") || "/";
      const isProjectDetail = currentPath.endsWith("/case-study") && page.href === "/#work";

      if (isProjectDetail) return true;

      if (hash) {
        return currentPath === normPath && currentHash === hash;
      }

      return currentPath === normPath && !currentHash;
    };

    return (
      <div className="nav-overlay" onClick={onClose}>
        <div
          className="nav-drawer"
          id={NAV_ID}
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-navigation-title"
          onClick={e => e.stopPropagation()}
        >
          <div className="nav-head">
            <span className="nav-sr-only" id="site-navigation-title">Site navigation</span>
            <div className="nav-avatar" />
            <button ref={closeButtonRef} className="nav-close" type="button" onClick={onClose} aria-label="Close menu">
              <XIcon />
            </button>
          </div>
          <nav className="nav-links">
            {PAGES.map(p => {
              const isCurrent = isCurrentPage(p);
              return (
              <a
                key={p.href}
                href={p.href}
                className={"nav-link" + (isCurrent ? " is-current" : "")}
                aria-current={isCurrent ? "page" : undefined}
                onClick={onClose}
              >
                {p.label}
              </a>
              );
            })}
            {window.CV_ENABLED && (
            <a
              key="cv"
              href="design-system/assets/andrii-borysov-cv.pdf"
              className="nav-link nav-link--cv"
              target="_blank"
              rel="noopener"
              aria-label="Open CV (PDF, opens in a new tab)"
              onClick={onClose}
            >
              CV
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6"/><path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
              </svg>
            </a>
            )}
          </nav>
          <span className="nav-tagline">Designing with purpose, always.</span>
        </div>
      </div>
    );
  }

  Object.assign(window, { NavOverlay });
})();
