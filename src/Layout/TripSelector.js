import { setActiveTrip } from "../Redux/Actions/AccountActions";
import Select from "../Shared/UI/Select";
import { connect } from "react-redux";

function TripSelector({ ...props }) {
  let tripList = props.tripListData;

  const handleChange = (event) => {
    const selectedTrip = event.target.selectedOptions[0];
    const tripName = selectedTrip.value;
    const tripId = selectedTrip.getAttribute("data-id");

    // Match the selected trip id & name to the corresponding trip to return the correct data.
    let activeTrip = tripList.find(
      (trip) =>
        trip.id.toString() === tripId.toString() && trip.tripName === tripName
    );

    props.setActiveTrip(activeTrip);
  };

  const generateOptions = () => {
    return tripList.map((trip, i) => (
      <option value={trip?.tripName} data-id={trip.id} key={i + 1}>
        {trip?.tripName}
      </option>
    ));
  };

  return (
    <>
      {
        // Only show the select if there are enough trips to toggle between.
        props.tripListData?.length >= 2 ? (
          <Select options={generateOptions} onChange={handleChange} />
        ) : null
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    tripListData: state.account?.userAccount?.trips,
  };
}

const mapDispatchToProps = {
  setActiveTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripSelector);
