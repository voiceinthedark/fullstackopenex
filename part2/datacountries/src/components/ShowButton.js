import React from "react";

const ShowButton = ({setCountry, country}) => {

    const handleButtonClick = (e) => {
            //   axios
            //     .get("https://restcountries.com/v3.1/name/" + country)
            //     .then((result) => {
            //       console.log(result.status, result.data);
            //       setData(result.data);
            //     });
            // };
            console.log(country);
            setCountry(country);
    }           

    return (
        <button onClick={handleButtonClick}>Show</button>
    )
}

export default ShowButton;