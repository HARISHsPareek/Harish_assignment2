import axios from 'axios';

export const fetchWeatherData = async (cities, apiKey) => {
  const promises = cities.map((city) =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  );
  const responses = await Promise.all(promises);
  return responses.map((response) => response.data);
};
