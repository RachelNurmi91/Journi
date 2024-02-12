import {
  ADD_NEW_HOTEL_DATA,
  SET_LOGGED_IN_USER_DATA,
  SET_ACTIVE_TRIP,
  ADD_NEW_FLIGHT_DATA,
} from "../Actions/AccountActions";

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
    case ADD_NEW_HOTEL_DATA:
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          trips: [
            {
              hotels: [...state.userAccount.trips[0].hotels, action.payload],
            },
          ],
        },
      };
    case ADD_NEW_FLIGHT_DATA:
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          trips: [
            {
              flights: [...state.userAccount.trips[0].flights, action.payload],
            },
          ],
        },
      };
    default:
      return state;
  }
};

export default accountReducer;
