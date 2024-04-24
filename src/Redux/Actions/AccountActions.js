export const ADD_NEW_HOTEL_DATA = "ADD_NEW_HOTEL_DATA";
export const SET_LOGGED_IN_USER_DATA = "SET_LOGGED_IN_USER_DATA";
export const SET_ACTIVE_TRIP = "SET_ACTIVE_TRIP";
export const ADD_NEW_FLIGHT_DATA = "ADD_NEW_FLIGHT_DATA";
export const REMOVE_LOGGED_IN_USER_DATA = "REMOVE_LOGGED_IN_USER_DATA";
export const UPDATE_TRIPS_DATA = "UPDATE_TRIPS_DATA";
export const ADD_NEW_TRIP_DATA = "ADD_NEW_TRIP_DATA";
export const DELETE_TRIP_DATA = "DELETE_TRIP_DATA";

export function setLoggedInUserData(data) {
  return {
    type: SET_LOGGED_IN_USER_DATA,
    payload: data,
  };
}

export function removeLoggedInUserData() {
  return {
    type: REMOVE_LOGGED_IN_USER_DATA,
  };
}

export function setActiveTrip(activeTrip) {
  return {
    type: SET_ACTIVE_TRIP,
    payload: activeTrip,
  };
}

export function updateTripsData(data) {
  console.log("HIT", data);
  return {
    type: UPDATE_TRIPS_DATA,
    payload: data,
  };
}

export function addNewTripData(data) {
  return {
    type: ADD_NEW_TRIP_DATA,
    payload: data,
  };
}

export function deleteTripData(data) {
  return {
    type: DELETE_TRIP_DATA,
    payload: data,
  };
}

export function addNewHotelData(data) {
  return {
    type: ADD_NEW_HOTEL_DATA,
    payload: data,
  };
}

export function addNewFlightData(data) {
  return {
    type: ADD_NEW_FLIGHT_DATA,
    payload: data,
  };
}
