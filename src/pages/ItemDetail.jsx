import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenuItem } from '../utils/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const customizations = Object.entries(selectedOptions).map(([name, value]) => `${name}: ${value}`);
    addToCart(item, quantity, customizations);
    navigate('/menu');
  };

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await fetchMenuItem(id);
        setItem(data.data.menuItem);
        
        // Initialize options
        const initialOptions = {};
        data.data.menuItem.customizationOptions?.forEach(opt => {
          initialOptions[opt.name] = opt.options[0];
        });
        setSelectedOptions(initialOptions);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  if (loading) return <div className="container heading" style={{ padding: '4rem 0' }}>FETCHING DETAILS...</div>;
  if (!item) return <div className="container heading" style={{ padding: '4rem 0' }}>ITEM NOT FOUND</div>;

  return (
    <div className="container section-padding">
      <button 
        onClick={() => navigate(-1)} 
        className="brutalist-button secondary" 
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeft size={20} /> BACK TO MENU
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="brutalist-card" 
          style={{ padding: 0 }}
        >
          <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{item.name}</h1>
          <p className="heading" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>${item.price}</p>
          <p style={{ margin: '2rem 0', fontSize: '1.1rem', lineHeight: 1.6 }}>{item.description}</p>

          {item.customizationOptions?.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
              {item.customizationOptions.map(opt => (
                <div key={opt.name}>
                  <h3 className="heading" style={{ marginBottom: '1rem' }}>{opt.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {opt.options.map(val => (
                      <button
                        key={val}
                        onClick={() => handleOptionChange(opt.name, val)}
                        className={`brutalist-button ${selectedOptions[opt.name] === val ? '' : 'secondary'}`}
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}>
            <div className="brutalist-border" style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <Minus size={20} />
              </button>
              <span className="heading" style={{ padding: '0 1.5rem', fontSize: '1.5rem' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: '0.75rem', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <Plus size={20} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="brutalist-button" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
            >
              <ShoppingBag size={24} /> ADD TO CART
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetail;
