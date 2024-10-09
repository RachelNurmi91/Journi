import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import logo from "../Media/Images/logo-white.png";
import { useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Sling as Hamburger } from "hamburger-react";

function Navbar({ userData, userId }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideRef = useRef();
  const clickInside = useRef(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sideRef.current &&
        !sideRef.current.contains(e.target) &&
        !clickInside.current
      ) {
        setShowSideBar(false);
      }
      clickInside.current = false;
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation();

  const toggleSideNav = () => {
    clickInside.current = true; // Ignore the next click outside event
    setShowSideBar((prevState) => {
      const newState = !prevState;

      return newState;
    });
  };

  const closeSideNav = () => {
    setShowSideBar(false);
  };

  useEffect(() => {
    closeSideNav();
  }, [location.pathname]);

  return (
    <div>
      <nav
        className={`navbar d-flex ${
          userId ? "justify-content-between" : "justify-content-center"
        }`}
      >
        {userId && (
          <div className="toggle" onClick={toggleSideNav} style={{ zIndex: 2 }}>
            <Hamburger rounded label="Show menu" color="#fff" size={30} />
          </div>
        )}

        <Link to="/" onClick={closeSideNav}>
          <div className="logo-container">
            <img className="logo" src={logo} alt="Journi logo" height="25px" />
          </div>
        </Link>
        {userId ? (
          <div className="profile-icon">
            <Link to="/profile" onClick={closeSideNav}>
              <div className="d-flex justify-content-center">
                <div className="img-edit">
                  <div className="profile-img">
                    {userData?.firstName?.slice(0, 1).toUpperCase()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : null}
      </nav>

      <div ref={sideRef}>
        <Sidebar showSideBar={showSideBar} closeSideNav={closeSideNav} />
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
