import { useEffect, useState } from "react";
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
import Checkbox from "../../Shared/UI/Checkbox";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

const DEFAULT_FORM_DATA = {
  name: null,
  city: null,
  country: null,
  startDate: null,
  endDate: null,
  confirmationNo: null,
  nameOnReservation: null,
};

function Hotel({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedHotel = activeTrip.hotels.find(
        (hotel) => hotel._id?.toString() === id
      );

      if (selectedHotel.name) setDisplayNewNameInput(true);

      setFormData(selectedHotel);
    }
  }, [activeTrip.hotels, location.pathname]);

  const handleChange = (event) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes(event.target.name)) {
        let updateError = inputError.filter((err) => err !== event.target.name);
        console.error(updateError);
        setInputError(updateError);
      }
    }

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

    // Account for all possible missing data error checks before attempting save.
    let errors = [];

    if (!formData.startDate) {
      console.error("Save failed: Start date missing.");
      errors.push("startDate");
    }

    if (!formData.endDate) {
      console.error("Save failed: End date missing.");
      errors.push("endDate");
    }
    if (!formData.name) {
      console.error("Save failed: Rental agency name missing.");
      errors.push("name");
    }

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

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

  const updateHotel = () => {
    tripRequest
      .updateHotel(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/hotels"));
      })
      .catch((error) => console.error(error));
  };

  const handleStartDate = (date) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes("startDate")) {
        let updateError = inputError.filter((err) => err !== "startDate");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes("endDate")) {
        let updateError = inputError.filter((err) => err !== "endDate");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
              <span
                className={
                  inputError?.includes("startDate")
                    ? "label error-color mx-3"
                    : "label mx-3"
                }
              >
                Arrival
              </span>
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
              <span
                className={
                  inputError?.includes("endDate")
                    ? "label error-color mx-3"
                    : "label mx-3"
                }
              >
                Departure
              </span>
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
    <>
      <Breadcrumbs />
      <div className="content-body">
        <Header
          title={updating ? "Update Hotel" : "Add Hotel"}
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
              inputError={inputError}
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

            <div>
              <Checkbox
                label="Reservation is under another name"
                toggleCheckbox={newNameInputToggle}
                checked={displayNewNameInput}
              />
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
          </div>
          <div className="row mt-3">
            <div className="col d-flex align-self-center">
              {updating ? (
                <Button label="Update" onClick={updateHotel} />
              ) : (
                <Button label="Save" onClick={saveHotel} />
              )}
            </div>
          </div>
          {inputError.length ? (
            <div className="row">
              <div
                className="b13-mon text-center error-color py-2 px-3"
                style={{ fontWeight: "700" }}
              >
                * Please fill out all required fields
              </div>
            </div>
          ) : null}
        </div>
        <Loading loading={loading} />
      </div>
    </>
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
