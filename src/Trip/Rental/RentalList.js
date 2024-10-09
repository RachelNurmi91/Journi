import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

function RentalList({
  fetchUpdatedTrips,
  rentalListData,
  activeTrip,
  ...props
}) {
  const [rentalList, setRentalList] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

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
      return (
        <div className="outlined-box p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div
              className="b22-mon  primary-color"
              style={{ lineHeight: "20px" }}
            >
              {rental.name}
            </div>

            {!rental.endLocation ? (
              <div>
                <FontAwesomeIcon
                  icon="fa-solid fa-location-dot"
                  style={{ color: "#0bb6c0" }}
                />{" "}
                {rental.startLocation}
              </div>
            ) : null}

            <div className="mt-3">
              <div>{rental.vehicleType} Vehicle</div>
              {rental.confirmationNo && (
                <div>
                  <span className="b14-mon primary-color label">
                    Confirmation{" "}
                  </span>
                  {rental.confirmationNo}
                </div>
              )}
            </div>

            <hr />
            <div className="row b13-mon mt-3">
              <div className="col-6">
                <div className="b16-mon label primary-color"> Pick Up </div>
                <div>{Methods.formatLongDate(rental.startDate)} </div>
                <div>{Methods.formatTime(rental.startTime)}</div>
                {rental.endLocation ? (
                  <div>
                    {rental.endLocation ? (
                      <div>
                        <FontAwesomeIcon
                          icon="fa-solid fa-location-dot"
                          style={{ color: "#0bb6c0" }}
                        />{" "}
                        {rental.startLocation}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="col-6">
                <div className="b16-mon label primary-color"> Drop Off </div>
                <div>{Methods.formatLongDate(rental.endDate)} </div>
                <div>{Methods.formatTime(rental.endTime)}</div>
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
          <div
            style={{
              backgroundColor: "#32AAAA",
              borderRadius: " 0 0 10px 10px",
              padding: "12px 0",
            }}
          >
            <div className="text-center row link-style">
              <div
                className="col-6"
                onClick={() => navigateToUpdate(rental._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div className="col-6" onClick={() => deleteRental(rental._id)}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumbs
        prevCrumb={activeTrip?.name}
        prevCrumbLink={"/trips"}
        currentCrumb="Rental Cars"
      />
      <div className="content-body rental-list">
        <Header
          title="Rental Cars"
          rightIcon={true}
          destination={"/rentals/add"}
        />
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
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(RentalList);
