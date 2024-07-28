import { Route, Routes, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Summary from "../Trip/Summary";
import HotelList from "../Trip/Hotels/HotelList";
import Hotel from "../Trip/Hotels/Hotel";
import Login from "../Account/AccountAccess/Login";
import FlightList from "../Trip/Flights/FlightList";
import Flight from "../Trip/Flights/Flight";
import Register from "../Account/AccountAccess/Register";
import Trip from "../Trip/Trips/Trip";
import Profile from "../Account/Profile";
import RewardProgram from "../Account/RewardProgram";
import ActivityList from "../Trip/Activities/ActivityList";
import Activity from "../Trip/Activities/Activity";
import CruiseList from "../Trip/Cruise/CruiseList";
import Cruise from "../Trip/Cruise/Cruise";
import Rental from "../Trip/Rental/Rental";
import RentalList from "../Trip/Rental/RentalList";
import Insurance from "../Trip/Insurance/Insurance";
import InsuranceList from "../Trip/Insurance/InsuranceList";
import Transportation from "../Trip/Transportation/Transportation";
import TransportationList from "../Trip/Transportation/TransportationList";
import Note from "../Trip/Notes/Note";
import NoteList from "../Trip/Notes/NoteList";

function Content({ ...props }) {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "60px" }}>
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="*" element={<Summary />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
        {props.userId && (
          <>
            <Route path="/profile" element={<Profile navigate={navigate} />} />

            <Route
              path="/profile/reward-programs"
              element={<RewardProgram navigate={navigate} />}
            />

            <Route path="/hotels" element={<HotelList navigate={navigate} />} />
            <Route
              path="/hotels/update/*"
              element={<Hotel navigate={navigate} />}
            />
            <Route path="/hotels/add" element={<Hotel navigate={navigate} />} />

            <Route
              path="/flights"
              element={<FlightList navigate={navigate} />}
            />
            <Route path="/flights/*" element={<Flight navigate={navigate} />} />

            <Route
              path="/cruises"
              element={<CruiseList navigate={navigate} />}
            />
            <Route
              path="/cruises/update/*"
              element={<Cruise navigate={navigate} />}
            />
            <Route path="/cruises/*" element={<Cruise navigate={navigate} />} />

            <Route
              path="/rentals"
              element={<RentalList navigate={navigate} />}
            />
            <Route
              path="/rentals/update/*"
              element={<Rental navigate={navigate} />}
            />
            <Route
              path="/rentals/add"
              element={<Rental navigate={navigate} />}
            />

            <Route
              path="/insurance"
              element={<InsuranceList navigate={navigate} />}
            />
            <Route
              path="/insurance/update/*"
              element={<Insurance navigate={navigate} />}
            />
            <Route
              path="/insurance/add"
              element={<Insurance navigate={navigate} />}
            />

            <Route
              path="/transportation"
              element={<TransportationList navigate={navigate} />}
            />
            <Route
              path="/transportation/update/*"
              element={<Transportation navigate={navigate} />}
            />
            <Route
              path="/transportation/*"
              element={<Transportation navigate={navigate} />}
            />

            <Route
              path="/activities"
              element={<ActivityList navigate={navigate} />}
            />
            <Route
              path="/activities/update/*"
              element={<Activity navigate={navigate} />}
            />
            <Route
              path="/activities/*"
              element={<Activity navigate={navigate} />}
            />

            <Route path="/notes" element={<NoteList navigate={navigate} />} />
            <Route
              path="/notes/update*"
              element={<Note navigate={navigate} />}
            />
            <Route path="/notes/add" element={<Note navigate={navigate} />} />

            <Route path="/trips" element={<Trip navigate={navigate} />} />
            <Route
              path="/trips/:edit/:id"
              element={<Trip navigate={navigate} />}
            />
            <Route path="/trips/*" element={<Trip navigate={navigate} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.account?.userAccount?.id,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
