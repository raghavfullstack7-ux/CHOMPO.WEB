import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../utils/api';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Package, Truck, Utensils, AlertCircle } from 'lucide-react';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getOrderById(id);
        setOrder(data.data.order);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrder();

    // Socket.io integration
    const socket = io('http://localhost:5000');
    
    socket.on('orderUpdate', (updatedOrder) => {
      if (updatedOrder._id === id) {
        setOrder(updatedOrder);
      }
    });

    return () => socket.disconnect();
  }, [id]);

  if (loading) return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">SCANNING THE GRILL...</h1>
    </div>
  );

  if (!order) return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">ORDER VANISHED</h1>
      <Link to="/menu" className="brutalist-button" style={{ marginTop: '2rem' }}>BACK TO MENU</Link>
    </div>
  );

  const statuses = [
    { id: 'pending', label: 'WAITING', icon: Clock, color: 'var(--yellow)' },
    { id: 'confirmed', label: 'LOCKED IN', icon: CheckCircle, color: 'var(--orange)' },
    { id: 'preparing', label: 'SIZZLING', icon: Utensils, color: 'var(--yellow)' },
    { id: 'out-for-delivery', label: 'EN ROUTE', icon: Truck, color: 'var(--orange)' },
    { id: 'delivered', label: 'ARRIVED', icon: Package, color: 'var(--yellow)' },
  ];

  const currentStatusIndex = statuses.findIndex(s => s.id === order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ 
        backgroundColor: 'var(--black)', 
        color: 'var(--yellow)', 
        padding: 'var(--s8) 0',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        marginBottom: '4rem'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hero-title"
            style={{ fontSize: 'clamp(44px, 10vw, 100px)' }}
          >
            THE TRACKER
          </motion.h1>
          <div style={{ display: 'flex', gap: 'var(--s4)', alignItems: 'center', marginTop: '1rem' }}>
             <span style={{ backgroundColor: 'var(--yellow)', color: 'var(--black)', padding: '4px 12px', fontWeight: 800, fontFamily: 'var(--font-body)' }}>ID: #{order._id.slice(-6).toUpperCase()}</span>
             {isCancelled && <span style={{ backgroundColor: 'var(--red)', color: 'white', padding: '4px 12px', fontWeight: 800 }}>CANCELLED</span>}
          </div>
        </div>
      </section>

      <div className="container">
        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--s9)', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${statuses.length}, 1fr)`, gap: 'var(--s3)' }}>
            {statuses.map((status, index) => {
              const Icon = status.icon;
              const isActive = index <= currentStatusIndex && !isCancelled;
              const isCurrent = index === currentStatusIndex && !isCancelled;

              return (
                <div key={status.id} style={{ textAlign: 'center', position: 'relative' }}>
                  <motion.div 
                    initial={false}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isActive ? 'var(--black)' : 'var(--white)',
                      color: isActive ? 'var(--yellow)' : 'var(--black)'
                    }}
                    className="brutalist-card"
                    style={{ 
                      padding: 'var(--s4)', 
                      margin: '0 auto',
                      width: 'fit-content',
                      border: '3px solid var(--black)',
                      boxShadow: isActive ? '4px 4px 0px var(--black)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <p style={{ 
                    marginTop: 'var(--s3)', 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '12px',
                    opacity: isActive ? 1 : 0.4
                  }}>
                    {status.label}
                  </p>
                  
                  {/* Connecting lines */}
                  {index < statuses.length - 1 && (
                    <div style={{ 
                      position: 'absolute', top: '24px', left: 'calc(50% + 30px)', width: 'calc(100% - 60px)',
                      height: '4px', backgroundColor: index < currentStatusIndex && !isCancelled ? 'var(--black)' : 'var(--gray-border)',
                      zIndex: -1
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-mobile-1 grid-cols-desktop-3" style={{ gap: 'var(--s7)', alignItems: 'start' }}>
          {/* Order Content */}
          <div className="grid-cols-desktop-2" style={{ gridColumn: 'span 2' }}>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'white' }}
            >
              <h2 className="section-title" style={{ marginBottom: 'var(--s6)' }}>YOUR REQUISITION</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)' }}>
                {order.orderItems.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: 'var(--s4)', border: '2px solid var(--black)',
                    backgroundColor: 'var(--cream)'
                  }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>{item.quantity}× {item.name}</span>
                      {item.customizations?.length > 0 && (
                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                          {item.customizations.join(' • ')}
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="brutalist-card"
            style={{ backgroundColor: 'var(--yellow)', padding: 'var(--s6)' }}
          >
            <h3 className="section-title" style={{ fontSize: '24px' }}>DAMAGE REPORT</h3>
            <div style={{ margin: 'var(--s5) 0', display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="heading">SUBTOTAL</span>
                <span className="heading">${order.totalPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--black)', paddingTop: 'var(--s3)' }}>
                <span className="hero-title" style={{ fontSize: '32px' }}>TOTAL PAID</span>
                <span className="hero-title" style={{ fontSize: '32px' }}>${order.totalPrice}</span>
              </div>
            </div>
            <Link to="/menu" className="brutalist-button" style={{ width: '100%', textAlign: 'center', background: 'var(--black)', color: 'var(--yellow)' }}>
              RE-ORDER NOW
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
