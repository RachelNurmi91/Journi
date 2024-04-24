import { connect } from "react-redux";
import Methods from "../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTripData, setActiveTrip } from "../Redux/Actions/AccountActions";
import TripRequests from "../Requests/TripRequests";

function Profile({ ...props }) {
  const tripRequest = new TripRequests();

  const deleteTrip = async (selectedTrip) => {
    await tripRequest
      .deleteTrip(selectedTrip.tripId)
      .then(() => {
        if (selectedTrip.tripId === props.activeTrip.tripId) {
          if (props.tripsData.length > 1) {
            let updatedTrips = [...props.tripsData];
            let index = updatedTrips.findIndex(
              (x) => x.tripId === selectedTrip.tripId
            );
            if (index !== -1) {
              updatedTrips.splice(index, 1);
            }
            props.setActiveTrip(updatedTrips[0]);
          } else {
            props.setActiveTrip(null);
          }
        } else {
          props.setActiveTrip(props.tripsData[0]);
        }
        props.deleteTripData(selectedTrip);
      })
      .catch((error) => console.log("Error: Cannot delete trip: ", error));
  };

  const renderTripList = () => {
    return props.tripsData?.map((trip, index) => {
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}
          <div className="row py-2">
            <div className="col-9">
              <div className="row">
                <div className="col-6 b16-mon">{trip.tripName}</div>
                <div className="col-6">
                  {Methods.formatDate(trip.departureDate)}
                </div>

                <div className="col-6">
                  {trip.hotels?.length ? trip.hotels.length : "0"} Hotels
                </div>
                <div className="col-6">
                  {trip.flights?.length ? trip.flights.length : "0"} Flights
                </div>
              </div>
            </div>

            <div className="col-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                style={{ color: "#0BB6C0" }}
              />
            </div>
            <div className="col-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#0BB6C0" }}
                onClick={() => {
                  deleteTrip(trip);
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="content-body">
      <div className="row">
        <h1>{props.userData?.firstName + " " + props.userData?.lastName}</h1>
      </div>
      <div className="outlined-box mt-3 p-4">
        <div className="row">
          <span className="float-right primary-color b22-mon">
            User Details
          </span>
        </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-3 col-lg-1 b16-mon">Name</div>
            <div className="col">
              {props.userData?.firstName + " " + props.userData?.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-lg-1 b16-mon">Email</div>
            <div className="col">{props.userData.username}</div>
          </div>
        </div>
      </div>

      <div className="outlined-box mt-4 p-4">
        <div className="row">
          <span className="float-right primary-color b22-mon">Trips</span>
        </div>
        <div className="container mt-2">
          {props.tripsData.length
            ? renderTripList()
            : "Friend, you need a vacation."}
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

const mapDispatchToProps = { deleteTripData, setActiveTrip };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
