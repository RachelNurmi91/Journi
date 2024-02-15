import { setActiveTrip } from "../Redux/Actions/AccountActions";
import Select from "../Shared/UI/Select";
import { connect } from "react-redux";

function TripSelector({ ...props }) {
  let tripList = props.tripListData;

  const handleChange = (event) => {
    const selectedTrip = event.target.selectedOptions[0];
    const tripName = selectedTrip.value;
    const tripId = selectedTrip.getAttribute("data-id");

    let activeTrip = tripList.find(
      (trip) =>
        trip.id.toString() === tripId.toString() && trip.tripName === tripName
    );

    props.setActiveTrip(activeTrip);
  };

  const generateOptions = () => {
    return tripList.map((trip, i) => (
      <option value={trip.tripName} data-id={trip.id} key={i + 1}>
        {trip.tripName}
      </option>
    ));
  };

  return (
    <Select
      title="Select Trip"
      options={generateOptions}
      onChange={handleChange}
    />
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
