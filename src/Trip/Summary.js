import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Summary({ ...props }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {console.log(props.travelData)}
      <div className="text-center">
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    travelData: state.account?.activeTrip?.tripSummary,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
