import { useState } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";

const DEFAULT_FORM_DATA = {
  airlineName: null,
  airportName: null,
  flightNumber: null,
  flightDate: null,
  ticketHolderName: null,
  confirmationNumber: null,
  seatAssignment: null,
};

function AddFlight({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onSave = () => {
    // ...
    // ...
    // Code to call server API here...
    // ...
    // ...
    // If API successful save data to redux state. Redux state not yet created.
    props.addNewFlightData(formData);
    props.navigate("/flights");
  };

  return (
    <div className="content-body">
      <Header title="Add Flight" />
      <Input
        name="airlineName"
        onChange={handleChange}
        placeholder="Airline"
        label="Airline"
      />
      <Input
        name="airportName"
        onChange={handleChange}
        placeholder="Airport Name"
        label="Airport Name"
      />
      <Input
        name="flightNumber"
        onChange={handleChange}
        placeholder="Flight Number"
        label="Flight Number"
      />
      <Input
        name="flightDate"
        onChange={handleChange}
        placeholder="Departure Date"
        label="Departure Date"
      />
      <Input
        name="ticketHolderName"
        onChange={handleChange}
        placeholder="Name on Ticket"
        label="Name on Ticket"
      />
      <Input
        name="confirmationNumber"
        onChange={handleChange}
        placeholder="Confirmation Number"
        label="Confirmation Number"
      />
      <Input
        name="seatAssignment"
        onChange={handleChange}
        placeholder="Seat Assignment"
        label="Seat Assignment"
      />
      <Button label="Save" onClick={onSave} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  addNewFlightData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFlight);
