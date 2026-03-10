import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Zap, AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await registerUser({ name, email, password });
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s8)', alignItems: 'center' }}>
        
        {/* Left: Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brutalist-card"
          style={{ 
            backgroundColor: 'var(--white)', 
            padding: 'var(--s7)',
            maxWidth: '500px',
            width: '100%',
            justifySelf: 'center',
            borderWidth: '5px',
            boxShadow: '12px 12px 0 var(--yellow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--s5)' }}>
            <Zap fill="var(--yellow)" size={32} />
            <h2 className="section-title">JOIN THE SQUAD</h2>
          </div>
          
          {error && (
            <div className="brutalist-card" style={{ backgroundColor: 'var(--red-hot)', color: 'white', padding: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} />
              <span style={{ fontWeight: 800 }}>{error.toUpperCase()}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="brutalist-border" 
                  style={{ padding: '15px 15px 15px 50px', width: '100%', outline: 'none', fontSize: '16px' }}
                  placeholder="BRUTUS MCFIRST"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="brutalist-border" 
                  style={{ padding: '15px 15px 15px 50px', width: '100%', outline: 'none', fontSize: '16px' }}
                  placeholder="vandal@chompo.com"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="brutalist-border" 
                  style={{ padding: '15px 15px 15px 50px', width: '100%', outline: 'none', fontSize: '16px' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="brutalist-button accent" style={{ marginTop: 'var(--s4)', width: '100%', fontSize: '24px' }}>
               RECRUIT ME NOW
            </button>
          </form>

          <div style={{ marginTop: 'var(--s6)', textAlign: 'center' }}>
            <span style={{ opacity: 0.6 }}>ALREADY PART OF THE CREW?</span><br />
            <Link to="/login" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--black)', 
              fontSize: '20px',
              textDecoration: 'none',
              borderBottom: '3px solid var(--yellow)'
            }}>ENTER VOID</Link>
          </div>
        </motion.div>

        {/* Right: Text */}
        <div className="desktop-only" style={{ textAlign: 'right' }}>
          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-title"
            style={{ fontSize: 'clamp(60px, 12vw, 150px)', color: 'var(--black)' }}
          >
            BECOME<br />LEGEND.
          </motion.h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: 600, maxWidth: '400px', marginLeft: 'auto', marginTop: 'var(--s5)' }}>
            Join 10,000+ crunch-seekers and get early access to experimental menus.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
