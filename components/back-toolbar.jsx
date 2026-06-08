// Shared back toolbar — used on every page except Home (case-study, About,
// Contact). Exposes window.BackToolbar. Styling lives in portfolio.css
// (.pk-toolbar / .pk-back / .pk-counter); each page supplies its own gutters.
//
// Props:
//   label   — back-link text (default "Back")
//   href    — destination (default "/"); case-study passes "/#work"
//   counter — optional right-side text (e.g. "03 / 08"); omitted when absent
function BackToolbar({ label = "Back", href = "/", counter }) {
  const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
  return (
    <div className="pk-toolbar">
      <a className="pk-back" href={href}>
        <ArrowLeft />
        <span className="pk-back-label">{label}</span>
      </a>
      {counter ? <span className="pk-counter">{counter}</span> : null}
    </div>
  );
}

Object.assign(window, { BackToolbar });
