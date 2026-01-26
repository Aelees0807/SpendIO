import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

// Component to handle root path logic
const RootRedirect = () => {
  const user = localStorage.getItem("user");

  // If user is logged in, go to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is logged out, always show welcome page
  return <Navigate to="/welcome" replace />;
};

function App() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;