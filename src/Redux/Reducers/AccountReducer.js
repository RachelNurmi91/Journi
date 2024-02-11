import { ADD_NEW_HOTEL_DATA } from "../Actions/AccountActions";
import { SET_LOGGED_IN_USER_DATA } from "../Actions/AccountActions";
import { SET_ACTIVE_TRIP } from "../Actions/AccountActions";

const initalState = {
  userAccount: null,
  activeTrip: {
    tripDetails: null,
    tripSummary: {
      country: null,
      departure: null,
    },
  },
};

const accountReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_HOTEL_DATA:
      //   let updatedTrips = state.userAccount.trips.push(action.payload);
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          trips: {
            ...state.userAccount.trips,
            hotels: [...state.userAccount.trips.hotels, action.payload],
          },
        },
      };
    case SET_LOGGED_IN_USER_DATA:
      return {
        userAccount: action.payload,
      };
    case SET_ACTIVE_TRIP:
      return {
        ...state,
        activeTrip: {
          tripDetails: action.payload,
          tripSummary: {
            country: action.payload.destination,
            departure: action.payload.departure,
          },
        },
      };
    default:
      return state;
  }
};

export default accountReducer;
