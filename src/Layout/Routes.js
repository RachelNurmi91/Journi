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
    <div>
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

            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/*" element={<Hotel navigate={navigate} />} />

            <Route path="/flights" element={<FlightList />} />
            <Route path="/flights/*" element={<Flight navigate={navigate} />} />

            <Route path="/cruises" element={<CruiseList />} />
            <Route path="/cruises/*" element={<Cruise navigate={navigate} />} />

            <Route path="/rentals" element={<RentalList />} />
            <Route path="/rentals/*" element={<Rental navigate={navigate} />} />

            <Route path="/insurance" element={<InsuranceList />} />
            <Route
              path="/insurance/*"
              element={<Insurance navigate={navigate} />}
            />

            <Route path="/transportation" element={<TransportationList />} />
            <Route
              path="/transportation/*"
              element={<Transportation navigate={navigate} />}
            />

            <Route path="/activities" element={<ActivityList />} />
            <Route
              path="/activity/*"
              element={<Activity navigate={navigate} />}
            />

            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/*" element={<Note navigate={navigate} />} />

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
