import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Methods from "../Shared/Methods";
import TodaysItinerary from "./TodaysItinerary";
import Button from "../Shared/UI/Button";

function Summary({ userData, activeTrip }) {
  const USER_ID = userData.id;

  const formatTodaysDate = () => {
    const date = new Date();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the components of the date
    const day = date.getDate();
    const monthIndex = date.getMonth(); // Zero-based month index
    const month = months[monthIndex];

    // Function to get the ordinal suffix
    const getOrdinalSuffix = (n) => {
      if (n > 3 && n < 21) return "th"; // 11th, 12th, 13th, etc.
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}`;

    return formattedDate;
  };

  const vacationStarted = useCallback(() => {
    return (
      <div className="content-body">
        <div className="container summary">
          <div className="text-center">
            <div className="text-uppercase" style={{ fontWeight: "900" }}>
              Let the fun begin!
            </div>
            <h1 className="title primary-color mb-0">{activeTrip?.name}</h1>
            <div className="b13-mon">
              {Methods.formatLongDate(activeTrip?.startDate)} -{" "}
              {Methods.formatLongDate(activeTrip?.endDate)}
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="primary-color">Today's Itinerary</h2>

              <p className="b13-mon light-bg-color p-3">
                <span style={{ fontWeight: "700" }}>Tip:</span> Add start times
                for a more precise itinerary.
              </p>

              <div className="mx-2">
                Your plans for {formatTodaysDate(new Date())}!
              </div>

              <div className="outlined-box timeline">
                <TodaysItinerary />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [activeTrip?.endDate, activeTrip?.name, activeTrip?.startDate]);

  const guestSummary = () => {
    return (
      <div className="content-body text-center">
        <h1 className="mt-3">Your Journi Awaits</h1>
        <FontAwesomeIcon
          icon="fa-solid fa-umbrella-beach"
          style={{ color: "#0bb6c0", padding: "25px 0px 40px" }}
          size="5x"
        />
        <p>Login or register to start planning.</p>
      </div>
    );
  };

  const noTripsSummary = () => {
    return (
      <div className="content-body">
        <h1 className="text-center">Let's get started!</h1>
        <div className="text-center mt-3">
          <FontAwesomeIcon
            icon="fa-solid fa-passport"
            style={{ color: "#0bb6c0" }}
            size="5x"
          />
        </div>

        <div className="container">
          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color" style={{ fontWeight: "900" }}>
                Step 1:
              </span>{" "}
              Add your first trip!
            </h4>
            <div className="mx-auto mt-2 w-75">
              <Button
                label={
                  <>
                    <FontAwesomeIcon
                      icon="fa-solid fa-plus"
                      style={{ color: "#fff" }}
                    />
                    <span className="mx-2">Let's Add It!</span>
                  </>
                }
                destination={"/trips"}
              />
            </div>
          </div>

          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color" style={{ fontWeight: "900" }}>
                Step 2:
              </span>{" "}
              Add your travel plans
            </h4>
          </div>
          <div className="row">
            <p className="px-4">
              You can add your tickets, reservations, itinerary, and more.
            </p>
          </div>
          <div className="row">
            <h4 className="mt-4">
              <span className="primary-color" style={{ fontWeight: "900" }}>
                Step 3:
              </span>{" "}
              Update your profile
            </h4>
            <p className="px-4">
              Add your rewards and membership numbers to your profile for easy
              access!
            </p>
          </div>
          <div className="row mt-3 text-center">
            <h3>Happy Travels, my Friend!</h3>
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
