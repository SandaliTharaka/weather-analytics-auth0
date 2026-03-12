import React from "react";
import "./styles/globals.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="app">
      <Navbar />
      <Dashboard />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;




