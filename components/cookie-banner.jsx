function CookieBanner() {
  const [consent, setConsent] = React.useState(() => localStorage.getItem('cookie-consent'));
  const [showSettings, setShowSettings] = React.useState(false);
  const [videoEnabled, setVideoEnabled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      setConsent(localStorage.getItem('cookie-consent'));
      setShowSettings(false);
    };
    window.addEventListener('cookie-consent-change', handler);
    return () => window.removeEventListener('cookie-consent-change', handler);
  }, []);

  if (consent !== null) return null;

  const handleConsent = (value) => {
    localStorage.setItem('cookie-consent', value);
    setConsent(value);
    window.dispatchEvent(new Event('cookie-consent-change'));
  };

  if (showSettings) {
    return (
      <div className="ck-banner ck-banner--expanded" role="dialog" aria-label="Cookie settings">
        <div className="ck-inner ck-inner--settings">
          <div className="ck-settings-header">
            <button className="ck-back-btn" onClick={() => setShowSettings(false)}>← Back</button>
          </div>

          <div className="ck-category">
            <div className="ck-category-row">
              <div>
                <span className="ck-category-name">Essential</span>
                <p className="ck-category-desc">Required for the site to function (consent storage). Cannot be disabled.</p>
              </div>
              <span className="ck-always-on">Always on</span>
            </div>
          </div>

          <div className="ck-category">
            <div className="ck-category-row">
              <div>
                <span className="ck-category-name">Video embeds</span>
                <p className="ck-category-desc">Allows playback of embedded Vimeo videos. Vimeo may set cookies when the player loads.</p>
              </div>
              <button
                className={`ck-toggle${videoEnabled ? ' ck-toggle--on' : ''}`}
                onClick={() => setVideoEnabled(v => !v)}
                aria-pressed={videoEnabled}
                aria-label="Video embeds"
              >
                <span className="ck-toggle-thumb" />
              </button>
            </div>
          </div>

          <div className="ck-settings-actions">
            <button className="ck-btn-decline" onClick={() => handleConsent('declined')}>Decline all</button>
            <button className="ck-btn-accept" onClick={() => handleConsent(videoEnabled ? 'accepted' : 'declined')}>Save selection</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ck-banner" role="dialog" aria-label="Cookie consent">
      <div className="ck-inner">
        <p className="ck-text">
          This site uses cookies for embedded video (Vimeo). No analytics or tracking.{' '}
          <a href="privacy.html" className="ck-policy-link">Privacy policy</a>
        </p>
        <div className="ck-actions">
          <button className="ck-btn-decline" onClick={() => handleConsent('declined')}>Decline all</button>
          <button className="ck-btn-settings" onClick={() => setShowSettings(true)}>Cookie settings</button>
          <button className="ck-btn-accept" onClick={() => handleConsent('accepted')}>Accept all</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CookieBanner });
