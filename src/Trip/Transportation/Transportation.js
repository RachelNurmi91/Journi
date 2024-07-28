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
import Checkbox from "../../Shared/UI/Checkbox";
import { useLocation } from "react-router-dom";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

const DEFAULT_FORM_DATA = {
  name: null,
  startDate: null,
  startTime: null,
  confirmationNo: null,
  location: null,
  typeSelected: false,
  type: null,
};

function Transportation({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
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

      let selectedTransportation = activeTrip.transportation.find(
        (transport) => transport._id?.toString() === id
      );

      setFormData(selectedTransportation);
    }
  }, [activeTrip.transportation, location.pathname]);

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

  // onSave is for new transportation
  const saveTransportation = async () => {
    setLoading(true);

    // Account for all possible missing data error checks before attempting save.
    let errors = [];

    if (!formData.startDate) {
      console.error("Save failed: Start date missing.");
      errors.push("startDate");
    }
    if (!formData.name) {
      console.error("Save failed: Transportation name missing.");
      errors.push("name");
    }

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

    formData.tripId = props.activeTripId;
    tripRequest
      .addTransportation(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/transportation"));
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

  const updateTransportation = () => {
    tripRequest
      .updateTransportation(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/transportation"));
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
    let departureDate = new Date(formData.arrivalDate).getTime();

    if (departureDate < selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureDate: date,
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

  const onCheck = (event) => {
    const targetKey = event.target.name;

    setFormData((prevState) => ({
      ...prevState,
      typeSelected: !prevState.typeSelected,
    }));

    setFormData((prevState) => ({
      ...prevState,
      type: targetKey,
    }));
  };

  const getLocationType = () => {
    let pickupLocation;
    switch (formData?.type) {
      case "shuttle":
        pickupLocation = "Pickup Location";
        break;
      case "privateCar":
        pickupLocation = "Pickup Location";
        break;
      case "bus":
        pickupLocation = "Location or Bus Station";
        break;
      case "train":
        pickupLocation = "Train Station";
        break;
      case "ferry":
        pickupLocation = "Terminal Name";
        break;
      default:
        return;
    }

    return pickupLocation;
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
                Pick Up
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
                onChange={handleStartTime}
                placeholder="Select Time"
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
          title={updating ? "Update Transportation" : "Add Transportation"}
          leftIcon={activeTrip?.transportation?.length ? true : false}
          destination={"/transportation"}
          props={{
            addNew: true,
          }}
        />
        <div className="container">
          <div className="row"> {renderOptionsBox()}</div>
          <div className="mt-4">
            <div className="label">What type of transportation is it?</div>
            <div className="trip-selections">
              <div className="item-select">
                <Checkbox
                  label={
                    <>
                      <FontAwesomeIcon
                        icon="fa-solid fa-bus"
                        style={{ color: "#0BB6C0", marginRight: "10px" }}
                      />
                      Bus
                    </>
                  }
                  name="bus"
                  checked={formData.type === "bus"}
                  toggleCheckbox={onCheck}
                />
              </div>
              <div className="item-select">
                <Checkbox
                  label={
                    <>
                      <FontAwesomeIcon
                        icon="fa-solid fa-train"
                        style={{ color: "#0BB6C0", marginRight: "10px" }}
                      />
                      Train
                    </>
                  }
                  name="train"
                  checked={formData.type === "train"}
                  toggleCheckbox={onCheck}
                />
              </div>
              <div className="item-select">
                <Checkbox
                  label={
                    <>
                      <FontAwesomeIcon
                        icon="fa-solid fa-van-shuttle"
                        style={{ color: "#0BB6C0", marginRight: "10px" }}
                      />
                      Shuttle
                    </>
                  }
                  name="shuttle"
                  checked={formData.type === "shuttle"}
                  toggleCheckbox={onCheck}
                />
              </div>
              <div className="item-select">
                <Checkbox
                  label={
                    <>
                      <FontAwesomeIcon
                        icon="fa-solid fa-car"
                        style={{ color: "#0BB6C0", marginRight: "10px" }}
                      />
                      Private Car
                    </>
                  }
                  name="privateCar"
                  checked={formData.type === "privateCar"}
                  toggleCheckbox={onCheck}
                />
              </div>
              <div className="item-select">
                <Checkbox
                  label={
                    <>
                      <FontAwesomeIcon
                        icon="fa-solid fa-ferry"
                        style={{ color: "#0BB6C0", marginRight: "10px" }}
                      />
                      Ferry or Boat
                    </>
                  }
                  name="ferry"
                  checked={formData.type === "ferry"}
                  toggleCheckbox={onCheck}
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {formData.type ? (
              <>
                <Input
                  name="name"
                  onChange={handleChange}
                  placeholder="Company"
                  label="Company"
                  value={formData.name}
                  inputError={inputError}
                />
                <Input
                  name="location"
                  onChange={handleChange}
                  placeholder={getLocationType()}
                  label={getLocationType()}
                  value={formData.location}
                />
              </>
            ) : null}

            {formData.type === "bus" ||
            formData.type === "train" ||
            formData.type === "ferry" ? (
              <Input
                name="confirmationNo"
                onChange={handleChange}
                placeholder="Ticket No."
                label="Ticket No."
                value={formData.confirmationNo}
              />
            ) : null}
            {formData.type === "privateCar" || formData.type === "shuttle" ? (
              <Input
                name="confirmationNo"
                onChange={handleChange}
                placeholder="Confirmation No."
                label="Confirmation No."
                value={formData.confirmationNo}
              />
            ) : null}
          </div>
          <div className="row mt-3">
            <div className="col d-flex align-self-center">
              {updating ? (
                <Button label="Update" onClick={updateTransportation} />
              ) : (
                <Button label="Save" onClick={saveTransportation} />
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
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transportation);
