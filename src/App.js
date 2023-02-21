import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

const App = () => {
  const apiKey = "f6bf240486ef16659529eb6b159617bf";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState();

//time
  let time = new Date().toLocaleTimeString();
  const [ctime, setCTime] = useState(time);

  const getTime = () => {
    setCTime(time);
  };
  setInterval(getTime, 1000);

  const getWeather = (cityName) => {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("response", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getWeather("Bhilai");
  }, []);

  const handleINputSearch = (e) => {
    console.log(" value", e.target.value);
    setInputCity(e.target.value);
  };
  

  //date

  let d = new Date();
  let date = d.getDate();
  let month = d.toLocaleString("dafult", { month: "long" });
  let year = d.getFullYear();
  let day = d.toLocaleString("default", { weekday: "long" });

  return (
    <>
      <div className="col-md-12">
        <div className="weather-Bg">
          <h1 className="heading">Weather App</h1>
          <div className="d-grid gap-3 col-4 mt-4">
            <input
              type="text"
              className="form"
              onChange={handleINputSearch}
              value={inputCity}
            />
            <button
              onClick={() => {
                getWeather(inputCity);
              }}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12 text-center mt-4">
        <div className="shadow rounded weatherResultBox">
          <img
            src="https://static.meteoblue.com/assets/images/picto/07_day.svg"
            alt=""
            className="weatherIcon"
          />
          <br />
          <br />
          <div className="weatherCity">
            <h5>{data?.name}</h5>
          </div>

          <div className="weatherTemp">
            <h6>{(data?.main?.temp - 273.15).toFixed(2)}ºC </h6> <br />
          </div>

          <div className="date">
            <p>
              {day}, {month} {date}, {year}
            </p>
            <p>{ctime}</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default App;
