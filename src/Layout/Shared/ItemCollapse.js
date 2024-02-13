import { useRef, useEffect, useState } from "react";

function ItemCollapse({ flightData, keyNo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null)
  const inputRef = useRef(null);

  const handleCollapse = () => {
    setFocusedInput(keyNo)
    
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
        {console.log(focusedInput, keyNo)}
      <div ref={inputRef} className="item-collapse" key={keyNo}>
        <div className="row mb-2">
          <div className="col text-left">
            <span className="listItemMajor">{flightData?.airlineName}</span>
          </div>
          <div className="col text-center">{flightData?.airportName}</div>
          <div className="col">{flightData?.flightDate}</div>
        </div>
        <div className="row showMore">
          <div onClick={() => handleCollapse(keyNo)}>{isCollapsed ? "+" : "-"}</div>
        </div>

        {!isCollapsed && (
          <div className="row showMoreContent">
            <div className="col ">
              <span className="fw-bold">Flight No. </span>

              {flightData?.flightNumber}
            </div>
            <div className="col text-center">
              <span className="fw-bold">Confirmation No. </span>

              {flightData?.flightNumber}
            </div>
            <div className="col">
              <span className="fw-bold">Seat </span>

              {flightData?.seatAssignment}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ItemCollapse;
