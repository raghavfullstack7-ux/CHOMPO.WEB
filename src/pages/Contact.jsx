import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('CRUNCHY MESSAGE RECEIVED! Our crew will get back to you soon.');
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '90vh' }}>
      {/* Hero Header */}
      <section style={{ 
        backgroundColor: 'var(--yellow)', 
        padding: 'var(--s9) 0 var(--s10)', 
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hero-title"
            style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
          >
            GET IN TOUCH
          </motion.h1>
          <p className="heading" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            CRUNCHY SUPPORT FOR BOLD CRAVINGS
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-5vh', paddingBottom: 'var(--s10)' }}>
        <div className="grid grid-cols-mobile-1 grid-cols-tablet-2" style={{ gap: 'var(--s8)', alignItems: 'start' }}>
          
          {/* Contact Info Card */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="brutalist-card"
            style={{ backgroundColor: 'var(--black)', color: 'var(--cream)', padding: 'var(--s7)' }}
          >
            <h2 className="section-title" style={{ color: 'var(--yellow)', marginBottom: 'var(--s5)' }}>THE CREW HQ</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s4)' }}>
                <div style={{ backgroundColor: 'var(--yellow)', color: 'var(--black)', padding: 'var(--s3)', borderRadius: '4px' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>VISIT US</h4>
                  <p style={{ margin: 0, opacity: 0.8 }}>123 Crunchy Lane, Flavor Town, FT 45678</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s4)' }}>
                <div style={{ backgroundColor: 'var(--orange)', color: 'var(--black)', padding: 'var(--s3)', borderRadius: '4px' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>EMAIL US</h4>
                  <p style={{ margin: 0, opacity: 0.8 }}>crew@chompo.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s4)' }}>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)', border: '2px solid var(--yellow)', padding: 'var(--s3)', borderRadius: '4px' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>CALL THE HOTLINE</h4>
                  <p style={{ margin: 0, opacity: 0.8 }}>+1 (800) CHOMPO-1</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--s7)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--s3)' }}>JOIN THE MOVEMENT</h4>
              <div style={{ display: 'flex', gap: 'var(--s4)' }}>
                <motion.a whileHover={{ scale: 1.2, color: 'var(--orange)' }} href="#" style={{ color: 'var(--yellow)' }}><Instagram size={32} /></motion.a>
                <motion.a whileHover={{ scale: 1.2, color: 'var(--orange)' }} href="#" style={{ color: 'var(--yellow)' }}><Twitter size={32} /></motion.a>
                <motion.a whileHover={{ scale: 1.2, color: 'var(--orange)' }} href="#" style={{ color: 'var(--yellow)' }}><Facebook size={32} /></motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="brutalist-card"
            style={{ backgroundColor: 'white', padding: 'var(--s7)' }}
          >
            <h2 className="section-title" style={{ marginBottom: 'var(--s5)' }}>SEND A FLARE</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
              <div>
                <label className="heading" style={{ display: 'block', marginBottom: 'var(--s2)', fontSize: '1rem' }}>YOUR NAME</label>
                <input 
                  type="text" 
                  required 
                  className="brutalist-input" 
                  placeholder="The Bold One"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="heading" style={{ display: 'block', marginBottom: 'var(--s2)', fontSize: '1rem' }}>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  required 
                  className="brutalist-input" 
                  placeholder="you@awesome.com"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="heading" style={{ display: 'block', marginBottom: 'var(--s2)', fontSize: '1rem' }}>SUBJECT</label>
                <select className="brutalist-input" style={{ width: '100%' }}>
                  <option>Order Issue</option>
                  <option>Catering Request</option>
                  <option>Just Saying Hi</option>
                  <option>Flavor Suggestion</option>
                </select>
              </div>

              <div>
                <label className="heading" style={{ display: 'block', marginBottom: 'var(--s2)', fontSize: '1rem' }}>THE GOSSIP</label>
                <textarea 
                  required 
                  className="brutalist-input" 
                  rows="5"
                  placeholder="Spill the tea (or the sauce)..."
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <button type="submit" className="brutalist-button" style={{ width: '100%', marginTop: 'var(--s2)' }}>
                LAUNCH MESSAGE <Send size={20} style={{ marginLeft: '10px' }} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
