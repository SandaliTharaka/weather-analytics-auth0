import React from "react";
import { WeatherData } from "../types";
import "../styles/weatherCard.css";

interface WeatherCardProps {
  weather: WeatherData;
  onViewTrend?: (cityName: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onViewTrend }) => {
  const getComfortLevel = (score: number): string => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getComfortColor = (score: number): string => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "good";
    if (score >= 40) return "fair";
    return "poor";
  };

  return (
    <div className="weather-card">
      <div className="card-header">
        <h2 className="city-name">{weather.city}</h2>
        <span
          className={`rank-badge rank-${weather.rank > 5 ? "high" : "top"}`}
        >
          #{weather.rank}
        </span>
      </div>

      <div className="card-content">
        <div className="weather-main">
          <div className="temperature-section">
            <span className="temperature-value">
              {Math.round(weather.temperature)}°C
            </span>
            <span className="temperature-label">Temperature</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">
              {weather.windSpeed.toFixed(1)} m/s
            </span>
          </div>
        </div>

        <div className="comfort-section">
          <div className="comfort-header">
            <span className="comfort-label">Comfort Index</span>
          </div>
          <div className="comfort-bar-container">
            <div
              className={`comfort-bar comfort-bar-${getComfortColor(weather.comfortScore)}`}
              style={{ width: `${weather.comfortScore}%` }}
            ></div>
          </div>
          <div className="comfort-footer">
            <span className="comfort-score">
              {Math.round(weather.comfortScore)}/100
            </span>
            <span
              className={`comfort-level comfort-level-${getComfortColor(weather.comfortScore)}`}
            >
              {getComfortLevel(weather.comfortScore)}
            </span>
          </div>
        </div>

        <button
          className="view-trend-btn"
          onClick={() => onViewTrend?.(weather.city)}
          title="View 7-day temperature trend"
        >
          📈 View Trend
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
