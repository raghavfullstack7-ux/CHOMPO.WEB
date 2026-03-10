import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Zap, Utensils } from 'lucide-react';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div className="container">
      <Banner />
      
      {/* Features Section */}
      <section className="section-padding" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="brutalist-card" style={{ backgroundColor: 'var(--primary-color)' }}>
          <Flame size={48} />
          <h2 style={{ marginTop: '1rem' }}>Fire Grilled</h2>
          <p style={{ marginTop: '1rem' }}>Our patties are kissed by actual flames. No shortcuts, just smoke and heat.</p>
        </div>
        <div className="brutalist-card" style={{ backgroundColor: 'var(--secondary-color)' }}>
          <Zap size={48} />
          <h2 style={{ marginTop: '1rem' }}>Lightning Fast</h2>
          <p style={{ marginTop: '1rem' }}>From order to table in record time. We don't believe in waiting for greatness.</p>
        </div>
        <div className="brutalist-card" style={{ backgroundColor: 'var(--dark-accent)', color: 'white' }}>
          <Utensils size={48} />
          <h2 style={{ marginTop: '1rem' }}>Bold Ingredients</h2>
          <p style={{ marginTop: '1rem' }}>Sourced from the best, prepared with the most brutal techniques known to man.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="brutalist-card" style={{ textAlign: 'center', backgroundColor: 'white' }}>
          <h2 style={{ fontSize: '3rem' }}>JOIN THE CLUB</h2>
          <p style={{ margin: '1rem 0' }}>Get 20% off your first order and exclusive access to our "Underground Menu".</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="brutalist-border" 
              style={{ padding: '0.75rem 1.5rem', width: '300px', outline: 'none' }}
            />
            <button className="brutalist-button">SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
