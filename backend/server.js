const express = require("express");
const cors = require("cors");

const citiesData = require("./cities.json");
const { getWeatherByCityId } = require("./weatherService");
const { calculateComfortIndex } = require("./comfortIndex");
const cache = require("./cache");

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {

  const cachedData = cache.get("weatherData");

  if (cachedData) {
    console.log("CACHE HIT");
    return res.json(cachedData);
  }

  console.log("CACHE MISS");

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
        comfortScore: score
      });

    }
  }

  results.sort((a,b)=>b.comfortScore-a.comfortScore);

  results.forEach((city,index)=>{
    city.rank=index+1;
  });

  cache.set("weatherData", results);

  res.json(results);
});
// Endpoint to check cache status
app.get("/cache-status", (req, res) => {

  const cachedData = cache.get("weatherData");

  if (cachedData) {
    res.json({ cache: "HIT" });
  } else {
    res.json({ cache: "MISS" });
  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
