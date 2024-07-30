import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import { Collapse } from "reactstrap";
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
        <div className="ticket p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div className="row">
              <div className="col-12">
                {Methods.formatLongDate(transportation.startDate)}{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-clock"
                  style={{ color: "#0BB6C0" }}
                  className="mx-2"
                />
                {Methods.formatTime(transportation?.startTime)}
              </div>
            </div>

            <div className={transportation.confirmationNo ? `my-4` : `mt-4`}>
              <div
                className="b22-mon  primary-color"
                style={{ lineHeight: "20px" }}
              >
                {transportation.name}
              </div>
              {transportation.location && (
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {transportation.location}
                </div>
              )}
            </div>

            {transportation.confirmationNo && (
              <div>
                <span className="b14-mon primary-color label">
                  Confirmation{" "}
                </span>
                {transportation.confirmationNo}
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#32AAAA",
              borderRadius: " 0 0 10px 10px",
              padding: "12px 0",
            }}
          >
            <div className="text-center row link-style">
              <div
                className="col-6"
                onClick={() => navigateToUpdate(transportation._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div
                className="col-6"
                onClick={() => deleteTransportation(transportation._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumbs />
      <div
        className="content-body transportation-list"
        style={{ paddingTop: "50px" }}
      >
        <Header
          title="Transporation"
          rightTitle="+ Add"
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
