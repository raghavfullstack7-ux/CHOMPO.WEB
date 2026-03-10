import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

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
          address: '123 Test St', // Placeholder for now
          city: 'Flavor City',
          postalCode: '12345',
          phone: '555-0199'
        },
        paymentMethod: 'Card',
        totalPrice: parseFloat(cartTotal)
      };

      const { data } = await createOrder(orderData);
      clearCart();
      navigate(`/order/${data.data.order._id}`);
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>YOUR CART IS VOID</h1>
        <Link to="/menu" className="brutalist-button">GO FILL IT UP</Link>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <h1 style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '4rem' }}>YOUR <br /> HAUL.</h1>

      <div className="cart-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {cartItems.map((item, index) => (
              <motion.div 
                layout
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="brutalist-card" 
                style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '1rem' }}
              >
                <img src={item.product.image} style={{ width: '120px', height: '120px', objectFit: 'cover', border: 'var(--border-width) solid black' }} />
                <div style={{ flex: 1 }}>
                  <h3 className="heading" style={{ fontSize: '1.5rem' }}>{item.product.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {item.customizations.map((c, i) => (
                      <span key={i} className="glass" style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: '#eee' }}>{c}</span>
                    ))}
                  </div>
                  <p className="heading" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{item.quantity} x ${item.product.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="brutalist-button secondary" 
                  style={{ padding: '0.75rem' }}
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="brutalist-card glass" style={{ backgroundColor: 'var(--accent-color)', position: 'sticky', top: '2rem' }}>
          <h2 className="heading" style={{ fontSize: '2rem', marginBottom: '2rem' }}>SUMMARY</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <span>SUBTOTAL</span>
            <span className="heading">${cartTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            <span>EST. DELIVERY</span>
            <span className="heading">$5.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', borderTop: 'var(--border-width) solid black', paddingTop: '1.5rem' }}>
            <span className="heading" style={{ fontSize: '1.5rem' }}>TOTAL</span>
            <span className="heading" style={{ fontSize: '2.5rem' }}>${(parseFloat(cartTotal) + 5).toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="brutalist-button" 
            style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem' }}
          >
            CONFIRM ORDER <ArrowRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
