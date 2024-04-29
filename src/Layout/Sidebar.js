import { useMemo } from "react";
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
  userData,
  toggleSideNav,
}) {
  const logout = () => {
    localStorage.clear();
    removeLoggedInUserData();
  };

  const TripSelectorMemo = useMemo(
    () => <TripSelector closeSideNav={closeSideNav} />,
    [closeSideNav]
  );

  const guestSideBar = () => {
    return (
      <>
        <div className="d-flex flex-grow-1 align-items-center">
          <ul className="menu">
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
        <div className="mt-3">
          <Link to="/profile">
            <div className="d-flex justify-content-center" to="/profile">
              <div className="profile-icon">
                {userData?.firstName?.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-grow-1">
          <div className="col align-self-center my-3 w-75 mx-auto mt-4 mb-5">
            {TripSelectorMemo}
          </div>
          <ul className="menu mt-2 align-items-center">
            <li>
              <Link to="/" className="nav-link">
                <FontAwesomeIcon
                  icon="fa-solid fa-house"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Home</span>
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
                    <FontAwesomeIcon
                      icon="fa-solid fa-hotel"
                      style={{ color: "#fff" }}
                    />
                    <span className="ms-2">Hotels</span>
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
                    <FontAwesomeIcon
                      icon="fa-solid fa-plane"
                      style={{ color: "#fff" }}
                    />
                    <span className="ms-2">Flights</span>
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
          <ul className="menu">
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
        width: `${showSideBar ? "300px" : 0}`,
        padding: `${showSideBar ? "5px 20px" : "5px 0px"}`,
      }}
    >
      <div className="d-flex justify-content-center flex-column h-100">
        <div className="align-self-start mt-2">
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            style={{ color: "#fff" }}
            size="2x"
            onClick={toggleSideNav}
          />
        </div>

        <div className="align-items-center">
          {/* <img
            className="logo mt-3"
            src={logo}
            alt="Journi logo"
            height="150px"
          /> */}
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
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
