import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function FlightList({ fetchUpdatedTrips, flightListData, ...props }) {
  const [sortedFlights, setSortedFlights] = useState([]);
  const [openFlightId, setOpenFlightId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenFlightId((prevId) => (prevId === id ? null : id));
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

    setOpenFlightId(flights?.[0]?._id);

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

  const navigateToUpdate = (id) => {
    props.navigate(`/flights/update/${id}`);
  };

  const displayFlights = () => {
    return sortedFlights.map((flight, index) => {
      const isOpen = openFlightId === flight._id;

      if (flight?.isRoundTrip) {
        return renderRoundtripFlight(flight, index, isOpen);
      } else {
        return renderOnewayFlight(flight, index, isOpen);
      }
    });
  };

  const renderOnewayFlight = (flight, index, isOpen) => {
    const departureFlight = flight?.departureFlight;
    return (
      <div className="shadow-box mb-4" key={index}>
        <div className="row d-flex justify-content-end mx-1">
          <div className="col-1">
            <FontAwesomeIcon
              icon="fa-solid fa-pen-to-square"
              className="primary-color"
              onClick={() => navigateToUpdate(flight._id)}
            />
          </div>
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
            height: `${isOpen ? "" : "50px"}`,
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
                <div>{departureFlight?.destinationCode}</div>
                <div className="airport-city">
                  ({departureFlight?.destinationCity})
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="text-center b13-mon">
              {Methods.formatLongDate(departureFlight?.date)}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 mt-2">
              <div>
                <div className="input-title"> Airline </div>
                <div>{departureFlight?.name}</div>
              </div>
            </div>
            {departureFlight?.flightNo ? (
              <div className="col-6 mt-2">
                <div className="input-title">Flight No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {departureFlight?.flightNo}
                </div>
              </div>
            ) : null}

            {departureFlight?.seat ? (
              <div className="col-6 mt-2">
                <div>
                  <div className="input-title"> Seat </div>
                  <div>{departureFlight?.seat}</div>
                </div>
              </div>
            ) : null}
            {flight.confirmationNo ? (
              <div className="col-6 mt-2">
                <div className="input-title">Confirm. No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {flight.confirmationNo}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-center mt-2">
          {isOpen ? null : (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              style={{ color: "#0BB6C0" }}
              onClick={() => toggleOpen(flight._id)}
            />
          )}
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index, isOpen) => {
    const departureFlight = flight?.departureFlight;
    const returnFlight = flight?.returnFlight;

    return (
      <div className="shadow-box" key={index}>
        <div className="row d-flex justify-content-end mx-1">
          <div className="col-1">
            <FontAwesomeIcon
              icon="fa-solid fa-pen-to-square"
              className="primary-color"
              onClick={() => navigateToUpdate(flight._id)}
            />
          </div>
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
            height: `${isOpen ? "" : "50px"}`,
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
              {Methods.formatLongDate(flight?.departureFlight?.date)}
              <span
                className="p-2"
                style={{ color: "#444", fontWeight: "500" }}
              >
                :
              </span>
              {Methods.formatTime(flight?.departureFlight?.time)}
            </span>
          </div>

          <div className="row mt-3">
            {flight?.name ? (
              <div className="col-6">
                <div>
                  <div className="b16-mon mt-2 label"> Airline </div>
                  <div>{flight?.name}</div>
                </div>
              </div>
            ) : null}
            {departureFlight?.flightNo ? (
              <div className="col-6">
                <div className="b16-mon mt-2 label">Flight No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {departureFlight?.flightNo}
                </div>
              </div>
            ) : null}

            {departureFlight?.seat ? (
              <div className="col-6 mt-2">
                <div>
                  <div className="b16-mon label"> Seat </div>
                  <div>{departureFlight?.seat}</div>
                </div>
              </div>
            ) : null}

            {flight.confirmationNo ? (
              <div className="col-6 mt-2">
                <div className="b16-mon label">Confirm. No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {flight.confirmationNo}
                </div>
              </div>
            ) : null}
          </div>

          <div className="separator">
            <span className="b18-mon primary-color text-center">
              {Methods.formatLongDate(flight?.returnFlight?.date)}
              <span
                className="p-2"
                style={{ color: "#444", fontWeight: "500" }}
              >
                :
              </span>
              {Methods.formatTime(flight?.returnFlight?.time)}
            </span>
          </div>

          <div className="container">
            <div className="row">
              {flight?.name ? (
                <div className="col-6 mt-2">
                  <div>
                    <div className="b16-mon label"> Airline </div>
                    <div>{flight?.name}</div>
                  </div>
                </div>
              ) : null}

              {returnFlight?.flightNo ? (
                <div className="col-6">
                  <div className="b16-mon mt-2 label">Flight No.</div>
                  <div
                    className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                    style={{ borderRadius: "5px" }}
                  >
                    {returnFlight?.flightNo}
                  </div>
                </div>
              ) : null}

              {returnFlight?.seat ? (
                <div className="col-6">
                  <div>
                    <div className="b16-mon mt-2 label"> Seat </div>
                    <div>{returnFlight?.seat}</div>
                  </div>
                </div>
              ) : null}

              {flight.confirmationNo ? (
                <div className="col-6 mt-2">
                  <div className="b16-mon label">Confirm. No.</div>
                  <div
                    className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                    style={{ borderRadius: "5px" }}
                  >
                    {flight.confirmationNo}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          {isOpen ? null : (
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              style={{ color: "#0BB6C0" }}
              onClick={() => toggleOpen(flight._id)}
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
          : "Little bird, add your first flight!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.activeTrip?.flights,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
