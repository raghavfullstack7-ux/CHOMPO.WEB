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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--s4)' }}>
                <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', margin: 0 }}>{item.name}</h1>
                <div className="price" style={{ 
                  backgroundColor: 'var(--yellow)', color: 'var(--black)',
                  padding: '10px 20px', border: '3px solid var(--black)',
                  transform: 'rotate(2deg)', alignSelf: 'center'
                }}>
                  ${item.price}
                </div>
              </div>
              
              <p style={{ marginTop: 'var(--s6)', fontSize: '18px', color: 'var(--gray-muted)', maxWidth: '700px' }}>
                {item.description}
              </p>

              <hr style={{ margin: 'var(--s7) 0', border: 'none', borderTop: '2px dashed var(--black)' }} />

              {/* Customizations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s7)' }}>
                {item.customizationOptions?.map(opt => (
                  <div key={opt.name}>
                    <h3 className="section-title" style={{ fontSize: '24px', marginBottom: 'var(--s4)' }}>
                      CHOOSE YOUR {opt.name}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--s4)' }}>
                      {opt.options.map(val => {
                        const isSelected = selectedOptions[opt.name] === val;
                        return (
                          <button
                            key={val}
                            onClick={() => handleOptionChange(opt.name, val)}
                            className="brutalist-card"
                            style={{ 
                              padding: 'var(--s4)', 
                              cursor: 'pointer',
                              backgroundColor: isSelected ? 'var(--yellow)' : 'var(--white)',
                              borderColor: isSelected ? 'var(--black)' : 'var(--black)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'none'
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>{val.toUpperCase()}</span>
                            {isSelected && <Check size={20} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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
