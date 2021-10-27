import React, { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import axios from "axios";
import ListItems from "./components/ListItems";

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [param] = useState(["name"]);
  const [weather, setWeather] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (e) => {
    setCountry(e.target.value);    
  };

  const search = (items) => {
    return items.filter((item) => {
      return param.some((i) => {
        // console.log(item[i]["common"]);
        return (
          item[i]["common"].toString().toLowerCase().indexOf(country.toLowerCase()) > -1
        );
      });
    });
  };

  // console.log(search(data).map(item => item.name.common));

  useEffect(() => {
    console.log("loading data from source");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("response :>> ", response.status);
        // console.log(response.data);
        setData(response.data);
      })
      .catch((reason) => {
        console.log("Error:", reason);
      });
  }, []);

  

  return (
    <div>
      <Filter filterBy={country} handleFilterChange={handleFilterChange} />
      <ul>        
        <ListItems search={search} data={data} country={country} setCountry={setCountry} setWeather={setWeather} weather={weather} />
      </ul>
    </div>
  );
}

export default App;
