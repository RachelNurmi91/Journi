import "./App.css";
import Nav from "./Layout/Nav";
import { Route, Routes } from "react-router-dom";
import Summary from "./Trip/Summary";
import HotelList from "./Trip/Hotels/HotelList";

function App() {
  return (
    <>
      {/* <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"> */}
      <Nav />
      {/* </div>
        </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="hotels" element={<HotelList />} />
      </Routes>
    </>
  );
}

export default App;
