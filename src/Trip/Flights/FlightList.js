import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemCollapse from "../../Layout/Shared/ItemCollapse";

function FlightList({ ...props }) {
  const [flightList, setFlightList] = useState(null);

  useEffect(() => {
    sortByDate();
  }, [props.flightListData]);

  const sortByDate = () => {
    let sortedFlights;

    let flights = props.flightListData?.[0]?.flights;

    if (flights > 10) {
      sortedFlights = flights.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedFlights = flights;
    }

    setFlightList(sortedFlights);
  };

  const displayFlights = () => {
    return flightList?.map((flight) => {
      return <ItemCollapse />;
    });
  };

  return (
    <div className="constraint">
      {displayFlights()}

      <button className="btn-save mt-3" type="submit">
        <Link to="/flights/add">Add New</Link>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.userAccount?.trips,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
