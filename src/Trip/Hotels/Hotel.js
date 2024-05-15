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
  name: null,
  city: null,
  country: null,
  startDate: new Date(),
  endDate: null,
  confirmationNo: null,
  nameOnReservation: null,
};

function Hotel({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
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

  const handleStartDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let endDate = new Date(formData.startDate).getTime();

    if (endDate && endDate < selectedDate) {
      handleEndDate(date);
    }

    if (endDate < selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: date,
      }));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: selectedDate,
    }));
  };

  const handleEndDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let startDate = new Date(formData.startDate).getTime();

    if (selectedDate < startDate) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: selectedDate,
    }));
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
                selectedDate={formData.startDate}
                onDateChange={handleStartDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Departure</span>
              <Calendar
                selectedDate={formData.endDate}
                onDateChange={handleEndDate}
                placeholder="Select Date"
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
        leftIcon={activeTrip?.hotels?.length ? true : false}
        destination={"/hotels"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row"> {renderOptionsBox()}</div>
        <div className="row mt-2">
          <Input
            name="name"
            onChange={handleChange}
            placeholder="Hotel"
            label="Hotel"
            value={formData.name}
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
              onChange={handleChange}
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
