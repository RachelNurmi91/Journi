import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Nav({ ...props }) {
  const loggedInNav = () => {
    return (
      <>
        <Link to="/">Home</Link> <br />
        <Link to="/hotels">Hotels</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
      </>
    );
  };

  const guestNav = () => {
    return (
      <>
        <Link to="/login">Login</Link>
      </>
    );
  };

  return (
    <>
      <div
        class="offcanvas show offcanvas-start"
        tabindex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasLabel">
            Travel App
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {props.userData ? loggedInNav() : guestNav()}
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
