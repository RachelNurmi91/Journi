import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Methods from "../Shared/Methods";

function Summary({ ...props }) {
  const loggedInSummary = () => {
    if (props.userData.trips.length) {
      return (
        <div className="content-body">
          <div className="container summary">
            <div className="row text-center">
              <h1>
                Welcome back{" "}
                <span className="primary-color">
                  {props.userData.firstName}
                </span>
                !
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
                  <div className="title">{props.activeTrip?.tripName}</div>
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
                    {Methods.formatShortDate(props.activeTrip?.departureDate)}
                  </div>
                  <div className="subtitle">Get Ready to Leave</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
                <span className="primary-color x-bold">Step 3:</span> Update
                your profile
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
    }
  };

  const guestWelcome = () => {
    return (
      <div className="content-body text-center">
        <h1>Your Journi Awaits</h1>
        <p>Login or register to start planning</p>
      </div>
    );
  };

  return <>{props.userId ? loggedInSummary() : guestWelcome()}</>;
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
