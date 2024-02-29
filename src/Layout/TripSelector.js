import { useCallback } from "react";
import { setActiveTrip } from "../Redux/Actions/AccountActions";
import Select from "../Shared/UI/Select";
import { connect } from "react-redux";

function TripSelector({ tripListData, activeTrip, setActiveTrip }) {
  const generateOptions = useCallback(() => {
    return tripListData.map((trip, i) => {
      const isSelected = trip.tripName === activeTrip?.tripName;

      return (
        <option
          value={trip.tripName}
          data-id={trip.id}
          key={i + 1}
          selected={isSelected}
        >
          {trip.tripName}
        </option>
      );
    });
  }, [tripListData, activeTrip]);

  const handleChange = (event) => {
    const selectedTrip = event.target.selectedOptions[0];
    const tripName = selectedTrip.value;
    const tripId = selectedTrip.getAttribute("data-id");

    // Match the selected trip id & name to the corresponding trip to return the correct data.
    let activeTrip = tripListData.find(
      (trip) =>
        trip.id.toString() === tripId.toString() && trip.tripName === tripName
    );

    setActiveTrip(activeTrip);
  };

  return (
    <>
      {tripListData?.length >= 2 ? (
        <Select options={generateOptions} onChange={handleChange} />
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
