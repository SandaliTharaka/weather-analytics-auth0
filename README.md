# 🌦 Weather Analytics Dashboard

A full-stack weather analytics application that retrieves weather data from the OpenWeatherMap API, computes a custom Comfort Index Score, and displays ranked city insights in a responsive dashboard.

---

# 🚀 Features

- Fetch real-time weather data from OpenWeatherMap
- Custom Comfort Index Score calculation (0–100)
- Ranking cities from most comfortable to least comfortable
- Server-side caching for improved performance
- Responsive React dashboard
- Secure authentication using Auth0
- Search and sorting functionality
- Weather analytics cards UI

---

# 🛠 Tech Stack

Frontend
- React + TypeScript
- Auth0 authentication
- Responsive UI

Backend
- Node.js
- Express.js

API
- OpenWeatherMap API

Other
- Server-side caching
- REST API architecture


---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository
git clone https://github.com/SandaliTharaka/weather-analytics-auth0.git

---

## 2️⃣ Backend Setup
cd backend
npm install
node server.js

Backend runs on:
http://localhost:5000

---

## 3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

---

# 🔐 Authentication (Auth0)

Authentication is implemented using Auth0.

Only authenticated users can access the weather analytics dashboard.

Login flow:

1. User clicks login
2. Redirect to Auth0 login page
3. After authentication user is redirected back to the dashboard

---

# 🌡 Comfort Index Formula

A custom Comfort Index Score was designed to measure how comfortable weather conditions are for a human.

The score ranges from **0 to 100**.

The following parameters were used:

- Temperature
- Humidity
- Wind Speed
- Cloudiness

### Example Formula
Comfort Score = 100

[Temperature − 22] * 2

Humidity * 0.2

WindSpeed * 1.5

Cloudiness * 0.1

### Reasoning

Temperature around **20–24°C** is considered ideal for human comfort.

Humidity reduces comfort at high levels, while moderate wind improves comfort.

Cloudiness slightly reduces perceived comfort because it often indicates unstable weather.

The formula balances these variables to produce a score between **0 and 100**.

---

# 📊 Output

For each city the system displays:

- City Name
- Temperature
- Humidity
- Wind Speed
- Comfort Score
- Ranking position

Cities are sorted from **most comfortable to least comfortable**.

---

# ⚡ Caching Design

To improve performance and reduce API requests:

- Weather API responses are cached for **5 minutes**
- Cached responses are reused when available
- If cache expires, new data is fetched from OpenWeatherMap

This approach reduces:

- API rate usage
- Response latency

---

# ⚖ Trade-offs Considered

- Comfort Index formula simplified for readability
- Weather trends over time were not included due to API limits
- Only current weather conditions were analyzed

---

# ⚠ Known Limitations

- Comfort Index formula is heuristic and may vary by climate preferences
- Weather data depends on OpenWeatherMap API availability
- Cities list is limited to provided dataset

---

# ⭐ Bonus Features Implemented

- Sorting and filtering cities
- Responsive dashboard UI

---

# 📚 References

OpenWeatherMap API  
https://openweathermap.org/api

Auth0 Authentication  
https://auth0.com/docs

---

# 👨‍💻 Author

Sandali Perera