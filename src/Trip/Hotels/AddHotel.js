import { useState } from "react";
import { connect } from "react-redux";
import { addNewHotelData } from "../../Redux/Actions/AccountActions";
import Input from "../../Layout/Shared/Input";
import Select from "../../Layout/Shared/Select";
import Button from "../../Layout/Shared/Button";
import { countryList } from "../../Layout/Shared/Data/CountryList";

const DEFAULT_FORM_DATA = {
  hotelName: null,
  arrivalData: null,
  departureDate: null,
  hotelCity: null,
  hotelCountry: null,
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

  const handleCountrySelect = (newValue) => {
    setFormData((prevState) => ({ ...prevState, hotelCountry: newValue }));
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

  const handleSave = () => {
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
      <h1>Add Hotel</h1>
      <Input
        name="hotelName"
        onChange={handleChange}
        placeholder="Hotel"
        label="Hotel"
      />
      <Select category={countryList} onChange={handleCountrySelect} />

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
  addNewHotelData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
