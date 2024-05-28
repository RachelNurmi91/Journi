import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import AirportAutocomplete from "./AirportAutocomplete";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Radio from "../../Shared/UI/Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import { useLocation } from "react-router-dom";
import Loading from "../../Shared/UI/Loading";
import RoundTrip from "./RoundTrip";
import OneWay from "./OneWay";
import Time from "../../Shared/UI/Time";

const DEFAULT_FORM_DATA = {
  isRoundTrip: true,
  type: "roundtrip",
  nameOnReservation: null,
  departureFlight: {
    name: null,
    date: null,
    time: null,
    confirmationNo: null,
    flightNo: null,
    seat: null,
  },
  returnFlight: {
    name: null,
    date: null,
    time: null,
    confirmationNo: null,
    flightNo: null,
    seat: null,
  },
};

function Flight({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  // const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [displayAirlineInput, setDisplayAirlineInput] = useState(false);
  const [displayConfirmationInput, setDisplayConfirmationInput] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedFlight = activeTrip.flights.find(
        (flight) => flight._id?.toString() === id
      );

      setFormData(selectedFlight);
    }
  }, [activeTrip.flights, location.pathname]);

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
  }, [selectedItem, formData]);

  useEffect(() => {
    if (edit) {
      setCurrentProgram();
    }
  }, [edit, setCurrentProgram]);

  const saveFlight = () => {
    setLoading(true);

    formData.tripId = props.activeTripId;

    // In the future we will allow a name change on the reservation
    if (!formData.nameOnReservation) {
      formData.nameOnReservation =
        props.userData?.firstName + " " + props.userData?.lastName;
    }

    if (formData.isRoundTrip) {
      if (!formData.returnFlight.name) {
        formData.returnFlight.name = formData.departureFlight.name;
      }

      if (!formData.returnFlight.confirmationNo) {
        formData.returnFlight.confirmationNo =
          formData.departureFlight.confirmationNo;
      }
    }

    tripRequest
      .addFlight(formData)
      .then(() => {
        setLoading(false);
        fetchUpdatedTrips().then(() => props.navigate("/flights"));
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const updateFlight = () => {
    tripRequest
      .updateFlight(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/flights"));
      })
      .catch((error) => console.error(error));
  };

  const handleRadioCheck = (event) => {
    let roundTrip = true;

    if (event.target.id === "oneway") {
      roundTrip = false;
    }

    setFormData((prevState) => ({ ...prevState, isRoundTrip: roundTrip }));
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
    if (formData.isRoundTrip) {
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
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureFlight: {
          ...prevFormData.departureFlight,
          destinationAirport: name,
          destinationCode: code,
          destinationCity: city,
          destinationCountry: country,
        },
      }));
    }
  };

  const handleDepartureDate = (date) => {
    let returnDate = new Date(formData.returnFlight?.date).getTime();
    let selectedDate = new Date(date).getTime();

    if (formData.isRoundTrip) {
      if (returnDate < selectedDate) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          returnFlight: {
            ...prevFormData.returnFlight,
            date: date,
          },
        }));
      }

      if (returnDate && returnDate < selectedDate) {
        handleReturnDate(date);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      departureFlight: {
        ...prevFormData.departureFlight,
        date: date,
      },
    }));
  };

  const handleReturnDate = (date) => {
    let selectedDate = new Date(date).getTime();
    let selectedDepartDate = new Date(formData.departureDate).getTime();

    if (selectedDate < formData.departureFlight?.date) {
      console.error("Departure can not occur before the arrival.");
      return;
    }

    if (selectedDepartDate && selectedDepartDate > selectedDate) {
      console.error("Return date cannot be before departure date.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      returnFlight: {
        ...prevFormData.returnFlight,
        date: date,
      },
    }));
  };

  // const handleShowNameInput = () => {
  //   setDisplayNewNameInput(!displayNewNameInput);
  // };

  const handleDepartureTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      departureFlight: {
        ...prevFormData.departureFlight,
        time: time,
      },
    }));
  };
  const handleReturnTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnFlight: {
        ...prevFormData.returnFlight,
        time: time,
      },
    }));
  };

  const handleShowAirlineInput = () => {
    setDisplayAirlineInput(!displayAirlineInput);
  };

  const handleShowConfirmationInput = () => {
    setDisplayConfirmationInput(!displayConfirmationInput);
  };

  const renderOptionsBox = () => {
    return (
      <>
        <div className="outlined-box p-4">
          {updating ? (
            <h4
              className="text-center primary-color"
              style={{ fontWeight: "900" }}
            >
              {formData?.isRoundTrip ? "Round Trip Flight" : "One Way Flight"}
            </h4>
          ) : (
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Radio
                  id="roundtrip"
                  name="flightType"
                  label="Roundtrip"
                  onChange={handleRadioCheck}
                  checked={formData?.isRoundTrip}
                />
              </div>
              <div className="col d-flex justify-content-start">
                <Radio
                  id="oneway"
                  name="flightType"
                  label="One Way"
                  onChange={handleRadioCheck}
                  checked={!formData?.isRoundTrip}
                />
              </div>
            </div>
          )}

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
                value={formData?.departureFlight?.airport}
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
                value={
                  formData?.isRoundTrip
                    ? formData?.returnFlight?.airport
                    : formData?.departureFlight?.destinationAirport
                }
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
                selectedDate={formData?.departureFlight?.date}
                onDateChange={handleDepartureDate}
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
                selectedDate={formData?.departureFlight?.time}
                onChange={handleDepartureTime}
                placeholder="Select Time"
              />
            </div>
          </div>

          {!formData?.isRoundTrip ? null : (
            <div className="row mt-3">
              <div className="col-6 text-center">
                <FontAwesomeIcon
                  icon="fa-solid fa-calendar-days"
                  style={{ color: "#0bb6c0" }}
                />
                <span className="label mx-3">Return</span>

                <Calendar
                  selectedDate={formData?.returnFlight?.date}
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
                  selectedDate={formData?.returnFlight?.time}
                  onChange={handleReturnTime}
                  placeholder="Select Time"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="content-body">
      <Header
        title={updating ? "Update Flight" : "Add Flight"}
        leftIcon={activeTrip?.flights?.length ? true : false}
        destination={"/flights"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row">{renderOptionsBox()}</div>
        <div className="mt-2">
          {!formData?.isRoundTrip ? (
            <OneWay formData={formData} setFormData={setFormData} />
          ) : (
            <RoundTrip
              formData={formData}
              setFormData={setFormData}
              handleShowAirlineInput={handleShowAirlineInput}
              handleShowConfirmationInput={handleShowConfirmationInput}
              displayAirlineInput={displayAirlineInput}
              displayConfirmationInput={displayConfirmationInput}
            />
          )}
        </div>
        {/* <div className="row mt-2">
          <Checkbox
            label="Tickets are under a different name."
            toggleCheckbox={handleShowNameInput}
          />
        </div> */}
        {/* {displayNewNameInput ? (
          <div className="row">
            <Input
              name="nameOnReservation"
              onChange={handleInputChange}
              placeholder="Name on Ticket"
              label="Name on Ticket"
              value={formData?.nameOnReservation}
            />
          </div>
        ) : null} */}
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            {updating ? (
              <Button label="Update" onClick={updateFlight} />
            ) : (
              <Button label="Save" onClick={saveFlight} />
            )}
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
  addNewFlightData,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
