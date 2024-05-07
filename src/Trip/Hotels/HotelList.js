import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function HotelList({
  fetchUpdatedTrips,
  hotelListData,
  deleteTripData,

  ...props
}) {
  const [hotelList, setHotelList] = useState(null);
  const [openHotelId, setOpenHotelId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenHotelId((prevId) => (prevId === id ? null : id));
  };
  const sortByDate = useCallback(() => {
    let sortedHotels;

    let hotels = hotelListData;

    if (hotels && hotels.length > 10) {
      sortedHotels = hotels.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedHotels = hotels;
    }

    setHotelList(sortedHotels);
  }, [hotelListData]);

  useEffect(() => {
    sortByDate();
  }, [hotelListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [hotelListData, sortByDate]);

  const deleteHotel = (id) => {
    setLoading(true);
    tripRequest
      .deleteHotel(id)
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

  const displayHotels = () => {
    return hotelList?.map((hotel, index) => {
      console.log(hotel);
      const isOpen = openHotelId === hotel._id;
      return (
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteHotel(hotel._id)}
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
                {hotel.hotel}
              </span>
            </div>

            <div className="row">
              <div className="text-center b13-mon">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.confirmationNo ? (
              <div className="row mt-3">
                <div className="b16-mon label">Confirmation No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {hotel.confirmationNo}
                </div>
              </div>
            ) : null}

            <div className="row mt-3">
              <div className="col-6 d-flex justify-content-start">
                <div>
                  <div className="b16-mon label"> Arrival </div>
                  <div className="text-center">
                    {Methods.formatLongDate(hotel.arrivalDate)}
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <div className="b16-mon label"> Departure </div>
                  <div className="text-center">
                    {Methods.formatLongDate(hotel.departureDate)}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="text-center b13-mon">
                Reserved under "{hotel.nameOnReservation}"
              </div>
            </div>
          </div>
          <div className="text-center">
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(hotel._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(hotel._id)}
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="content-body hotel-list">
        <Header title="Hotels" rightIcon="add" destination={"/hotels/add"} />
        {hotelListData.length
          ? displayHotels()
          : "Girly pop, add your first hotel!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    hotelListData: state.account?.activeTrip?.hotels,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);
