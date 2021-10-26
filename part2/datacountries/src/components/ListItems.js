import React from "react";

const ListItems = ({ search, data }) => {
  const sr = search(data);

  const getLanguage = (cntry) => {  
      let languages = [];     
         for(let l in cntry)
         {
        //    console.log(cntry[l]);
           languages.push(cntry[l]);
         }   
         return languages;
  }

  return (
    <>
      {sr.length > 10
        ? "Too many results, please refine your search"
        : sr.length === 1
        ? sr.map((item) => {
            return (
              <div key={item.name.common}>
                <h1>{item.name.common}</h1>
                <ul>
                  <li>capital {item.capital+" "}</li>
                  <li>population {item.population}</li>
                </ul>
                <h2>Languages</h2>
                <ul>
                {getLanguage(item.languages)
                    .map(l => <li key={l}>{l}</li>)}
                </ul>
                <p><img src={item.flags.png} alt={item.name.common} /></p>
              </div>
            );
          })
        : sr.map((item) => {
            return <li key={item.name.common}>{item.name.common}</li>;
          })}
    </>
  );
};

export default ListItems;
