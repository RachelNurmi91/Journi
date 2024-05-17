import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodaysItinerary({ userData }) {
  const [todaysItinerary, setTodaysItinerary] = useState(null);

  useEffect(() => {
    let todaysItinerary = [];

    const hotels = userData?.trips?.flatMap((trip) => trip?.hotels);
    const cruises = userData?.trips?.flatMap((trip) => trip?.cruises);
    const activities = userData?.trips?.flatMap((trip) => trip?.activities);
    const flights = userData?.trips?.flatMap((trip) => trip?.flights);
    const transportation = userData?.trips?.flatMap(
      (trip) => trip?.transportation
    );
    const rentals = userData?.trips?.flatMap((trip) => trip?.rentals);

    const today = new Date();
    const todaysDate = today.toDateString();

    hotels?.forEach((hotel) => {
      const startDate = new Date(hotel?.startDate);
      const hotelDate = startDate?.toDateString();

      if (hotelDate === todaysDate) {
        todaysItinerary.push(hotel);
      }
    });

    cruises?.forEach((cruise) => {
      const startDate = new Date(cruise?.startDate);
      const cruiseDate = startDate?.toDateString();

      if (cruiseDate === todaysDate) {
        todaysItinerary.push(cruise);
      }
    });

    activities?.forEach((activity) => {
      const startDate = new Date(activity?.startDate);
      const activityDate = startDate?.toDateString();

      if (activityDate === todaysDate) {
        todaysItinerary.push(activity);
      }
    });

    flights?.forEach((flight) => {
      const startDate = new Date(flight?.startDate);
      const flightDate = startDate?.toDateString();

      if (flightDate === todaysDate) {
        todaysItinerary.push(flight);
      }
    });

    transportation?.forEach((transport) => {
      const startDate = new Date(transport?.startDate);
      const flightDate = startDate?.toDateString();

      if (flightDate === todaysDate) {
        todaysItinerary.push(transport);
      }
    });

    rentals?.forEach((rental) => {
      const startDate = new Date(rental?.startDate);
      const flightDate = startDate?.toDateString();

      if (flightDate === todaysDate) {
        todaysItinerary.push(rental);
      }
    });

    sortTodaysItinerary(todaysItinerary);
  }, [userData?.trips]);

  const sortTodaysItinerary = (todaysItinerary) => {
    todaysItinerary.sort((a, b) => {
      if (a.startTime === null) return -1;
      if (b.startTime === null) return 1;
      return new Date(a.startTime) - new Date(b.startTime);
    });

    setTodaysItinerary(todaysItinerary);
  };

  const formatTime = (unformattedTime) => {
    const time = new Date(unformattedTime);

    let timeOfDay;
    let hour = time?.getHours();
    let minute = time?.getMinutes().toString().padStart(2, "0");

    if (hour === 0) hour = 12;

    if (hour >= 12) {
      timeOfDay = "PM";

      if (hour > 12) {
        hour -= 12;
      }
    } else {
      timeOfDay = "AM";
    }

    const formattedTime = `${hour}:${minute} ${timeOfDay}`;
    return formattedTime;
  };

  const renderTodaysItinerary = () => {
    if (!todaysItinerary?.length) {
      return (
        <div className="row py-4">
          <div className="col-3 d-flex align-items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-umbrella-beach"
              style={{ color: "#0bb6c0" }}
              size="3x"
            />
          </div>
          <div className="col" style={{ paddingLeft: "25px" }}>
            Looks like you have nothing planned today.{" "}
            <span className="primary-color" style={{ fontWeight: "700" }}>
              Enjoy it!
            </span>
          </div>
        </div>
      );
    } else if (todaysItinerary?.length === 1) {
      return (
        <div style={{ marginLeft: "10px" }}>
          <span className="label">{todaysItinerary?.[0]?.name}</span>
          {todaysItinerary?.[0]?.location ? (
            <div className="b13-mon">
              {" "}
              <FontAwesomeIcon
                icon="fa-solid fa-location-dot"
                style={{ color: "#0bb6c0" }}
              />{" "}
              {todaysItinerary?.[0]?.location}
            </div>
          ) : null}
          {todaysItinerary?.[0]?.startTime ? (
            <div className="b13-mon">
              {" "}
              <FontAwesomeIcon
                icon="fa-solid fa-clock"
                style={{ color: "#0bb6c0" }}
              />{" "}
              {formatTime(todaysItinerary?.[0]?.startTime)}
            </div>
          ) : null}
        </div>
      );
    } else {
      return todaysItinerary?.map((i, index) => {
        const isLastItem = index === todaysItinerary.length - 1;
        return (
          <li key={index} style={{ paddingBottom: isLastItem ? "0" : "30px" }}>
            <div className="bullet">
              <svg aria-hidden="true" viewBox="0 0 32 32" focusable="false">
                <circle stroke="none" cx="16" cy="16" r="10"></circle>
              </svg>
            </div>
            <div>
              <span className="label">{i.name}</span>
              {i.location ? (
                <div className="b13-mon">
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {i.location}
                </div>
              ) : null}
              {i.startTime ? (
                <div className="b13-mon">
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {formatTime(i.startTime)}
                </div>
              ) : null}
            </div>
          </li>
        );
      });
    }
  };

  return (
    <div>
      <div className="itinerary">
        <div style={{ textAlign: "left" }}>
          <ul>{renderTodaysItinerary()}</ul>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodaysItinerary);
