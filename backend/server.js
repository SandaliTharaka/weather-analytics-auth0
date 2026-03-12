const express = require("express");
const cors = require("cors");
const cities = require("./cities.json");
const { getWeatherByCityId } = require("./weatherService");

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  try {
    const results = [];

    for (const city of cities) {
      const data = await getWeatherByCityId(city.CityCode);

      if (data) {
        results.push({
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].description
        });
      }
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});