import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

function Summary({ ...props }) {
  const loggedInSummary = () => {
    if (props.userData.trips.length) {
      return (
        <div className="content-body">
          <div className="container">
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
                <div className="box next-trip-box">
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
                <div className="box next-trip-box">
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-plane-departure"
                      style={{ color: "#0bb6c0" }}
                      size="4x"
                    />
                  </div>
                  <div className="title">{props.travelData?.departureDate}</div>
                  <div className="subtitle">Get Ready to Leave</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <div className="content-body text-center">
        //   <h1>
        //     Welcome back{" "}
        //     <span className="fw-bold font-highlights">
        //       {props.userData?.firstName}
        //     </span>
        //   </h1>
        //   <h2>
        //     Your next trip is to{" "}
        //     <span className="fw-bold font-highlights">
        //       {props.travelData?.tripName}
        //     </span>{" "}
        //   </h2>
        //   <h3>
        //     Get ready to leave on{" "}
        //     <span className="fw-bold font-highlights">
        //       {props.travelData?.departureDate}
        //     </span>
        //   </h3>
        // </div>
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
