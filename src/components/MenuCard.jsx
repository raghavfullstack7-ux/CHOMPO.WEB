import { motion } from 'framer-motion';
import { Plus, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1, {}); // Default 1 quantity, no customizations from card
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="brutalist-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        position: 'relative',
        overflow: 'hidden',
        padding: 0
      }}
    >
      <Link to={`/menu/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
        <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div className="glass" style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            padding: '2px 8px', 
            backgroundColor: 'var(--accent-color)',
            fontSize: '0.7rem',
            fontWeight: 900
          }}>
            {item.category.toUpperCase()}
          </div>
          {item.spicyLevel > 0 && (
            <div className="glass" style={{ 
              position: 'absolute', 
              top: '1rem', 
              right: '1rem', 
              backgroundColor: 'var(--primary-color)', 
              padding: '4px 8px', 
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Flame size={14} /> <span className="heading" style={{ fontSize: '0.7rem' }}>HOT</span>
            </div>
          )}
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.75rem', lineHeight: 1 }}>{item.name}</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>{item.description}</p>
        </div>
      </Link>

      <div style={{ padding: '1.5rem', paddingTop: 0 }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className="heading" style={{ fontSize: '1.5rem' }}>${item.price}</span>
          <button 
            onClick={handleAddToCart}
            className="brutalist-button" 
            style={{ flex: 1, padding: '0.75rem' }}
          >
            <Plus size={20} /> ADD
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
