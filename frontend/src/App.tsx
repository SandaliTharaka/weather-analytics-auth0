import React from "react";
import "./styles/globals.css";
import Dashboard from "./pages/Dashboard";

import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Weather Analytics Dashboard</h2>
        <button onClick={() => loginWithRedirect()}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome {user?.name}</p>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>

      return <Dashboard />;
    </div>
  );
}

export default App;




