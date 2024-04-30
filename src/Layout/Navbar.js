import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import logo from "../Media/Images/logo-white.png";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import Sidebar from "./Sidebar";

function Navbar({ ...props }) {
  const [showSideBar, setShowSideBar] = useState(false);

  let sideRef = useRef();

  useEffect(() => {
    const autoClose = (e) => {
      if (!sideRef.current.contains(e.target)) {
        setShowSideBar(false);
        console.log(sideRef.current);
      }
    };

    document.addEventListener("mousedown", autoClose);
  });

  const location = useLocation();

  const toggleSideNav = () => {
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
          />
        </div>
        <div className="logo-container">
          <img className="logo" src={logo} alt="Journi logo" height="25px" />
        </div>
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
    account: state.account,
  };
}

const mapDispatchToProps = { removeLoggedInUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
