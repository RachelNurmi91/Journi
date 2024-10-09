import Input from "../../Shared/UI/Input";

const OneWay = ({ formData, setFormData, inputError, setInputError }) => {
  const flight = formData?.departureFlight;

  const handleInputChange = (event) => {
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      departureFlight: {
        ...prevFormData?.departureFlight,
        [targetKey]: newValue,
      },
    }));
  };

  return (
    <>
      <div className="oneway-inputs">
        <div className="row">
          <div className="col">
            <Input
              name="name"
              onChange={handleInputChange}
              placeholder=""
              label="Airline"
              value={flight?.name}
              inputError={inputError}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              name="confirmationNo"
              onChange={handleInputChange}
              placeholder="Your reservations confirmation number"
              label="Confirmation"
              value={flight?.confirmationNo}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              name="flightNo"
              onChange={handleInputChange}
              placeholder="i.e. DL8103"
              label="Flight Number"
              value={flight?.flightNo}
            />
          </div>
          <div className="col">
            <Input
              name="seat"
              onChange={handleInputChange}
              placeholder=""
              label="Seat"
              value={flight?.seat}
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default OneWay;
