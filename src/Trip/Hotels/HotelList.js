import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

function HotelList({ fetchUpdatedTrips, hotelListData, activeTrip, ...props }) {
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
        if (a.startDate > b.startDate) return 1;
        if (a.startDate < b.startDate) return -1;
        return 0;
      });
    } else {
      sortedHotels = hotels;
    }

    setOpenHotelId(sortedHotels?.[0]?._id);

    setHotelList(sortedHotels);
  }, [hotelListData]);

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

  const navigateToUpdate = (id) => {
    props.navigate(`/hotels/update/${id}`);
  };

  const displayHotels = () => {
    return hotelList?.map((hotel, index) => {
      const isOpen = openHotelId === hotel._id;
      return (
        <div className="outlined-box p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div className="col-12">
              <div>
                {Methods.formatLongDate(hotel.startDate)}
                <FontAwesomeIcon
                  icon="fa-solid fa-moon"
                  style={{ color: "#0BB6C0" }}
                  onClick={() => toggleOpen(hotel._id)}
                  className="mx-2"
                />
                {Methods.formatLongDate(hotel.endDate)}
              </div>
            </div>

            <div className="my-4">
              <div
                className="b22-mon  primary-color"
                style={{ lineHeight: "20px" }}
              >
                {hotel.name}
              </div>

              {hotel.city || hotel.country ? (
                <div>
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {hotel.city}, {hotel.country}
                </div>
              ) : null}
            </div>
            <div>
              <span className="b14-mon primary-color label">Confirmation </span>
              {hotel.confirmationNo}
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
                onClick={() => navigateToUpdate(hotel._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div className="col-6" onClick={() => deleteHotel(hotel._id)}>
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
        currentCrumb="Hotels"
      />
      <div className="content-body hotel-list" style={{ paddingTop: "50px" }}>
        <Header title="Hotels" rightIcon={true} destination={"/hotels/add"} />
        {hotelListData.length
          ? displayHotels()
          : "Sleep is important, so add your first hotel!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    hotelListData: state.account?.activeTrip?.hotels,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips };

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);
