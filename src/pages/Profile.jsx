import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, History, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data.data.orders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container section-padding">
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="brutalist-card glass" style={{ backgroundColor: 'var(--accent-color)', textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: 'var(--text-color)', 
              borderRadius: '50%', 
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: 'var(--border-width) solid black'
            }}>
              <User size={60} />
            </div>
            <h2 className="heading" style={{ fontSize: '2rem' }}>{user.name.toUpperCase()}</h2>
            <p className="heading" style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'none', marginTop: '0.5rem' }}>{user.email}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="brutalist-button" style={{ justifyContent: 'space-between', width: '100%' }}>
              SETTINGS <ChevronRight size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="brutalist-button secondary" 
              style={{ justifyContent: 'space-between', width: '100%' }}
            >
              LOGOUT <LogOut size={20} />
            </button>
            {user.role === 'admin' && (
              <Link to="/admin" className="brutalist-button accent" style={{ textAlign: 'center' }}>
                ADMIN PANEL
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 style={{ fontSize: '4rem', marginBottom: '3.5rem' }}>YOUR <br /> HISTORY.</h1>
          
          {loading ? (
            <p className="heading">RETRIEVING ORDER LOGS...</p>
          ) : orders.length === 0 ? (
            <div className="brutalist-card">
              <p className="heading">NO ORDERS FOUND IN THE SYSTEM.</p>
              <Link to="/menu" className="brutalist-button" style={{ marginTop: '1.5rem' }}>GO ORDER NOW</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <AnimatePresence>
                {orders.map((order, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={order._id}
                    className="brutalist-card"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span className="glass" style={{ 
                          padding: '2px 8px', 
                          fontSize: '0.7rem', 
                          fontWeight: 900,
                          backgroundColor: order.status === 'delivered' ? 'var(--secondary-color)' : 'var(--primary-color)'
                        }}>
                          {order.status.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="heading" style={{ fontSize: '1.25rem' }}>ORDER #{order._id.slice(-6).toUpperCase()}</h3>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        {order.orderItems.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="heading" style={{ fontSize: '1.5rem' }}>${order.totalPrice}</p>
                      <Link to={`/order/${order._id}`} className="heading" style={{ fontSize: '0.8rem', color: 'inherit', display: 'block', marginTop: '0.5rem' }}>
                        DETAILS →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
