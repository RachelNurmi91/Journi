import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../Layout/Shared/UI/Button";
import Header from "../../Layout/Shared/UI/Header";

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
    return hotelList?.map((hotel) => {
      return (
        <div className="listItem" key={Math.random()}>
          <div className="container">
            <div className="row align-items-end">
              <div className="col">
                <span className="listItemMajor">{hotel.hotelName}</span>
                <br />
                {hotel.hotelConfirmation}
              </div>
              <div className="col text-center">
                {hotel.city}, {hotel.country} <br />
                {hotel.arrivalDate} - {hotel.departureDate}
              </div>
              <div className="col listItemMinor ">
                <br />
                *Booked by {hotel.nameOnReservation}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="constraint">
      <Header title="Hotels" />
      {displayHotels()}
      <Button destination="/hotels/add" label="Add New" />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    hotelListData: state.account?.activeTrip?.tripData?.hotels,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);
