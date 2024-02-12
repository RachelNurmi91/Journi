import { useRef, useEffect, useState } from "react";
import "./styles.css";

function ItemCollapse({ flightData }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div ref={inputRef} className="item-collapse">
        <div className="row mb-2">
          <div className="col text-left">
            <span className="listItemMajor">{flightData?.airlineName}</span>
          </div>
          <div className="col text-center">{flightData?.airportName}</div>
          <div className="col">{flightData?.flightDate}</div>
        </div>
        <div className="row showMore">
          <div onClick={handleCollapse}>{isCollapsed ? "+" : "-"}</div>
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
