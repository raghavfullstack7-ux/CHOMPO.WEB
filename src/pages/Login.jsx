import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginUser({ email, password });
    if (result.success) {
      navigate(redirectPath);
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--yellow)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s8)', alignItems: 'center' }}>
        
        {/* Left: Huge Text */}
        <div className="desktop-only">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-title"
            style={{ fontSize: 'clamp(60px, 12vw, 150px)', color: 'var(--black)' }}
          >
            JOIN<br />THE<br />SQUAD.
          </motion.h1>
          <div style={{ marginTop: 'var(--s5)', fontSize: '24px', fontFamily: 'var(--font-heading)' }}>
            CHOMPO REWARDS STATUS: <span style={{ color: 'var(--cream)', backgroundColor: 'var(--black)', padding: '0 10px' }}>PENDING</span>
          </div>
        </div>

        {/* Right: Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutalist-card"
          style={{ 
            backgroundColor: 'var(--white)', 
            padding: 'var(--s7)',
            maxWidth: '500px',
            width: '100%',
            justifySelf: 'center'
          }}
        >
          <h2 className="section-title" style={{ marginBottom: 'var(--s6)' }}>LOGIN TO YOUR HAUL</h2>
          
          {error && (
            <div className="brutalist-card" style={{ backgroundColor: 'var(--red-hot)', color: 'white', padding: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} />
              <span style={{ fontWeight: 800 }}>{error.toUpperCase()}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>IDENTITY (EMAIL)</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
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
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>SECURITY CLEARANCE (PASSWORD)</label>
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

            <button type="submit" className="brutalist-button" style={{ marginTop: 'var(--s4)', width: '100%', fontSize: '24px' }}>
               ENTER THE VOID <ArrowRight size={24} style={{ marginLeft: '10px' }} />
            </button>
          </form>

          <div style={{ marginTop: 'var(--s6)', textAlign: 'center' }}>
            <span style={{ opacity: 0.6 }}>NOT IN THE SQUAD YET?</span><br />
            <Link to="/register" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--black)', 
              fontSize: '20px',
              textDecoration: 'none',
              borderBottom: '3px solid var(--yellow)'
            }}>JOIN US NOW</Link>
          </div>
        </motion.div>
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

export default Login;
