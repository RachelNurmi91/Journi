import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/UI/Input";
import { connect } from "react-redux";
import {
  addNewTripData,
  setActiveTrip,
} from "../../Redux/Actions/AccountActions";
import Button from "../../Shared/UI/Button";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Header from "../../Shared/UI/Header";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DEFAULT_FORM_DATA = {
  tripName: null,
  departureDate: null,
};

function Trip({
  fetchUpdatedTrips,
  closeSideNav,
  activeTrip,
  tripsData,
  ...props
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const tripRequest = new TripRequests();

  const location = useLocation();

  const { edit, selectedItem } = location.state || {};

  const navigate = useNavigate();

  const setCurrentTrip = useCallback(() => {
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
      setCurrentTrip();
    }
  }, [edit, setCurrentTrip]);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const saveTrip = async () => {
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
          navigate("/summary");
        });
      })
      .catch((error) => console.error(error));
  };

  // onUpdate is for editing exiting hotels
  const updateTrip = () => {
    tripRequest
      .updateTrip(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.error(error));
  };

  const deleteTrip = async (selectedTrip) => {
    await tripRequest
      .deleteTrip(selectedTrip)
      .then(() => {
        if (selectedTrip._id === activeTrip?._id) {
          if (tripsData.length > 1) {
            let updatedTrips = [...tripsData];
            let index = updatedTrips.findIndex(
              (x) => x._id === selectedTrip._id
            );
            if (index !== -1) {
              updatedTrips.splice(index, 1);
            }
            setActiveTrip(updatedTrips[0]);
          } else {
            setActiveTrip(null);
          }
        } else {
          setActiveTrip(tripsData[0]);
        }
        fetchUpdatedTrips().then(() => navigate("/profile"));
      })
      .catch((error) => console.error("Error: Cannot delete trip: ", error));
  };

  return (
    <div className="content-body">
      <div className="container">
        <Header
          title={edit ? "Update Trip" : "Add Trip"}
          leftIcon={edit ? true : false}
          destination={"/profile"}
          props={{
            addNew: true,
          }}
        />
        <div className="row">
          <Input
            name="tripName"
            onChange={handleChange}
            label="Trip Name"
            placeholder="Unique Trip Name"
            value={formData.tripName}
          />
        </div>
        <div className="row">
          <Input
            name="departureDate"
            onChange={handleChange}
            label="Departure Date"
            placeholder="MM/DD/YYYY"
            value={formData.departureDate}
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={edit ? "Update" : "Save"}
              onClick={edit ? updateTrip : saveTrip}
            />
          </div>

          {edit ? (
            <div className="col-1 d-flex align-self-center p-2">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                size="lg"
                onClick={() => {
                  deleteTrip(formData?._id);
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
    tripsData: state.account?.userAccount?.trips,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  addNewTripData,
  setActiveTrip,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
