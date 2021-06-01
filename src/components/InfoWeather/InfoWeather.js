import React from "react";

import "./InfoWeather.css";

const InfoWeather = (props) => {
  const { speed, deg } = props.wind;
  const { humidity, pressure } = props.main;
  const { all } = props.clouds;

  return (
    <div className="list-city-info-weather">
      <ul>
        <li>
          <p className="title">Ветер</p>
          <p className="description">
            {Math.floor(speed)} м/с,{" "}
            {deg === 0
              ? "западный"
              : deg > 0 && deg < 90
              ? "северо-западный"
              : deg === 90
              ? "северный"
              : deg > 90 && deg < 180
              ? "северо-восточный"
              : deg === 180
              ? "восточный"
              : deg > 180 && deg < 270
              ? "юго-восточный"
              : deg === 270
              ? "южный"
              : deg > 270 && deg < 360
              ? "юго-западный"
              : null}
          </p>
        </li>
        <li>
          <p className="title">Давление</p>
          <p className="description">
            {Math.floor((pressure / 133) * 100)} мм рт.ст.
          </p>
        </li>
        <li>
          <p className="title">Влажность</p>
          <p className="description">{Math.floor(humidity)}%</p>
        </li>
        <li>
          <p className="title">Вероятность дождя</p>
          <p className="description">{Math.floor(100 - all)}%</p>
        </li>
      </ul>
    </div>
  );
};

export default InfoWeather;
