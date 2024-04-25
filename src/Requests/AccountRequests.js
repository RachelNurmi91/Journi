import axios from "axios";
const SERVER = "http://localhost:8080";

export default class AccountRequests {
  login(loginData) {
    return axios
      .post(`${SERVER}/users/login`, loginData)
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  registerAccount(registrationData) {
    return axios
      .post(`${SERVER}/users/register`, registrationData)
      .then(function (response) {
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  fetchAccountData(username) {
    const token = localStorage.getItem("token");
    return axios.get(`${SERVER}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addRewardProgram(programData) {
    const token = localStorage.getItem("token");

    return axios
      .post(`${SERVER}/rewardPrograms/add`, programData, {
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

  deleteRewardProgram(id) {
    const token = localStorage.getItem("token");

    return axios
      .delete(`${SERVER}/rewardPrograms/${id}`, {
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
