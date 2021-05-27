import React from 'react'

import { FaLocationArrow } from "react-icons/fa";

const City = (props) => {
    return (
        <div className="box-city">
          <p className="city-name">{props.name}</p>
          <div className="btn-group">
            <input
              className="change-city"
              type="button"
              value="Сменить город"
              onClick={props.enterMenu}
            />
            <FaLocationArrow className="icon-location" />
            <input
              className="local-city"
              type="button"
              value="Мое местоположение"
              onClick={props.changedWeatherCityToLocal}
            />
          </div>
        </div>
    )
}

export default City
