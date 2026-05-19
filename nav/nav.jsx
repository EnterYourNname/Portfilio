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

  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );

  function NavOverlay({ open, onClose }) {
    React.useEffect(() => {
      document.body.style.overflow = open ? "hidden" : "";
      return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const curr = window.location.pathname.split("/").pop() || "index.html";

    return (
      <div className="nav-overlay" onClick={onClose}>
        <div className="nav-drawer" onClick={e => e.stopPropagation()}>
          <div className="nav-head">
            <div className="nav-avatar" />
            <button className="nav-close" onClick={onClose} aria-label="Close menu">
              <XIcon />
            </button>
          </div>
          <nav className="nav-links">
            {PAGES.map(p => (
              <a
                key={p.href}
                href={p.href}
                className={"nav-link" + (curr === p.href ? " is-current" : "")}
              >
                {p.label}
              </a>
            ))}
          </nav>
          <span className="nav-tagline">Designing with purpose, always.</span>
        </div>
      </div>
    );
  }

  Object.assign(window, { NavOverlay });
})();
