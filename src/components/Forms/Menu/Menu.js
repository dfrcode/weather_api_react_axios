import React from "react";

import { cities } from "../../../utils/cities";

const Menu = (props) => {
  const { readCity } = props;
  return (
    <ul className="list-city">
      {cities.map((item) => (
        <li
          className="list-city-item"
          key={item.id}
          onClick={() => readCity(item.city, cities)}
        >
          {item.city}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
