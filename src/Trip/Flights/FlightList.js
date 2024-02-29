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

    if (flights && flights.length > 10) {
      flights.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    }

    setSortedFlights(flights || []);
  };

  const getDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    // Define the days of the week and months
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the components of the date
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Return the formatted date string
    return `${dayOfWeek}, ${day} ${month} ${year}`;
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
              {getDate(flight?.departureFlight?.departureDate)}
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">
                  {flight?.departureFlight?.departureAirportCity}
                </span>
                <br />({flight?.departureFlight?.departureAirportCode})
              </div>
              <div className="align-items-self px-3">to</div>
              <div className="float-right">
                <span className="b16-mon">
                  {flight?.returnFlight?.returnAirportCity}
                </span>
                <br />
                {flight?.returnAirportCode}
              </div>
            </div>
            <div className="col text-center">{flight?.airline}</div>
            <div className="col b16-mon d-flex justify-content-end">
              {flight?.departureFlight?.departureSeat}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index) => {
    console.log(flight);
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
              {getDate(flight?.departureFlight?.departureDate)}
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">
                  {flight?.departureFlight?.departureAirportCity}
                </span>{" "}
                <br />({flight?.departureFlight?.departureAirportCode})
              </div>
              <div className="align-items-self">----</div>
              <div className="float-right">
                <span className="b16-mon">
                  {flight?.returnFlight?.returnAirportCity}{" "}
                </span>
                <br />({flight?.returnFlight?.returnAirportCode})
              </div>
            </div>
            <div className="col text-center">{flight?.airline}</div>
            <div className="col b16-mon d-flex justify-content-end">
              {" "}
              {flight?.departureFlight?.departureSeat}
            </div>
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
              {getDate(flight?.returnFlight?.returnDate)}
            </div>
            <div className="col d-flex justify-content-center">
              <div className="float-left">
                <span className="b16-mon">
                  {flight?.returnFlight?.returnAirportCity}
                </span>{" "}
                <br />({flight?.returnFlight?.returnAirportCode})
              </div>
              <div className="align-items-self">----</div>
              <div className="float-right">
                <span className="b16-mon">
                  {flight?.departureFlight?.departureAirportCity}{" "}
                </span>
                <br />({flight?.departureFlight?.departureAirportCode})
              </div>
            </div>
            <div className="col text-center">{flight?.airline}</div>
            <div className="col b16-mon d-flex justify-content-end">
              {" "}
              {flight?.returnFlight?.returnSeat}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const addLabel = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#fff" }} />{" "}
        Add New
      </>
    );
  };

  return (
    <>
      <div className="content-body flight-list">
        <div className="row mb-4 w-25" align="right">
          <Button label={addLabel()} destination={"/flights/add"} />
        </div>

        {displayFlights()}
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
