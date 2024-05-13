import { useState } from "react";
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

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  name: null,
  startTime: null,
  confirmationNo: null,
  typeSelected: false,
  type: null,
};

function Transportation({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  // onSave is for new transportation
  const saveTransportation = async () => {
    setLoading(true);

    formData.tripId = props.activeTripId;
    tripRequest
      .addTransportation(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/transportations"));
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

  // onUpdate is for editing exiting transportation
  // const updateTransportation = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateTransportation(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/transportations")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  const handlePickupDate = (date) => {
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
      pickupDate: selectedDate,
    }));
  };

  const handlePickupTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pickupTime: time,
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
    switch (formData?.type) {
      case "shuttle":
        return "Pickup Location";
      case "bus":
        return "Location or Bus Station";
      case "train":
        return "Train Station";
      case "ferry":
        return "Terminal Name";
      default:
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
              <span className="label mx-3">Pickup</span>
              <Calendar
                selectedDate={formData.pickupDate}
                onDateChange={handlePickupDate}
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
                selectedDate={formData.pickupTime}
                onDateChange={handlePickupTime}
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
        title="Add Transportation"
        leftIcon={true}
        destination={"/transportations"}
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
            <Input
              name="companyName"
              onChange={handleChange}
              placeholder="Company"
              label="Company"
              value={formData.companyName}
            />
          ) : null}

          {formData.type === "bus" ||
          formData.type === "train" ||
          formData.type === "ferry" ||
          formData.type === "shuttle" ? (
            <Input
              name="location"
              onChange={handleChange}
              placeholder={getLocationType()}
              label={getLocationType()}
              value={formData.location}
            />
          ) : null}
          {formData.type === "bus" ||
          formData.type === "train" ||
          formData.type === "ferry" ? (
            <Input
              name="ticketNo"
              onChange={handleChange}
              placeholder="Ticket No."
              label="Ticket No."
              value={formData.ticketNo}
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
            <Button label="Save" onClick={saveTransportation} />
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
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transportation);
