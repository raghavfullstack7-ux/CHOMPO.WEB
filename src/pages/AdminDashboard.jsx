import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, AlertCircle, TrendingUp, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/login?redirect=admin');
    } else if (user && user.role === 'admin') {
      fetchOrders();
    }
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await getAdminOrders();
      setOrders(data.data.orders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      fetchOrders(); // Refresh
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const statusColors = {
    pending: 'var(--yellow)',
    confirmed: 'var(--orange)',
    preparing: 'var(--yellow)',
    'out-for-delivery': 'var(--orange)',
    delivered: 'var(--yellow)',
    cancelled: 'var(--red)'
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (authLoading || loading) return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">SYNCING WITH THE GRID...</h1>
    </div>
  );

  if (!user || user.role !== 'admin') return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <div className="brutalist-card" style={{ backgroundColor: 'var(--red)', color: 'white', display: 'inline-block', padding: 'var(--s8)', border: '4px solid var(--black)', boxShadow: '12px 12px 0px var(--black)' }}>
        <Lock size={80} style={{ marginBottom: '2rem' }} />
        <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', color: 'white' }}>ACCESS DENIED</h1>
        <p className="heading" style={{ marginTop: '1rem', color: 'white' }}>ONLY THE ELITE CREW CAN ENTER THE VOID.</p>
        <button onClick={() => navigate('/login')} className="brutalist-button" style={{ marginTop: '2rem', background: 'white', color: 'black' }}>LOG IN AS ADMIN</button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingBottom: 'var(--s10)' }}>
      {/* Header Section */}
      <section style={{ 
        backgroundColor: 'var(--yellow)', 
        padding: 'var(--s8) 0',
        clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
        marginBottom: 'var(--s8)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(44px, 10vw, 100px)', lineHeight: 0.9 }}>COMMAND<br/>CENTER</h1>
            <div style={{ display: 'flex', gap: 'var(--s4)', marginTop: '1rem' }}>
              <span style={{ backgroundColor: 'var(--black)', color: 'white', padding: '4px 12px', fontWeight: 800, fontSize: '14px' }}>ACCESS LEVEL 1</span>
              <span style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)', padding: '4px 12px', fontWeight: 800, fontSize: '14px' }}>{orders.length} TOTAL REQUISITIONS</span>
            </div>
          </div>
          <div className="brutalist-card" style={{ backgroundColor: 'var(--black)', padding: 'var(--s5)', transform: 'rotate(2deg)', color: 'var(--yellow)' }}>
            <TrendingUp size={48} />
          </div>
        </div>
      </section>

      <div className="container">
        {/* Filter Bar */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--s3)', 
          marginBottom: 'var(--s7)', 
          flexWrap: 'wrap',
          position: 'sticky',
          top: '80px',
          zIndex: 50,
          backgroundColor: 'var(--cream)',
          padding: '10px 0'
        }}>
          {['all', 'pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'].map(s => (
            <button 
              key={s}
              onClick={() => setFilter(s)}
              className={`brutalist-button ${filter === s ? '' : 'accent'}`}
              style={{ 
                fontSize: '13px', 
                padding: 'var(--s2) var(--s4)',
                backgroundColor: filter === s ? 'var(--black)' : 'transparent',
                color: filter === s ? 'var(--yellow)' : 'var(--black)',
                boxShadow: filter === s ? 'none' : '4px 4px 0px var(--black)'
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
          <button 
            onClick={fetchOrders}
            className="brutalist-button"
            style={{ marginLeft: 'auto', background: 'var(--orange)', padding: 'var(--s2) var(--s4)' }}
          >
            REFRESH GRID
          </button>
        </div>

        {/* Orders List */}
        <div style={{ display: 'grid', gap: 'var(--s6)' }}>
          <AnimatePresence mode='popLayout'>
            {filteredOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="brutalist-card"
                style={{ textAlign: 'center', padding: 'var(--s10)', backgroundColor: 'white' }}
              >
                <h2 className="section-title">RADIO SILENCE</h2>
                <p className="heading">NO REQUISITIONS MATCH YOUR CURRENT SCAN.</p>
              </motion.div>
            ) : (
              filteredOrders.map((order, idx) => (
                <motion.div 
                  layout
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="brutalist-card"
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto', 
                    gap: 'var(--s6)', 
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 'var(--s6)',
                    border: '4px solid var(--black)',
                    boxShadow: '8px 8px 0px var(--black)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: 'var(--s4)', alignItems: 'center', marginBottom: 'var(--s4)' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        fontSize: '12px', 
                        fontWeight: 900, 
                        backgroundColor: statusColors[order.status] || 'var(--gray-border)',
                        border: '2px solid var(--black)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className="heading" style={{ fontSize: '14px' }}>REQ_ID: #{order._id.slice(-6).toUpperCase()}</span>
                      <span style={{ fontSize: '12px', opacity: 0.6, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                        {new Date(order.createdAt).toLocaleDateString()} @ {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <h3 className="heading" style={{ fontSize: '1.2rem', marginBottom: 'var(--s4)' }}>
                      USER: {order.user?.name || 'GUEST_PROTO'} <br/>
                      <span style={{ fontSize: '14px', opacity: 0.7 }}>[{order.user?.email || 'N/A'}]</span>
                    </h3>

                    <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
                      {order.orderItems.map((item, i) => (
                        <div key={i} style={{ 
                          fontSize: '12px', 
                          background: 'var(--cream)', 
                          padding: '4px 8px', 
                          border: '2px solid var(--black)',
                          fontWeight: 800,
                          fontFamily: 'var(--font-body)'
                        }}>
                          {item.quantity}× {item.name.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)', alignItems: 'flex-end' }}>
                    <div className="hero-title" style={{ fontSize: '32px', margin: 0 }}>${order.totalPrice.toFixed(2)}</div>
                    <div style={{ display: 'flex', gap: 'var(--s3)' }}>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="brutalist-input"
                        style={{ 
                          padding: '8px 12px', 
                          fontWeight: 900, 
                          fontFamily: 'var(--font-heading)',
                          fontSize: '14px',
                          minWidth: '160px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="pending">PENDING</option>
                        <option value="confirmed">CONFIRMED</option>
                        <option value="preparing">PREPARING</option>
                        <option value="out-for-delivery">ON THE WAY</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                      <button 
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="brutalist-button accent"
                        style={{ padding: '8px 12px', minHeight: 'auto' }}
                      >
                        <Package size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
