import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/login.css";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🌤️</div>
          <h1 className="login-title">Weather Analytics</h1>
          <p className="login-subtitle">
            Global Weather Comfort Index Dashboard
          </p>
        </div>

        <div className="login-content">
          <p className="login-description">
            Access real-time weather data and comfort analysis for cities
            worldwide. Sign in to get started.
          </p>

          <button
            className="login-button"
            onClick={() => loginWithRedirect()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-small"></span>
                Signing in...
              </>
            ) : (
              <>
                <span className="login-icon-button">🔐</span>
                Sign In with Auth0
              </>
            )}
          </button>

          <p className="login-footer">
            This app uses Auth0 for secure authentication.
          </p>
        </div>
      </div>

      <div className="login-background">
        <div className="weather-animation">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="sun"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
