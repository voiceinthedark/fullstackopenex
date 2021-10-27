import React, { useEffect } from "react";
import axios from 'axios';

const Weather = ({city, setWeather, weather}) => {
    const api_key = process.env.REACT_APP_WEATHER_KEY;    
    console.log(api_key);

    useEffect(() => {
        axios.get("https://api.weatherbit.io/v2.0/current", {params: {key:api_key, city:city[0]}})
        .then(response => {
            console.log(response.status);            
            console.log(response.data.data[0].weather.description);
            setWeather(response.data);
        })
        .catch(res => {
            console.log(res);
        })
    }, []);

    console.log(weather);
    return ( weather !== [] ?
      (<>
        <p>{weather.data[0].weather.description}</p>
        <strong>Temperature:</strong> {`${weather.data[0].temp} Celsius`}
        <img
          src={`https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`}
          alt={weather.data[0].weather.code}
        />
        <strong>Wind:</strong> {`${weather.data[0].wind_spd} m/s`}
      </>)
      : "Empty response"
    );
}

export default Weather;