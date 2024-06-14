import React from 'react';
import './HomePage.css';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Doctor App</h1>
          <p>Your trusted healthcare companion</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-calendar-check"></i>
            <h3>Appointment Scheduling</h3>
            <p>Schedule appointments with doctors easily</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user-md"></i>
            <h3>Experienced Doctors</h3>
            <p>Access to a team of highly qualified doctors</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-notes-medical"></i>
            <h3>Medical Records</h3>
            <p>Securely store and access your medical records</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Join Doctor App Today</h2>
          <p>Experience the future of healthcare</p>
          <button className="cta-btn">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;