import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ItemCollapse from "../../Layout/Shared/UI/ItemCollapse";
import Button from "../../Layout/Shared/UI/Button";
import Header from "../../Layout/Shared/UI/Header";

function FlightList({ flightListData }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const [sortedFlights, setSortedFlights] = useState([]);

  useEffect(() => {
    sortByDate();
  }, [flightListData]);

  const sortByDate = () => {
    let flights = flightListData;

    if (flights && flights.length > 10) {
      flights.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    }

    setSortedFlights(flights || []);
  };

  const handleExpand = (itemIndex) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === itemIndex ? null : itemIndex
    );
  };

  const displayFlights = () => {
    return sortedFlights.map((flight, index) => (
      <ItemCollapse
        itemIndex={index}
        flightData={flight}
        expandedItem={expandedItem}
        handleExpand={handleExpand}
      />
    ));
  };

  return (
    <div className="constraint">
      <Header title="Flights" />
      {displayFlights()}
      <Button label="Add New" destination={"/flights/add"} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    flightListData: state.account?.activeTrip?.tripData?.flights,
  };
}

export default connect(mapStateToProps)(FlightList);
