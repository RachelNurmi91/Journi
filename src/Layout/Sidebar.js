import { useMemo } from "react";
import logo from "../Media/Images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import AddTrip from "../Trip/Trips/AddTrip";
import TripSelector from "./TripSelector";

function Sidebar({
  closeSideNav,
  removeLoggedInUserData,
  activeTrip,
  userId,
  showSideBar,
}) {
  const logout = () => {
    localStorage.clear();
    removeLoggedInUserData();
  };

  const TripSelectorMemo = useMemo(
    () => <TripSelector closeSideNav={closeSideNav} />,
    []
  );

  const guestSideBar = () => {
    return (
      <>
        <div className="d-flex flex-grow-1 align-items-end">
          <ul className="sidenav-menu">
            <li>
              <Link to="/register" className="nav-link">
                <FontAwesomeIcon
                  icon="fa-solid fa-user-plus"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Register</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon
                  icon="fa-solid fa-right-to-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const loggedInSideBar = () => {
    return (
      <>
        <div className="flex-grow-1">
          <div className="col align-self-center my-3">{TripSelectorMemo}</div>
          <ul className="sidenav-menu mt-2 align-items-center">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {activeTrip ? (
              <>
                <li>
                  <Link
                    to={
                      activeTrip?.hotels?.length > 0 ? "/hotels" : "/hotels/add"
                    }
                    className="nav-link"
                  >
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      activeTrip?.flights?.length > 0
                        ? "/flights"
                        : "/flights/add"
                    }
                    className="nav-link"
                  >
                    Flights
                  </Link>
                </li>
              </>
            ) : null}
            <li>
              <AddTrip closeSideNav={closeSideNav} />
            </li>
          </ul>
        </div>
        <div className="flex-shrink-1 align-items-end">
          <ul className="sidenav-menu">
            <li>
              <div className="nav-link" onClick={() => logout()}>
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div
      className="sidenav"
      style={{
        width: `${showSideBar ? "250px" : 0}`,
        padding: `${showSideBar ? "60px 20px 5px" : "60px 0px 5px"}`,
      }}
    >
      <div className="d-flex justify-content-center flex-column h-100">
        <div className="align-items-start">
          <img
            className="logo mt-3"
            src={logo}
            alt="Journi logo"
            height="150px"
          />
        </div>

        {userId ? loggedInSideBar() : guestSideBar()}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
    account: state.account,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
