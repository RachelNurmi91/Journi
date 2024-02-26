import logo from "../Media/Images/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-body active d-flex flex-column">
      <div className="px-3 py-4 position-relative flex-grow-1">
        <img className="logo" src={logo} alt="Journi logo" height="150px" />
        <ul className="sidebar-menu mt-5">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/hotels" className="nav-link">
              Hotels
            </Link>
          </li>
          <li>
            <Link to="/flights" className="nav-link">
              Flights
            </Link>
          </li>
          <li>
            <Link to="/trips/" className="nav-link">
              Trips
            </Link>
          </li>
          <li>
            <Link to="/trips/add" className="nav-link">
              New Trip
            </Link>
          </li>
        </ul>
        <div className="mt-auto"></div> {/* This empty div ensures spacing */}
      </div>
      <div className="px-3">
        {" "}
        {/* Add additional padding to align Logout */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
