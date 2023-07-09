import React, { useEffect, useState } from 'react';
import {search, clear, clouds, drizzle, rain, snow, mist, humidity, wind} from './assets';
import './App.css';

const API_key = "e3801b78e19bd4f12f450c851c54b4f3";

const weatherIcons = {
    '01': clear, // Clear sky
    '02': clouds, // Few clouds
    '03': clouds, // Scattered clouds
    '04': clouds, // Broken clouds
    '09': drizzle, // Shower rain
    '10': rain, // Rain
    '11': rain, // Thunderstorm
    '13': snow, // Snow
    '50': mist // Mist
  };
  
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('berlin'); // Default city is Berlin

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_key}`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const City = result.name;
        const Humidity = result.main.humidity;
        const Temp = result.main.temp;
        const Wind = result.wind.speed;
        const WeatherCode= result.weather[0].icon.slice(0, 2);

        setWeatherData({
            city: City,
            humidity: Humidity,
            temperature: Temp,
            wind: Wind,
            weatherCode: WeatherCode,
        });
      })
      .catch((error) => {
        console.log('Error fetching weather data:', error);
      });
  };

  const handleSearch = () => {
    fetchWeather();
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
  };

  return (
    <div>
      <h1>Wetter App</h1>
      <div className="card">
        <div className="search">
          <input type="text" placeholder="Stadt eingeben" value={city} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <button onClick={handleSearch}>
            <img src={search} alt="search" />
          </button>
        </div>
        <div className="weather">
          <img src={weatherIcons[weatherData ? weatherData.weatherCode : "01"]} alt="" className="weather-icon" />
          <h1 className="temp">{weatherData ? `${weatherData.temperature}°C` : 'Loading...'}</h1>
          <h2 className="city">{weatherData ? weatherData.city : ''}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <p className="humidity">{weatherData ? `${weatherData.humidity}%` : 'Loading...'}<br />Humidity</p>
            </div>
            <div className="col">
              <img src={wind} alt="wind" />
              <p className="wind">{weatherData ? `${weatherData.wind} km/h` : 'Loading...'}<br />Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
