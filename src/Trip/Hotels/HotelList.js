import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HotelList({ ...props }) {
  const [hotelList, setHotelList] = useState(null);

  useEffect(() => {
    sortByDate();
  }, [props.hotelListData]);

  const sortByDate = () => {
    let sortedHotels;

    let hotels = props.hotelListData;

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
  };

  const displayHotels = () => {
    return hotelList?.map((hotel, index) => {
      return (
        <div className="shadow-box p3-per my-4" key={index}>
          <div className="container">
            <div className="row">
              <span className="b22-mon">{hotel.hotelName}</span>
            </div>
            <div className="row flight-list-info">
              <div className="col d-flex justify-content-start">
                {hotel.city}, {hotel.country}
              </div>
              <div className="col">
                <div className="row d-inline-block">
                  <span className="b16-mon"> Arrival </span>
                  {Methods.formatDate(hotel.arrivalDate)}
                </div>
                <div className="row d-inline-block">
                  <span className="b16-mon "> Departure </span>
                  {Methods.formatDate(hotel.departureDate)}
                </div>
              </div>
              <div className="col text-center">{hotel.hotelConfirmation}</div>
              <div className="col b16-mon d-flex justify-content-end">
                *Booked by {hotel.nameOnReservation}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const addLabel = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#fff" }} />{" "}
        Add New
      </>
    );
  };

  return (
    <div className="content-body hotel-list">
      <Header title="Hotels" />
      <div className="row mb-4 w-25" align="right">
        <Button label={addLabel()} destination={"/hotels/add"} />
      </div>
      {displayHotels()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    hotelListData: state.account?.activeTrip?.hotels,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);
