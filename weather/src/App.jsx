import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import WeatherCard from "./components/WeatherCard";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const API_KEY = "YOUR_API_KEY"; // Define your API key here

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const alertThreshold = 35; // User-configurable threshold

  const fetchWeatherData = async () => {
    const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
    const requests = cities.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    );
    const responses = await Promise.all(requests);
    setWeatherData(responses.map(response => response.data));
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "16px", backgroundColor: "#1F2937", width: "100%", minHeight: "100vh" }}>
      <h1 style={{ color: "white", textAlign: "center" }}>Real-Time Weather Monitoring</h1>
      {weatherData && (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {weatherData.map((data, index) => (
            <WeatherCard key={index} city={data.name} weatherData={data} alertThreshold={alertThreshold} API_KEY={API_KEY} />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
