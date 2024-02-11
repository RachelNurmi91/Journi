import { useState } from "react";
import { connect } from "react-redux";
import { addNewHotelData } from "../../Redux/Actions/AccountActions";

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
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="hotelName"
          id="hotelName"
          placeholder="Hotel Name"
          onChange={handleChange}
        />
        <label for="hotelName">Hotel Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="arrivalDate"
          id="arrivalDate"
          placeholder="Arrival (mm/dd/yyy)"
          onChange={handleChange}
        />
        <label for="arrivalDate">Arrival</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="departureDate"
          id="departureDate"
          placeholder="Departure (mm/dd/yyy)"
          onChange={handleChange}
        />
        <label for="departureDate">Departure</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          name="hotelConfirmation"
          id="hotelConfirmation"
          placeholder="Confirmation #"
          onChange={handleChange}
        />
        <label for="confirmationNumber">Confirmation #</label>
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
            name="nameOnReservation"
            id="nameOnReservation"
            placeholder="Name on Reservation"
            onChange={handleReservationName}
          />
          <label for="nameOnReservation">Name on Reservation</label>
        </div>
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
