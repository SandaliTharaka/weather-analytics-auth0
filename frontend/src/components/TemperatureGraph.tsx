import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TemperatureDataPoint,
  getDailyAverages,
} from "../utils/mockWeatherData";
import "../styles/temperatureGraph.css";

interface TemperatureGraphProps {
  cityName: string;
  data: TemperatureDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{data.date}</p>
        <p className="value">{data.temperature}°C</p>
      </div>
    );
  }
  return null;
};

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({
  cityName,
  data,
}) => {
  // Get daily averages for cleaner visualization
  const dailyData = getDailyAverages(data);

  // Calculate min and max for better Y-axis scaling
  const temperatures = dailyData.map((d) => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures));
  const maxTemp = Math.ceil(Math.max(...temperatures));
  const padding = (maxTemp - minTemp) * 0.1;

  return (
    <div className="temperature-graph">
      <div className="graph-header">
        <h2 className="graph-title">7-Day Temperature Trend - {cityName}</h2>
        <p className="graph-subtitle">Daily average temperatures</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dailyData}
          margin={{ top: 5, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "var(--text-light)", fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
              fill: "var(--text-light)",
            }}
            domain={[minTemp - padding, maxTemp + padding]}
            tick={{ fill: "var(--text-light)", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: "var(--text-light)" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="var(--primary-color)"
            strokeWidth={3}
            dot={{ fill: "var(--primary-color)", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="graph-stats">
        <div className="stat-item">
          <span className="stat-label">Min:</span>
          <span className="stat-value">{minTemp}°C</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Max:</span>
          <span className="stat-value">{maxTemp}°C</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg:</span>
          <span className="stat-value">
            {Math.round(
              (temperatures.reduce((a, b) => a + b, 0) / temperatures.length) *
                10,
            ) / 10}
            °C
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureGraph;
