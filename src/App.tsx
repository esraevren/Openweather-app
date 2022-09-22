import React, { ChangeEvent, useState } from "react";
import { json } from "stream/consumers";
import sun from "./assets/sun.svg";
import snow from "./assets/snow.svg";
import snowbg from './assets/snowbg.jpg';
import sunnybg from './assets/sunnybg.jpg';
import defaultBackImg from "./assets/backImg.jpg";
import "./App.css";

const API_KEY = "1ffd9938245d1af65465834682d881b1";

function App() {
  const [backImg, setBackImg] = useState(defaultBackImg);
  const [searchText, setSearchText] = useState<string>();
  const [findCity, setFindCity] = useState<{ name: string; temp: number }>({
    name: "",
    temp: 0,
  });

  const fetchWeatherByCityName = () => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        searchText +
        "&appid=" +
        API_KEY +
        "&units=metric"
    )
      .then((res) => res.json())
      .then((json) => {
        setBackImg(json.main.temp > 0 ? sunnybg : snowbg)
        setFindCity({ name: json.name, temp: Math.round(json.main.temp) });
      });
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backImg})` }}>
      <div className="searchInput">
        <input
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
          placeholder="Hava durumunu öğrenmek istediğiniz şehri giriniz..."
        />
        <div>
          <button className="searchBtn" onClick={fetchWeatherByCityName}>
            Arama yap
          </button>
        </div>
      </div>

      {findCity.name != "" && (
        <div className="weatherWrapper">
          {findCity.name} hava durumu {findCity.temp} derece
          {findCity.temp > 0 ? <img src={sun} /> : <img src={snow} />}
        </div>
      )}
    </div>
  );
}

export default App;
