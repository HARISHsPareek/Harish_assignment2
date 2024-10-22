import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );
  
const WeatherCard = ({ city, weatherData, alertThreshold, API_KEY }) => {
  const { main, weather, coord } = weatherData;
  const [chartData, setChartData] = useState({});
  const [expanded, setExpanded] = useState(false); // State for card expansion

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const forecastAPI = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
      );
      const forecast = response.data.list;

      const labels = forecast.map((item) => item.dt_txt);
      const temperatures = forecast.map((item) => item.main.temp);

      setChartData({
        labels,
        datasets: [
          {
            label: "Temperature (K)",
            data: temperatures,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
            colors:"white",
            borderColor: "black",
            backgroundColor: "white",
            fill: true,
          },
        ],
      });

     
      if (main.temp > alertThreshold) {
        toast.warning(`Alert! Temperature in ${city} exceeded ${alertThreshold}°C`);
      }
    };

    forecastAPI();
  }, [coord.lat, coord.lon, main.temp, alertThreshold, API_KEY]);
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  return (
    <Card
  sx={{
    minWidth: 350,
    marginTop: "8px",
    marginBottom: "8px",
    cursor: "pointer",
    transition: "transform 0.3s",
    transform: expanded ? "scale(1.05)" : "scale(1)", // Updated for smooth scaling
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient background
    bgcolor: 'text.secondary',
     color: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    padding: "20px",
  }}
>

      <CardContent>
        <Typography variant="h5" component="div">
          {city}
          <img src={iconUrl} alt={weather[0].description} style={{ width: "80px", height: "80px" }} />
        </Typography>
        <Typography variant="subtitle1">{weather[0].description}</Typography>
        <Typography variant="h6">{main.temp}°C</Typography>
        <Typography variant="body2">Humidity: {main.humidity}%</Typography>
        <Typography variant="body2">Pressure: {main.pressure} hPa</Typography>
        <Box mt={2}>
            <Typography variant="subtitle2">Daily Summary:</Typography>
            <Typography variant="body2">Feels Like: {main.feels_like}°C</Typography>
            <Typography variant="body2">Min Temp: {main.temp_min}°C</Typography>
            <Typography variant="body2">Max Temp: {main.temp_max}°C</Typography>
            <Typography variant="body2">Humidity: {main.humidity}%</Typography>
            <Typography variant="body2">Pressure: {main.pressure} hPa</Typography>
        </Box>

        

        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {chartData && chartData.datasets && chartData.datasets.length > 0 && (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    colors:"white",
                    position: "top",
                  },
                  customCanvasBackgroundColor: {
                    color: 'lightGreen',
                  },
                  title: {
                    display: true,
                    text: "Temperature Forecast",
                    colors:"white",
                  },
                },
              }}
            />
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
