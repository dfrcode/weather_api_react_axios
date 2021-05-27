import React from "react";

import UpdateCity from "./UpdateCity";
import Menu from "./Menu";

const Forms = (props) => {
  const { newCity, city, changeCityBtn } = props.state;
  const { updateCity, readCity } = props;

  return (
    <>
      {newCity ? (
        <UpdateCity city={city} updateCity={updateCity}/>
      ) : changeCityBtn ? (
        <Menu readCity={readCity}/>
      ) : null}
    </>
  );
};

export default Forms;
