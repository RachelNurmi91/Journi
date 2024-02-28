import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemCollapse from "../../Shared/UI/ItemCollapse";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";

function FlightList({ flightListData }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const [sortedFlights, setSortedFlights] = useState([]);

  useEffect(() => {
    sortByDate();
  }, [flightListData]);

  const sortByDate = () => {
    let flights = flightListData;
    console.log(flightListData);

    if (flights && flights.length > 10) {
      flights.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    }

    setSortedFlights(flights || []);
  };

  const handleExpand = (itemIndex) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === itemIndex ? null : itemIndex
    );
  };

  const displayFlights = () => {
    console.log("sorted: ", sortedFlights);
    return sortedFlights.map((flight, index) => {
      if (flight.type === "oneway") {
        return renderOnewayFlight(flight, index);
      } else {
        return renderRoundtripFlight(flight, index);
      }
    });
  };

  const renderOnewayFlight = (flight, index) => {
    return (
      <div className="shadow-box p3-per my-4" key="index">
        <div className="container">
          <div className="row">
            <span className="float-right b16-mon">
              <FontAwesomeIcon
                icon="fa-solid fa-plane-departure"
                style={{ color: "#0bb6c0" }}
              />
              Departure Flight
            </span>
          </div>
          <div className="row flight-list-info">
            <div className="col d-flex justify-content-start b22-mon">
              {flight?.flightDate}
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">{flight?.airline}</span> <br />
                {flight?.airport}
              </div>
              <div className="align-items-self">----</div>
              <div className="float-right">
                <span className="b16-mon">New York </span>
                <br />
                NY
              </div>
            </div>
            <div className="col text-center">Emirates</div>
            <div className="col b16-mon d-flex justify-content-end"> 23C</div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index) => {
    return (
      <div className="shadow-box p3-per" key="index">
        <div className="container ">
          <div className="row">
            <span className="float-right b16-mon">
              <FontAwesomeIcon
                icon="fa-solid fa-plane-departure"
                style={{ color: "#0bb6c0" }}
              />
              Departure Flight
            </span>
          </div>
          <div className="row flight-list-info">
            <div className="col d-flex justify-content-start b22-mon">
              Sun, 24 Feb 2024
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">Tokyo</span> <br />
                TYO
              </div>
              <div className="align-items-self">----</div>
              <div className="float-right">
                <span className="b16-mon">New York </span>
                <br />
                NY
              </div>
            </div>
            <div className="col text-center">Emirates</div>
            <div className="col b16-mon d-flex justify-content-end"> 23C</div>
          </div>
        </div>
        <hr className="dashed m-3" />
        <div className="container">
          <div className="row">
            <span className="float-right b16-mon">
              <FontAwesomeIcon
                icon="fa-solid fa-plane-arrival"
                style={{ color: "#0bb6c0" }}
              />
              Return Flight
            </span>
          </div>
          <div className="row flight-list-info">
            <div className="col d-flex justify-content-start b22-mon">
              Tue, 29 Mar 2024
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">New York</span> <br />
                NY
              </div>
              <div className="align-items-self">----</div>
              <div className="float-right">
                <span className="b16-mon">Tokyo</span>
                <br />
                TYK
              </div>
            </div>
            <div className="col text-center">Emirates</div>
            <div className="col b16-mon d-flex justify-content-end"> 23C</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="content-body add-flight">
        {displayFlights()}
        <Button label="Add New" destination={"/flights/add"} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.activeTrip?.tripData?.flights,
  };
}

export default connect(mapStateToProps)(FlightList);
