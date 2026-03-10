import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Utensils, 
  Heart, 
  Truck, 
  CheckCircle,
  Gem
} from 'lucide-react';

const TickerStrip = () => (
  <div className="ticker-marquee">
    <div className="ticker-content">
      {[...Array(10)].map((_, i) => (
        <span key={i}>🍟 CRISPY & FRESH ◆ 🧼 HYGIENIC ENVIRONMENT ◆ ✅ QUALITY INGREDIENTS ◆ ❤️ MADE WITH LOVE ◆ 🏠 HOME DELIVERY ◆ &nbsp;</span>
      ))}
    </div>
  </div>
);

const FeatureIcons = () => {
  const features = [
    { icon: <Flame />, label: 'CRISPY & FRESH' },
    { icon: <ShieldCheck />, label: 'HYGIENIC' },
    { icon: <Gem />, label: 'QUALITY' },
    { icon: <Heart />, label: 'WITH LOVE' },
    { icon: <Truck />, label: 'HOME DELIVERY' },
  ];

  return (
    <section style={{ backgroundColor: 'var(--yellow-pale)', padding: 'var(--s8) 0' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--s5)', 
          flexWrap: 'wrap' 
        }}>
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.08 }}
              className="brutalist-card"
              style={{ 
                width: '180px', 
                textAlign: 'center', 
                padding: 'var(--s5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--s3)',
                backgroundColor: 'white'
              }}
            >
              <div style={{ color: 'var(--black)' }}>
                {f.icon && typeof f.icon === 'object' ? f.icon : null}
                {/* Fallback if icon is just a component */}
                {f.icon.type && <f.icon.type {...f.icon.props} size={48} />}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '12px' }}>{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: 'var(--yellow)', 
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--s8) 0',
        clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Editorial Background layer */}
        <motion.div 
          className="background-text"
          animate={{ x: [-50, 50, -50] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          CHOMPO CHOMPO
        </motion.div>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', 
          gap: 'var(--s8)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5
        }}>
          
          {/* Left: Typography */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title" style={{ color: 'var(--black)', fontSize: 'clamp(64px, 12vw, 140px)', letterSpacing: '-2px' }}>
                DIP<br />
                <span style={{ position: 'relative', color: 'white', WebkitTextStroke: '3px var(--black)' }}>
                  CRUNCH
                  <motion.img 
                    src="/single_fry.png" 
                    alt="" 
                    style={{ 
                      position: 'absolute', top: '0', right: '-60px', 
                      width: '160px', transform: 'rotate(45deg)',
                      pointerEvents: 'none'
                    }}
                    animate={{ y: [0, -15, 0], rotate: [45, 50, 45] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                </span><br />
                SMILE
              </h1>
              
              <p style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '18px', 
                color: 'var(--black)', 
                maxWidth: '400px',
                marginTop: 'var(--s5)',
                fontWeight: 600
              }}>
                CHOMPO is loud, joyful, and unapologetically crunchy. 
                Street food elevated for the bold.
              </p>

              <Link to="/menu" className="brutalist-button" style={{ marginTop: 'var(--s6)', shadow: 'var(--shadow-orange)' }}>
                ORDER NOW <ArrowRight size={24} style={{ marginLeft: '10px' }} />
              </Link>
            </motion.div>
          </div>

          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              style={{ position: 'relative' }}
            >
              <motion.img 
                src="/hero_chips_box.png" 
                alt="CHOMPO Fries" 
                style={{ width: '100%', maxWidth: '700px', filter: 'drop-shadow(30px 30px 0px rgba(0,0,0,0.15))' }}
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />

              {/* Decorative Stickers to fill space */}
              <motion.div 
                className="sticker red"
                style={{ position: 'absolute', top: '10%', right: '-20px' }}
                animate={{ rotate: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                HOT & FRESH
              </motion.div>

              <motion.div 
                className="sticker black"
                style={{ position: 'absolute', bottom: '15%', left: '-40px' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                100% GOLDEN
              </motion.div>

              <div className="sticker" style={{ position: 'absolute', top: '50%', right: '-80px', transform: 'rotate(90deg)' }}>
                STREET BRED
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST TICKER */}
      <TickerStrip />

      {/* SECTION 3: FEATURES */}
      <FeatureIcons />

      {/* SECTION 4: ABOUT HIGHLIGHT */}
      <section style={{ 
        backgroundColor: 'var(--black)', 
        color: 'var(--cream)', 
        padding: 'var(--s9) 0',
        position: 'relative',
        marginTop: '-5vh'
      }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 2fr', 
          gap: 'var(--s8)', 
          alignItems: 'center' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 5 }}
              style={{ fontSize: '120px' }}
            >
              🔥
            </motion.div>
          </div>
          <div>
            <h2 className="section-title" style={{ color: 'var(--yellow)', marginBottom: 'var(--s4)' }}>
              CRAVING CRISIS?
            </h2>
            <p style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '20px', 
              maxWidth: '600px',
              opacity: 0.9
            }}>
              Need help? Whether it's an order issue or just a craving crisis — our crew's got you covered. 
              We don't do boring, we don't do bland, and we definitely don't skip the seasoning.
            </p>
            <Link to="/contact" style={{ 
              display: 'inline-block', 
              marginTop: 'var(--s5)', 
              color: 'var(--yellow)', 
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              borderBottom: '3px solid var(--yellow)'
            }}>
              GET SUPPORT →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: QUICK VIEW MENU CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">CHOOSE YOUR WEAPON</h2>
          <div style={{ marginTop: 'var(--s7)' }}>
             <Link to="/menu" className="brutalist-button accent" style={{ fontSize: '32px', padding: 'var(--s5) var(--s8)' }}>
               BROWSE THE FULL MENU
             </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-title { font-size: 52px !important; }
          section { clip-path: none !important; }
          .container { grid-template-columns: 1fr !important; }
          img { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
