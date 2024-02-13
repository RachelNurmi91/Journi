import { Route, Routes, useNavigate } from "react-router-dom";
import Summary from "../Trip/Summary";
import HotelList from "../Trip/Hotels/HotelList";
import AddHotel from "../Trip/Hotels/AddHotel";
import Login from "../Account/AccountAccess/Login";
import FlightList from "../Trip/Flights/FlightList";
import AddFlight from "../Trip/Flights/AddFlight";
import Register from "../Account/AccountAccess/Register";

function Content() {
  return (
    <div id="content-container">
      <div id="content-body">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/login" element={<Login navigate={useNavigate()} />} />
          <Route path="/register" element={<Register navigate={useNavigate()} />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route
            path="/hotels/add"
            element={<AddHotel navigate={useNavigate()} />}
          />
          <Route path="/flights" element={<FlightList />} />
          <Route
            path="/flights/add"
            element={<AddFlight navigate={useNavigate()} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Content;
