import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1, {});
  };

  const isBestseller = item.rating >= 4.5;
  const isNew = new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="brutalist-card" 
      style={{ 
        backgroundColor: 'var(--black-soft)',
        border: '4px solid var(--yellow)',
        padding: 0,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Link to={`/menu/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          
          {/* Stickers */}
          {isBestseller && (
            <div className="badge sticker" style={{ 
              position: 'absolute', top: '12px', left: '12px',
              backgroundColor: 'var(--yellow)', color: 'var(--black)',
              padding: '4px 10px', transform: 'rotate(-4deg)',
              border: '2px solid var(--black)', zIndex: 2
            }}>
              BESTSELLER
            </div>
          )}
          {isNew && (
            <div className="badge sticker" style={{ 
              position: 'absolute', top: '12px', right: '12px',
              backgroundColor: 'var(--orange)', color: 'var(--white)',
              padding: '4px 10px', transform: 'rotate(3deg)',
              border: '2px solid var(--black)', zIndex: 2
            }}>
              NEW
            </div>
          )}
        </div>
        
        <div style={{ padding: 'var(--s5)', display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="card-title" style={{ 
              color: 'var(--cream)', 
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {item.name}
            </h3>
            <span className="badge" style={{ 
              backgroundColor: 'var(--yellow)', 
              color: 'var(--black)',
              padding: '2px 8px',
              transform: 'rotate(-2deg)',
              fontSize: '10px'
            }}>
              {item.category.toUpperCase()}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
            <span className="price" style={{ color: 'var(--yellow)', lineHeight: 1 }}>
              ${item.price}
            </span>
            <span style={{ 
              fontFamily: 'var(--font-accent)', 
              color: 'var(--yellow)', 
              fontSize: '12px',
              opacity: 0.8
            }}>
              Satisfyingly Huge
            </span>
          </div>
        </div>
      </Link>

      <button 
        onClick={handleAddToCart}
        className="brutalist-button" 
        style={{ 
          width: '100%', 
          borderRadius: 0, 
          borderTop: '3px solid var(--black)',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          backgroundColor: 'var(--yellow)',
          color: 'var(--black)',
          fontSize: '16px',
          boxShadow: 'none'
        }}
      >
        <ShoppingCart size={18} style={{ marginRight: '8px' }} /> ADD TO CART
      </button>

      <style>{`
        .brutalist-card:hover button {
          background-color: var(--orange) !important;
          color: var(--white) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default MenuCard;
