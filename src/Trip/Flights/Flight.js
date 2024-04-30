import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import Input from "../../Shared/UI/Input";
import AirportAutocomplete from "./AirportAutocomplete";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Radio from "../../Shared/UI/Radio";
import Checkbox from "../../Shared/UI/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  type: "roundtrip",
  airline: null,
  confirmationNo: null,
  departureFlight: { date: new Date() },
  returnFlight: { date: new Date() },
  ticketHolder: null,
};

function Flight({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [isOneWay, setIsOneWay] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

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

  const saveFlight = () => {
    formData.tripId = props.activeTripId;
    if (!formData.ticketHolder)
      formData.ticketHolder =
        props.userData?.firstName + " " + props.userData?.lastName;
    if (!formData.departureFlight.date)
      formData.departureFlight.date = new Date();

    tripRequest
      .addFlight(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/flights"));
      })
      .catch((error) => console.error(error));
  };

  // onUpdate is for editing exiting flights
  const updateFlight = () => {
    tripRequest
      .updateFlight(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/flights"));
      })
      .catch((error) => console.error(error));
  };

  const deleteFlight = (id) => {
    tripRequest
      .deleteFlight(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          props.navigate("/flights");
        });
      })
      .catch((error) => console.error("Error: Cannot delete trip: ", error));
  };

  const handleRadioCheck = (event) => {
    const typeId = event.target.id;

    if (typeId === "oneway") {
      setIsOneWay((prevState) => true);
    } else {
      setIsOneWay((prevState) => false);
    }

    setFormData((prevState) => ({ ...prevState, type: typeId }));
  };

  const handleDepartureAirport = (name, code, city, country) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      departureFlight: {
        ...prevFormData.departureFlight,
        airport: name,
        code: code,
        city: city,
        country: country,
      },
    }));
  };

  const handleReturnAirport = (name, code, city, country) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnFlight: {
        ...prevFormData.returnFlight,
        airport: name,
        code: code,
        city: city,
        country: country,
      },
    }));
  };

  const handleDepartureDate = (date) => {
    let today = new Date().getTime();
    let returnDate = new Date(formData.returnFlight.date).getTime();
    let selectedDate = new Date(date).getTime();
    let selectedReturnDate = new Date(returnDate).getTime();
    if (today > selectedDate) {
      console.error("Cannot select date in the past.");
      return;
    }

    if (returnDate < selectedDate) {
      setReturnDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        returnFlight: {
          ...prevFormData.returnFlight,
          date: date,
        },
      }));
    }

    if (today < selectedDate) {
      setDepartureDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureFlight: {
          ...prevFormData.departureFlight,
          date: date,
        },
      }));
    }

    if (selectedReturnDate && selectedReturnDate < selectedDate) {
      console.error("Departure date cannot be after return date.");
      return;
    }
  };

  const handleReturnDate = (date) => {
    let today = new Date().getTime();
    let selectedDate = new Date(date).getTime();
    let selectedDepartDate = new Date(departureDate).getTime();

    if (today > selectedDate) {
      console.error("Cannot select date in the past.");
      return;
    }

    if (selectedDate < formData.departureFlight?.date) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    if (today < selectedDate) {
      setReturnDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        returnFlight: {
          ...prevFormData.returnFlight,
          date: date,
        },
      }));
    }

    if (selectedDepartDate && selectedDepartDate > selectedDate) {
      console.error("Return date cannot be before departure date.");
      return;
    }
  };

  const handleInputChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    if (targetKey === "departureFlightNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureFlight: {
          ...prevFormData.departureFlight,
          flightNo: newValue,
        },
      }));
    } else if (targetKey === "departureSeat") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureFlight: {
          ...prevFormData.departureFlight,
          seat: newValue,
        },
      }));
    } else if (targetKey === "returnFlightNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        returnFlight: {
          ...prevFormData.returnFlight,
          flightNo: newValue,
        },
      }));
    } else if (targetKey === "returnSeat") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        returnFlight: {
          ...prevFormData.returnFlight,
          seat: newValue,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
    }
  };

  const handleShowNameInput = () => {
    setDisplayNewNameInput(!displayNewNameInput);
  };

  const renderOptionsBox = () => {
    return (
      <>
        <div className="outlined-box p-4">
          <div className="row">
            <div className="col d-flex justify-content-end">
              <Radio
                id="roundtrip"
                name="flightType"
                label="Roundtrip"
                onChange={handleRadioCheck}
                checked={!isOneWay}
              />
            </div>
            <div className="col d-flex justify-content-start">
              <Radio
                id="oneway"
                name="flightType"
                label="One Way"
                onChange={handleRadioCheck}
                checked={isOneWay}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6 text-center">
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-departure"
                  style={{ color: "#0bb6c0" }}
                />
                <span className="label mx-3">From</span>
              </div>
              <AirportAutocomplete
                placeholder="Departure city"
                onChange={handleDepartureAirport}
                value={formData?.departureFlight?.[0]?.airport}
              />
            </div>
            <div className="col-6 text-center">
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-arrival"
                  style={{ color: "#0bb6c0" }}
                />
                <span className="label mx-3">To</span>
              </div>

              <AirportAutocomplete
                placeholder="Arrival city"
                onChange={handleReturnAirport}
                value={formData?.returnFlight?.[0]?.airport}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Depart</span>
              <Calendar
                selectedDate={departureDate}
                onDateChange={handleDepartureDate}
              />
            </div>

            {isOneWay ? null : (
              <div className="col-6 text-center">
                <FontAwesomeIcon
                  icon="fa-solid fa-calendar-days"
                  style={{ color: "#0bb6c0" }}
                />
                <span className="label mx-3">Return</span>
                <Calendar
                  selectedDate={returnDate}
                  onDateChange={handleReturnDate}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderRoundtripFields = () => {
    return (
      <div className="roundtrip-inputs">
        <div className="row">
          <div className="col-6">
            <Input
              name="airline"
              onChange={handleInputChange}
              placeholder="Airline"
              label="Airline"
              value={formData?.airline}
            />
          </div>
          <div className="col-6">
            <Input
              name="confirmationNo"
              onChange={handleInputChange}
              placeholder="Confirmation #"
              label="Confirmation"
              value={formData?.confirmationNo}
            />
          </div>
        </div>
        <div className="header">Departure Flight</div>
        <div className="row ">
          <div className="col">
            <Input
              name="departureFlightNo"
              onChange={handleInputChange}
              placeholder="Flight Number"
              label="Flight Number"
              value={formData?.departureFlight?.[0]?.flightNo}
            />
          </div>
          <div className="col">
            <Input
              name="departureSeat"
              onChange={handleInputChange}
              placeholder="Seat"
              label="Seat"
              value={formData?.departureFlight?.[0]?.seat}
            />
          </div>
        </div>
        <div className="header">Return Flight</div>

        <div className="row">
          <div className="col">
            <Input
              name="returnFlightNo"
              onChange={handleInputChange}
              placeholder="Flight Number"
              label="Flight Number"
              value={formData?.returnFlight?.[0]?.flightNo}
            />
          </div>
          <div className="col">
            <Input
              name="returnSeat"
              onChange={handleInputChange}
              placeholder="Seat"
              label="Seat"
              value={formData?.returnFlight?.[0]?.seat}
            />
          </div>
        </div>
        <div className="row mt-2">
          <Checkbox
            label="Tickets are under a different name."
            toggleCheckbox={handleShowNameInput}
          />
        </div>
        {displayNewNameInput ? (
          <div className="row">
            <Input
              name="ticketHolder"
              onChange={handleInputChange}
              placeholder="Name on Ticket"
              label="Name on Ticket"
            />
          </div>
        ) : null}
      </div>
    );
  };

  const renderOnewayFields = () => {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <Input
              name="airline"
              onChange={handleInputChange}
              placeholder="Airline"
              label="Airline"
              value={formData?.airline}
            />
          </div>
          <div className="col-6">
            <Input
              name="confirmationNo"
              onChange={handleInputChange}
              placeholder="Confirmation #"
              label="Confirmation"
              value={formData?.confirmationNo}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              name="departureFlightNo"
              onChange={handleInputChange}
              placeholder="Flight Number"
              label="Flight Number"
              value={formData?.departureFlight?.[0]?.flightNo}
            />
          </div>
          <div className="col">
            <Input
              name="departureSeat"
              onChange={handleInputChange}
              placeholder="Seat"
              label="Seat"
              value={formData?.departureFlight?.[0]?.seat}
            />
          </div>
        </div>
        <div className="row mt-2">
          <Checkbox
            label="Ticket is under a different name."
            toggleCheckbox={handleShowNameInput}
          />
        </div>
        {displayNewNameInput ? (
          <div className="row">
            <Input
              name="ticketHolder"
              onChange={handleInputChange}
              placeholder="Name on Ticket"
              label="Name on Ticket"
            />
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="content-body">
      <Header
        title={edit ? "Update Flight" : "Add Flight"}
        leftIcon={!!props.activeTrip.flights.length ? true : false}
        destination={"/flights"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row">{renderOptionsBox()}</div>
        <div className="mt-2">
          {isOneWay ? renderOnewayFields() : renderRoundtripFields()}
        </div>

        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={edit ? "Update" : "Save"}
              onClick={edit ? updateFlight : saveFlight}
            />
          </div>

          {edit ? (
            <div className="col-1 d-flex align-self-center p-2">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                size="lg"
                onClick={() => {
                  deleteFlight(formData?._id);
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
  addNewFlightData,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
