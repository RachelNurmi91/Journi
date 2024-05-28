import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function RentalList({ fetchUpdatedTrips, rentalListData, ...props }) {
  const [rentalList, setRentalList] = useState(null);
  const [openRentalId, setOpenRentalId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenRentalId((prevId) => (prevId === id ? null : id));
  };
  const sortByDate = useCallback(() => {
    let sortedRentals;

    let rentals = rentalListData;

    if (rentals && rentals?.length > 10) {
      sortedRentals = rentals.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedRentals = rentals;
    }

    setRentalList(sortedRentals);
  }, [rentalListData]);

  useEffect(() => {
    sortByDate();
  }, [rentalListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [rentalListData, sortByDate]);

  const deleteRental = (id) => {
    setLoading(true);
    tripRequest
      .deleteRental(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error: Cannot delete trip: ", error);
        setLoading(false);
      });
  };

  const navigateToUpdate = (id) => {
    props.navigate(`/rentals/update/${id}`);
  };

  const displayRentals = () => {
    return rentalList?.map((rental, index) => {
      const isOpen = openRentalId === rental._id;
      return (
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(rental._id)}
              />
            </div>
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteRental(rental._id)}
              />
            </div>
          </div>
          <div
            className="container collapsible"
            style={{
              height: `${isOpen ? "" : "70px"}`,
              transition: "height 0.10s ease",
            }}
          >
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {rental.name}
              </span>
            </div>

            <div className="row">
              <div className="text-center b13-mon">{rental.vehicleType}</div>
            </div>
            {rental.confirmationNo ? (
              <div className="row mt-3">
                <div className="b16-mon label">Confirmation No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {rental.confirmationNo}
                </div>
              </div>
            ) : null}

            <div className="row mt-3">
              <div>
                <div className="b16-mon label"> Pick-Up </div>
                <div>
                  {Methods.formatLongDate(rental.startDate)}{" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {Methods.formatTime(rental.startTime)}
                </div>
                {rental.startLocation ? (
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-location-dot"
                      style={{ color: "#0bb6c0" }}
                    />{" "}
                    {rental.startLocation}
                  </div>
                ) : null}
              </div>
            </div>
            <hr />
            <div className="row mt-3">
              <div>
                <div className="b16-mon label"> Drop Off </div>
                <div>
                  {Methods.formatLongDate(rental.endDate)}{" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {Methods.formatTime(rental.endTime)}
                </div>
                {rental.endLocation ? (
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-location-dot"
                      style={{ color: "#0bb6c0" }}
                    />{" "}
                    {rental.endLocation}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="text-center">
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(rental._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(rental._id)}
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="content-body rental-list">
        <Header title="Rentals" rightIcon="add" destination={"/rentals/add"} />
        {rentalListData?.length
          ? displayRentals()
          : "Test drive and add your first rental!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    rentalListData: state.account?.activeTrip?.rentals,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(RentalList);
