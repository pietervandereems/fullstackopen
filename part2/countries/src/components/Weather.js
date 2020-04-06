import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState({ main: { temp: 0 }, wind: { speed: 0, deg: 0 }, weather: [{ icon: '', value: '' }] });
  // openweathermap used, weatherstack.com kept giving errors about https usage not allowed with free account.
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&APPID=${apiKey}&units=metric`)
      .then(result => {
        console.log('weather', result);
        setWeatherData(result.data);
      });
  }, [apiKey, country]);


  return (
    <>
      <h2>Weather in {country.capital}</h2>
      temperature: {weatherData.main.temp} Celsius <br />
      {
        weatherData.weather[0].icon ?
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].value} /> :
          ''
      }<br />
      wind: {(weatherData.wind.speed * 3600 / 1000)} km/h in direction {weatherData.wind.deg}
    </>
  );

};

export default Weather;