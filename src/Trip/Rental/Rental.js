import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Time from "../../Shared/UI/Time";
import { vehicleTypes } from "./VehicleTypes";
import Select from "../../Shared/UI/Select";
import Checkbox from "../../Shared/UI/Checkbox";
import Loading from "../../Shared/UI/Loading";
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  name: null,
  vehicleType: "Economy",
  confirmationNo: null,
  startLocation: null,
  startDate: null,
  startTime: null,
  endLocation: null,
  endDate: null,
  endTime: null,
};

function Rental({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [showReturnLocation, setShowReturnLocation] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedRental = activeTrip.rentals.find(
        (rental) => rental._id?.toString() === id
      );

      setFormData(selectedRental);
    }
  }, [activeTrip.rentals, location.pathname]);

  const generateOptions = () => {
    return vehicleTypes.map((type, i) => {
      return (
        <option value={type} key={i + 1}>
          {type}
        </option>
      );
    });
  };

  const toggleReturnLocation = () => {
    setShowReturnLocation(!showReturnLocation);
  };

  const handleChange = (event) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes(event.target.name)) {
        let updateError = inputError.filter((err) => err !== event.target.name);
        console.log(updateError);
        setInputError(updateError);
      }
    }

    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  // onSave is for new rental cars
  const saveRental = async () => {
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

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

    formData.tripId = props.activeTripId;
    tripRequest
      .addRental(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/rentals"));
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

  const updateRental = () => {
    tripRequest
      .updateRental(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/rentals"));
      })
      .catch((error) => console.error(error));
  };

  const handleStartDate = (date) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes("startDate")) {
        let updateError = inputError.filter((err) => err !== "startDate");
        setInputError(updateError);
      }
    }

    let selectedDate = new Date(date).getTime();
    let endDate = new Date(formData.arrivalDate).getTime();

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

  const handleStartTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startTime: time,
    }));
  };

  const handleEndDate = (date) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes("endDate")) {
        let updateError = inputError.filter((err) => err !== "endDate");
        setInputError(updateError);
      }
    }

    let selectedDate = new Date(date).getTime();
    let arrivalDate = new Date(formData.arrivalDate).getTime();

    if (selectedDate < arrivalDate) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: selectedDate,
    }));
  };

  const handleEndTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      endTime: time,
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
                Pickup
              </span>
              <Calendar
                selectedDate={formData.startDate}
                onDateChange={handleStartDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-clock"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Time</span>
              <Time
                selectedDate={formData.startTime}
                onDateChange={handleStartTime}
                placeholder="Select Time"
              />
            </div>
          </div>
          <div className="row mt-4">
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
                Drop Off
              </span>
              <Calendar
                selectedDate={formData.endDate}
                onDateChange={handleEndDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-clock"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Time</span>
              <Time
                selectedDate={formData.endTime}
                onDateChange={handleEndTime}
                placeholder="Select Time"
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
        title={updating ? "Update Rental Car" : "Add Rental Car"}
        leftIcon={activeTrip?.rentals?.length ? true : false}
        destination={"/rentals"}
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
            placeholder="Rental Agency"
            label="Rental Agency"
            value={formData.name}
            inputError={inputError}
          />
          <Input
            name="startLocation"
            onChange={handleChange}
            placeholder="Pickup Location"
            label="Pickup Location"
            value={formData.startLocation}
          />
          <div>
            <Checkbox
              label="Set different drop off location"
              toggleCheckbox={toggleReturnLocation}
            />
            {showReturnLocation ? (
              <Input
                name="endLocation"
                onChange={handleChange}
                placeholder="Drop Off Location"
                label="Drop Off Location"
                value={formData.endLocation}
              />
            ) : null}
          </div>

          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="label my-2">Vehicle Type</div>
                <Select
                  name="vehicleType"
                  options={generateOptions}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <Input
                  name="confirmationNo"
                  onChange={handleChange}
                  placeholder="Confirmation #"
                  label="Confirmation #"
                  value={formData.confirmationNo}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            {updating ? (
              <Button label="Update" onClick={updateRental} />
            ) : (
              <Button label="Save" onClick={saveRental} />
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
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
