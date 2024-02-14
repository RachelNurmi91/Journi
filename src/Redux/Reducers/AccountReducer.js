import { produce } from "immer";
import {
  ADD_NEW_HOTEL_DATA,
  SET_LOGGED_IN_USER_DATA,
  SET_ACTIVE_TRIP,
  ADD_NEW_FLIGHT_DATA,
} from "../Actions/AccountActions";

const initialState = {
  userAccount: null,
  activeTrip: {
    tripId: null,
    tripDetails: null,
    tripSummary: {
      country: null,
      departure: null,
    },
  },
};

export { initialState };

export default produce((draft, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER_DATA:
      draft.userAccount = action.payload;
      return draft;
    case SET_ACTIVE_TRIP:
      draft.activeTrip.tripId = action.payload.id;
      draft.activeTrip.tripDetails = action.payload;
      draft.activeTrip.tripSummary.country = action.payload.destination;
      draft.activeTrip.tripSummary.departure = action.payload.departure;
      return draft;
    case ADD_NEW_HOTEL_DATA:
      console.log(draft.userAccount);
      let newHotelList = draft.userAccount.trips.hotels.push(action.payload);
      console.log(draft.userAccount.trips.hotels);
      draft.userAccount.trips.hotels = newHotelList;
      return draft;
    case ADD_NEW_FLIGHT_DATA:
      draft.userAccount.trips.flights = action.payload;
      return draft;
    default:
      return draft;
  }
}, initialState);
