import { motion } from 'framer-motion';
import { ChefHat, History, Zap, Heart, Star, Users } from 'lucide-react';

const About = () => {
  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)', padding: 'var(--s9) 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hero-title" 
            style={{ fontSize: 'clamp(60px, 15vw, 180px)', lineHeight: 0.8 }}
          >
            BORN<br />IN THE<br />STREETS.
          </motion.h1>
          <div style={{ marginTop: 'var(--s6)', maxWidth: '600px', fontSize: '20px', lineHeight: 1.5, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
             CHOMPO began as a single food truck in the neon-lit back alleys of Flavor City. We didn't want to make fine dining. We wanted to make <span style={{ color: 'var(--white)' }}>REALLY GOOD NOISE.</span>
          </div>
        </div>
        {/* Kinetic Background Text */}
        <div style={{ 
          position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%) rotate(90deg)',
          fontSize: '250px', fontWeight: 900, opacity: 0.05, whiteSpace: 'nowrap', userSelect: 'none'
        }}>
          EST. 2024 EST. 2024
        </div>
      </section>

      {/* Timeline / Values */}
      <section className="container section-padding">
        <div className="grid grid-cols-mobile-1 grid-cols-desktop-2" style={{ gap: 'var(--s9)', alignItems: 'center' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '48px', marginBottom: 'var(--s6)' }}>THE CRUNCH CODE.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s6)' }}>
              {[
                { title: 'GOLDEN ONLY', desc: 'If it ain\'t golden, it ain\'t CHOMPO. We fry with precision and passion.', icon: <Zap /> },
                { title: 'STREET SOUL', desc: 'No white tablecloths here. Just raw energy and late-night vibes.', icon: <Users /> },
                { title: 'CULTURE FIRST', desc: 'We support local artists, skaters, and dreamers. CHOMPO is a community.', icon: <Heart /> }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '20px', alignItems: 'start' }}
                >
                  <div style={{ backgroundColor: 'var(--yellow)', padding: '15px', border: '3px solid var(--black)', transform: 'rotate(-3deg)' }}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: 0 }}>{value.title}</h3>
                    <p style={{ opacity: 0.7, marginTop: '5px' }}>{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="brutalist-card" style={{ padding: 0, height: '600px', overflow: 'hidden' }}>
             <img src="/images/hero_chips.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Brand Vibe" />
             <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'var(--yellow)', padding: '10px 20px', border: '3px solid var(--black)', fontWeight: 900 }}>
                AUTHENTIC CRUNCH
             </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{ backgroundColor: 'var(--yellow)', padding: 'var(--s9) 0', borderTop: '4px solid var(--black)', borderBottom: '4px solid var(--black)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.1 }}>
             "WE DON'T JUST SERVE FOOD.<br />WE SERVE <span style={{ textDecoration: 'underline' }}>ADRENALINE</span> ON A PLATE."
           </h3>
           <p style={{ marginTop: 'var(--s5)', fontSize: '18px', fontWeight: 800 }}>— THE FOUNDERS</p>
        </div>
      </section>

      {/* Team / Squad */}
      <section className="container section-padding">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--s8)' }}>THE SQUAD</h2>
        <div className="grid grid-cols-mobile-2 grid-cols-desktop-4" style={{ gap: 'var(--s5)' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="brutalist-card" style={{ padding: 'var(--s4)', textAlign: 'center' }}>
               <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--gray-pale)', margin: '0 auto var(--s4)', overflow: 'hidden', border: '3px solid var(--black)' }}>
                  {/* Placeholder for team images */}
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🍕</div>
               </div>
               <h4 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>VIBE CURATOR {i}</h4>
               <p style={{ fontSize: '12px', opacity: 0.6 }}>LEGENDARY STATUS</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
