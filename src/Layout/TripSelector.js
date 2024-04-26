import { useCallback } from "react";
import { setActiveTrip } from "../Redux/Actions/AccountActions";
import Select from "../Shared/UI/Select";
import { connect } from "react-redux";

function TripSelector({
  tripListData,
  activeTrip,
  setActiveTrip,
  toggleSideNav,
}) {
  const generateOptions = useCallback(() => {
    return tripListData.map((trip, i) => {
      return (
        <option value={trip.tripName} data-id={trip._id} key={i + 1}>
          {trip.tripName}
        </option>
      );
    });
  }, [activeTrip]);

  const handleChange = (event) => {
    const selectedTrip = event.target.selectedOptions[0];
    const tripName = selectedTrip.value;
    const tripId = selectedTrip.getAttribute("data-id");

    // Match the selected trip id & name to the corresponding trip to return the correct data.
    let trip = tripListData.find(
      (trip) =>
        trip._id?.toString() === tripId?.toString() &&
        trip.tripName === tripName
    );
    toggleSideNav();
    setActiveTrip(trip);
  };

  return (
    <>
      {tripListData?.length >= 2 ? (
        <Select
          value={activeTrip?.tripName}
          options={generateOptions}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  return {
    tripListData: state.account?.userAccount?.trips,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  setActiveTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripSelector);
