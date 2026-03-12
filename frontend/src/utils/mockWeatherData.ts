/**
 * Mock Weather Data Generator
 * Generates realistic 7-day temperature trends for demonstration
 */

export interface TemperatureDataPoint {
  time: string;
  date: string;
  dateObj: Date;
  temperature: number;
  hour: number;
}

/**
 * Generate 7-day hourly temperature trend data
 * Uses current temperature as baseline and creates realistic variations
 */
export const generateTemperatureTrend = (
  city: string,
  currentTemp: number,
  humidity: number,
): TemperatureDataPoint[] => {
  const data: TemperatureDataPoint[] = [];
  const now = new Date();

  // Generate 7 days of hourly data (168 points)
  for (let dayOffset = -7; dayOffset <= 0; dayOffset++) {
    for (let hour = 0; hour < 24; hour++) {
      const dateObj = new Date(now);
      dateObj.setDate(dateObj.getDate() + dayOffset);
      dateObj.setHours(hour, 0, 0, 0);

      // Calculate realistic temperature variations
      // Cooler at night (2-5 AM), warmer during day (2-4 PM)
      const hourFactorMin = 4; // Coldest around 4 AM
      const hourVariation =
        12 * Math.sin((hour - hourFactorMin) * (Math.PI / 12));

      // Daily variations based on humidity (humidity affects perceived temperature)
      const humidityFactor = (humidity / 100) * 2; // ±2°C based on humidity

      // Random daily offset that stays consistent per day
      const dayKey = dateObj.toDateString();
      const randomSeed = dayKey
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const dailyVariation = ((randomSeed % 50) - 25) / 10; // ±2.5°C per day

      // Small random fluctuations
      const randomTweak = (Math.random() - 0.5) * 1.5; // ±0.75°C

      // Calculate final temperature
      const temperature =
        currentTemp +
        hourVariation +
        humidityFactor +
        dailyVariation +
        randomTweak;

      // Format time for display
      const timeStr = `${hour.toString().padStart(2, "0")}:00`;
      const dateStr = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      data.push({
        time: timeStr,
        date: dateStr,
        dateObj,
        temperature: Math.round(temperature * 10) / 10, // Round to 1 decimal
        hour,
      });
    }
  }

  return data;
};

/**
 * Calculate statistics from temperature data
 */
export const calculateStats = (data: TemperatureDataPoint[]) => {
  const temperatures = data.map((p) => p.temperature);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);
  const avg =
    Math.round(
      (temperatures.reduce((a, b) => a + b, 0) / temperatures.length) * 10,
    ) / 10;

  return { min, max, avg };
};

/**
 * Get daily average temperatures for simpler data visualization
 */
export const getDailyAverages = (
  data: TemperatureDataPoint[],
): TemperatureDataPoint[] => {
  const dayMap = new Map<string, TemperatureDataPoint[]>();

  // Group by date
  data.forEach((point) => {
    const dateStr = point.date;
    if (!dayMap.has(dateStr)) {
      dayMap.set(dateStr, []);
    }
    dayMap.get(dateStr)!.push(point);
  });

  // Calculate daily averages
  return Array.from(dayMap.entries()).map(([dateStr, points]) => {
    const avgTemp =
      Math.round(
        (points.reduce((sum, p) => sum + p.temperature, 0) / points.length) *
          10,
      ) / 10;

    return {
      time: dateStr,
      date: dateStr,
      dateObj: points[0].dateObj,
      temperature: avgTemp,
      hour: 12, // Noon
    };
  });
};
