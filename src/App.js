import "./App.css";
import Nav from "./Layout/Nav";
import { Route, Routes } from "react-router-dom";
import Summary from "./Trip/Summary";
import HotelList from "./Trip/Hotels/HotelList";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="hotels" element={<HotelList />} />
      </Routes>
    </>
  );
}

export default App;
