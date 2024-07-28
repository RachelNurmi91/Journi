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
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(cruise._id)}
              />
            </div>
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteCruise(cruise._id)}
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
                {cruise.name}
              </span>
            </div>
            <div className="row">
              <div className="text-center b13-mon">{cruise.ship}</div>
            </div>{" "}
            <div className="row mt-3">
              {cruise.confirmationNo ? (
                <div className="col">
                  <div className="b16-mon label">Confirmation</div>
                  <div
                    className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                    style={{ borderRadius: "5px" }}
                  >
                    {cruise.confirmationNo}
                  </div>
                </div>
              ) : null}{" "}
              {cruise.cabinNo ? (
                <div className="col">
                  <div className="b16-mon label">Cabin No.</div>
                  <div
                    className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                    style={{ borderRadius: "5px" }}
                  >
                    {cruise.cabinNo}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="row mt-3">
              <div className="col-6 d-flex justify-content-start">
                <div>
                  <div className="b16-mon label"> Embarkation</div>

                  {Methods.formatLongDate(cruise.startDate)}
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start">
                <div>
                  <div className="b16-mon label"> Debarkation </div>

                  {Methods.formatLongDate(cruise.endDate)}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(cruise._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(cruise._id)}
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
      <div className="content-body cruise-list">
        <Header title="Cruises" rightIcon="add" destination={"/cruises/add"} />
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
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(CruiseList);
