import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginUser({ email, password });
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="container section-padding" style={{ display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="brutalist-card" 
        style={{ width: '100%', maxWidth: '450px', backgroundColor: 'var(--accent-color)' }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>LOGIN</h2>
        
        {error && (
          <div className="brutalist-border" style={{ backgroundColor: 'white', padding: '1rem', marginBottom: '1.5rem', color: 'red', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="heading">EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="brutalist-border" 
              style={{ padding: '0.75rem', outline: 'none' }}
              placeholder="vandal@chompo.com"
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="heading">PASSWORD</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="brutalist-border" 
              style={{ padding: '0.75rem', outline: 'none' }}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="brutalist-button" style={{ marginTop: '1rem' }}>
            ENTER THE VOID
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center' }}>
          NEW HERE? <Link to="/register" style={{ fontWeight: 'bold', borderBottom: '2px solid black', textDecoration: 'none', color: 'inherit' }}>JOIN THE SQUAD</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
