import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { fetchMenuItems } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    const getAddons = async () => {
      try {
        const { data } = await fetchMenuItems();
        // Just take a few sides/desserts as addons
        setAddons(data.data.menuItems.filter(item => ['sides', 'desserts'].includes(item.category)).slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    getAddons();
  }, []);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '10vw' }}>EMPTY HAUL</h1>
        <p className="heading" style={{ fontSize: '24px', margin: '2rem 0' }}>Your stomach is judging you.</p>
        <Link to="/menu" className="brutalist-button accent">GO FILL IT UP</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--yellow)', padding: 'var(--s8) 0', borderBottom: '4px solid var(--black)' }}>
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: 'clamp(52px, 12vw, 120px)' }}>YOUR<br />HAUL.</h1>
        </div>
      </section>

      <div className="container section-padding">
        <div className="grid grid-cols-mobile-1 grid-cols-desktop-3" style={{ gap: 'var(--s8)', alignItems: 'start' }}>
          
          {/* Item List */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div 
                    layout
                    key={`${item.product._id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="brutalist-card" 
                    style={{ 
                      display: 'flex', 
                      gap: 'var(--s5)', 
                      padding: 'var(--s4)',
                      backgroundColor: 'var(--black-soft)',
                      color: 'var(--cream)',
                      border: '3px solid var(--yellow)'
                    }}
                  >
                    <div style={{ width: '120px', height: '120px', flexShrink: 0 }}>
                      <img src={item.product.image} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '2px solid var(--yellow)' }} />
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 className="card-title" style={{ fontSize: '24px' }}>{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(index)}
                          style={{ background: 'none', border: 'none', color: 'var(--red-hot)', cursor: 'pointer' }}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
                        {item.customizations.map((c, i) => (
                          <span key={i} style={{ 
                            fontSize: '10px', 
                            padding: '2px 6px', 
                            backgroundColor: 'white', 
                            color: 'black',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 800
                          }}>{c.split(': ')[1] || c}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div className="brutalist-border" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', color: 'black', height: '36px' }}>
                          <button onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))} style={{ padding: '0 10px', border: 'none', background: 'none' }}><Minus size={14}/></button>
                          <span style={{ padding: '0 10px', fontWeight: 900 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, item.quantity + 1)} style={{ padding: '0 10px', border: 'none', background: 'none' }}><Plus size={14}/></button>
                        </div>
                        <span className="price" style={{ color: 'var(--yellow)', fontSize: '24px' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Impulse Scroller */}
            <div style={{ marginTop: 'var(--s9)' }}>
              <h3 className="section-title" style={{ fontSize: '24px', marginBottom: 'var(--s5)' }}>WANT TO ADD MORE?</h3>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--s5)', 
                overflowX: 'auto', 
                paddingBottom: 'var(--s4)',
                scrollSnapType: 'x mandatory'
              }} className="hide-scrollbar">
                {addons.map(side => (
                  <Link 
                    key={side._id} 
                    to={`/menu/${side._id}`}
                    style={{ 
                      minWidth: '160px', 
                      textDecoration: 'none', 
                      color: 'inherit',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <div className="brutalist-card" style={{ padding: 'var(--s3)', textAlign: 'center' }}>
                      <img src={side.image} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', marginTop: '8px' }}>{side.name}</h4>
                      <p className="price" style={{ fontSize: '18px' }}>${side.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bag Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div 
              className="brutalist-card" 
              style={{ 
                backgroundColor: 'var(--yellow)', 
                padding: 'var(--s6)',
                borderWidth: '5px',
                boxShadow: '8px 8px 0 var(--black)'
              }}
            >
              <h2 className="section-title" style={{ fontSize: '32px', marginBottom: 'var(--s5)' }}>BAG SUMMARY</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)', marginBottom: 'var(--s6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '20px' }}>
                  <span>SUBTOTAL</span>
                  <span>${cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '20px' }}>
                  <span>DELIVERY FEE</span>
                  <span>$5.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '20px' }}>
                  <span>GST (18%)</span>
                  <span>${(parseFloat(cartTotal) * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <div style={{ borderTop: '4px solid var(--black)', paddingTop: 'var(--s4)', marginBottom: 'var(--s7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="hero-title" style={{ fontSize: '24px' }}>TOTAL</span>
                  <span className="hero-title" style={{ fontSize: '48px' }}>${(parseFloat(cartTotal) * 1.18 + 5).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="brutalist-button" 
                style={{ 
                  width: '100%', 
                  padding: '1.5rem', 
                  fontSize: '24px',
                  backgroundColor: 'var(--black)',
                  color: 'var(--yellow)'
                }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={28} style={{ marginLeft: '10px' }} />
              </button>
            </div>

            <div style={{ marginTop: 'var(--s6)', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', opacity: 0.6 }}>
               <Hash size={16} /> <span style={{ fontSize: '12px', fontWeight: 800 }}>TRANSACTION SECURED BY CHOMPO-CORE</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Cart;
