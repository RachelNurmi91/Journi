import { useRef, useEffect, useState } from "react";

function ItemCollapse({ flightData, itemIndex, expandedItem, handleExpand }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (itemIndex !== expandedItem) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [expandedItem, itemIndex]);

  const handleCollapse = () => {
    if (itemIndex === expandedItem) {
      handleExpand(null);
    } else {
      handleExpand(itemIndex);
    }
  };

  return (
    <>
      <div ref={inputRef} className="item-collapse" key={itemIndex}>
        <div className="row mb-2">
          <div className="col text-left">
            <span className="listItemMajor">{flightData?.airlineName}</span>
          </div>
          <div className="col text-center">{flightData?.airportName}</div>
          <div className="col">{flightData?.flightDate}</div>
        </div>

        <div
          className={`row ${
            isCollapsed ? "showMoreCollapsed" : "showMoreOpen"
          }`}
        >
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
