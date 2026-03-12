import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import WeatherCard from "../components/WeatherCard";
import { WeatherData } from "../types";
import "../styles/dashboard.css";

type SortBy = "rank" | "temperature" | "comfort";

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("rank");

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/weather");
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData[] = await response.json();
      setWeatherData(data);
      setFilteredData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = weatherData.filter((item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rank":
          return a.rank - b.rank;
        case "temperature":
          return b.temperature - a.temperature;
        case "comfort":
          return b.comfortScore - a.comfortScore;
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [searchQuery, sortBy, weatherData]);

  return (
    <div className="dashboard">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="dashboard-main">
        <div className="controls">
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value="rank">Comfort Rank</option>
              <option value="temperature">Temperature</option>
              <option value="comfort">Comfort Score</option>
            </select>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchWeatherData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchWeatherData}>Try Again</button>
          </div>
        )}

        {loading && !filteredData.length && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {!loading && filteredData.length === 0 && !error && (
          <div className="empty-state">
            <p>
              {searchQuery
                ? "No cities found matching your search"
                : "No weather data available"}
            </p>
          </div>
        )}

        {filteredData.length > 0 && (
          <div className="results-info">
            <p>
              Showing {filteredData.length} out of {weatherData.length} cities
            </p>
          </div>
        )}

        <div className="cards-grid">
          {filteredData.map((weather) => (
            <WeatherCard key={weather.city} weather={weather} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
