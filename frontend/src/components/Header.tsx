import React from "react";
import "../styles/header.css";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Weather Analytics</h1>
          <p className="header-subtitle">
            Global Weather Comfort Index Dashboard
          </p>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by city name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
