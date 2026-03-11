import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMe, updatePassword as updatePasswordApi } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Save, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const { data } = await updateMe(profileData);
      setUser(data.data.user);
      setMessage({ type: 'success', text: 'PROFILE UPDATED SUCCESSFULLY' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'UPDATE FAILED' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.passwordConfirm) {
      return setMessage({ type: 'error', text: 'PASSWORDS DO NOT MATCH' });
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await updatePasswordApi(passwordData);
      setMessage({ type: 'success', text: 'PASSWORD CHANGED SUCCESSFULLY' });
      setPasswordData({ passwordCurrent: '', password: '', passwordConfirm: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'PASSWORD UPDATE FAILED' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '90vh' }}>
      <div className="container section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 'var(--s8)' }}>
            <div style={{ backgroundColor: 'var(--yellow)', padding: '15px', border: '4px solid var(--black)', transform: 'rotate(-2deg)' }}>
              <SettingsIcon size={40} />
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', margin: 0 }}>SETTINGS.</h1>
          </div>

          <AnimatePresence>
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="brutalist-card" 
                style={{ 
                  backgroundColor: message.type === 'success' ? 'var(--yellow)' : 'var(--red-hot)',
                  color: message.type === 'success' ? 'var(--black)' : 'var(--white)',
                  marginBottom: 'var(--s6)',
                  padding: 'var(--s4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                {message.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                <p style={{ margin: 0, fontWeight: 900, fontFamily: 'var(--font-heading)', fontSize: '20px' }}>{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'grid', gap: 'var(--s8)' }}>
            {/* Profile Section */}
            <section className="brutalist-card" style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 'var(--s6)' }}>
                <User size={28} />
                <h2 className="section-title" style={{ fontSize: '28px' }}>IDENTITY LOGS</h2>
              </div>
              <form onSubmit={handleProfileUpdate} style={{ display: 'grid', gap: 'var(--s5)' }}>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    className="brutalist-input"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    className="brutalist-input"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="brutalist-button" 
                  disabled={loading}
                  style={{ marginTop: 'var(--s4)', alignSelf: 'start', padding: '15px 30px' }}
                >
                  {loading ? 'SYNCING...' : 'SAVE CHANGES'} <Save size={20} style={{ marginLeft: '10px' }} />
                </button>
              </form>
            </section>

            {/* Password Section */}
            <section className="brutalist-card" style={{ padding: 'var(--s7)', backgroundColor: 'var(--black)', color: 'var(--cream)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 'var(--s6)' }}>
                <Lock size={28} color="var(--yellow)" />
                <h2 className="section-title" style={{ color: 'var(--yellow)', fontSize: '28px' }}>SECURITY CLEARANCE</h2>
              </div>
              <form onSubmit={handlePasswordUpdate} style={{ display: 'grid', gap: 'var(--s5)' }}>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>CURRENT PASSWORD</label>
                  <input 
                    type="password" 
                    className="brutalist-input"
                    value={passwordData.passwordCurrent}
                    onChange={(e) => setPasswordData({...passwordData, passwordCurrent: e.target.value})}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gap: 'var(--s5)', gridTemplateColumns: '1fr 1fr' }}>
                   <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>NEW PASSWORD</label>
                     <input 
                      type="password" 
                      className="brutalist-input"
                      value={passwordData.password}
                      onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                      style={{ width: '100%' }}
                      required
                      minLength={6}
                    />
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>CONFIRM NEW</label>
                    <input 
                      type="password" 
                      className="brutalist-input"
                      value={passwordData.passwordConfirm}
                      onChange={(e) => setPasswordData({...passwordData, passwordConfirm: e.target.value})}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="brutalist-button accent" 
                  disabled={loading}
                  style={{ marginTop: 'var(--s4)', alignSelf: 'start', padding: '15px 30px' }}
                >
                  {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
