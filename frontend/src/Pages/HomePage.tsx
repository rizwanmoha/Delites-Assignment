import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Highway Delite</h1>
          <p>India's largest digitally connected</p>
          <button className="cta-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-calendar-check"></i>
            <h3>Digitally Connected</h3>
            <p>The platform enables commuters to have real time location based verified highway services information</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user-md"></i>
            <h3>Our Motive</h3>
            <p>Data driven highway commerce platform dedicated to provide connected mobility experience to travellers, drivers & merchants.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-notes-medical"></i>
            <h3>Our Aim</h3>
            <p>Our aim is to cover all NHs and SHs and enable more than 10 lakh highway businesses to be digitally connected</p>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="cta-content">
          <h2>Join our team</h2>
          <p>Make highway travel a connected, safe and personalized experience.</p>
          <button className="cta-btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;