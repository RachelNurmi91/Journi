export const SET_HOTEL_DATA = "SET_HOTEL_DATA"

export function setHotelData(data) {
    return {
        type: SET_HOTEL_DATA,
        payload: data,
    }
}