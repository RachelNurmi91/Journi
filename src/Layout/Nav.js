import { useState } from "react"
function Nav() {

    const [loggedIn, setLoggedIn] = useState(true)
    const [trips, setTrip] = useState([{trip:1},{trip:2}])
    // const [trips, setTrip] = useState([{trip:1},{trip:2}])

    

    return(<>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              

 {loggedIn && trips.length ? (
 <div className="m-auto">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Itinerary</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Hotels</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Flights</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Rentals</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Activies</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline fw-bold">+ Invite Friend</span>
                        </a>
                    </li>
                </ul>
                </div>) : null}
                <div className={trips.length ? "mx-auto" : "m-auto"}>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline fw-bold">+ New Trip</span>
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
    
</>)
    }
    
    export default Nav