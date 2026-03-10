import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 800], [0, 45]);

  return (
    <section style={{ 
      minHeight: '80vh', 
      position: 'relative', 
      overflow: 'hidden', 
      display: 'flex', 
      alignItems: 'center',
      background: 'white',
      borderBottom: 'var(--border-width) solid var(--text-color)',
      padding: '4rem 0'
    }}>
      {/* Decorative Background Elements - Hidden on very small screens for clarity */}
      <motion.div 
        className="banner-image-container"
        style={{ 
          position: 'absolute', 
          top: '5%', 
          right: '-5%', 
          width: '400px', 
          height: '400px', 
          background: 'var(--accent-color)', 
          border: 'var(--border-width) solid black',
          y: y1,
          rotate: 15,
          zIndex: 0
        }} 
      />

      <div className="container banner-content" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '4rem' }}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="glass" 
            style={{ 
              padding: '0.5rem 1rem', 
              display: 'inline-block', 
              marginBottom: '2.5rem', 
              fontWeight: 900,
              fontSize: '0.9rem',
              backgroundColor: 'var(--primary-color)'
            }}
          >
            ESTABLISHED IN BRUTALITY 2024
          </motion.div>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', marginBottom: '2rem', lineHeight: 0.85 }}>
            FEAST <br />
            <span style={{ color: 'var(--primary-color)' }}>WITHOUT</span><br />
            MERCY.
          </h1>
          <p className="heading" style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '500px', textTransform: 'none', letterSpacing: '0' }}>
            The world's most aggressive restaurant experience. Radical flavors, radical design, zero compromises.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/menu" className="brutalist-button">
              EXPLORE THE VOID <ShoppingBag size={24} />
            </Link>
            <Link to="/about" className="brutalist-button secondary">
              OUR MANIFESTO <ArrowRight size={24} />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <motion.div
            style={{ 
              rotate,
              width: '100%', 
              aspectRatio: '1', 
              padding: 0, 
              overflow: 'hidden',
              backgroundColor: 'var(--text-color)',
              position: 'relative'
            }}
            className="brutalist-card"
          >
            <img 
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop" 
              alt="The Ultimate Burger" 
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '2rem', 
              left: '2rem', 
              right: '2rem' 
            }} className="glass-dark">
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>THE CHOMPO MAX</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Hand-smashed beef, triple-stacked, dripping in brutality.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
