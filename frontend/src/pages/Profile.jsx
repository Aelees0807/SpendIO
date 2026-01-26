import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("hasVisited"); // Clear first-visit flag on logout
    navigate("/");
  };

  return (
    <div className="container fade-in">
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
         <button onClick={() => navigate("/dashboard")} className="btn btn-outline" style={{ border: 'none', display: 'flex', gap: '0.5rem', paddingLeft: 0 }}>
            <ArrowLeft size={20} /> Back to Dashboard
         </button>
         <ThemeToggle />
       </div>

       <div className="profile-container">
          <div className="profile-card">
             <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
             </div>
             <h1 className="profile-name">{user?.name}</h1>
             <p className="profile-email">{user?.email}</p>
             
             <button onClick={handleLogout} className="btn btn-primary" style={{ backgroundColor: 'var(--danger)', width: '100%', marginTop: '1rem' }}>
                <LogOut size={18} style={{ marginRight: '8px' }} />
                Logout
             </button>
          </div>
       </div>
    </div>
  );
};

export default Profile;
