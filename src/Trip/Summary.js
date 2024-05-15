import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Methods from "../Shared/Methods";
import TodaysItinerary from "./TodaysItinerary";

function Summary({ userData, activeTrip }) {
  const USER_ID = userData.id;

  const vacationStarted = useCallback(() => {
    return (
      <div className="content-body">
        <div className="container summary">
          <div className="outlined-box text-center">
            <div>
              <FontAwesomeIcon
                icon="fa-solid fa-suitcase-rolling"
                style={{ color: "#0bb6c0" }}
                size="4x"
              />
            </div>
            <div className="title">{activeTrip?.name}</div>
            <div className="subtitle"></div>
            Let the fun begin!
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="primary-color">Today's Itinerary</h2>
              <p className="b13-mon light-bg-color p-3">
                <span style={{ fontWeight: "700" }}>Hint:</span> For a more
                exact itinerary add start times. Anything without start times
                will show up on top.
              </p>

              <div className="timeline">
                <TodaysItinerary />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [activeTrip?.name]);

  const guestSummary = () => {
    return (
      <div className="content-body text-center">
        <h1>Your Journi Awaits</h1>
        <p>Login or register to start planning</p>
      </div>
    );
  };

  const noTripsSummary = () => {
    return (
      <div className="content-body">
        <h1 className="text-center">Let's get started!</h1>
        <div className="container">
          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color x-bold">Step 1:</span> Add your
              first trip!
            </h4>
          </div>

          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color x-bold">Step 2:</span> Add your
              travel plans
            </h4>
          </div>
          <div className="row">
            <p className="px-4">
              Under the navigation you'll find areas to add your tickets,
              reservations, itinerary, and more.
            </p>
          </div>
          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color x-bold">Step 3:</span> Update your
              profile
            </h4>
            <p className="px-4">
              Add your rewards and membership numbers to your profile for easy
              access!
            </p>
          </div>
          <div className="row mt-3 text-center">
            <h2 className="primary-color x-bold">Happy Travels!</h2>
          </div>
        </div>
      </div>
    );
  };

  const futureTripSummary = useCallback(() => {
    return (
      <div className="content-body">
        <div className="container summary">
          <div className="row text-center">
            <h1>
              Welcome back{" "}
              <span className="primary-color">{userData.firstName}</span>!
            </h1>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="outlined-box text-center">
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-suitcase-rolling"
                    style={{ color: "#0bb6c0" }}
                    size="4x"
                  />
                </div>
                <div className="title">{activeTrip?.name}</div>
                <div className="subtitle"></div>
                Your Next Trip
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="outlined-box p10-per text-center">
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-plane-departure"
                    style={{ color: "#0bb6c0" }}
                    size="4x"
                  />
                </div>
                <div className="title">
                  {Methods.formatShortDate(activeTrip?.startDate)}
                </div>
                <div className="subtitle">Get Ready to Leave</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [activeTrip?.name, activeTrip?.startDate, userData.firstName]);

  const renderSummary = useCallback(() => {
    const today = Methods.formatShortDate(new Date());
    const tripStart = Methods.formatShortDate(activeTrip?.startDate);
    const tripEnd = Methods.formatShortDate(activeTrip?.endDate);

    if (!USER_ID) return guestSummary();

    if (!activeTrip) return noTripsSummary();

    if (activeTrip) {
      if (today >= tripStart && today <= tripEnd) {
        return vacationStarted();
      } else {
        return futureTripSummary();
      }
    }
  }, [USER_ID, activeTrip, futureTripSummary, vacationStarted]);

  useEffect(() => {
    renderSummary();
  }, [renderSummary]);

  return <>{renderSummary()}</>;
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
