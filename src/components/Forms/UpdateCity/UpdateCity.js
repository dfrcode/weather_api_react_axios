import React from "react";

const UpdateCity = (props) => {

    const { updateCity, city } = props;

  return (
    <form className="form-city" onSubmit={updateCity}>
      <input className="enter-city" type="text" placeholder={city} />
      <button className="btn-ok">Ok</button>
    </form>
  );
};

export default UpdateCity;
