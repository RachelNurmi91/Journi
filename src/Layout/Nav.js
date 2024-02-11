import { useState } from "react";
import { Link } from "react-router-dom";
function Nav() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [trips, setTrip] = useState([{ trip: 1 }, { trip: 2 }]);
  // const [trips, setTrip] = useState([{trip:1},{trip:2}])

  return (
    <>
      <div
        class="offcanvas  offcanvas-start"
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
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
