import { motion } from 'framer-motion';
import { Star, Quote, Heart, Twitter, Instagram } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { id: 1, name: 'ALEX R.', handle: '@crunch_lord', text: 'The Korean Fried Chicken is actually illegal. I ordered twice in one night.', color: 'var(--yellow)' },
    { id: 2, name: 'SARA K.', handle: '@sarabytes', text: 'Best packaging in the game. Arrived crispy, stayed crispy. 10/10.', color: 'var(--white)' },
    { id: 3, name: 'MARCUS V.', handle: '@vandal_vibes', text: 'CHOMPO is a lifestyle. The Truffle Fries changed my molecular structure.', color: 'var(--black)', textColor: 'var(--white)' },
    { id: 4, name: 'LISA P.', handle: '@lisafoodie', text: 'The mobile app is so fast, I accidentally ordered three burgers. No regrets.', color: 'var(--white)' },
    { id: 5, name: 'BENNY G.', handle: '@big_chomp', text: 'Late night sessions aren\'t complete without a bucket of CHOMPO.', color: 'var(--yellow)' },
    { id: 6, name: 'CAYA W.', handle: '@caya_creative', text: 'Finally a brand that gets the aesthetic right. Also the food slaps.', color: 'var(--white)' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero Strip */}
      <section style={{ backgroundColor: 'var(--yellow)', padding: 'var(--s8) 0', borderBottom: '4px solid var(--black)', textAlign: 'center' }}>
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: 'clamp(50px, 12vw, 150px)', margin: 0 }}>THE WORD<br />ON THE STREET.</h1>
        </div>
      </section>

      {/* Responsive Grid */}
      <section className="container section-padding">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--s6)',
          width: '100%' 
        }}>
          {reviews.map((rev, i) => (
            <motion.div 
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="brutalist-card"
              style={{ 
                backgroundColor: rev.color,
                color: rev.textColor || 'var(--black)',
                padding: 'var(--s5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Quote size={40} opacity={0.2} fill="currentColor" />
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--red-hot)" stroke="none" />)}
                </div>
              </div>
              
              <p style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
                "{rev.text.toUpperCase()}"
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)', border: '2px solid currentColor' }}></div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '18px' }}>{rev.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>{rev.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Submission Form Section */}
      <section style={{ backgroundColor: 'var(--cream)', padding: 'var(--s9) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="brutalist-card"
            style={{ padding: 'var(--s8)', backgroundColor: 'var(--white)' }}
          >
            <h2 className="section-title" style={{ marginBottom: 'var(--s5)' }}>SPILL THE SAUCE</h2>
            <p className="heading" style={{ marginBottom: 'var(--s6)', fontSize: '18px' }}>HAD A LIFE-CHANGING CRUNCH? SHARE YOUR STORY WITH THE CREW.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('MESSAGE LOGGED. YOUR LEGEND GROWS.');
            }} style={{ display: 'grid', gap: 'var(--s5)' }}>
              <div style={{ display: 'grid', gap: 'var(--s3)' }}>
                <label className="heading">STREET NAME</label>
                <input type="text" className="brutalist-input" placeholder="Crunch Lord 4000" required />
              </div>
              <div style={{ display: 'grid', gap: 'var(--s3)' }}>
                <label className="heading">YOUR VERDICT</label>
                <textarea className="brutalist-input" rows="4" placeholder="It was illegal... in a good way." required style={{ resize: 'none' }}></textarea>
              </div>
              <button type="submit" className="brutalist-button accent" style={{ width: '100%', fontSize: '24px' }}>
                SUBMIT TO THE VOID
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: 'var(--s9) 0', textAlign: 'center', backgroundColor: 'var(--black)', color: 'var(--yellow)' }}>
         <div className="container">
            <h2 className="section-title" style={{ fontSize: '48px', color: 'var(--yellow)' }}>JOIN THE MOVEMENT</h2>
            <p className="heading" style={{ fontSize: '24px', margin: '20px 0 var(--s6)' }}>Tag us @chompo_hq for a chance to be featured & get free fries.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
               <button className="brutalist-button" style={{ padding: '20px 40px', background: 'var(--yellow)', color: 'var(--black)' }}><Instagram style={{ marginRight: '10px' }} /> INSTAGRAM</button>
               <button className="brutalist-button" style={{ padding: '20px 40px', border: '3px solid var(--yellow)' }}><Twitter style={{ marginRight: '10px' }} /> TWITTER / X</button>
            </div>
         </div>
      </section>

      <style>{`
        /* Testimonials Styles */
      `}</style>
    </div>
  );
};

export default Testimonials;
