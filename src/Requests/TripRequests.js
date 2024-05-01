import axios from "axios";
const SERVER = "https://journiserver.onrender.com";
const LOCALSERVER = "http://localhost:8080";

export default class TripRequests {
  addTrip(tripData) {
    console.log(tripData);
    const token = localStorage.getItem("token");

    return axios
      .post(`${LOCALSERVER}/trips/add`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  updateTrip(data) {
    const token = localStorage.getItem("token");
    return axios
      .put(`${LOCALSERVER}/trips/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  deleteTrip(tripId) {
    const token = localStorage.getItem("token");

    return axios
      .delete(`${LOCALSERVER}/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  addHotel(hotelData) {
    const token = localStorage.getItem("token");
    return axios
      .post(`${LOCALSERVER}/hotels/add`, hotelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  updateHotel(data) {
    const token = localStorage.getItem("token");
    return axios
      .put(`${LOCALSERVER}/hotels/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  deleteHotel(id) {
    console.log(id);
    const token = localStorage.getItem("token");
    return axios
      .delete(`${LOCALSERVER}/hotels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
        throw error;
      });
  }

  addFlight(flightData) {
    const token = localStorage.getItem("token");
    return axios
      .post(`${LOCALSERVER}/flights/add`, flightData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  updateFlight(data) {
    const token = localStorage.getItem("token");
    return axios
      .put(`${LOCALSERVER}/flights/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  deleteFlight(id) {
    console.log(id);
    const token = localStorage.getItem("token");
    return axios
      .delete(`${LOCALSERVER}/flights/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
        throw error;
      });
  }
}
