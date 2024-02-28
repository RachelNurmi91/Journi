import { useState } from "react";
import { connect } from "react-redux";
import { addNewFlightData } from "../../Redux/Actions/AccountActions";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Radio from "../../Shared/UI/Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DEFAULT_FORM_DATA = {
  airlineName: null,
  airportName: null,
  flightNumber: null,
  flightDate: null,
  ticketHolderName: null,
  confirmationNumber: null,
  seatAssignment: null,
};

function AddFlight({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [displayNewNameInput, setDisplayNewNameInput] = useState(false);
  const [isOneWay, setIsOneWay] = useState(false);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const handleRadio = (event) => {
    const targetValue = event.target.value;
    console.log(event);

    if (targetValue === "oneway") {
      setIsOneWay(true);
    } else {
      setIsOneWay(false);
    }
  };

  const onSave = () => {
    // ...
    // ...
    // Code to call server API here...
    // ...
    // ...
    // If API successful save data to redux state. Redux state not yet created.
    props.addNewFlightData(formData);
    props.navigate("/flights");
  };

  const renderOptions = () => {
    return (
      <>
        <div className="shadow-box p3-per">
          <div className="row">
            <div className="col d-flex justify-content-end">
              <Radio
                name="flightType"
                value="roundtrip"
                label="Roundtrip"
                onChange={handleRadio}
              />
            </div>
            <div className="col d-flex justify-content-start">
              <Radio
                name="flightType"
                value="oneway"
                label="One Way"
                onChange={handleRadio}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col d-flex justify-content-center">
              <FontAwesomeIcon
                icon="fa-solid fa-plane-departure"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">From</span>
            </div>
            <div className="col d-flex justify-content-center">
              <FontAwesomeIcon
                icon="fa-solid fa-plane-arrival"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">To</span>
            </div>
            <div className="col d-flex justify-content-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Depart</span>
            </div>
            {isOneWay ? null : (
              <div className="col d-flex justify-content-center">
                <FontAwesomeIcon
                  icon="fa-solid fa-calendar-days"
                  style={{ color: "#0bb6c0" }}
                />
                <span className="label mx-3">Return</span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderFields = () => {
    return (
      <>
        <div className="row">
          <div className="col">
            <Input
              name="airlineName"
              onChange={handleChange}
              placeholder="Airline"
              label="Airline"
            />
          </div>
          <div className="col">
            <Input
              name="airportName"
              onChange={handleChange}
              placeholder="Airport Name"
              label="Airport Name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              name="flightNumber"
              onChange={handleChange}
              placeholder="Flight Number"
              label="Flight Number"
            />
          </div>
          <div className="col">
            <Input
              name="ticketHolderName"
              onChange={handleChange}
              placeholder="Name on Ticket"
              label="Name on Ticket"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              name="confirmationNumber"
              onChange={handleChange}
              placeholder="Confirmation Number"
              label="Confirmation Number"
            />
          </div>
          <div className="col">
            <Input
              name="seatAssignment"
              onChange={handleChange}
              placeholder="Seat Assignment"
              label="Seat Assignment"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="content-body">
      <Header title="Add Flight" />
      <div className="container">
        <div className="row">{renderOptions()}</div>
        <div className="row mt-4">{renderFields()}</div>

        <div className="row">
          <Button label="Save" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  addNewFlightData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFlight);
