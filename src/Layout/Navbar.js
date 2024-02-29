import { connect } from "react-redux";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import TripSelector from "./TripSelector";
import { Link } from "react-router-dom";

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
          {" "}
          <Link to="/profile">
            <div className="float-end d-flex align-items-center" to="/profile">
              <div className="text-bold">{props.userData?.firstName}</div>
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
    <nav className="navbar navbar-expand-lg navbar-body p-3 sticky-top">
      <div className="row w-100">{props.userId ? loggedIn() : null}</div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
