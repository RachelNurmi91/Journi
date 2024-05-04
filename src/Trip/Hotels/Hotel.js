import { useState } from "react";
import { connect } from "react-redux";
import { addNewHotelData } from "../../Redux/Actions/AccountActions";
import Input from "../../Shared/UI/Input";
import CountryAutocomplete from "./CountryAutocomplete";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  hotel: null,
  city: null,
  country: null,
  arrivalDate: new Date(),
  departureDate: new Date(),
  confirmationNo: null,
  nameOnReservation: null,
};

function Hotel({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const handleCountrySelect = (country) => {
    setFormData((prevState) => ({
      ...prevState,
      country: country,
    }));
  };

  const handleReservationName = (event) => {
    let name = event.target.value;

    setFormData((prevState) => ({ ...prevState, nameOnReservation: name }));
  };

  const newNameInputToggle = () => {
    setDisplayNewNameInput(!displayNewNameInput);
  };

  // onSave is for new hotels
  const saveHotel = async () => {
    setLoading(true);

    if (!formData.nameOnReservation) {
      formData.nameOnReservation =
        props.userData?.firstName + " " + props.userData?.lastName;
    }

    formData.tripId = props.activeTripId;
    tripRequest
      .addHotel(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/hotels"));
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  // onUpdate is for editing exiting hotels
  // const updateHotel = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateHotel(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/hotels")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  const handleArrivalDate = (date) => {
    let today = new Date().getTime();
    let returnDate = new Date(formData.departureDate).getTime();
    let selectedDate = new Date(date).getTime();
    let selectedDepartureDate = new Date(departureDate).getTime();
    if (today > selectedDate) {
      console.error("Cannot select date in the past.");
      return;
    }

    if (today < selectedDate) {
      setArrivalDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        arrivalDate: date,
      }));
    }

    if (returnDate < selectedDate) {
      setDepartureDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureDate: date,
      }));
    }

    if (selectedDepartureDate && selectedDepartureDate < selectedDate) {
      console.error("Arrival date cannot be after departure date.");
      return;
    }
  };

  const handleDepartureDate = (date) => {
    let today = new Date().getTime();
    let selectedDate = new Date(date).getTime();
    let selectedArrivalDate = new Date(arrivalDate).getTime();

    if (today > selectedDate) {
      console.error("Cannot select date in the past.");
      return;
    }

    if (selectedDate < formData.arrivalDate) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    if (today < selectedDate) {
      setDepartureDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureDate: date,
      }));
    }

    if (selectedArrivalDate && selectedArrivalDate > selectedDate) {
      console.error("Departure date cannot be before arrival date.");
      return;
    }
  };

  const renderOptionsBox = () => {
    return (
      <>
        <div className="outlined-box p-4">
          <div className="row">
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Arrival</span>
              <Calendar
                selectedDate={arrivalDate}
                onDateChange={handleArrivalDate}
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Departure</span>
              <Calendar
                selectedDate={departureDate}
                onDateChange={handleDepartureDate}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="content-body">
      <Header
        title="Add Hotel"
        leftIcon={true}
        destination={"/hotels"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row"> {renderOptionsBox()}</div>
        <div className="row mt-2">
          <Input
            name="hotel"
            onChange={handleChange}
            placeholder="Hotel"
            label="Hotel"
            value={formData.hotel}
          />

          <Input
            name="confirmationNo"
            onChange={handleChange}
            placeholder="Confirmation #"
            label="Confirmation #"
            value={formData.confirmationNo}
          />
          <div className="container">
            <div className="row">
              <div className="col-6">
                <Input
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  label="City"
                  value={formData.city}
                />
              </div>
              <div className="col-6">
                <CountryAutocomplete
                  onChange={handleCountrySelect}
                  value={formData.country}
                />
              </div>
            </div>
          </div>
          <div className="form-check mx-3 mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkReservationOther"
              onClick={newNameInputToggle}
            />
            <label className="form-check-label" htmlFor="checkReservationOther">
              The reservation is under another name
            </label>
          </div>
          {displayNewNameInput ? (
            <Input
              name="nameOnReservation"
              onChange={handleReservationName}
              placeholder="Name on Reservation"
              label="Name on Reservation"
              value={formData.nameOnReservation}
            />
          ) : null}
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={saveHotel} />
          </div>
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    activeTripId: state.account?.activeTrip?._id,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  addNewHotelData,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
