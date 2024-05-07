import axios from "axios";
const SERVER = "https://journiserver.onrender.com";
// const SERVER = "http://localhost:8080";

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
      .put(`${SERVER}/trips/${data._id}`, data, {
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
      .delete(`${SERVER}/trips/${tripId}`, {
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
      .post(`${SERVER}/hotels/add`, hotelData, {
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

  // updateHotel(data) {
  //   const token = localStorage.getItem("token");
  //   return axios
  //     .put(`${SERVER}/hotels/${data._id}`, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       return response; // Return the response for chaining
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //       throw error; // Re-throw the error to propagate it
  //     });
  // }

  deleteHotel(id) {
    const token = localStorage.getItem("token");
    return axios
      .delete(`${SERVER}/hotels/${id}`, {
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
      .post(`${SERVER}/flights/add`, flightData, {
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

  // updateFlight(data) {
  //   const token = localStorage.getItem("token");
  //   return axios
  //     .put(`${SERVER}/flights/${data._id}`, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       return response; // Return the response for chaining
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //       throw error; // Re-throw the error to propagate it
  //     });
  // }

  deleteFlight(id) {
    const token = localStorage.getItem("token");
    return axios
      .delete(`${SERVER}/flights/${id}`, {
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

  addActivity(activityData) {
    const token = localStorage.getItem("token");
    return axios
      .post(`${SERVER}/activities/add`, activityData, {
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

  deleteActivity(id) {
    const token = localStorage.getItem("token");
    return axios
      .delete(`${SERVER}/activities/${id}`, {
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
