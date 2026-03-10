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
    pending: '#ffc107',
    confirmed: '#4caf50',
    preparing: '#2196f3',
    'out-for-delivery': 'var(--secondary-color)',
    delivered: 'var(--primary-color)',
    cancelled: '#f44336'
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (authLoading || loading) return <div className="container heading" style={{ padding: '6rem 0' }}>ESTABLISHING SECURE CONNECTION...</div>;

  if (!user || user.role !== 'admin') return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <div className="brutalist-card glass" style={{ backgroundColor: 'var(--primary-color)', display: 'inline-block', padding: '4rem' }}>
        <Lock size={80} style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem' }}>ACCESS DENIED</h1>
        <p className="heading" style={{ marginTop: '1rem' }}>ONLY LEVEL 1 ADMINS CAN ENTER THE VOID.</p>
        <button onClick={() => navigate('/login')} className="brutalist-button" style={{ marginTop: '2rem' }}>LOG IN AS ADMIN</button>
      </div>
    </div>
  );

  return (
    <div className="container section-padding">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
        <div>
          <h1 style={{ fontSize: '4rem' }}>COMMAND CENTER</h1>
          <p className="heading" style={{ fontSize: '1.2rem', marginTop: '1rem', textTransform: 'none' }}>Total Orders: {orders.length}</p>
        </div>
        <div className="brutalist-card glass" style={{ backgroundColor: 'var(--accent-color)', padding: '1rem 2.5rem' }}>
          <TrendingUp size={32} />
          <h2 className="heading" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>ACTIVE</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'].map(s => (
          <button 
            key={s}
            onClick={() => setFilter(s)}
            className={`brutalist-button ${filter === s ? '' : 'secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <AnimatePresence mode='popLayout'>
          {filteredOrders.map(order => (
            <motion.div 
              layout
              key={order._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="brutalist-card"
              style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}
            >
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="glass" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', fontWeight: 900, backgroundColor: statusColors[order.status] }}>
                    {order.status.toUpperCase()}
                  </span>
                  <span className="heading">ID: {order._id.slice(-6)}</span>
                  <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>• {new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
                <h3 className="heading">{order.user?.name || 'Guest'} ({order.user?.email})</h3>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {order.orderItems.map((item, i) => (
                    <span key={i} style={{ fontSize: '0.85rem', background: '#eee', padding: '0.2rem 0.5rem', border: '1px solid black' }}>
                      {item.quantity}x {item.name}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="heading" style={{ textAlign: 'right', fontSize: '1.5rem' }}>${order.totalPrice}</h3>
                <select 
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="brutalist-border"
                  style={{ padding: '0.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}
                >
                  <option value="pending">PENDING</option>
                  <option value="confirmed">CONFIRMED</option>
                  <option value="preparing">PREPARING</option>
                  <option value="out-for-delivery">ON THE WAY</option>
                  <option value="delivered">DELIVERED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
