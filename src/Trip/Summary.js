import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Methods from "../Shared/Methods";

function Summary({ ...props }) {
  const loggedInSummary = () => {
    if (props.userData.trips.length) {
      return (
        <div className="content-body">
          <div className="container summary">
            <div className="row">
              <h1>
                Welcome back{" "}
                <span className="primary-color">
                  {props.userData.firstName}
                </span>
                !
              </h1>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="outlined-box p10-per text-center">
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-suitcase-rolling"
                      style={{ color: "#0bb6c0" }}
                      size="4x"
                    />
                  </div>
                  <div className="title">{props.travelData?.tripName}</div>
                  <div className="subtitle"></div>
                  Your Next Trip
                </div>
              </div>
              <div className="col">
                <div className="outlined-box p10-per text-center">
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-plane-departure"
                      style={{ color: "#0bb6c0" }}
                      size="4x"
                    />
                  </div>
                  <div className="title">
                    {Methods.formatDate(props.travelData?.departureDate)}
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
        <div className="content-body text-center">
          <h1>Time to start traveling!</h1>
          <h3>Set your first trip!</h3>
        </div>
      );
    }
  };

  const guestWelcome = () => {
    return <h1 className="content-body text-center">Please Log In</h1>;
  };

  return <>{props.userData ? loggedInSummary() : guestWelcome()}</>;
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    travelData: state.account?.activeTrip?.tripData,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
