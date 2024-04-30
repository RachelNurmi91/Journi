import { useState, useCallback, useEffect } from "react";
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
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  hotel: null,
  city: null,
  country: null,
  arrivalDate: null,
  departureDate: null,
  confirmationNo: null,
  nameOnReservation: null,
};

function Hotel({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());

  const tripRequest = new TripRequests();

  const location = useLocation();

  const { edit, selectedItem } = location.state || {};

  const setCurrentProgram = useCallback(() => {
    if (selectedItem) {
      if (formData._id !== selectedItem?._id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...selectedItem,
        }));
      }
    }
  }, [selectedItem, formData._id]);

  useEffect(() => {
    if (edit) {
      setCurrentProgram();
    }
  }, [edit, setCurrentProgram]);

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
    let name;
    if (displayNewNameInput) {
      name = event.target.value;
    } else {
      name = props.userData?.firstName + " " + props.userData?.lastName;
    }

    setFormData((prevState) => ({ ...prevState, nameOnReservation: name }));
  };

  const newNameInputToggle = () => {
    setDisplayNewNameInput(!displayNewNameInput);
  };

  // onSave is for new hotels
  const saveHotel = async () => {
    formData.tripId = props.activeTripId;
    tripRequest
      .addHotel(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/hotels"));
      })
      .catch((error) => console.error(error));
  };

  // onUpdate is for editing exiting hotels
  const updateHotel = () => {
    tripRequest
      .updateHotel(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/hotels"));
      })
      .catch((error) => console.error(error));
  };

  const deleteHotel = (id) => {
    tripRequest
      .deleteHotel(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          props.navigate("/hotels");
        });
      })
      .catch((error) => console.error("Error: Cannot delete trip: ", error));
  };

  const handleArrivalDate = (date) => {
    let today = new Date().getTime();
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
        title={edit ? "Update Hotel" : "Add Hotel"}
        leftIcon={!!props.activeTrip.hotels.length ? true : false}
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

          {/* <div className="form-check my-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkReservationSelf"
              onClick={handleReservationName}
            />
            <label className="form-check-label" htmlFor="checkReservationSelf">
              The reservation is under my name
            </label>
          </div> */}
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
            />
          ) : null}
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={edit ? "Update" : "Save"}
              onClick={edit ? updateHotel : saveHotel}
            />
          </div>

          {edit ? (
            <div className="col-1 d-flex align-self-center p-2">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                size="lg"
                onClick={() => {
                  deleteHotel(formData?._id);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
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
