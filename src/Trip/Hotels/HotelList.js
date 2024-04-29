import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function HotelList({ ...props }) {
  const [hotelList, setHotelList] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const sortByDate = useCallback(() => {
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
  }, [props.hotelListData]);

  useEffect(() => {
    sortByDate();
  }, [props.hotelListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [props.hotelListData, sortByDate]);

  const displayHotels = () => {
    return hotelList?.map((hotel, index) => {
      return (
        <div className="shadow-box" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <Link
                to={"/hotels/edit"}
                className="btn-link"
                state={{
                  edit: true,
                  selectedItem: hotelList?.[index],
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-pen-to-square"
                  style={{ color: "#0BB6C0" }}
                />
              </Link>
            </div>
          </div>
          <div
            className="container collapsible"
            style={{
              height: `${open ? "" : "70px"}`,
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
                    {Methods.formatLongDate(hotel.arrivalDate)}
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <div className="b16-mon"> Departure </div>
                  <div className="text-center">
                    {Methods.formatLongDate(hotel.departureDate)}
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
          <div className="text-center">
            {open ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpen}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpen}
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-body hotel-list">
      <Header title="Hotels" rightIcon="add" destination={"/hotels/add"} />
      {props.hotelListData
        ? "Girly pop, add your first flight!"
        : displayHotels()}
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
