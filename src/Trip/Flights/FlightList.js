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
            <div className="b18-mon primary-color text-center">
              {flight?.departureFlight?.departureAirportCity}
              <span className="mx-2">
                ---
                <FontAwesomeIcon
                  icon="fa-solid fa-plane"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {flight?.returnFlight?.returnAirportCity}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(flight?.departureFlight?.departureDate)}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Airline </div>
                <div>{flight?.airline}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Flight No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight?.departureFlight?.departureFlightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{flight?.departureFlight?.departureSeat}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Confirm. No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight.confirmationNo}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Departure </div>
                <div>
                  {flight?.departureFlight?.departureAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.departureFlight?.departureAirportCode})
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {flight?.returnFlight?.returnAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.returnFlight?.returnAirportCode})
                  </span>
                </div>
              </div>
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
          <div className="row mt-3">
            <div className="b18-mon primary-color text-center">
              {flight?.departureFlight?.departureAirportCity}
              <span className="mx-2">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-departure"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {flight?.returnFlight?.returnAirportCity}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(flight?.departureFlight?.departureDate)}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Airline </div>
                <div>{flight?.airline}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Flight No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight?.departureFlight?.departureFlightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{flight?.departureFlight?.departureSeat}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Confirm. No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight.confirmationNo}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Departure </div>
                <div>
                  {flight?.departureFlight?.departureAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.departureFlight?.departureAirportCode})
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {flight?.returnFlight?.returnAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.returnFlight?.returnAirportCode})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="slash" />

        <div className="container ">
          <div className="row mt-3">
            <div className="b18-mon primary-color text-center">
              {flight?.returnFlight?.returnAirportCity}

              <span className="mx-2">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-arrival"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {flight?.departureFlight?.departureAirportCity}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(flight?.returnFlight?.returnDate)}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Airline </div>
                <div>{flight?.airline}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Flight No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight?.returnFlight?.returnFlightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{flight?.returnFlight?.returnSeat}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="b16-mon">Confirm. No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight.confirmationNo}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Departure </div>
                <div>
                  {flight?.returnFlight?.returnAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.returnFlight?.returnAirportCode})
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {flight?.departureFlight?.departureAirportCity}{" "}
                  <span className="b13-mon">
                    ({flight?.departureFlight?.departureAirportCode})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="content-body flight-list">
        <Header title="Flights" icon="add" destination={"/flights/add"} />

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
