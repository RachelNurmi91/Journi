import "./App.css";
import Nav from "./Layout/Nav";
import { Route, Routes, useNavigate } from "react-router-dom";
import Summary from "./Trip/Summary";
import HotelList from "./Trip/Hotels/HotelList";
import AddHotel from "./Trip/Hotels/AddHotel";
import Login from "./Account/AccountAccess/Login";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route
          path="/hotels/add"
          element={<AddHotel navigate={useNavigate()} />}
        />
        <Route path="/login" element={<Login navigate={useNavigate()} />} />
      </Routes>
    </>
  );
}

export default App;
