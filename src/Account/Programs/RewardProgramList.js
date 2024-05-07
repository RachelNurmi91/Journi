import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTripData, setActiveTrip } from "../Redux/Actions/AccountActions";

import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../Redux/Operations/AccountOperations";

import AccountRequests from "../Requests/AccountRequests";

function Profile({
  fetchUpdatedTrips,
  fetchUpdatedAccount,
  rewardProgramsData,
  userData,
  tripsData,
  activeTrip,
}) {
  const [rewardProgramsList, setRewardProgramsList] = useState(null);

  const accountRequest = new AccountRequests();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    let rewardPrograms = [...rewardProgramsData];

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
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}

          <div className="row">
            <div className="col-5 col-lg-1 label">{program.programName}</div>
            <div className="col-5 d-flex align-items-center justify-content-end">
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

  return <>{renderProgramsList}</>;
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
