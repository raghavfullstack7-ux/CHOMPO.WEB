const Footer = () => {
  return (
    <footer className="brutalist-border" style={{ backgroundColor: 'var(--text-color)', color: 'white', padding: '3rem 0', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h2 style={{ color: 'var(--accent-color)' }}>CHOMPO</h2>
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Brutalist flavors. No compromise.</p>
          </div>
          <div>
            <h3 className="heading">Hours</h3>
            <p>Mon-Fri: 11am - 10pm</p>
            <p>Sat-Sun: 12pm - 11pm</p>
          </div>
          <div>
            <h3 className="heading">Contact</h3>
            <p>123 Brutal Way</p>
            <p>Flavor City, FC 404</p>
            <p>hello@chompo.com</p>
          </div>
        </div>
        <div style={{ marginTop: '3rem', borderTop: '1px solid #444', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p className="heading" style={{ fontSize: '0.8rem' }}>© 2026 CHOMPO RESTAURANT GROUP. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
