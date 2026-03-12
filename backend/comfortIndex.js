function calculateComfortIndex(temp, humidity, windSpeed, cloudiness) {

  const idealTemp = 22;

  const tempScore = Math.max(0, 40 - Math.abs(temp - idealTemp) * 2);
  const humidityScore = Math.max(0, 25 - humidity * 0.2);
  const windScore = Math.max(0, 20 - windSpeed * 2);
  const cloudScore = Math.max(0, 15 - cloudiness * 0.1);

  const score = tempScore + humidityScore + windScore + cloudScore;

  return Math.min(100, Math.max(0, score));
}

module.exports = { calculateComfortIndex };