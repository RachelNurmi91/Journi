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
  tripSelections,
  toggleSideNav,
}) {
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
          <h1 className="white-color text-center">
            {activeTrip?.tripName.toUpperCase()}
          </h1>
          <div className="col align-self-center mb-3 w-75 mx-auto">
            {TripSelectorMemo}
          </div>
          <ul className="menu mt-2 align-items-center">
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

                {tripSelections?.rentalCar ? (
                  <li>
                    <Link
                      to={"/rentals"}
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
                      to={"/insurance"}
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
                      to={"/cruises"}
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
                      to={"/transportation"}
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
                    to={"/activities"}
                    className="nav-link"
                    onClick={() => closeSideNav()}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-map"
                      style={{ color: "#fff" }}
                    />
                    <span className="mx-2">Activities</span>
                  </Link>
                </li>
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
          </ul>
        </div>
        <div className="flex-shrink-1 align-items-end">
          <ul className="menu">
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
