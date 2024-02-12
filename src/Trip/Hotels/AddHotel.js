import { useState } from "react";
import { connect } from "react-redux";
import { addNewHotelData } from "../../Redux/Actions/AccountActions";
import Input from "../../Layout/Shared/Input";

const DEFAULT_FORM_DATA = {
  hotelName: null,
  arrivalData: null,
  departureDate: null,
  hotelConfirmation: null,
  nameOnReservation: null,
};

function AddHotel({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const newNameInputToggle = () => {
    setDisplayNewNameInput(!displayNewNameInput);
  };

  const handleReservationName = (event) => {
    let name;
    if (displayNewNameInput) {
      name = event.target.value;
    } else {
      name = props.userData?.firstName + " " + props.userData?.lastName;
    }

    setFormData((prevState) => ({ ...prevState, nameOnReservation: name }));
  };

  const handleSubmit = () => {
    // ...
    // ...
    // Code to call server API here...
    // ...
    // ...
    // If API successful save data to redux state. Redux state not yet created.
    props.addNewHotelData(formData);
    props.navigate("/hotels");
  };

  return (
    <div className="content-body">
      <Input
        name="hotelName"
        onChange={handleChange}
        placeholder="Hotel"
        label="Hotel"
      />
      <Input
        name="country"
        onChange={handleChange}
        placeholder="Country"
        label="Country"
      />
      <Input
        name="city"
        onChange={handleChange}
        placeholder="City"
        label="City"
      />
      <Input
        name="arrivalDate"
        onChange={handleChange}
        placeholder="Arrival"
        label="Arrival"
      />
      <Input
        name="departureDate"
        onChange={handleChange}
        placeholder="Departure"
        label="Departure"
      />
      <Input
        name="hotelConfirmation"
        onChange={handleChange}
        placeholder="Confirmation #"
        label="Confirmation #"
      />
      <Input
        name="city"
        onChange={handleChange}
        placeholder="City"
        label="City"
      />
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
        <Input
          name="nameOnReservation"
          onChange={handleReservationName}
          placeholder="Name on Reservation"
          label="Name on Reservation"
        />
      ) : null}
      <button className="btn-save mt-3" type="submit" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  addNewHotelData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
