import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Nav({ ...props }) {
  const loggedInNav = () => {
    return (
      <>
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/hotels">Hotels</Link>
        </li>
        <li>
          <Link to="/flights">Flights</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };

  const guestNav = () => {
    return (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {props.userData ? loggedInNav() : guestNav()}
          </ul>
        </div>
      </nav>

      {/* <nav className="navbar bg-body-tertiary">
        
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
        </div>
      </nav>
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
      </div> */}
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
