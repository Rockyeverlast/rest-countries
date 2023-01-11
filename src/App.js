import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState(items);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("https://restcountries.com/v2/all");
        const data = await res.json();
        console.log(data);
        setItems(data);
        setFilteredData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = items.filter((data) => {
      // eslint-disable-next-line
      return data.name.search(value) != -1;
    });
    setFilteredData(result);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          placeContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for countries"
            // anytime the user types in the search box
            onChange={(event) => handleSearch(event)}
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          placeContent: "center",
          flexWrap: "wrap",
          width: "100p%",
          textAlign: "center",
        }}
      >
        {filteredData.map((value, index) => {
          return (
            <div
              key={value.alpha2Code}
              className="card"
              style={{ width: "400px" }}
            >
              <div>
                <img
                  src={value.flag}
                  alt={value.name}
                  style={{ width: "100px" }}
                />
              </div>
              <div style={{ display: "grid", placeConten: "center" }}>
                <h4 style={{ margin: "0px" }}>{value.name}</h4>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    population: <span>{value.population}</span>
                  </li>
                  <li>
                    Region: <span>{value.region}</span>
                  </li>
                  <li>
                    Capital: <span>{value.capital}</span>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
