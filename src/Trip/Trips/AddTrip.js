import { useState } from "react";
import Modal from "react-modal";
import Input from "../../Shared/UI/Input";
import { connect } from "react-redux";
import {
  addNewTripData,
  setActiveTrip,
} from "../../Redux/Actions/AccountActions";
import Button from "../../Shared/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DEFAULT_FORM_DATA = {
  tripName: null,
  departureDate: null,
};

function AddTrip({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const generateTripId = () => {
    const nameId = formData.tripName.substring(0, 3).toUpperCase();
    const numberId =
      Math.floor(Math.random() * 80) +
      100 +
      "-" +
      (Math.floor(Math.random() * 8) + 10) +
      "-" +
      (Math.floor(Math.random() * 80000) + 10000);
    return nameId + "-" + numberId;
  };

  const onCreateTrip = () => {
    const newTrip = {
      id: generateTripId(),
      tripName: formData.tripName,
      departureDate: formData.departureDate,
      hotels: [],
      flights: [],
    };
    props.addNewTripData(newTrip);
    props.setActiveTrip(newTrip);
    toggleModal(!isModalOpen);
  };

  return (
    <div>
      <div onClick={toggleModal} className="nav-link">
        Add Trip
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            padding: "30px",
            width: "500px",
            maxWidth: "80%",
            borderRadius: "15px",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="row d-flex">
            <div className="col">
              <h2 className="d-inline-block">Add Trip</h2>
            </div>
            <div className="col d-flex justify-content-end">
              <span onClick={toggleModal}>
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  style={{ color: "#0bb6c0" }}
                  size="2x"
                />
              </span>
            </div>
          </div>
          <div className="row">
            <Input
              name="tripName"
              onChange={handleChange}
              label="Trip Name"
              placeholder="Unique Trip Name"
            />
          </div>
          <div className="row">
            <Input
              name="departureDate"
              onChange={handleChange}
              label="Departure Date"
              placeholder="MM/DD/YYYY"
            />
          </div>
          <div className="row">
            <Button label="Create Trip" onClick={onCreateTrip} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  addNewTripData,
  setActiveTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);
