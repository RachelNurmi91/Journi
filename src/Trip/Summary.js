import { connect } from "react-redux";

function Summary({ ...props }) {
  const loggedInSummary = () => {
    if (props.userData.trips.length) {
      return (
        <div className="content-body text-center">
          <h1>
            Welcome back{" "}
            <span className="fw-bold font-highlights">
              {props.userData?.firstName}
            </span>
          </h1>
          <h2>
            Your next trip is to{" "}
            <span className="fw-bold font-highlights">
              {props.travelData?.country}
            </span>{" "}
          </h2>
          <h3>
            Get ready to leave on{" "}
            <span className="fw-bold font-highlights">
              {props.travelData?.departure}
            </span>
          </h3>
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
    travelData: state.account?.activeTrip?.tripSummary,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
