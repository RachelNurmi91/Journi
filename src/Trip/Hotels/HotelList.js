import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";

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
        <div className="shadow-box p-4 my-4" key={index}>
          <div className="container">
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

            <div className="row my-3">
              <div className="b16-mon">Confirmation No.</div>
              <div
                className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                style={{ borderRadius: "5px" }}
              >
                8456455455454
              </div>
            </div>

            <div className="row">
              <div className="col-6 d-flex justify-content-start">
                <div>
                  <div className="b16-mon"> Arrival </div>
                  <div className="text-center">
                    {Methods.formatDate(hotel.arrivalDate)}
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <div className="b16-mon"> Departure </div>
                  <div className="text-center">
                    {Methods.formatDate(hotel.departureDate)}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="text-center b13-mon">
                Reserved by Rachel Nurmi
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-body hotel-list">
      <Header title="Hotels" rightIcon="add" destination={"/hotels/add"} />
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
