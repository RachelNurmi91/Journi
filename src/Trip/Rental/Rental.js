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
import { vehicleTypes } from "./VehicleTypes";
import Select from "../../Shared/UI/Select";

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  rentalAgency: null,
  vehicleType: null,
  confirmationNo: null,
  pickupDate: null,
  pickupTime: null,
  returnDate: null,
  returnTime: null,
};

function Rental({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const generateOptions = () => {
    return vehicleTypes.map((type, i) => {
      return (
        <option value={type} key={i + 1}>
          {type}
        </option>
      );
    });
  };

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  // onSave is for new rental cars
  const saveRental = async () => {
    setLoading(true);

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

  // onUpdate is for editing exiting rental cars
  // const updateRental = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateRental(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/rentals")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  const handlePickupDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let departureDate = new Date(formData.arrivalDate).getTime();

    if (departureDate && departureDate < selectedDate) {
      handleReturnDate(date);
    }

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

  const handleReturnDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let arrivalDate = new Date(formData.arrivalDate).getTime();

    if (selectedDate < arrivalDate) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      returnDate: selectedDate,
    }));
  };

  const handleReturnTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnTime: time,
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
          <div className="row mt-4">
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Return</span>
              <Calendar
                selectedDate={formData.returnDate}
                onDateChange={handleReturnDate}
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
                selectedDate={formData.returnTime}
                onDateChange={handleReturnTime}
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
        title="Add Rental Car"
        leftIcon={true}
        destination={"/rentals"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row"> {renderOptionsBox()}</div>
        <div className="row mt-2">
          <Input
            name="rentalAgency"
            onChange={handleChange}
            placeholder="Rental Agency"
            label="Rental Agency"
            value={formData.rentalAgency}
          />
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
            <Button label="Save" onClick={saveRental} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
