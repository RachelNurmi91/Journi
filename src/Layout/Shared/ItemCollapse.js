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
      {console.log(flightData)}
      <div ref={inputRef} className="item-collapse">
        <div className="row">
          <div className="col">
            {flightData?.airlineName}
            <br />
            {flightData?.airportName}
          </div>
          <div className="col">{flightData?.flightDate}</div>
          <div className="col">{flightData?.seatAssignment}</div>
        </div>
        <div className="row showMore">
          <div onClick={handleCollapse}>{isCollapsed ? "+" : "-"}</div>
        </div>

        {!isCollapsed && (
          <div className="row showMoreContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            vel ultrices tortor. Aliquam iaculis aliquam urna. Vestibulum ut
            enim tincidunt, aliquam neque a, posuere felis. In mollis porta diam
            tempor vulputate. Sed cursus nibh turpis, a elementum enim bibendum
            eu. Nam aliquet erat eu elementum iaculis. In porta mollis ex.
          </div>
        )}
      </div>
    </>
  );
}

export default ItemCollapse;
