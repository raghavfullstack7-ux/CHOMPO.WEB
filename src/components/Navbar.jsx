import { ShoppingCart, User, Menu as MenuIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  
  return (
    <nav className="brutalist-border" style={{ backgroundColor: 'white', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000, marginBottom: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>CHOMPO</h1>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/menu" className="heading" style={{ textDecoration: 'none', color: 'inherit' }}>Menu</Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ color: 'var(--primary-color)' }} title="Admin Panel">
              <ShieldCheck size={28} />
            </Link>
          )}

          <Link to="/cart" style={{ position: 'relative', color: 'inherit' }}>
            <ShoppingCart size={28} />
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px', 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              borderRadius: '0', 
              padding: '2px 6px', 
              fontSize: '0.75rem',
              fontWeight: 'bold',
              border: '2px solid black'
            }}>{cartItems.length}</span>
          </Link>

          <Link to={user ? "/profile" : "/login"} style={{ color: 'inherit' }}>
            <User size={28} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
