import { connect } from "react-redux";
import Methods from "../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTripData, setActiveTrip } from "../Redux/Actions/AccountActions";
import TripRequests from "../Requests/TripRequests";

function Profile({ ...props }) {
  const tripRequest = new TripRequests();

  const deleteTrip = (selectedTrip) => {
    tripRequest
      .deleteTrip(selectedTrip.tripId)
      .then((response) => {
        console.log("We got a response!", response);
        props.deleteTripData(selectedTrip);
        if (selectedTrip.id === props.activeTrip.id) {
          props.setActiveTrip(props.tripsData[0]);
        }
      })
      .catch((error) => console.log("Cannot delete trip: ", error));
  };

  const renderTripList = () => {
    return props.tripsData?.map((trip, index) => {
      return (
        <div key={index}>
          {index === 0 ? null : <hr />}
          <div className="row py-3">
            <div className="col b16-mon">{trip.tripName}</div>
            <div className="col">{Methods.formatDate(trip.departureDate)}</div>
            <div className="col">
              {trip.hotels?.length ? trip.hotels.length + " Hotels" : null}
            </div>
            <div className="col">
              {trip.flights?.length ? trip.flights.length + " Hotels" : null}
            </div>

            {/* <div className="col">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                style={{ color: "#0BB6C0" }}
              />
            </div> */}
            <div className="col">
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
      <div className="outlined-box mt-5 p3-per">
        <div className="container">
          <div className="row mb-3">
            <span className="float-right primary-color b22-mon">
              User Details
            </span>
          </div>
          <div className="row">
            <div className="col-1 b16-mon">Name</div>
            <div className="col">
              {props.userData?.firstName + " " + props.userData?.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-1 b16-mon">Email</div>
            <div className="col">{props.userData.email}</div>
          </div>
        </div>
      </div>

      <div className="shadow-box mt-5 p3-per">
        <div className="row mb-3">
          <span className="float-right primary-color b22-mon">Trips</span>
        </div>
        <div className="container">
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
