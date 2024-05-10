import { useState } from "react";
import { connect } from "react-redux";
// import { addNewCruiseData } from "../../Redux/Actions/AccountActions";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  cruiseLine: null,
  cruiseShip: null,
  departureDate: null,
  returnDate: null,
  confirmationNo: null,
  cabinNo: null,
};

function Cruise({ fetchUpdatedTrips, ...props }) {
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

  // onSave is for new cruises
  const saveCruise = async () => {
    setLoading(true);
    if (!formData.nameOnReservation) {
      formData.nameOnReservation =
        props.userData?.firstName + " " + props.userData?.lastName;
    }

    formData.tripId = props.activeTripId;
    tripRequest
      .addCruise(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/cruises"));
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

  // onUpdate is for editing exiting cruises
  // const updateCruise = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateCruise(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/cruises")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  const handleArrivalDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let departureDate = new Date(formData.arrivalDate).getTime();

    if (departureDate && departureDate < selectedDate) {
      handleDepartureDate(date);
    }

    if (departureDate < selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureDate: date,
      }));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      arrivalDate: selectedDate,
    }));
  };

  const handleDepartureDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let arrivalDate = new Date(formData.arrivalDate).getTime();

    if (selectedDate < arrivalDate) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      departureDate: selectedDate,
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
              <span className="label mx-3">Departure</span>
              <Calendar
                selectedDate={formData.arrivalDate}
                onDateChange={handleArrivalDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Return</span>
              <Calendar
                selectedDate={formData.departureDate}
                onDateChange={handleDepartureDate}
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
        title="Add Cruise"
        leftIcon={true}
        destination={"/cruises"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row"> {renderOptionsBox()}</div>
        <div className="row mt-2">
          <Input
            name="cruiseLine"
            onChange={handleChange}
            placeholder="Cruise Line"
            label="Cruise Line"
            value={formData.cruise}
          />
          <Input
            name="cruiseShip"
            onChange={handleChange}
            placeholder="Cruise Ship"
            label="Cruise Ship"
            value={formData.cruise}
          />

          <div className="container">
            <div className="row">
              <div className="col-6">
                <Input
                  name="confirmationNo"
                  onChange={handleChange}
                  placeholder="Confirmation #"
                  label="Confirmation #"
                  value={formData.confirmationNo}
                />
              </div>
              <div className="col-6">
                <Input
                  name="cabinNo"
                  onChange={handleChange}
                  placeholder="Cabin #"
                  label="Cabin #"
                  value={formData.city}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={saveCruise} />
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
  // addNewCruiseData,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cruise);
