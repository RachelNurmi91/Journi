import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Methods from "../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTripData, setActiveTrip } from "../Redux/Actions/AccountActions";
import { Link } from "react-router-dom";
import Button from "../Shared/UI/Button";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../Redux/Operations/AccountOperations";
// import Modal from "react-bootstrap/Modal";
import TripRequests from "../Requests/TripRequests";
import AccountRequests from "../Requests/AccountRequests";
import Loading from "../Shared/UI/Loading";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
// import ImageUploading from "react-images-uploading";

function Profile({
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
  const [rewardProgramsList, setRewardProgramsList] = useState(null);
  const [tripsList, setTripsList] = useState(null);
  const [openTrips, setOpenTrips] = useState(false);
  const [openPrograms, setOpenPrograms] = useState(false);

  // const [showImgModal, setShowImgModal] = useState(false);

  const accountRequest = new AccountRequests();
  const tripRequest = new TripRequests();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const toggleImgModal = (ticketImg) => {
  //   setShowImgModal((prevState) => !prevState);
  // };

  const toggleOpenTrips = () => {
    setOpenTrips((prevState) => !prevState);
  };

  const toggleOpenPrograms = () => {
    setOpenPrograms((prevState) => !prevState);
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

  const sortRewardProgramsByName = useCallback(() => {
    let sortedRewardPrograms;
    let rewardPrograms;
    if (rewardProgramsData) {
      rewardPrograms = [...rewardProgramsData];
    }

    if (rewardPrograms && rewardPrograms?.length > 1) {
      sortedRewardPrograms = rewardPrograms.sort((a, b) => {
        if (a.programName > b.programName) return 1;
        if (a.programName < b.programName) return -1;
        return 0;
      });
    } else {
      sortedRewardPrograms = rewardPrograms;
    }

    setRewardProgramsList(sortedRewardPrograms);
  }, [rewardProgramsData]);

  useEffect(() => {
    sortRewardProgramsByName();
    sortTripsByDate();
  }, [sortTripsByDate, sortRewardProgramsByName]);

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

  const logout = () => {
    removeLoggedInUserData();
  };

  const renderProgramsList = () => {
    return rewardProgramsList?.map((program, index) => {
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}

          <div className="row pt-2">
            <div className="col-5 label">{program.name}</div>
            <div className="col-5 d-flex align-items-center justify-content-start">
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

  return (
    <div className="content-body profile">
      <div className="row">
        <div className="col-4">
          <div className="profile-icon">
            <div className="d-flex justify-content-start" to="/profile">
              <div className="img-edit">
                <div className="profile-img">
                  {userData?.firstName?.slice(0, 1).toUpperCase()}
                </div>
                {/* <div className="edit">
                  <FontAwesomeIcon
                    icon="fa-solid fa-camera"
                    style={{ color: "#0BB6C0" }}
                    size="lg"
                    onClick={toggleImgModal}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-start">
          <h2>Look at you, {userData?.firstName}!</h2>
        </div>
      </div>

      <div className="my-5">
        <div className="row">
          <div className="col-10">
            <h3 className="float-right primary-color">User Details</h3>
            <div className="b13-mon">Your Journi account details.</div>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <Link to="/trips" className="nav-link">
              <FontAwesomeIcon
                icon="fa-solid fa-plus"
                size="lg"
                style={{ color: "#0BB6C0" }}
              />
            </Link>
          </div>
        </div>
        {/* <div className="outlined-box p-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-3 col-lg-1 label">Name</div>
            <div className="col">
              {userData?.firstName + " " + userData?.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-lg-1 label">User</div>
            <div className="col">{userData.username}</div>
          </div>
        </div>
      </div> */}
        <hr className="mb-4" />
        <div className="row">
          <div className="col-10">
            <h3 className="float-right primary-color">Trips</h3>
            <div className="b13-mon">
              Add and manage all of your upcoming trips.
            </div>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <Link to="/trips" className="nav-link">
              <FontAwesomeIcon
                icon="fa-solid fa-plus"
                size="lg"
                style={{ color: "#0BB6C0" }}
              />
            </Link>
          </div>
        </div>
        {/* <div className="outlined-box mb-4">
        <div
          className="container collapsible"
          style={{
            height: openTrips ? "" : "75px",
            transition: "height 0.10s ease",
          }}
        >
          {tripsData.length ? (
            renderTripList()
          ) : (
            <div className="mt-3">"Friend, you need a vacation."</div>
          )}
        </div>
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
      </div> */}
        <hr className="mb-4" />
        <div className="row">
          <div className="col-10">
            <h3 className="float-right primary-color">Reward Programs</h3>
            <div className="b13-mon">
              Keep all your rewards programs in one accessible place.
            </div>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <Link to="/reward-programs" className="nav-link">
              <FontAwesomeIcon
                icon="fa-solid fa-plus"
                size="lg"
                style={{ color: "#0BB6C0" }}
              />
            </Link>
          </div>
        </div>
        {/* <div className="outlined-box mb-4">
        <div
          className="container collapsible"
          style={{
            height: openPrograms ? "" : "50px",
            transition: "height 0.10s ease",
          }}
        >
          {rewardProgramsData?.length ? (
            renderProgramsList()
          ) : (
            <div className="mt-2">"Add your reward programs!"</div>
          )}
        </div>
        {rewardProgramsData?.length > 1 ? (
          <div className="text-center mt-2">
            {openPrograms ? (
              <FontAwesomeIcon
                icon={["fas", "angle-up"]} // Assuming you're using FontAwesome 5
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpenPrograms}
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "angle-down"]} // Assuming you're using FontAwesome 5
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpenPrograms}
              />
            )}
          </div>
        ) : null}
      </div> */}
      </div>
      <div className="row">
        <div>
          <Button label="logout" onClick={logout} />
        </div>
      </div>
      <Loading loading={loading} />
      {/* <Modal show={showImgModal}>
        <div style={{ position: "relative" }}>
          <div className="close" onClick={toggleImgModal}>
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              style={{ color: "#0BB6C0" }}
              size="lg"
            />
          </div>
          <div></div>
        </div>
      </Modal> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
