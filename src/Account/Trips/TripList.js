import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteTripData,
  setActiveTrip,
} from "../../Redux/Actions/AccountActions";
import { Link } from "react-router-dom";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { removeLoggedInUserData } from "../../Redux/Actions/AccountActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Header from "../../Shared/UI/Header";

function TripsList({
  fetchUpdatedTrips,
  fetchUpdatedAccount,
  rewardProgramsData,
  userData,
  tripsData,
  activeTrip,
  removeLoggedInUserData,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [tripsList, setTripsList] = useState(null);
  const [openTrips, setOpenTrips] = useState(false);
  const [openPrograms, setOpenPrograms] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const tripRequest = new TripRequests();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleOpenTrips = () => {
    setOpenTrips((prevState) => !prevState);
  };

  const toggleDeleteModal = (trip) => {
    setSelectedTrip(trip);
    setShowDeleteModal((prevState) => !prevState);
  };

  const sortTripsByDate = useCallback(() => {
    let sortedTrips;

    let trips = [...tripsData];

    if (trips && trips?.length > 1) {
      sortedTrips = trips.sort((a, b) => {
        if (a.departureDate > b.departureDate) return 1;
        if (a.departureDate < b.departureDate) return -1;
        return 0;
      });
    } else {
      sortedTrips = trips;
    }

    setTripsList(sortedTrips);
  }, [tripsData]);

  useEffect(() => {
    sortTripsByDate();
  }, [sortTripsByDate]);

  const deleteTrip = async () => {
    toggleDeleteModal();
    setLoading(true);
    await tripRequest
      .deleteTrip(selectedTrip._id)
      .then(() => {
        if (selectedTrip._id === activeTrip?._id) {
          if (tripsData.length > 1) {
            let updatedTrips = [...tripsData];
            let index = updatedTrips.findIndex(
              (x) => x._id === selectedTrip._id
            );
            if (index !== -1) {
              updatedTrips.splice(index, 1);
            }
            setActiveTrip(updatedTrips[0]);
          } else {
            setActiveTrip(null);
          }
        } else {
          setActiveTrip(tripsData[0]);
        }
        fetchUpdatedTrips().then(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error: Cannot delete trip: ", error);
        setLoading(false);
      });
    setSelectedTrip(null);
  };

  const navigateToEditTrips = (id) => {
    props.navigate(`/trips/edit/${id}`);
  };

  const renderTripList = () => {
    return tripsList?.map((trip, index) => {
      return (
        <div key={index} className="outlined-box p-0 container mb-3">
          <div className="p-4">
            <div
              className="b22-mon  primary-color"
              style={{ lineHeight: "20px" }}
            >
              {trip.name}
            </div>

            <div>
              <div>
                Your{" "}
                <span className="primary-color">
                  {Methods.calculateDaysBetweenDates(
                    trip.startDate,
                    trip.endDate
                  )}
                </span>{" "}
                night adventure
              </div>
              {Methods.formatShortDate(trip.startDate)} -{" "}
              {Methods.formatShortDate(trip.endDate)}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#32AAAA",
              borderRadius: " 0 0 10px 10px",
              padding: "12px 0",
            }}
          >
            <div className="text-center row link-style b13-mon">
              <div className="col-6">
                <span onClick={() => navigateToEditTrips(trip._id)}>
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
                </span>
              </div>
              <div className="col-6">
                <span onClick={() => toggleDeleteModal(trip)}>
                  <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-body profile">
      <Header
        title="Trips"
        subtitle="Manage your active trips, or add a new one"
        rightTitle="+ Add New"
      />
      {tripsData.length ? (
        renderTripList()
      ) : (
        <div className="mt-3">"Friend, you need a vacation."</div>
      )}

      {tripsData.length > 1 ? (
        <div className="text-center mt-2">
          {openPrograms ? (
            <FontAwesomeIcon
              icon={["fas", "angle-up"]} // Assuming you're using FontAwesome 5
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpenTrips}
            />
          ) : (
            <FontAwesomeIcon
              icon={["fas", "angle-down"]} // Assuming you're using FontAwesome 5
              style={{ color: "#0BB6C0" }}
              onClick={toggleOpenTrips}
            />
          )}
        </div>
      ) : null}

      <Modal isOpen={showDeleteModal}>
        <ModalBody>
          <div className="row">
            <div className="title col-9">
              <h3 className="mb-0 primary-color">{`Delete This Trip?`}</h3>
            </div>

            <div className="close col-3" onClick={toggleDeleteModal}>
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                style={{ color: "#0BB6C0", fontSize: "25px" }}
              />
            </div>
          </div>

          <p className="py-4">
            You are about to delete:{" "}
            <span className="fw-bold">{selectedTrip?.name}</span>. Know that if
            you delete this trip all associated saved data will be lost.
          </p>

          <div className="text-center">
            <button className="w-100" onClick={deleteTrip}>
              Delete {selectedTrip?.name}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    rewardProgramsData: state.account?.userAccount?.rewardPrograms,
    tripsData: state.account?.userAccount?.trips,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  deleteTripData,
  setActiveTrip,
  fetchUpdatedTrips,
  fetchUpdatedAccount,
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
