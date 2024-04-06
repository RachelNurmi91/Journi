import axios from "axios";
const SERVER = "http://localhost:8080";

export default class TripRequests {
  addTrip(tripData) {
    const token = localStorage.getItem("token");

    return axios
      .post(`${SERVER}/trips/add`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  addHotel(hotelData) {
    const token = localStorage.getItem("token");

    return axios
      .post(`${SERVER}/hotels/add`, hotelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  addFlight(flightData) {
    const token = localStorage.getItem("token");
    console.log("Request hit: ", flightData, token);
    return axios
      .post(`${SERVER}/flights/add`, flightData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it
      });
  }
}
