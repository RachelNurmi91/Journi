import { useState } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import Sidebar from "./Sidebar";

function Navbar({ ...props }) {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideNav = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const navBar = () => {
    return (
      <>
        <div className="col align-self-center">
          <Link to="/profile">
            <div className="float-end d-flex align-items-center" to="/profile">
              <div className="profile-icon mx-2">
                {props.userData?.firstName?.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="row mx-0">
      <nav className="navbar primary-bg-color ">
        <div className="row w-100">
          <div className="col align-self-center">
            <div
              className="navbar-toggle"
              onClick={toggleSideNav}
              style={{ zIndex: 2 }}
            >
              {showSideBar ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  style={{ color: "#fff" }}
                  size="2x"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-bars"
                  style={{ color: "#fff" }}
                  size="2x"
                />
              )}
            </div>
          </div>
          {props.userId ? navBar() : null}
        </div>
      </nav>
      <Sidebar toggleSideNav={toggleSideNav} showSideBar={showSideBar} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
    account: state.account,
  };
}

const mapDispatchToProps = { removeLoggedInUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
