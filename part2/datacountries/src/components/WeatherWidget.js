import React, { useEffect } from "react";
import axios from 'axios';
import "../index.css";

const Weather = ({city, setWeather, weather}) => {
    const api_key = process.env.REACT_APP_WEATHER_KEY_OPEN;    
    const baseurl = "http://api.openweathermap.org/data/2.5/weather";
    // console.log(api_key);

    useEffect(() => {
        axios
          .get(baseurl, {
            params: { q: city[0], appid: api_key, units: "metric" },
          })
          .then((response) => {
            // console.log(response);
            // console.log(response);
            setWeather(response.data);
          })
          .catch((res) => {
            console.log(res);
          });
    }, []);

    console.log(weather);
    return weather !== [] ? (
      <>
        <p className="wdesc">{weather.weather[0].description}</p>
        <p>
          <strong>Temperature:</strong>{" "}
          {`${weather.main.temp} Celsius`}
        </p>
        <p>
          <img
            className="iconw"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].icon}
          />
        </p>
        <p>
          <strong>Wind:</strong> {`${weather.wind.speed} m/s`}
        </p>
      </>
    ) : (
      "Empty response"
    );
}

export default Weather;