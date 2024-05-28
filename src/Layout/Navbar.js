import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import logo from "../Media/Images/logo-white.png";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";

function Navbar({ userData, account, activeTrip, userId }) {
  const [showSideBar, setShowSideBar] = useState(false);

  let sideRef = useRef();

  useEffect(() => {
    const autoClose = (e) => {
      if (!sideRef.current.contains(e.target)) {
        setShowSideBar(false);
      }
    };

    document.addEventListener("mousedown", autoClose);

    return () => {
      document.removeEventListener("mousedown", autoClose);
    };
  });

  const location = useLocation();

  const toggleSideNav = () => {
    console.log("HIT");
    setShowSideBar((prevState) => !prevState);
  };

  const closeSideNav = () => {
    setShowSideBar(false);
  };

  useEffect(() => {
    closeSideNav();
  }, [location.pathname]);

  return (
    <div className="row mx-0">
      <nav className="navbar">
        <div className="toggle" onClick={toggleSideNav} style={{ zIndex: 2 }}>
          <FontAwesomeIcon
            icon="fa-solid fa-bars"
            style={{ color: "#fff" }}
            size="2x"
            cursor="pointer"
          />
        </div>

        <Link to="/" onClick={() => closeSideNav()}>
          <div className="logo-container">
            <img className="logo" src={logo} alt="Journi logo" height="25px" />
          </div>
        </Link>
        {userId ? (
          <>
            <div className="profile-icon">
              <Link to="/profile" onClick={() => closeSideNav()}>
                <div className="d-flex justify-content-center" to="/profile">
                  <div className="img-edit">
                    <div className="profile-img">
                      {userData?.firstName?.slice(0, 1).toUpperCase()}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </nav>
      <div ref={sideRef}>
        <Sidebar
          showSideBar={showSideBar}
          closeSideNav={closeSideNav}
          toggleSideNav={toggleSideNav}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
    account: state,
  };
}

export default connect(mapStateToProps)(Navbar);
