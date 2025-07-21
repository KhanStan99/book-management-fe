import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';
import { authApi } from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      authApi.setAuthToken(token);
      setIsAuthenticated(true);
      // Optionally fetch user data
    }
    setLoading(false);
  }, []);

  const handleLogin = (token: string, userData: any) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    authApi.removeAuthToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout} user={user}>
        <Routes>
          <Route path="/" element={<div>Dashboard - Coming Soon</div>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/users" element={<div>Users - Coming Soon</div>} />
          <Route path="/rentals" element={<div>Rentals - Coming Soon</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
