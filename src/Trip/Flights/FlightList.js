import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ItemCollapse from "../../Layout/Shared/ItemCollapse";
import Button from "../../Layout/Shared/Button";

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
      return <ItemCollapse flightData={flight} keyNo={Math.floor(Math.random() * 1000)} />;
    });
  };

  return (
    <div className="constraint">
      {displayFlights()}

      <Button label="Add New" destination={"/flights/add"}/>

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
