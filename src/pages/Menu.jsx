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

  if (loading) return <div className="container heading" style={{ padding: '4rem 0', fontSize: '2rem' }}>LOADING THE BRUTALITIES...</div>;

  return (
    <div className="container section-padding">
      <header style={{ marginBottom: '5rem' }}>
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', marginBottom: '2rem' }}
        >
          THE <br /> LINEUP.
        </motion.h1>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap', overflowX: 'auto', paddingBottom: '1rem' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`brutalist-button ${category === cat ? '' : 'secondary'}`}
              style={{ padding: '0.6rem 2rem', fontSize: '0.9rem' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        layout
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '3rem' 
        }}
      >
        <AnimatePresence>
          {filteredItems.map(item => (
            <MenuCard key={item._id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Menu;
