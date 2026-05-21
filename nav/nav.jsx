// Shared navigation overlay — exposes window.NavOverlay
(function () {
  // Main website nav per CLAUDE.md: only Home, Work, About, Contact.
  // "Work" anchors to the projects section on the home page; project
  // detail pages are opened by clicking project cards, not from nav.
  const PAGES = [
    { label: "Home",    href: "index.html" },
    { label: "Work",    href: "index.html#work" },
    { label: "About",   href: "about.html" },
    { label: "Contact", href: "contact.html" },
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

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash;
    const isCurrentPage = (page) => {
      const [pagePath, pageHash = ""] = page.href.split("#");
      const hash = pageHash ? `#${pageHash}` : "";
      const isProjectDetail = currentPath === "case-study.html" && page.href === "index.html#work";

      if (isProjectDetail) return true;

      if (hash) {
        return currentPath === pagePath && currentHash === hash;
      }

      return currentPath === pagePath && !currentHash;
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
          </nav>
          <span className="nav-tagline">Designing with purpose, always.</span>
        </div>
      </div>
    );
  }

  Object.assign(window, { NavOverlay });
})();
