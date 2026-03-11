import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenuItem } from '../utils/api';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

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

  if (loading) return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">FETCHING...</h1>
    </div>
  );

  if (!item) return (
    <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
      <h1 className="hero-title">LOST IN THE VOID</h1>
      <button onClick={() => navigate('/menu')} className="brutalist-button" style={{ marginTop: '2rem' }}>
        BACK TO REALITY
      </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Mobile Sticky Image */}
      <div style={{ 
        width: '100%', 
        height: '320px', 
        backgroundColor: 'var(--black)',
        borderBottom: '4px solid var(--black)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
        />
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            position: 'absolute', top: '20px', left: '20px',
            background: 'var(--yellow)', border: '3px solid var(--black)',
            padding: '10px', cursor: 'pointer', zIndex: 10
          }}
        >
          <ArrowLeft size={24} color="var(--black)" />
        </button>
      </div>

      <div className="container section-padding" style={{ marginTop: '-40px' }}>
        <div className="grid grid-cols-mobile-1 grid-cols-desktop-3" style={{ gap: 'var(--s8)', alignItems: 'start' }}>
          
          {/* Main Info */}
          <div className="grid-cols-desktop-2" style={{ gridColumn: 'span 2' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ 
                position: 'absolute', top: '-20px', right: '-20px', 
                backgroundColor: 'var(--black)', color: 'var(--yellow)',
                padding: '30px', transform: 'rotate(15deg)',
                fontFamily: 'var(--font-heading)', fontSize: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                FRESH
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--s4)', position: 'relative', zIndex: 2 }}>
                <div>
                  <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 84px)', margin: 0, lineHeight: 0.9 }}>{item.name}</h1>
                  <span style={{ 
                    display: 'inline-block', backgroundColor: 'var(--black)', color: 'white', 
                    padding: '4px 12px', marginTop: '12px', fontFamily: 'var(--font-body)', 
                    fontWeight: 800, fontSize: '12px', letterSpacing: '2px' 
                  }}>
                    {item.category?.toUpperCase() || 'DELICIOUS'}
                  </span>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  className="price" 
                  style={{ 
                    backgroundColor: 'var(--yellow)', color: 'var(--black)',
                    padding: '15px 25px', border: '4px solid var(--black)',
                    transform: 'rotate(2deg)', alignSelf: 'flex-start',
                    boxShadow: '8px 8px 0px var(--black)',
                    fontSize: '32px', fontFamily: 'var(--font-heading)'
                  }}
                >
                  ${item.price}
                </motion.div>
              </div>
              
              <p style={{ marginTop: 'var(--s7)', fontSize: '20px', color: 'var(--black)', maxWidth: '700px', fontWeight: 500, lineHeight: 1.5 }}>
                {item.description}
              </p>

              <div style={{ margin: 'var(--s8) 0', height: '4px', backgroundColor: 'var(--black)', width: '100px' }} />

              {/* Customizations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s8)' }}>
                {item.customizationOptions?.map((opt, idx) => (
                  <motion.div 
                    key={opt.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <h3 className="section-title" style={{ fontSize: '28px', marginBottom: 'var(--s5)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{idx + 1}</span>
                      {opt.name.toUpperCase()}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--s4)' }}>
                      {opt.options.map(val => {
                        const isSelected = selectedOptions[opt.name] === val;
                        return (
                          <motion.button
                            key={val}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionChange(opt.name, val)}
                            className="brutalist-card"
                            style={{ 
                              padding: 'var(--s4) var(--s5)', 
                              cursor: 'pointer',
                              backgroundColor: isSelected ? 'var(--yellow)' : 'var(--white)',
                              border: '3px solid var(--black)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              boxShadow: isSelected ? 'inset 4px 4px 0px rgba(0,0,0,0.1)' : '4px 4px 0px var(--black)',
                              transition: 'all 0.1s ease'
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>{val.toUpperCase()}</span>
                            {isSelected && <Check size={20} strokeWidth={3} />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Checkout Tooltip / Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="brutalist-card"
              style={{ backgroundColor: 'var(--black)', color: 'var(--cream)', padding: 'var(--s6)' }}
            >
              <h3 className="section-title" style={{ color: 'var(--yellow)', fontSize: '28px' }}>YOUR LOADOUT</h3>
              
              <div style={{ margin: 'var(--s5) 0', display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Qty: {quantity}</span>
                  <span style={{ color: 'var(--yellow)' }}>${(item.price * quantity).toFixed(2)}</span>
                </div>
                {Object.entries(selectedOptions).map(([k, v]) => (
                  <div key={k} style={{ fontSize: '12px', opacity: 0.8 }}>+ {k}: {v}</div>
                ))}
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--s4)' }}>
                <div className="brutalist-border" style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  backgroundColor: 'white', color: 'black' 
                }}>
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="hero-title" style={{ padding: '0 20px', fontSize: '32px' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="brutalist-button accent" 
                  style={{ width: '100%', fontSize: '24px' }}
                >
                  <ShoppingBag size={24} style={{ marginRight: '10px' }} /> GRAB IT
                </button>
              </div>
            </motion.div>
            
            <p style={{ marginTop: 'var(--s5)', fontSize: '14px', textAlign: 'center', opacity: 0.6 }}>
              100% Satisfaction Guaranteed or your money back in fries.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="mobile-only" style={{ 
        position: 'fixed', bottom: 0, left: 0, width: '100%', 
        backgroundColor: 'var(--black)', padding: '15px 20px',
        borderTop: '4px solid var(--yellow)', zIndex: 100,
        display: 'none'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
             <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '24px' }}>
                TOTAL: ${(item.price * quantity).toFixed(2)}
             </div>
          </div>
          <button 
            onClick={handleAddToCart}
            className="brutalist-button accent"
            style={{ padding: '10px 20px', minHeight: 'auto', fontSize: '18px' }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-only { display: block !important; }
          .section-padding { padding-bottom: 120px; }
        }
      `}</style>
    </div>
  );
};

export default ItemDetail;
