import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredDeals = [
    { id: 1, title: 'MIDNIGHT MUNCH', desc: 'Buy 2 Large Fries, Get 1 Burger FREE.', code: 'VOID24', bg: 'var(--yellow)', color: 'var(--black)' },
    { id: 2, title: 'CRUNCH BUNDLE', desc: 'Family pack with 4 drinks & 2 Large Sides.', code: 'SQUADUP', bg: 'var(--black)', color: 'var(--yellow)' },
    { id: 3, title: 'STUDENT DROP', desc: '15% OFF for all valid student IDs.', code: 'LEARN2CHOMP', bg: 'var(--white)', color: 'var(--black)' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero / Timer */}
      <section style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)', padding: 'var(--s8) 0', textAlign: 'center', borderBottom: '4px solid var(--yellow)' }}>
        <div className="container">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h1 className="hero-title" style={{ fontSize: '15vw', margin: 0 }}>DROPS.</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 'var(--s5)' }}>
               {Object.entries(timeLeft).map(([unit, val]) => (
                 <div key={unit} className="brutalist-card" style={{ padding: '10px 20px', backgroundColor: 'var(--white)', color: 'var(--black)' }}>
                    <div style={{ fontSize: '48px', fontWeight: 900 }}>{val.toString().padStart(2, '0')}</div>
                    <div style={{ fontSize: '12px', fontWeight: 800 }}>{unit.toUpperCase()}</div>
                 </div>
               ))}
            </div>
            <p style={{ marginTop: 'var(--s5)', fontSize: '20px', fontWeight: 700, opacity: 0.8 }}>NEXT REFRESH INCOMING</p>
          </motion.div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container section-padding">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s8)' }}>
          {featuredDeals.map((deal, i) => (
            <motion.div 
              key={deal.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="brutalist-card"
              style={{ 
                backgroundColor: deal.bg, 
                color: deal.color, 
                padding: 'var(--s8)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--s6)',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: 'var(--red-hot)', color: 'white', padding: '5px 15px', fontWeight: 900, transform: 'rotate(-2deg)' }}>
                ACTIVE NOW
              </div>
              
              <div>
                <h2 className="hero-title" style={{ fontSize: ' clamp(40px, 8vw, 80px)', margin: 0 }}>{deal.title}</h2>
                <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '10px' }}>{deal.desc}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: 'var(--s6)' }}>
                  <div className="brutalist-border" style={{ padding: '10px 30px', borderStyle: 'dashed', fontSize: '24px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {deal.code}
                  </div>
                  <button className="brutalist-button" style={{ height: '54px' }}>COPY</button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                 <Link to="/menu" className="brutalist-button accent" style={{ fontSize: '24px', padding: '20px 40px' }}>
                    CLAIM NOW <ArrowRight size={28} />
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Strip */}
      <section style={{ backgroundColor: 'var(--yellow)', padding: '20px 0', borderTop: '4px solid var(--black)' }}>
        <div style={{ display: 'flex', gap: '50px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
           {[...Array(10)].map((_, i) => (
             <span key={i} style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>NEW DROPS EVERY MONDAY • LIMITED QUANTITY • FAST DELIVERY •</span>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Deals;
