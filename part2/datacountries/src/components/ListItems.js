import React from "react";
import ShowButton from "./ShowButton";
import Weather from "./WeatherWidget";

export const ListItem = ({ search, items, getLanguage, setWeather, weather }) => {
  return search(items).map((item) => {
    return (
      <div key={item.name.common}>
        <h1>{item.name.common}</h1>
        <ul>
          <li>capital {item.capital + " "}</li>
          <li>population {item.population}</li>
        </ul>
        <h2>Languages</h2>
        <ul>
          {getLanguage(item.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p>
          <img src={item.flags.png} alt={item.name.common} />
        </p>
        <h2>Weather in {item.capital}</h2>
        <Weather city={item.capital} setWeather={setWeather} weather={weather} />
      </div>
    );
  });
};

export const getLanguage = (cntry) => {
  let languages = [];
  for (let l in cntry) {
    //    console.log(cntry[l]);
    languages.push(cntry[l]);
  }
  return languages;
};

const ListItems = ({ search, data, setCountry, setWeather, weather }) => {
  const sr = search(data);  

  return (
    <>
      {sr.length > 10 ? (
        "Too many results, please refine your search"
      ) : sr.length === 1 ? (
        <ListItem search={search} items={data} getLanguage={getLanguage} setWeather={setWeather} weather={weather} />
      ) : (
        sr.map((item) => {
          return (
            <li key={item.name.official}>
              {item.name.common}{" "}
              <ShowButton setCountry={setCountry} country={item.name.common} />
            </li>
          );
        })
      )}
    </>
  );
};

export default ListItems;
