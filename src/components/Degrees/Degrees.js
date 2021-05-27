import React from "react";

const Degrees = (props) => {
  return (
    <div className="box-check-degrees">
      <div className="degree-icon">&deg;</div>
      {props.celsius && !props.fahrenheit ? (
        <>
          <div className="celsius active">C</div>
          <div className="fahrenheit" onClick={props.addActive}>
            F
          </div>
        </>
      ) : (
        <>
          <div className="celsius" onClick={props.addActive}>
            C
          </div>
          <div className="fahrenheit active">F</div>
        </>
      )}
    </div>
  );
};

export default Degrees;
