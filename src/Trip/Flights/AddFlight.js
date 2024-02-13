import { useState } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import Input from "../../Layout/Shared/Input";
import Button from "../../Layout/Shared/Button";

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

  const handleSave = () => {
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
      <h1>Add Flight</h1>
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
      {/* <div className="form-floating mb-3">
        <input
          className="form-control"
          name="airlineName"
          id="airlineName"
          placeholder="Airline"
          onChange={handleChange}
        />
        <label for="airlineName">Airline</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="airportName"
          id="airportName"
          placeholder="Airport"
          onChange={handleChange}
        />
        <label for="airportName">Airport</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="flightNumber"
          id="flightNumber"
          placeholder="Flight #"
          onChange={handleChange}
        />
        <label for="flightNumber">Flight #</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="flightDate"
          id="flightDate"
          placeholder="Departure Date"
          onChange={handleChange}
        />
        <label for="flightDate">Departure Date</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          name="confirmationNumber"
          id="confirmationNumber"
          placeholder="Confirmation #"
          onChange={handleChange}
        />
        <label for="confirmationNumber">Confirmation #</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          name="seatAssignment"
          id="seatAssignment"
          placeholder="seatAssignment"
          onChange={handleChange}
        />
        <label for="seatAssignment">seatAssignment</label>
      </div>
      <div className="form-check my-2">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="checkReservationSelf"
          onClick={handleReservationName}
        />
        <label className="form-check-label" for="checkReservationSelf">
          The reservation is under my name
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="checkReservationOther"
          onClick={newNameInputToggle}
        />
        <label className="form-check-label" for="checkReservationOther">
          The reservation is under another name
        </label>
      </div>
      {displayNewNameInput ? (
        <div className="form-floating">
          <input
            className="form-control"
            name="ticketHolderName"
            id="ticketHolderName"
            placeholder="Ticket Holder"
            onChange={handleReservationName}
          />
          <label for="ticketHolderName">Ticket Holder</label>
        </div>
      ) : null}
      <button className="btn-save mt-3" type="submit" onClick={handleSubmit}>
        Save
      </button> */}
      <Button label="Save" onClick={handleSave} />
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
