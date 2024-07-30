import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import { Collapse } from "reactstrap";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

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
      <div className="ticket p-0 mb-4" key={index}>
        <div style={{ padding: "25px" }}>
          {Methods.formatLongDate(departureFlight?.date)}{" "}
          <FontAwesomeIcon
            icon="fa-solid fa-clock"
            style={{ color: "#0BB6C0" }}
            className="mx-2"
          />
          {Methods.formatTime(departureFlight?.time)}
          <div className="my-4">
            <div
              className="b22-mon  primary-color"
              style={{ lineHeight: "20px" }}
            >
              {departureFlight?.name}
            </div>

            <div className="d-flex align-items-center">
              {departureFlight?.city} ({departureFlight?.code})
              <div className="mx-2">
                <FontAwesomeIcon
                  icon={["fas", "plane"]}
                  style={{ color: "#0BB6C0" }}
                  size="md"
                />
              </div>
              {departureFlight?.destinationCity} (
              {departureFlight?.destinationCode})
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="b14-mon primary-color label">Flight No. </div>
              {departureFlight?.flightNo}
            </div>
            <div className="col-6">
              <div className="b14-mon primary-color label">Seat No. </div>
              {departureFlight?.seat}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#32AAAA",
            borderRadius: " 0 0 10px 10px",
            padding: "12px 0",
          }}
        >
          <div className="text-center row link-style">
            <div className="col-6" onClick={() => navigateToUpdate(flight._id)}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
            </div>
            <div className="col-6" onClick={() => deleteFlight(flight._id)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoundtripFlight = (flight, index, isOpen) => {
    const departureFlight = flight?.departureFlight;
    const returnFlight = flight?.returnFlight;

    return (
      <div className="ticket p-0 mb-4" key={index}>
        <div style={{ padding: "25px" }}>
          <div className="b13-mon">
            {Methods.formatLongDate(departureFlight?.date)}{" "}
            <FontAwesomeIcon
              icon="fa-solid fa-clock"
              style={{ color: "#0BB6C0" }}
              className="mx-2"
            />
            {Methods.formatTime(departureFlight?.time)}
          </div>
          <div className="my-4">
            <div
              className="b22-mon  primary-color"
              style={{ lineHeight: "20px" }}
            >
              {departureFlight?.name}
            </div>

            <div className="d-flex align-items-center">
              {departureFlight?.city} ({departureFlight?.code})
              <div className="mx-2">
                <FontAwesomeIcon
                  icon={["fas", "plane-departure"]}
                  style={{ color: "#0BB6C0" }}
                  size="md"
                />
              </div>
              {returnFlight?.city} ({returnFlight?.code})
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="b14-mon primary-color label">Flight No. </div>
              {departureFlight?.flightNo}
            </div>
            <div className="col-6">
              <div className="b14-mon primary-color label">Seat No. </div>
              {departureFlight?.seat}
            </div>
          </div>
          <hr className="dashed-line" />

          <div className="b13-mon">
            {Methods.formatLongDate(returnFlight?.date)}{" "}
            <FontAwesomeIcon
              icon="fa-solid fa-clock"
              style={{ color: "#0BB6C0" }}
              className="mx-2"
            />
            {Methods.formatTime(returnFlight?.time)}
          </div>
          <div className="my-4">
            <div
              className="b22-mon  primary-color"
              style={{ lineHeight: "20px" }}
            >
              {departureFlight?.name}
            </div>

            <div className="d-flex align-items-center">
              {returnFlight?.city} ({returnFlight?.code})
              <div className="mx-2">
                <FontAwesomeIcon
                  icon={["fas", "plane-arrival"]}
                  style={{ color: "#0BB6C0" }}
                  size="md"
                />
              </div>
              {departureFlight?.city} ({departureFlight?.code})
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <span className="b14-mon primary-color label">Flight No. </span>
              {departureFlight?.flightNo}
            </div>
            <div className="col-6">
              <span className="b14-mon primary-color label">Seat No. </span>
              {departureFlight?.seat}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#32AAAA",
            borderRadius: " 0 0 10px 10px",
            padding: "12px 0",
          }}
        >
          <div className="text-center row link-style">
            <div className="col-6" onClick={() => navigateToUpdate(flight._id)}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
            </div>
            <div className="col-6" onClick={() => deleteFlight(flight._id)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Breadcrumbs />
      <div className="content-body flight-list" style={{ paddingTop: "50px" }}>
        <Header
          title="Flights"
          rightTitle="+ Add"
          destination={"/flights/add"}
        />

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
