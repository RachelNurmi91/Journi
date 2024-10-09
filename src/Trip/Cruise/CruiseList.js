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

function CruiseList({
  fetchUpdatedTrips,
  cruiseListData,
  deleteTripData,
  activeTrip,
  ...props
}) {
  const [cruiseList, setCruiseList] = useState(null);
  const [openCruiseId, setOpenCruiseId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenCruiseId((prevId) => (prevId === id ? null : id));
  };
  const sortByDate = useCallback(() => {
    let sortedCruises;

    let cruises = cruiseListData;

    if (cruises && cruises?.length > 10) {
      sortedCruises = cruises.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedCruises = cruises;
    }

    setCruiseList(sortedCruises);
  }, [cruiseListData]);

  useEffect(() => {
    sortByDate();
  }, [cruiseListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [cruiseListData, sortByDate]);

  const deleteCruise = (id) => {
    setLoading(true);
    tripRequest
      .deleteCruise(id)
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

  const navigateToUpdate = (id) => {
    props.navigate(`/cruises/update/${id}`);
  };

  const displayCruises = () => {
    return cruiseList?.map((cruise, index) => {
      const isOpen = openCruiseId === cruise._id;
      return (
        <div className="ticket p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div className="col-12">
              <div>
                {Methods.formatLongDate(cruise.startDate)}
                <FontAwesomeIcon
                  icon="fa-solid fa-ship"
                  style={{ color: "#0BB6C0" }}
                  onClick={() => toggleOpen(cruise._id)}
                  className="mx-2"
                />
                {Methods.formatLongDate(cruise.endDate)}
              </div>
            </div>

            <div className="my-4">
              <div
                className="b22-mon  primary-color"
                style={{ lineHeight: "20px" }}
              >
                {cruise.name}
              </div>

              {cruise.ship}
            </div>
            <div>
              <span className="b14-mon primary-color label">
                Confirmation No.{" "}
              </span>
              {cruise.confirmationNo}
            </div>
            <div>
              <span className="b14-mon primary-color label">Cabin No. </span>
              {cruise.cabinNo}
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
              <div
                className="col-6"
                onClick={() => navigateToUpdate(cruise._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div className="col-6" onClick={() => deleteCruise(cruise._id)}>
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
      <Breadcrumbs
        prevCrumb={activeTrip?.name}
        prevCrumbLink={"/trips"}
        currentCrumb="Cruise"
      />
      <div className="content-body cruise-list">
        <Header title="Cruise" rightIcon={true} destination={"/cruises/add"} />
        {cruiseListData?.length
          ? displayCruises()
          : "Cruiser, add your first cruise!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    cruiseListData: state.account?.activeTrip?.cruises,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(CruiseList);
