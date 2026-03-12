const express = require("express");
const cors = require("cors");

const citiesData = require("./cities.json");
const { getWeatherByCityId } = require("./weatherService");
const { calculateComfortIndex } = require("./comfortIndex");

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  const cities = citiesData.List;
  const results = [];

  for (const city of cities) {
    const weather = await getWeatherByCityId(city.CityCode);

    if (weather) {
      const temp = weather.main.temp;
      const humidity = weather.main.humidity;
      const wind = weather.wind.speed;
      const clouds = weather.clouds.all;

      const score = calculateComfortIndex(temp, humidity, wind, clouds);

      results.push({
        city: weather.name,
        temperature: temp,
        humidity: humidity,
        windSpeed: wind,
        comfortScore: score,
      });
    }
  }

  // sort by comfort score
  results.sort((a, b) => b.comfortScore - a.comfortScore);

  // add ranking
  results.forEach((city, index) => {
    city.rank = index + 1;
  });

  res.json(results);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
