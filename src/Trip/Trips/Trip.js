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
import Checkbox from "../../Shared/UI/Checkbox";

const DEFAULT_FORM_DATA = {
  name: null,
  startDate: null,
  selections: {
    flights: false,
    hotels: false,
    rentalCar: false,
    cruise: false,
    transportation: false,
    insurance: false,
  },
};

function Trip({
  fetchUpdatedTrips,
  closeSideNav,
  activeTrip,
  tripsListData,
  ...props
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const { edit, id } = useParams();

  const setCurrentTrip = useCallback(() => {
    if (id) {
      if (formData._id !== id) {
        let trip = tripsListData.find(
          (trip) => trip._id?.toString() === id?.toString()
        );
        setStartDate(trip.startDate);
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
      name: formData.name,
      startDate: formData.startDate,
      hotels: [],
      flights: [],
      transportation: [],
      rentals: [],
      cruises: [],
      insurance: null,
      selections: formData.selections,
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

  const handleStartDate = (date) => {
    setStartDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: date,
    }));
  };

  console.log(formData);
  const onCheck = (event) => {
    const targetKey = event.target.name;

    setFormData((prevState) => ({
      ...prevState,
      selections: {
        ...prevState.selections,
        [targetKey]: !prevState.selections[targetKey],
      },
    }));
  };
  return (
    <div className="content-body">
      <Header
        title={edit ? "Update Trip" : "Add Trip"}
        leftIcon={edit ? true : false}
        destination={"/profile"}
        props={{
          addNew: true,
        }}
      />
      <div className="row"></div>
      <div className="container">
        <div className="row" style={{ marginBottom: "35px" }}>
          <Input
            name="name"
            onChange={handleChange}
            label={<h4 className="primary-color">Where are you going?</h4>}
            placeholder="Unique Trip Name"
            value={formData.name}
            inputStyles={{ margin: 0, padding: 0 }}
          />
        </div>
        <h4 className="primary-color">When are you leaving?</h4>
        <div
          className="outlined-box px-4 py-3 mt-2"
          style={{ marginBottom: "40px" }}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon="fa-solid fa-calendar-days"
              style={{ color: "#0bb6c0" }}
            />
            <span className="label mx-3">Departure</span>
            <Calendar
              selectedDate={startDate}
              onDateChange={handleStartDate}
              placeholder="Select Date"
            />
          </div>
        </div>
        <h4 className="primary-color">What do you need?</h4>
        {/* <h4 className="mx-2">What do you need for this trip?</h4> */}
        <div className="b13-mon mb-3 mx-2">
          {" "}
          {edit
            ? null
            : `Don't be boring, select at least one. Your choices can be updated in
          your profile later.`}
        </div>
        <div className="trip-selections">
          <div className="item-select">
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-plane"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Flights
                </>
              }
              name="flights"
              checked={formData.selections.flights}
              toggleCheckbox={onCheck}
            />
          </div>

          <div className="item-select">
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-bed"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Hotels
                </>
              }
              checked={formData.selections.hotels}
              name="hotels"
              toggleCheckbox={onCheck}
            />
          </div>
          <div className="item-select">
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-car"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Rental Car
                </>
              }
              name="rentalCar"
              checked={formData.selections.rentalCar}
              toggleCheckbox={onCheck}
            />
          </div>
          <div className="item-select">
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-ship"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Cruise
                </>
              }
              name="cruise"
              checked={formData.selections.cruise}
              toggleCheckbox={onCheck}
            />
          </div>

          <div className="item-select">
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-bus"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Transportation
                </>
              }
              name="transportation"
              checked={formData.selections.transportation}
              toggleCheckbox={onCheck}
            />
          </div>
          <div className="item-select" style={{ marginBottom: "30px" }}>
            <Checkbox
              label={
                <>
                  <FontAwesomeIcon
                    icon="fa-solid fa-shield-halved"
                    style={{ color: "#0BB6C0", marginRight: "10px" }}
                  />
                  Insurance
                </>
              }
              name="insurance"
              checked={formData.selections.insurance}
              toggleCheckbox={onCheck}
            />
          </div>
        </div>

        <div className="row">
          <div>
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
