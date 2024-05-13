import { useEffect, useState } from "react";
import { connect } from "react-redux";

function TodaysItinerary({ userData }) {
  const [todaysItinerary, setTodaysItinerary] = useState(null);

  useEffect(() => {
    getTodaysItinerary();
  }, []);

  const getTodaysItinerary = () => {
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
  };

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
    if (todaysItinerary === null) return null;

    return todaysItinerary?.map((i, index) => {
      return (
        <li key={index}>
          <div className="bullet">
            <svg aria-hidden="true" viewBox="0 0 32 32" focusable="false">
              <circle stroke="none" cx="16" cy="16" r="10"></circle>
            </svg>
          </div>
          {i.name}
          {i.startTime ? formatTime(i.startTime) : null}
        </li>
      );
    });
  };

  return (
    <div className="App">
      <div style={{ textAlign: "left" }}>
        <h1>Scheduled Itinerary</h1>
        <ul>{renderTodaysItinerary()}</ul>
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
