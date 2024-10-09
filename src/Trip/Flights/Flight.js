import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import AirportAutocomplete from "./AirportAutocomplete";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Radio from "../../Shared/UI/Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import TimeCalendar from "../../Shared/UI/TimeCalendar";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import { useLocation } from "react-router-dom";
import Loading from "../../Shared/UI/Loading";
import RoundTrip from "./RoundTrip";
import OneWay from "./OneWay";
import Time from "../../Shared/UI/Time";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

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
  const [inputError, setInputError] = useState([]);
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

    // Account for all possible missing data error checks before attempting save.
    let errors = [];

    if (!formData?.departureFlight?.name) {
      console.error("Save failed: Airline name missing.");
      errors.push("name");
    }

    if (!formData?.departureFlight?.airport) {
      console.error("Save failed: Airport missing.");
      errors.push("airport");
    }

    if (!formData?.departureFlight?.date) {
      console.error("Save failed: End date missing.");
      errors.push("date");
    }

    if (formData?.isRoundTrip) {
      if (!formData?.returnFlight?.airport) {
        console.error("Save failed: Airport missing.");
        errors.push("returnAirport");
      }

      if (!formData?.returnFlight?.date) {
        console.error("Save failed: End date missing.");
        errors.push("returnDate");
      }
    } else {
      if (!formData?.departureFlight?.destinationAirport) {
        console.error("Save failed: Airport missing.");
        errors.push("returnAirport");
      }
    }

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

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
    if (inputError) {
      if (inputError?.includes("airport")) {
        let updateError = inputError.filter((err) => err !== "airport");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
    if (inputError) {
      if (inputError?.includes("returnAirport")) {
        let updateError = inputError.filter((err) => err !== "returnAirport");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
    if (inputError) {
      if (inputError?.includes("date")) {
        let updateError = inputError.filter((err) => err !== "date");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
    if (inputError) {
      if (inputError?.includes("returnDate")) {
        let updateError = inputError.filter((err) => err !== "returnDate");
        console.error(updateError);
        setInputError(updateError);
      }
    }

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
                <span
                  className={
                    inputError?.includes("airport")
                      ? "label error-color mx-3"
                      : "label mx-3"
                  }
                >
                  From
                </span>
              </div>
              <AirportAutocomplete
                placeholder="Departure city"
                onChange={handleDepartureAirport}
                value={formData?.departureFlight?.airport}
                name="airport"
              />
            </div>
            <div className="col-6 text-center">
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="fa-solid fa-plane-arrival"
                  style={{ color: "#0bb6c0" }}
                />
                <span
                  className={
                    inputError?.includes("returnAirport") ||
                    inputError?.includes("destinationAirport")
                      ? "label error-color mx-3"
                      : "label mx-3"
                  }
                >
                  To
                </span>
              </div>
              <AirportAutocomplete
                placeholder="Arrival city"
                onChange={handleReturnAirport}
                value={
                  formData?.isRoundTrip
                    ? formData?.returnFlight?.airport
                    : formData?.departureFlight?.destinationAirport
                }
                name={
                  formData?.isRoundTrip ? "returnAirport" : "destinationAirport"
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
              <span
                className={
                  inputError?.includes("date")
                    ? "label error-color mx-3"
                    : "label mx-3"
                }
              >
                Depart
              </span>
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
                <span
                  className={
                    inputError?.includes("returnDate")
                      ? "label error-color mx-3"
                      : "label mx-3"
                  }
                >
                  Return
                </span>

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
    <>
      <Breadcrumbs
        prevCrumb={activeTrip?.name}
        prevCrumbLink={"/trips"}
        currentCrumb="Flights"
      />

      <div className="content-body" style={{ paddingTop: "50px" }}>
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
              <OneWay
                formData={formData}
                setFormData={setFormData}
                inputError={inputError}
                setInputError={setInputError}
              />
            ) : (
              <RoundTrip
                formData={formData}
                setFormData={setFormData}
                handleShowAirlineInput={handleShowAirlineInput}
                handleShowConfirmationInput={handleShowConfirmationInput}
                displayAirlineInput={displayAirlineInput}
                displayConfirmationInput={displayConfirmationInput}
                inputError={inputError}
                setInputError={setInputError}
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
  addNewFlightData,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
