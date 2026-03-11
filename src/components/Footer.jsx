import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--black)', color: 'var(--cream)', padding: 'var(--s8) 0', marginTop: 'var(--s10)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s7)' }}>
          
          {/* Logo Section */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ color: 'var(--yellow)', fontSize: '40px', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>CHOMPO</h2>
          </Link>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 'var(--s5)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['HOME', 'ABOUT', 'DEALS', 'MENUS', 'CONTACT'].map(label => (
              <Link 
                key={label} 
                to={label === 'HOME' ? '/' : `/${label.toLowerCase()}`}
                style={{ color: 'var(--cream)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, letterSpacing: '1px' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 'var(--s4)' }}>
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <button key={i} className="brutalist-button" style={{ padding: 'var(--s3)', minHeight: 'auto', background: 'var(--yellow)', color: 'var(--black)' }}>
                <Icon size={20} />
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center', borderTop: '1px solid var(--gray-muted)', width: '100%', paddingTop: 'var(--s6)' }}>
            <p style={{ color: 'var(--gray-muted)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
              © 2026 CHOMPO. All rights reserved. • CRUNCH RESPONSIBLY.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
