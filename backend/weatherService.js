const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

async function getWeatherByCityId(cityId) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
}

module.exports = { getWeatherByCityId };