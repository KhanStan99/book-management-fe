import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavLink = ({
    to,
    children,
    icon,
  }: {
    to: string;
    children: React.ReactNode;
    icon: string;
  }) => (
    <Link to={to} className={isActive(to) ? 'active-link' : 'inactive-link'}>
      <span style={{ marginRight: 8, fontSize: 18 }}>{icon}</span>
      {children}
      {/* No background effect for active link */}
    </Link>
  );

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Beautiful Navigation */}
      <nav
        style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 64,
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexShrink: 0 }}>
                <h1
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#4b2995',
                    margin: 0,
                  }}
                >
                  📚 BookVerse
                </h1>
                <p style={{ fontSize: 12, color: '#888', marginTop: 0 }}>
                  Rental Management
                </p>
              </div>
            </div>

            {user && (
              <>
                {/* Navigation Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <NavLink to="/dashboard" icon="🏠">
                    Dashboard
                  </NavLink>
                  <NavLink to="/books" icon="📖">
                    Books
                  </NavLink>
                  <NavLink to="/users" icon="👥">
                    Users
                  </NavLink>
                  <NavLink to="/rentals" icon="📋">
                    Rentals
                  </NavLink>
                </div>
              </>
            )}

            {/* User Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {user && (
                <>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#222',
                          margin: 0,
                        }}
                      >
                        Welcome back!
                      </p>
                      <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
                        {user.name}
                      </p>
                    </div>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: 'linear-gradient(90deg,#7b2ff2,#f357a8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: 8,
                      color: '#fff',
                      background: 'linear-gradient(90deg,#f44336,#e040fb)',
                      fontWeight: 500,
                      fontSize: 14,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      marginLeft: 12,
                    }}
                  >
                    <span style={{ marginRight: 8 }}>🚪</span>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
