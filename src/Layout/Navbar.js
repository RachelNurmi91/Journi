import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import TripSelector from "./TripSelector";

function Navbar({ ...props }) {
  const loggedIn = () => {
    return (
      <>
        <div className="col align-self-center">
          <div className="w-50">
            <TripSelector />
          </div>
        </div>
        <div className="col align-self-center">
          <div className="float-end d-flex align-items-center">
            <div className="text-bold">{props.userData.firstName}</div>
            <div className="profile-icon mx-2">
              {props.userData.firstName.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-body p-3 sticky-top">
      <div className="row w-100">{props.userData ? loggedIn() : null}</div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
