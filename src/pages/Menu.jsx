import { useState, useEffect } from 'react';
import { fetchMenuItems } from '../utils/api';
import MenuCard from '../components/MenuCard';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchMenuItems();
        setItems(data.data.menuItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setLoading(false);
      }
    };
    getItems();
  }, []);

  const filteredItems = category === 'all' 
    ? items 
    : items.filter(item => item.category === category);

  const categories = ['all', 'burgers', 'sides', 'drinks', 'desserts'];

  if (loading) return (
    <div className="container" style={{ padding: '10vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">LOADING...</h1>
      <p className="heading">PREPARING THE CRUNCH.</p>
    </div>
  );

  return (
    <div>
      {/* Hero Strip */}
      <section style={{ 
        backgroundColor: 'var(--yellow)', 
        padding: 'var(--s8) 0',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        marginBottom: '4rem'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hero-title"
            style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
          >
            THE FULL MENU
          </motion.h1>
          <p className="heading" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            CRISPY. LOADED. IRRESISTIBLE.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Sticky Filter Bar */}
        <div style={{ 
          position: 'sticky', 
          top: '80px', 
          zIndex: 50, 
          display: 'flex', 
          gap: 'var(--s3)', 
          overflowX: 'auto', 
          padding: '1rem 0',
          backgroundColor: 'var(--cream)',
          marginBottom: 'var(--s7)'
        }} className="hide-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`brutalist-button ${category === cat ? '' : 'accent'}`}
              style={{ 
                padding: 'var(--s2) var(--s5)', 
                fontSize: '15px',
                whiteSpace: 'nowrap',
                backgroundColor: category === cat ? 'var(--black)' : 'transparent',
                color: category === cat ? 'var(--yellow)' : 'var(--black)',
                boxShadow: category === cat ? 'none' : 'var(--shadow-hard)'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-mobile-1 grid-cols-tablet-2 grid-cols-desktop-4"
          style={{ gap: 'var(--s6)', marginBottom: 'var(--s10)' }}
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Menu;
