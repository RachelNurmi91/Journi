export const ADD_NEW_HOTEL_DATA = "ADD_NEW_HOTEL_DATA";

export function addNewHotelData(data) {
  return {
    type: ADD_NEW_HOTEL_DATA,
    payload: data,
  };
}
