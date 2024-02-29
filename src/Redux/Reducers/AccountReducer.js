import { produce } from "immer";
import {
  ADD_NEW_HOTEL_DATA,
  SET_LOGGED_IN_USER_DATA,
  SET_ACTIVE_TRIP,
  ADD_NEW_FLIGHT_DATA,
  REMOVE_LOGGED_IN_USER_DATA,
  ADD_NEW_TRIP_DATA,
  DELETE_TRIP_DATA,
} from "../Actions/AccountActions";

const initialState = {
  userAccount: {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    trips: [],
  },
  activeTrip: {
    tripData: null,
  },
};

export { initialState };

export default produce((draft, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER_DATA:
      draft.userAccount = action.payload;
      return draft;
    case REMOVE_LOGGED_IN_USER_DATA:
      return { ...initialState };
    case SET_ACTIVE_TRIP:
      draft.activeTrip = action.payload;
      return draft;
    case ADD_NEW_TRIP_DATA:
      draft.userAccount.trips.push(action.payload);
      if (!draft.activeTrip) {
        draft.activeTrip = action.payload;
      }
      return draft;
    case DELETE_TRIP_DATA:
      draft.userAccount.trips = draft.userAccount.trips.filter((trip) => {
        return trip.id !== action.payload.id;
      });
      return draft;
    case ADD_NEW_HOTEL_DATA:
      draft.activeTrip.hotels.push(action.payload);
      return draft;
    case ADD_NEW_FLIGHT_DATA:
      draft.activeTrip.flights.push(action.payload);
      return draft;
    default:
      return draft;
  }
}, initialState);
