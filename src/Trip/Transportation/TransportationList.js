import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

function TransportationList({
  fetchUpdatedTrips,
  transportationListData,
  ...props
}) {
  const [transportationList, setTransportationList] = useState(null);
  const [openTransportationId, setOpenTransportationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenTransportationId((prevId) => (prevId === id ? null : id));
  };
  const sortByDate = useCallback(() => {
    let sortedTransportation;

    let transportation = transportationListData;

    if (transportation && transportation?.length > 10) {
      sortedTransportation = transportation.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedTransportation = transportation;
    }

    setTransportationList(sortedTransportation);
  }, [transportationListData]);

  useEffect(() => {
    sortByDate();
  }, [transportationListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [transportationListData, sortByDate]);

  const deleteTransportation = (id) => {
    setLoading(true);
    tripRequest
      .deleteTransportation(id)
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

  const formatType = (type) => {
    let formattedType;
    switch (type) {
      case "bus":
        formattedType = "Bus";
        break;
      case "privateCar":
        formattedType = "Private Car Pickup";
        break;
      default:
        return;
    }

    return formattedType;
  };

  const navigateToUpdate = (id) => {
    props.navigate(`/transportation/update/${id}`);
  };

  const displayTransportation = () => {
    return transportationList?.map((transportation, index) => {
      const isOpen = openTransportationId === transportation._id;
      return (
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(transportation._id)}
              />
            </div>
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteTransportation(transportation._id)}
              />
            </div>
          </div>
          <div
            className="container collapsible"
            style={{
              height: `${isOpen ? "" : "70px"}`,
              transition: "height 0.10s ease",
            }}
          >
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {transportation.name}
              </span>
            </div>

            <div className="row">
              <div className="text-center b13-mon">
                {formatType(transportation.type)}
              </div>
            </div>
            {transportation.confirmationNo ? (
              <div className="row mt-3">
                <div className="b16-mon label">Confirmation No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {transportation.confirmationNo}
                </div>
              </div>
            ) : null}
            {transportation.ticketNo ? (
              <div className="row mt-3">
                <div className="b16-mon label">Ticket No.</div>
                <div className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10">
                  {transportation.ticketNo}
                </div>
              </div>
            ) : null}

            <div className="row mt-3">
              <div className="col">
                <div className="b16-mon label"> Pick-Up</div>
                <div>{Methods.formatLongDate(transportation.startDate)}</div>
                <div>
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {Methods.formatTime(transportation.startTime)}
                </div>
              </div>
              <div className="col">
                <div className="b16-mon label"> Pick-Up Location</div>
                <div>{transportation.location}</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(transportation._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(transportation._id)}
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumbs />
      <div className="content-body transportation-list">
        <Header
          title="Transportation"
          rightIcon="add"
          destination={"/transportation/add"}
        />
        {transportationListData?.length
          ? displayTransportation()
          : "Your too important to drive yourself. Add your first transportation!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    transportationListData: state.account?.activeTrip?.transportation,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(TransportationList);
