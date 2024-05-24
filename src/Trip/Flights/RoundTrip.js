import Input from "../../Shared/UI/Input";
import Checkbox from "../../Shared/UI/Checkbox";

const RoundTrip = ({
  formData,
  handleShowAirlineInput,
  handleShowConfirmationInput,
  setFormData,
  displayAirlineInput,
  displayConfirmationInput,
}) => {
  const departureFlight = formData?.departureFlight;
  const returnFlight = formData?.returnFlight;

  const handleDepartureInputChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      departureFlight: {
        ...prevFormData?.departureFlight,
        [targetKey]: newValue,
      },
    }));
  };

  const handleReturnInputChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,

      returnFlight: {
        ...prevFormData?.returnFlight,
        [targetKey]: newValue,
      },
    }));
  };

  return (
    <div className="roundtrip-inputs">
      <div className="header">Departure Flight</div>
      <div className="row mb-3">
        <div className="col">
          <Input
            name="name"
            onChange={handleDepartureInputChange}
            placeholder="Airline"
            label="Airline"
            value={departureFlight?.name}
          />{" "}
          <Checkbox
            label="Return airline is different"
            toggleCheckbox={handleShowAirlineInput}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            name="flightNo"
            onChange={handleDepartureInputChange}
            placeholder="Flight Number"
            label="Flight Number"
            value={departureFlight?.flightNo}
          />
        </div>
        <div className="col">
          <Input
            name="seat"
            onChange={handleDepartureInputChange}
            placeholder="Seat"
            label="Seat"
            value={departureFlight?.seat}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <Input
            name="confirmationNo"
            onChange={handleDepartureInputChange}
            placeholder="Confirmation #"
            label="Confirmation"
            value={departureFlight?.confirmationNo}
          />
          <Checkbox
            label="Return confirmation number is different"
            toggleCheckbox={handleShowConfirmationInput}
          />
        </div>
      </div>

      <div className="header">Return Flight</div>
      {displayAirlineInput ? (
        <div className="row">
          <div className="col">
            <Input
              name="name"
              onChange={handleReturnInputChange}
              placeholder="Airline"
              label="Airline"
              value={returnFlight?.name}
            />
          </div>
        </div>
      ) : null}

      <div className="row">
        <div className="col">
          <Input
            name="flightNo"
            onChange={handleReturnInputChange}
            placeholder="Flight Number"
            label="Flight Number"
            value={returnFlight?.flightNo}
          />
        </div>
        <div className="col">
          <Input
            name="seat"
            onChange={handleReturnInputChange}
            placeholder="Seat"
            label="Seat"
            value={returnFlight?.seat}
          />
        </div>
      </div>
      {displayConfirmationInput ? (
        <div className="row">
          <div className="col">
            <Input
              name="confirmationNo"
              onChange={handleReturnInputChange}
              placeholder="Confirmation #"
              label="Confirmation"
              value={returnFlight?.confirmationNo}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RoundTrip;
