import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteTripData,
  setActiveTrip,
} from "../../Redux/Actions/AccountActions";
import { Link } from "react-router-dom";
import Button from "../../Shared/UI/Button";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../../Redux/Operations/AccountOperations";
// import Modal from "react-bootstrap/Modal";
import TripRequests from "../../Requests/TripRequests";
import AccountRequests from "../../Requests/AccountRequests";
import Loading from "../../Shared/UI/Loading";
import { removeLoggedInUserData } from "../../Redux/Actions/AccountActions";
import Header from "../../Shared/UI/Header";
// import ImageUploading from "react-images-uploading";

function RewardProgramList({
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

  const renderProgramsList = () => {
    return rewardProgramsList?.map((program, index) => {
      console.log(program);
      return (
        <div key={index} className="outlined-box p-0 container mb-3">
          <div className="p-4 row ">
            <div className="b22-mon  primary-color col-6">{program.name}</div>
            <div className="col-6 align-self-center">
              {program.membershipId}
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
              <span onClick={() => deleteRewardProgram(program._id)}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-body profile">
      <Header title="Reward Programs" rightTitle="+ Add New" />

      {rewardProgramsData?.length ? (
        renderProgramsList()
      ) : (
        <div className="mt-2">Add your reward programs!</div>
      )}

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
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardProgramList);
