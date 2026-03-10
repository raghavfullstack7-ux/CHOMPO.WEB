import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMe, updatePassword as updatePasswordApi } from '../utils/api';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Lock, User, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password Form State
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
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.passwordConfirm) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await updatePasswordApi(passwordData);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ passwordCurrent: '', password: '', passwordConfirm: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Password update failed' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container section-padding">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          <div className="brutalist-card glass" style={{ backgroundColor: 'var(--primary-color)', padding: '1rem' }}>
            <SettingsIcon size={40} />
          </div>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>SETTINGS.</h1>
        </div>

        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="brutalist-card" 
            style={{ 
              backgroundColor: message.type === 'success' ? 'var(--secondary-color)' : '#f44336',
              color: 'white',
              marginBottom: '2rem',
              padding: '1rem'
            }}
          >
            <p className="heading" style={{ margin: 0 }}>{message.text.toUpperCase()}</p>
          </motion.div>
        )}

        <div style={{ display: 'grid', gap: '3rem' }}>
          {/* Profile Section */}
          <section className="brutalist-card glass" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <User size={24} />
              <h2 className="heading" style={{ fontSize: '1.8rem' }}>PROFILE INFO</h2>
            </div>
            <form onSubmit={handleProfileUpdate} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label className="heading" style={{ fontSize: '0.9rem' }}>FULL NAME</label>
                <input 
                  type="text" 
                  className="brutalist-border"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  style={{ padding: '1rem', width: '100%', fontWeight: 700 }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label className="heading" style={{ fontSize: '0.9rem' }}>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  className="brutalist-border"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  style={{ padding: '1rem', width: '100%', fontWeight: 700 }}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="brutalist-button" 
                disabled={loading}
                style={{ marginTop: '1rem', alignSelf: 'start' }}
              >
                {loading ? 'SAVING...' : 'SAVE CHANGES'} <Save size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
            </form>
          </section>

          {/* Password Section */}
          <section className="brutalist-card glass" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Lock size={24} />
              <h2 className="heading" style={{ fontSize: '1.8rem' }}>SECURITY</h2>
            </div>
            <form onSubmit={handlePasswordUpdate} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label className="heading" style={{ fontSize: '0.9rem' }}>CURRENT PASSWORD</label>
                <input 
                  type="password" 
                  className="brutalist-border"
                  value={passwordData.passwordCurrent}
                  onChange={(e) => setPasswordData({...passwordData, passwordCurrent: e.target.value})}
                  style={{ padding: '1rem', width: '100%', fontWeight: 700 }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label className="heading" style={{ fontSize: '0.9rem' }}>NEW PASSWORD</label>
                <input 
                  type="password" 
                  className="brutalist-border"
                  value={passwordData.password}
                  onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                  style={{ padding: '1rem', width: '100%', fontWeight: 700 }}
                  required
                  minLength={6}
                />
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label className="heading" style={{ fontSize: '0.9rem' }}>CONFIRM NEW PASSWORD</label>
                <input 
                  type="password" 
                  className="brutalist-border"
                  value={passwordData.passwordConfirm}
                  onChange={(e) => setPasswordData({...passwordData, passwordConfirm: e.target.value})}
                  style={{ padding: '1rem', width: '100%', fontWeight: 700 }}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="brutalist-button accent" 
                disabled={loading}
                style={{ marginTop: '1rem', alignSelf: 'start' }}
              >
                {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
