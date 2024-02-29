import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../Shared/UI/Button";
import Input from "../../Shared/UI/Input";
import { addNewTripData } from "../../Redux/Actions/AccountActions";
import Header from "../../Shared/UI/Header";

const DEFAULT_FORM_DATA = {
  tripName: null,
  departureDate: null,
};

function AddTrip({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const generateTripId = () => {
    const nameId = formData.tripName.substring(0, 3).toUpperCase();
    const numberId =
      Math.floor(Math.random() * 80) +
      100 +
      "-" +
      (Math.floor(Math.random() * 8) + 10) +
      "-" +
      (Math.floor(Math.random() * 80000) + 10000);
    return nameId + "-" + numberId;
  };

  const onCreateTrip = () => {
    const newTrip = {
      id: generateTripId(),
      tripName: formData.tripName,
      departureDate: formData.departureDate,
      hotels: [],
      flights: [],
    };
    props.addNewTripData(newTrip);
  };

  return (
    <div>
      <Header title="Add Trip" />
      <Input
        name="tripName"
        onChange={handleChange}
        label="Trip Name"
        placeholder="Trip Name"
      />
      <Input
        name="departureDate"
        onChange={handleChange}
        label="Departure Date"
        placeholder="Departure Date"
      />
      <Button label="Create Trip" onClick={onCreateTrip} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  addNewTripData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);
