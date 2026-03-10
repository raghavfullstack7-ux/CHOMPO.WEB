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

  if (loading) return <div className="container heading" style={{ padding: '4rem 0' }}>LOCATING YOUR ORDER...</div>;
  if (!order) return <div className="container heading" style={{ padding: '4rem 0' }}>ORDER NOT FOUND</div>;

  const statuses = [
    { id: 'pending', label: 'PENDING', icon: Clock, color: '#ffc107' },
    { id: 'confirmed', label: 'CONFIRMED', icon: CheckCircle, color: '#4caf50' },
    { id: 'preparing', label: 'PREPARING', icon: Utensils, color: '#2196f3' },
    { id: 'out-for-delivery', label: 'ON THE WAY', icon: Truck, color: 'var(--secondary-color)' },
    { id: 'delivered', label: 'DELIVERED', icon: Package, color: 'var(--primary-color)' },
    { id: 'cancelled', label: 'CANCELLED', icon: AlertCircle, color: '#f44336' }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.id === order.status);

  return (
    <div className="container section-padding">
      <div className="brutalist-card" style={{ backgroundColor: 'var(--accent-color)', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>ORDER TRACKER</h1>
        <p className="heading" style={{ marginTop: '0.5rem' }}>ID: {order._id}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
        {statuses.slice(0, 5).map((status, index) => {
          const Icon = status.icon;
          const isActive = index <= currentStatusIndex && order.status !== 'cancelled';
          return (
            <div 
              key={status.id}
              className="brutalist-card"
              style={{ 
                textAlign: 'center', 
                backgroundColor: isActive ? 'white' : '#eee',
                opacity: isActive ? 1 : 0.5,
                border: isActive ? '3px solid black' : '3px solid #ccc'
              }}
            >
              <Icon size={32} color={isActive ? status.color : '#ccc'} style={{ margin: '0 auto' }} />
              <p className="heading" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>{status.label}</p>
            </div>
          )
        })}
      </div>

      <div className="brutalist-card">
        <h2 className="heading" style={{ marginBottom: '2rem' }}>ORDER DETAILS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {order.orderItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '0.5rem' }}>
              <span>{item.quantity} x {item.name}</span>
              <span className="heading">${item.price * item.quantity}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.5rem' }}>
            <span className="heading">TOTAL PAID</span>
            <span className="heading">${order.totalPrice}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link to="/menu" className="brutalist-button">ORDER MORE BRUTALITY</Link>
      </div>
    </div>
  );
};

export default OrderStatus;
