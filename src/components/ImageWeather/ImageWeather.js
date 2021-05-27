import React from "react";

import sun from "../../image/sun.svg";
import cloud from "../../image/cloud.svg";
import cloudy from "../../image/cloudy.svg";
import broken_cloudy from "../../image/broken_cloudy.svg";
import snowy from "../../image/snowy.svg";
import rainy from "../../image/rainy.svg";
import storm from "../../image/storm.svg";
import snowflake from "../../image/snowflake.svg";
import mist from "../../image/mist.svg";

const ImageWeather = (props) => {
  const { icon } = props.weather;

  return (
    <>
      {icon === "01d" || icon === "01n" ? (
        <img style={{ width: "100px" }} src={sun} alt="few clouds" />
      ) : icon === "02d" || icon === "02n" ? (
        <img style={{ width: "100px" }} src={cloudy} alt="few clouds" />
      ) : icon === "03d" || icon === "03n" ? (
        <img style={{ width: "100px" }} src={cloud} alt="few clouds" />
      ) : icon === "04d" || icon === "04n" ? (
        <img style={{ width: "100px" }} src={broken_cloudy} alt="few clouds" />
      ) : icon === "09d" || icon === "09n" ? (
        <img style={{ width: "100px" }} src={snowy} alt="few clouds" />
      ) : icon === "10d" || icon === "10n" ? (
        <img style={{ width: "100px" }} src={rainy} alt="few clouds" />
      ) : icon === "11d" || icon === "11n" ? (
        <img style={{ width: "100px" }} src={storm} alt="few clouds" />
      ) : icon === "13d" || icon === "13n" ? (
        <img style={{ width: "100px" }} src={snowflake} alt="few clouds" />
      ) : icon === "50d" || icon === "50n" ? (
        <img style={{ width: "100px" }} src={mist} alt="few clouds" />
      ) : null}
    </>
  );
};

export default ImageWeather;
