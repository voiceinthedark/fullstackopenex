import React, { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import axios from "axios";
import ListItems from "./components/ListItems";

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [param] = useState(["name"]);

  const handleFilterChange = (e) => {
    setCountry(e.target.value);
    // let filterArr = [...data];
    // setData(filterArr
    //   .filter(obj => {
    //     //console.log(obj["name"]["common"]);
    //     return obj["name"]["common"].indexOf(e.target.value.toLowerCase()) > -1;
    //     }));
    // console.log(filterArr);
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
        <ListItems search={search} data={data} />
      </ul>
    </div>
  );
}

export default App;
