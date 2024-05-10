import { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TripSelector from "./TripSelector";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";

function Sidebar({
  closeSideNav,
  activeTrip,
  userId,
  showSideBar,
  userData,
  tripSelections,
  toggleSideNav,
  removeLoggedInUserData,
}) {
  const logout = () => {
    removeLoggedInUserData();
    closeSideNav();
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
              <Link
                to="/login"
                className="nav-link"
                onClick={() => closeSideNav()}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-right-to-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="mx-2">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="nav-link"
                onClick={() => closeSideNav()}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-plus"
                  style={{ color: "#fff" }}
                />
                <span className="mx-2">Register</span>
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
          <div className="col align-self-center my-3 w-75 mx-auto mt-4">
            {TripSelectorMemo}
          </div>
          <ul className="menu mt-2 align-items-center">
            {/* <li>
              <Link to="/" className="nav-link" onClick={() => closeSideNav()}>
                <FontAwesomeIcon
                  icon="fa-solid fa-house"
                  style={{ color: "#fff" }}
                />
                <span className="mx-2">Home</span>
              </Link>
            </li> */}
            {activeTrip ? (
              <>
                {tripSelections?.flights ? (
                  <li>
                    <Link
                      to={"/flights"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-plane"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Flights</span>
                    </Link>
                  </li>
                ) : null}
                {tripSelections?.hotels ? (
                  <li>
                    <Link
                      to={"/hotels"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-bed"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Hotels</span>
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link
                    to={"/activities"}
                    className="nav-link"
                    onClick={() => closeSideNav()}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-mountain-city"
                      style={{ color: "#fff" }}
                    />
                    <span className="mx-2">Activities</span>
                  </Link>
                </li>
                {tripSelections?.rentalCar ? (
                  <li>
                    <Link
                      to={"/flights"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-car"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Rental Car</span>
                    </Link>
                  </li>
                ) : null}
                {tripSelections?.insurance ? (
                  <li>
                    <Link
                      to={"/flights"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-shield-halved"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Insurance</span>
                    </Link>
                  </li>
                ) : null}
                {tripSelections?.cruise ? (
                  <li>
                    <Link
                      to={"/flights"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-ship"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Cruise</span>
                    </Link>
                  </li>
                ) : null}
                {tripSelections?.transportation ? (
                  <li>
                    <Link
                      to={"/flights"}
                      className="nav-link"
                      onClick={() => closeSideNav()}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-bus"
                        style={{ color: "#fff" }}
                      />
                      <span className="mx-2">Transportation</span>
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link
                    to={"/flights"}
                    className="nav-link"
                    onClick={() => closeSideNav()}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-note-sticky"
                      style={{ color: "#fff" }}
                    />
                    <span className="mx-2">Notes</span>
                  </Link>
                </li>
              </>
            ) : null}
            <li>
              <li>
                <Link
                  to={"/trips/add"}
                  className="nav-link"
                  onClick={() => closeSideNav()}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-plus"
                    style={{ color: "#fff" }}
                  />
                  <span className="mx-2">Add Trip</span>
                </Link>
              </li>
            </li>
          </ul>
        </div>
        {/* <div className="flex-shrink-1 align-items-end">
          <ul className="menu">
            <li>
              <div className="nav-link" onClick={logout}>
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="mx-2">Logout</span>
              </div>
            </li>
          </ul>
        </div> */}
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

        <div className="align-items-center"></div>
        {userId ? loggedInSideBar() : guestSideBar()}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
    tripSelections: state.account?.activeTrip?.selections,
    account: state.account,
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
