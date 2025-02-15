import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    console.log("Button clicked, fetching weather...");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      console.log("API Response:", response); // Check the full response object
      console.log("Response Data:", response.data); // Check the data property
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="border p-2 rounded"
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white ml-2 p-2 rounded"
      >
        Get Weather
      </button>
      {weather && (
        // If weather data is fetched, display it
        <div className="mt-5">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
