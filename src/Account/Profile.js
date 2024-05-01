import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Methods from "../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTripData, setActiveTrip } from "../Redux/Actions/AccountActions";
import { Link } from "react-router-dom";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../Redux/Operations/AccountOperations";
import Header from "../Shared/UI/Header";
import TripRequests from "../Requests/TripRequests";
import AccountRequests from "../Requests/AccountRequests";
import Loading from "../Shared/UI/Loading";

function Profile({
  fetchUpdatedTrips,
  fetchUpdatedAccount,
  rewardProgramsData,
  userData,
  tripsData,
  activeTrip,
  ...props
}) {
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();
  const tripRequest = new TripRequests();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteTrip = async (selectedTrip) => {
    setLoading(true);
    await tripRequest
      .deleteTrip(selectedTrip)
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
  };

  const deleteRewardProgram = (id) => {
    setLoading(true);
    accountRequest
      .deleteRewardProgram(id)
      .then(() => {
        fetchUpdatedAccount().then(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error: Cannot delete trip: ", error);
        setLoading(false);
      });
  };

  const navigateToEditTrips = (id) => {
    props.navigate(`/trips/edit/${id}`);
  };

  const renderProgramsList = () => {
    return rewardProgramsData?.map((program, index) => {
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}

          <div className="row">
            <div className="col-5 col-lg-1 label">{program.programName}</div>
            <div className="col-5 align-items-start">
              {program.membershipId}
            </div>
            <div className="col-2 d-flex align-items-center justify-content-end">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteRewardProgram(program._id)}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const renderTripList = () => {
    return tripsData?.map((trip, index) => {
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}
          <div className="row p-2">
            <div className="col-10">
              <div className="row">
                <div className="col-6 label">{trip.tripName}</div>
                <div className="col-6 label">
                  {Methods.formatShortDate(trip.departureDate)}
                </div>

                <div className="col-6">
                  {trip.hotels?.length ? trip.hotels.length : "0"} Hotels
                </div>
                <div className="col-6">
                  {trip.flights?.length ? trip.flights.length : "0"} Flights
                </div>
              </div>
            </div>

            <div className="col-1 d-flex align-items-center justify-content-end p-0">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                style={{ color: "#0BB6C0" }}
                onClick={() => navigateToEditTrips(trip._id)}
              />
            </div>
            <div className="col-1 d-flex align-items-center justify-content-end p-0">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteTrip(trip._id)}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-body profile">
      <Header
        title={
          <>
            Look at you,
            <span className="primary-color"> {userData?.firstName}</span>!
          </>
        }
      />
      <div className="outlined-box mt-3 p-4">
        <div className="row">
          <h3 className="float-right">User Details</h3>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-3 col-lg-1 label">Name</div>
            <div className="col">
              {userData?.firstName + " " + userData?.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-lg-1 label">Email</div>
            <div className="col">{userData.username}</div>
          </div>
        </div>
      </div>

      <div className="outlined-box mt-3 p-4">
        <div className="row">
          <div className="col-10">
            <h3 className="float-right">Trips</h3>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <Link to="/trips/add" className="nav-link">
              <FontAwesomeIcon
                icon="fa-solid fa-plus"
                size="lg"
                style={{ color: "#0BB6C0" }}
              />
            </Link>
          </div>
        </div>
        <div className="container mt-3">
          {tripsData.length ? renderTripList() : "Friend, you need a vacation."}
        </div>
      </div>

      <div className="outlined-box mt-3 p-4">
        <div className="row">
          <div className="col-10">
            <h3 className="float-right">Reward Programs</h3>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <Link to="/profile/reward-programs" className="nav-link">
              <FontAwesomeIcon
                icon="fa-solid fa-plus"
                size="lg"
                style={{ color: "#0BB6C0" }}
              />
            </Link>
          </div>
        </div>

        <div className="container mt-3">
          {rewardProgramsData?.length
            ? renderProgramsList()
            : "Add your reward programs!"}
        </div>
      </div>
      <Loading loading={loading} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
