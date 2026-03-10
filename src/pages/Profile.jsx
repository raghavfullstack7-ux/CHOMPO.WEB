import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, History, LogOut, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
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
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '90vh' }}>
      <div className="container section-padding">
        <div className="grid grid-cols-mobile-1 grid-cols-desktop-3" style={{ gap: 'var(--s8)', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--black)', color: 'var(--white)', textAlign: 'center' }}
            >
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: 'var(--yellow)', 
                margin: '0 auto var(--s5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--black)',
                border: '4px solid var(--white)',
                transform: 'rotate(-3deg)'
              }}>
                <User size={64} />
              </div>
              <h1 className="section-title" style={{ fontSize: '32px', color: 'var(--yellow)' }}>{user.name.toUpperCase()}</h1>
              <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: 'var(--s6)' }}>{user.email}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
                <Link to="/settings" className="brutalist-button" style={{ backgroundColor: 'var(--white)', color: 'var(--black)', fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  EDIT PROFILE <SettingsIcon size={18} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="brutalist-button" 
                  style={{ backgroundColor: 'var(--red-hot)', color: 'var(--white)', fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}
                >
                  LOGOUT <LogOut size={18} />
                </button>
                {user.role === 'admin' && (
                  <Link to="/admin" className="brutalist-button accent" style={{ textAlign: 'center' }}>
                    ADMIN PANEL
                  </Link>
                )}
              </div>
            </motion.div>

            <div className="brutalist-card" style={{ marginTop: 'var(--s5)', padding: 'var(--s4)', backgroundColor: 'var(--yellow)' }}>
               <h4 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>CHOMPO STATUS</h4>
               <div style={{ fontSize: '24px', fontWeight: 900 }}>LEGENDARY</div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ gridColumn: 'span 2' }}>
            <h2 className="hero-title" style={{ fontSize: 'clamp(48px, 10vw, 80px)', marginBottom: 'var(--s7)', lineHeight: 0.9 }}>
              YOUR<br />HISTORY.
            </h2>

            {loading ? (
              <div className="brutalist-card" style={{ padding: 'var(--s8)', textAlign: 'center' }}>
                <h3 className="section-title">RECALLING LOGS...</h3>
              </div>
            ) : orders.length === 0 ? (
              <div className="brutalist-card" style={{ padding: 'var(--s8)', textAlign: 'center' }}>
                <Package size={64} style={{ opacity: 0.2, marginBottom: 'var(--s4)' }} />
                <h3 className="section-title">NO ORDERS FOUND</h3>
                <Link to="/menu" className="brutalist-button accent" style={{ marginTop: 'var(--s5)' }}>START A NEW HAUL</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
                <AnimatePresence>
                  {orders.map((order, index) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="brutalist-card"
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: 'var(--s5)',
                        borderLeftColor: order.status === 'delivered' ? 'var(--yellow)' : 'var(--black)'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ 
                            backgroundColor: order.status === 'delivered' ? 'var(--black)' : 'var(--yellow)',
                            color: order.status === 'delivered' ? 'var(--white)' : 'var(--black)',
                            padding: '2px 8px',
                            fontSize: '10px',
                            fontWeight: 900,
                            fontFamily: 'var(--font-body)'
                          }}>
                            {order.status.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '12px', opacity: 0.5, fontWeight: 700 }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: 0 }}>ORDER #{order._id.slice(-6).toUpperCase()}</h3>
                        <p style={{ fontSize: '14px', marginTop: '4px', maxWidth: '400px', opacity: 0.8 }}>
                          {order.orderItems.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div className="price" style={{ fontSize: '32px' }}>${order.totalPrice.toFixed(2)}</div>
                         <Link to={`/order/${order._id}`} style={{ 
                           fontFamily: 'var(--font-heading)', 
                           color: 'var(--black)',
                           textDecoration: 'none',
                           borderBottom: '2px solid var(--black)',
                           fontSize: '14px'
                         }}>VIEW INTEL →</Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
