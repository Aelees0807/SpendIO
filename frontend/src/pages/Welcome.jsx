
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Coins, Wallet, Activity } from "lucide-react";
import dashboardMockup from "../assets/dashboard_mockup.png";
import logo from "../assets/spendio-logo.png";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="welcome-page fade-in">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logo} alt="SpendIO Logo" style={{ height: '45px' }} />
            <span className="logo-text" style={{ fontSize: '1.5rem' }}>SpendIO</span>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-outline" style={{border: 'none'}}>Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section container">
        <div className="hero-text">
          <h1 className="hero-heading">
            Smart financial tracking <br/>
            <span className="gradient-text">for modern life.</span>
          </h1>
          <p className="hero-subtext">
            Take control of your finances with our intuitive expense tracker. 
            Monitor spending, set budgets, and achieve your financial goals.
          </p>
          <div className="cta-group">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Tracking Now <ArrowRight size={20} style={{marginLeft: 8}}/>
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
          
          <div className="stats-row">
            <div className="stat-item">
              <Activity size={24} className="stat-icon" />
              <span>Real-time Analytics</span>
            </div>
            <div className="stat-item">
              <Coins size={24} className="stat-icon" />
              <span>Expense Categorization</span>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          <img src={dashboardMockup} alt="App Dashboard" className="hero-mockup" />
          <div className="glow-effect"></div>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Welcome;

