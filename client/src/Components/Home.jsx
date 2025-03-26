import React from 'react';
import { Wallet, Users, LineChart, ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
 
  const features = [
    {
      icon: <LineChart className="icon-style" />,
      title: 'Smart Dashboard',
      description: 'Track your spending habits, view transaction history, and gain insights through interactive visualizations.'
    },
    {
      icon: <Users className="icon-style" />,
      title: 'Group Management',
      description: 'Easily manage shared expenses with friends and family. Split bills seamlessly and track group finances.'
    },
    {
      icon: <Wallet className="icon-style" />,
      title: 'Financial Insights',
      description: 'Get personalized financial insights and recommendations to help you make better money decisions.'
    }
  ];

  return (
    <>
      <Navbar/>
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="text-section">
              <h1 className="hero-title">
                Streamline Your Finances, Simplify Your Life
              </h1>
              <p className="hero-description">
                Redefine the way you manage your finances and elevate your financial well-being with iFinance.
                Experience comprehensive expense tracking and financial analysis that equips you with the knowledge 
                and resources needed to navigate today's dynamic economic landscape with confidence and clarity.
              </p>
              <div className="buttons">
                <Link to="/signup">
                <button className="btn-primary">

                  Explore Now
                  <ArrowRight className="icon-right" />
                </button>
                </Link>
                <Link to="/aboutus">
                <button className="btn-secondary">
                  Learn More
                </button>
                </Link>
              </div>
            </div>
            <div className="image-section">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
                  alt="Financial Dashboard"
                  className="main-image"
                />
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600"
                  alt="Financial Planning"
                  className="secondary-image"
                />
               
              </div>
            </div>
          </div>
         
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="features-content">
            <h2 className="features-title">How it Works</h2>
            <p className="features-description">Discover how iFinance transforms your financial management experience</p>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
