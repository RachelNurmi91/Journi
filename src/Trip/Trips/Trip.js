import { useState, useEffect, useCallback } from "react";
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
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import Loading from "../../Shared/UI/Loading";
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  tripName: null,
  departureDate: new Date(),
};

function Trip({
  fetchUpdatedTrips,
  closeSideNav,
  activeTrip,
  tripsListData,
  ...props
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const { edit, id } = useParams();

  const setCurrentTrip = useCallback(() => {
    if (id) {
      if (formData._id !== id) {
        let trip = tripsListData.find(
          (trip) => trip._id?.toString() === id?.toString()
        );
        setDepartureDate(trip.departureDate);
        setFormData(trip);
      }
    }
  }, [id, formData._id, tripsListData]);

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
    setLoading(true);
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

          setLoading(false);
          props.setActiveTrip(activeTrip);
          props.navigate("/summary");
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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

  const handleDepartureDate = (date) => {
    let today = new Date().getTime();
    let selectedDate = new Date(date).getTime();

    if (today > selectedDate) {
      console.error("Cannot select date in the past.");
      return;
    }

    if (today < selectedDate) {
      setDepartureDate(date);
      setFormData((prevFormData) => ({
        ...prevFormData,
        departureDate: date,
      }));
    }
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
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={edit ? "Update" : "Save"}
              onClick={edit ? updateTrip : saveTrip}
            />
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
    tripsListData: state.account?.userAccount?.trips,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  addNewTripData,
  setActiveTrip,
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
