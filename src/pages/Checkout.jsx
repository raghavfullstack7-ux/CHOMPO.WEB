import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShoppingBag, CreditCard, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Card');

  const total = (parseFloat(cartTotal) * 1.18 + 5).toFixed(2);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.image,
          price: item.product.price,
          customizations: item.customizations,
          product: item.product._id
        })),
        shippingAddress: {
          address: address.street,
          city: address.city,
          postalCode: address.postalCode,
          phone: address.phone
        },
        paymentMethod: paymentMethod,
        totalPrice: parseFloat(total)
      };

      const { data } = await createOrder(orderData);
      clearCart();
      navigate(`/order/${data.data.order._id}`);
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', padding: 'var(--s8) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s9)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '24px', left: 0, width: '100%', height: '4px', backgroundColor: 'var(--black)', zIndex: 1 }}></div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              zIndex: 2, 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              backgroundColor: step >= i ? 'var(--yellow)' : 'var(--white)',
              border: '4px solid var(--black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '24px'
            }}>
              {step > i ? <CheckCircle size={24} /> : i}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)' }}
            >
              <h2 className="section-title" style={{ marginBottom: 'var(--s6)' }}><MapPin style={{ marginRight: '10px' }} /> DELIVERY INTEL</h2>
              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--s4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>STREET ADDRESS</label>
                  <input 
                    className="brutalist-border" 
                    style={{ padding: '15px' }} 
                    value={address.street}
                    onChange={e => setAddress({...address, street: e.target.value})}
                    placeholder="Where are we dropping the goods?"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>CITY</label>
                    <input className="brutalist-border" style={{ padding: '15px' }} value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>POSTAL CODE</label>
                    <input className="brutalist-border" style={{ padding: '15px' }} value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>PHONE NUMBER</label>
                  <input className="brutalist-border" style={{ padding: '15px' }} value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                </div>
              </div>
              <button 
                onClick={handleNext} 
                disabled={!address.street || !address.city || !address.phone}
                className="brutalist-button" 
                style={{ marginTop: 'var(--s7)', width: '100%' }}
              >
                NEXT STEP <ChevronRight size={24} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)' }}
            >
              <h2 className="section-title" style={{ marginBottom: 'var(--s6)' }}><ShoppingBag style={{ marginRight: '10px' }} /> REVIEW HAUL</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                {cartItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed var(--black)', paddingBottom: '10px' }}>
                    <div>
                      <span style={{ fontWeight: 800 }}>{item.quantity}x</span> {item.product.name}
                      <div style={{ fontSize: '10px', opacity: 0.6 }}>{item.customizations.join(', ')}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'var(--s6)', padding: 'var(--s4)', backgroundColor: 'var(--yellow)', border: '3px solid var(--black)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '24px' }}>
                    <span>TOTAL PAYABLE</span>
                    <span>${total}</span>
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--s4)', marginTop: 'var(--s7)' }}>
                <button onClick={handleBack} className="brutalist-button accent" style={{ background: 'white' }}>BACK</button>
                <button onClick={handleNext} className="brutalist-button">LOOKS GOOD <ChevronRight size={24} /></button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="brutalist-card"
              style={{ padding: 'var(--s7)', backgroundColor: 'var(--white)' }}
            >
              <h2 className="section-title" style={{ marginBottom: 'var(--s6)' }}><CreditCard style={{ marginRight: '10px' }} /> SECURE PAYMENT</h2>
              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--s4)' }}>
                {['Card', 'UPI', 'COD'].map(method => (
                  <button 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className="brutalist-card"
                    style={{ 
                      padding: '20px', 
                      textAlign: 'left', 
                      backgroundColor: paymentMethod === method ? 'var(--yellow)' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>{method.toUpperCase()}</span>
                    {paymentMethod === method && <CheckCircle size={24} />}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--s4)', marginTop: 'var(--s7)' }}>
                <button onClick={handleBack} className="brutalist-button accent" style={{ background: 'white' }}>BACK</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="brutalist-button" 
                  style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)' }}
                >
                  {loading ? 'PROCESSING...' : `PAY $${total}`}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
