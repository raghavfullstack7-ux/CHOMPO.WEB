import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu as MenuIcon, X, ShieldCheck, Instagram, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'DEALS', path: '/deals' },
    { name: 'MENUS', path: '/menu' },
    { name: 'TESTIMONIAL', path: '/testimonials' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <>
      <nav 
        className="brutalist-border" 
        style={{ 
          backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.9)' : 'var(--black)', 
          height: '64px',
          position: 'sticky', 
          top: 0, 
          zIndex: 1000,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          
          {/* Desktop Left Nav */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 'var(--s6)', flex: 1 }}>
            {leftLinks.map(link => (
              <Link key={link.name} to={link.path} className="nav-link-item">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '28px', 
              color: 'var(--yellow)',
              letterSpacing: '-1px'
            }}>CHOMPO</span>
            <span style={{ fontSize: '24px' }}>🍟</span>
          </Link>

          {/* Desktop Right Nav */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 'var(--s6)', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            {rightLinks.map(link => (
              <Link key={link.name} to={link.path} className="nav-link-item">
                {link.name}
              </Link>
            ))}
            
            <div style={{ display: 'flex', gap: 'var(--s4)', marginLeft: 'var(--s5)', alignItems: 'center' }}>
              <Link to="/cart" style={{ position: 'relative', color: 'var(--cream)' }}>
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="badge" style={{ 
                    position: 'absolute', top: '-8px', right: '-12px', 
                    backgroundColor: 'var(--yellow)', color: 'var(--black)',
                    padding: '1px 5px', border: '1px solid var(--black)',
                    fontSize: '10px', fontWeight: 900
                  }}>{cartItems.length}</span>
                )}
              </Link>
              <Link to={user ? "/profile" : "/login"} style={{ color: 'var(--cream)' }}>
                <User size={20} />
              </Link>
            </div>
          </div>

          {/* Mobile Actions (Visible on Mobile) */}
          <div className="mobile-actions" style={{ display: 'none', gap: 'var(--s4)', alignItems: 'center' }}>
             <Link to="/cart" style={{ position: 'relative', color: 'var(--cream)' }}>
                <ShoppingCart size={22} />
             </Link>
             <button 
              onClick={() => setIsOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--yellow)', cursor: 'pointer', padding: 0 }}
            >
              <MenuIcon size={28} strokeWidth={3} />
            </button>
          </div>
        </div>

        <style>{`
          .nav-link-item {
            font-family: var(--font-body);
            font-size: 13px;
            font-weight: 600;
            color: var(--cream);
            text-decoration: none;
            letter-spacing: 2px;
            text-transform: uppercase;
            position: relative;
            padding: 4px 0;
          }
          .nav-link-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--yellow);
            transition: width 0.3s ease;
          }
          .nav-link-item:hover::after {
            width: 100%;
          }
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .mobile-actions { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(13, 13, 13, 0.98)', zIndex: 2000,
              display: 'flex', flexDirection: 'column', padding: 'var(--s7)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--yellow)', cursor: 'pointer' }}
              >
                <X size={40} />
              </button>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s5)' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    style={{ 
                      fontFamily: 'var(--font-heading)', fontSize: '48px', 
                      color: 'var(--cream)', textDecoration: 'none', textTransform: 'uppercase' 
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--s6)', marginTop: 'auto' }}>
              <Instagram color="var(--yellow)" size={32} />
              <Facebook color="var(--yellow)" size={32} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
