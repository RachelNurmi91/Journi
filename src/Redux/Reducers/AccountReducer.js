import { ADD_NEW_HOTEL_DATA } from "../Actions/AccountActions";

const initalState = {
  userAccount: {
    firstName: "Rachel",
    lastName: "Nurmi",
    trips: [
      {
        id: 1,
        hotels: [
          {
            hotelName: "Hampton Inn",
            arrivalDate: "02/02/2026",
            departureDate: "02/10/2026",
            hotelConfirmation: "03432432432",
            nameOnReservation: "Rachel Nurmi",
          },
        ],
      },
    ],
  },
  activeTrip: {
    tripSummary: {
      country: "Japan",
      departure: "02/02/2025",
    },
    hotel: {
      hotelName: "Hampton Inn",
      arrivalDate: "02/02/2026",
      departureDate: "02/10/2026",
      hotelConfirmation: "03432432432",
      nameOnReservation: "Rachel Nurmi",
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
          trips: [...state.userAccount.trips, action.payload],
        },
      };
    default:
      return state;
  }
};

export default accountReducer;
