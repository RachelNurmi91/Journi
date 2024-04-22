import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";

function FlightList({ flightListData }) {
  const [sortedFlights, setSortedFlights] = useState([]);

  const sortByDate = useCallback(() => {
    let flights = flightListData;

    if (flights && flights.length > 10) {
      flights.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    }

    setSortedFlights([...flights]);
  }, [flightListData]);

  useEffect(() => {
    sortByDate();
  }, [flightListData, sortByDate]);

  const displayFlights = () => {
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
      <div className="shadow-box p-4 my-4" key={index}>
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
              {Methods.formatDate(flight?.departureFlight?.departureDate)}
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
                {flight?.returnFlight?.returnAirportCode}
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
    return (
      <div className="shadow-box p-4 my-4" key={index}>
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
              {Methods.formatDate(flight?.departureFlight?.departureDate)}
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
              {Methods.formatDate(flight?.returnFlight?.returnDate)}
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
        <Header title="Flights" />
        <div className="mb-4">
          <Button label={addLabel()} destination={"/flights/add"} />
        </div>

        {displayFlights()}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.activeTrip?.flights,
  };
}

export default connect(mapStateToProps)(FlightList);
