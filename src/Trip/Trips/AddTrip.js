import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Input from "../../Shared/UI/Input";
import { connect } from "react-redux";
import {
  addNewTripData,
  setActiveTrip,
} from "../../Redux/Actions/AccountActions";
import Button from "../../Shared/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";

const DEFAULT_FORM_DATA = {
  tripName: null,
  departureDate: null,
};

function AddTrip({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tripRequest = new TripRequests();

  const navigate = useNavigate();

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onCreateTrip = async () => {
    const newTrip = {
      tripName: formData.tripName,
      departureDate: formData.departureDate,
      hotels: [],
      flights: [],
    };

    tripRequest
      .addTrip(newTrip)
      .then((response) => {
        newTrip._id = response.data._id;

        fetchUpdatedTrips().then((response) => {
          let activeTrip = response.find(
            (trips) => trips._id?.toString() === newTrip._id?.toString()
          );

          props.setActiveTrip(activeTrip);
          setIsModalOpen(false);
          navigate("/summary");
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div onClick={toggleModal} className="nav-link">
        <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#fff" }} />
        <span className="ms-2">Add Trip</span>
      </div>
      <Modal
        ariaHideApp={false}
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
            <div className="col-9">
              <h2 className="d-inline-block">Add Trip</h2>
            </div>
            <div className="col-3 d-flex justify-content-end">
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
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);
