import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import logo from '../assets/spendio-logo.png';
import ThemeToggle from "../components/ThemeToggle";
import API_URL from "../config/api";


const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, values);
      localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
        <ThemeToggle />
      </div>
      <div className="auth-card fade-in">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <img src={logo} alt="SpendIO" style={{ height: '64px' }} />
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to manage your expenses</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: "1.5rem", textAlign: "left", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              style={{ paddingRight: "3rem" }}
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                padding: "0.25rem"
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }}>Login</button>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;