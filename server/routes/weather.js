const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    console.log(`Received request for weather in city: ${city}`);

    const apikey = process.env.WEATHER_API_KEY;
    if (!apikey) {
      console.log("API key not found");
      return res.status(500).send("API Key is not set.");
    }
    console.log("Sending request to OpenWeather API...");
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    );
    console.log("Weather data fetched successfully:", response.data);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
