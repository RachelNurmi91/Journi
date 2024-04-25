import { produce } from "immer";
import {
  ADD_NEW_HOTEL_DATA,
  SET_LOGGED_IN_USER_DATA,
  UPDATE_USER_DATA,
  SET_ACTIVE_TRIP,
  ADD_NEW_FLIGHT_DATA,
  REMOVE_LOGGED_IN_USER_DATA,
  UPDATE_TRIPS_DATA,
  ADD_NEW_TRIP_DATA,
  DELETE_TRIP_DATA,
} from "../Actions/AccountActions";

const initialState = {
  userAccount: {
    id: null,
    firstName: null,
    lastName: null,
    username: null,
    rewardPrograms: [],
    trips: [],
  },
  activeTrip: null,
};

export { initialState };

export default produce((draft, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER_DATA:
      draft.userAccount = action.payload;
      return draft;
    case REMOVE_LOGGED_IN_USER_DATA:
      return { ...initialState };
    case UPDATE_USER_DATA:
      draft.userAccount.firstName = action.payload.firstName;
      draft.userAccount.lastName = action.payload.lastName;
      draft.userAccount.username = action.payload.username;
      draft.userAccount.rewardPrograms = action.payload.rewardPrograms;
      return draft;
    case SET_ACTIVE_TRIP:
      draft.activeTrip = action.payload;
      return draft;
    case UPDATE_TRIPS_DATA:
      draft.userAccount.trips = action.payload;
      return draft;
    case ADD_NEW_TRIP_DATA:
      draft.userAccount.trips.push(action.payload);
      if (!draft.activeTrip) {
        draft.activeTrip = action.payload;
      }
      return draft;
    case DELETE_TRIP_DATA:
      draft.userAccount.trips = draft.userAccount.trips.filter((trip) => {
        return trip.tripId !== action.payload.tripId;
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
