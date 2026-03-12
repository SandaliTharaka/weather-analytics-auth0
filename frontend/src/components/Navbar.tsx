import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const { user, logout, isLoading } = useAuth0();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Get user initials for fallback avatar
  const getInitials = (name?: string): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-icon">🌤️</span>
          <h1 className="navbar-title">Weather Analytics</h1>
        </div>

        <div className="navbar-user">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            disabled={isLoading}
          >
            {user?.picture && !imageError ? (
              <img
                src={user.picture}
                alt={user?.name}
                className="user-avatar"
                title={user?.name}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="user-avatar user-avatar-fallback">
                {getInitials(user?.name)}
              </div>
            )}
            <span className="user-name">{user?.name?.split(" ")[0]}</span>
            <span className={`dropdown-arrow ${showUserMenu ? "open" : ""}`}>
              ▼
            </span>
          </button>

          {showUserMenu && (
            <div className="user-menu">
              <div className="user-info">
                {user?.picture && !imageError ? (
                  <img
                    src={user.picture}
                    alt={user?.name}
                    className="user-info-avatar"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="user-info-avatar user-info-avatar-fallback">
                    {getInitials(user?.name)}
                  </div>
                )}
                <div className="user-details">
                  <p className="user-full-name">{user?.name}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>

              <button
                className="logout-button"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-tiny"></span>
                    Logging out...
                  </>
                ) : (
                  <>
                    <span>🚪</span>
                    Logout
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
