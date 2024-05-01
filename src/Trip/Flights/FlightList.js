import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";

function FlightList({ flightListData, ...props }) {
  const [sortedFlights, setSortedFlights] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

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

  const deleteFlight = (id) => {
    setLoading(true);
    tripRequest
      .deleteFlight(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error: Cannot delete trip: ", error);
        setLoading(false);
      });
  };

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
      <div className="shadow-box mb-4" key={index}>
        <div className="row d-flex justify-content-end mx-1">
          <div className="col-1">
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              style={{ color: "#d65d5d" }}
              onClick={() => deleteFlight(flight._id)}
            />
          </div>
        </div>
        <div
          className="container collapsible mt-2"
          style={{
            height: `${open ? "" : "50px"}`,
            transition: "height 0.10s ease",
          }}
        >
          <div className="row header">
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-5">
                <div>{departureFlight?.code}</div>
                <div className="airport-city">({departureFlight?.city})</div>
              </div>
              <div className="col-2">
                <FontAwesomeIcon
                  icon={["fas", "plane"]}
                  style={{ color: "#0BB6C0" }}
                  size="sm"
                />
              </div>
              <div className="col-5">
                <div>{returnFlight?.code}</div>
                <div className="airport-city">({returnFlight?.city})</div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="text-center b13-mon">
              {Methods.formatLongDate(departureFlight?.date)}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div>
                <div className="input-title"> Airline </div>
                <div>{flight?.airline}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-title">Flight No.</div>
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
                <div className="input-title"> Seat </div>
                <div>{departureFlight?.seat}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-title">Confirm. No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                {flight.confirmationNo}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          {open ? (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-up"
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpen}
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpen}
            />
          )}
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index) => {
    const departureFlight = flight?.departureFlight?.[0];
    const returnFlight = flight?.returnFlight?.[0];

    return (
      <div className="shadow-box" key={index}>
        <div className="row d-flex justify-content-end mx-1">
          <div className="col-1">
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              style={{ color: "#d65d5d" }}
              onClick={() => deleteFlight(flight._id)}
            />
          </div>
        </div>

        <div
          className="container collapsible mt-2"
          style={{
            height: `${open ? "" : "50px"}`,
            transition: "height 0.10s ease",
          }}
        >
          <div className="row header">
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-5">
                <div>{departureFlight?.code}</div>
                <div className="airport-city">({departureFlight?.city})</div>
              </div>
              <div className="col-2">
                <FontAwesomeIcon
                  icon={["fas", "plane"]}
                  style={{ color: "#0BB6C0" }}
                  size="sm"
                />
              </div>
              <div className="col-5">
                <div>{returnFlight?.code}</div>
                <div className="airport-city">({returnFlight?.city})</div>
              </div>
            </div>
          </div>
          <div className="separator">
            <span className="b18-mon primary-color text-center">
              {Methods.formatLongDate(flight?.departureFlight?.[0]?.date)}
            </span>
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

          <div className="separator">
            <span className="b18-mon primary-color text-center">
              {Methods.formatLongDate(flight?.returnFlight?.[0]?.date)}
            </span>
          </div>
          <div className="container ">
            <div className="row"></div>

            <div className="row">
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
          </div>
        </div>
        <div className="text-center mt-2">
          {open ? (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-up"
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpen}
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpen}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="content-body flight-list">
        <Header title="Flights" rightIcon="add" destination={"/flights/add"} />

        {flightListData.length
          ? displayFlights()
          : "Girly pop, add your first flight!"}
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
