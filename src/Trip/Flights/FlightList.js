import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";

function FlightList({ flightListData, test }) {
  const [sortedFlights, setSortedFlights] = useState([]);

  const sortByDate = useCallback(() => {
    let flights = [...flightListData];

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
  }, [sortByDate]);

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
    const departureFlight = flight?.departureFlight?.[0];
    const returnFlight = flight?.returnFlight?.[0];

    return (
      <div className="shadow-box p-4 my-4" key={index}>
        <div className="container">
          <div className="row">
            <div className="b18-mon primary-color text-center">
              {departureFlight?.city}
              <span className="mx-2">
                ---
                <FontAwesomeIcon
                  icon="fa-solid fa-plane"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {returnFlight?.city}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(departureFlight?.date)}
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
                {departureFlight?.flightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{departureFlight?.seat}</div>
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
                  {departureFlight?.city}{" "}
                  <span className="b13-mon">({departureFlight?.city})</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {returnFlight?.city}{" "}
                  <span className="b13-mon">({returnFlight?.city})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index) => {
    const departureFlight = flight?.departureFlight?.[0];
    const returnFlight = flight?.returnFlight?.[0];

    return (
      <div className="shadow-box p-4 my-4" key={index}>
        <div className="container ">
          <div className="row mt-3">
            <div className="b18-mon primary-color text-center">
              {departureFlight?.[0]?.city}
              <span className="mx-2">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-departure"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {flight?.returnFlight?.city}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(departureFlight?.date)}
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
                {departureFlight?.flightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{departureFlight?.seat}</div>
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
                  {departureFlight?.city}{" "}
                  <span className="b13-mon">({departureFlight?.city})</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {returnFlight?.city}{" "}
                  <span className="b13-mon">({returnFlight?.city})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="separator">
          <span className="b13-mon mx-3">ROUNDTRIP</span>
        </div>
        <div className="container ">
          <div className="row mt-3">
            <div className="b18-mon primary-color text-center">
              {returnFlight?.city}

              <span className="mx-2">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-arrival"
                  style={{ color: "#0bb6c0" }}
                />
              </span>

              {departureFlight?.city}
            </div>
          </div>
          <div className="row">
            <div className="text-center b13-mon">
              {Methods.formatDate(returnFlight?.date)}
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
                {returnFlight?.flightNo}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div>
                <div className="b16-mon"> Seat </div>
                <div>{returnFlight?.seat}</div>
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
                  {flight?.returnFlight?.city}{" "}
                  <span className="b13-mon">
                    ({flight?.returnFlight?.city})
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <div className="b16-mon"> Arrival </div>
                <div>
                  {flight?.departureFlight?.city}{" "}
                  <span className="b13-mon">
                    ({flight?.departureFlight?.city})
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
        <Header title="Flights" rightIcon="add" destination={"/flights/add"} />

        {displayFlights()}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.activeTrip?.flights,
    test: state.account,
  };
}

export default connect(mapStateToProps)(FlightList);
