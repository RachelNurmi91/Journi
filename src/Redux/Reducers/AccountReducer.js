import { SET_HOTEL_DATA } from "../Actions/AccountActions"

const initalState = {
    account: {
        firstName: "Rachel",
        lastName: "Nurmi",
    },
    trips: [
        {
            id: 1,
            hotels: [
                {
                    name: "Hampton Inn",
                    arrival: '02/02/2026',
                    departure: '02/10/2026',
                    confirmation: '03432432432',
                    nameOnReservation: "Rachel Nurmi"
                }
            ]
        }
    ],
    activeTrip: {
        tripSummary: {
            country: "Japan",
            departure: "02/02/2025"
        },
        hotel: {
            name: "Hampton Inn",
            arrival: '02/02/2026',
            departure: '02/10/2026',
            confirmation: '03432432432',
            nameOnReservation: "Rachel Nurmi"
        }
    }
}

const accountReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_HOTEL_DATA:
            let updatedTrips = state.trips.push(action.payload)
            return {
                ...state,
                trips: updatedTrips
            }
        default:
            return state
    }
}

export default accountReducer