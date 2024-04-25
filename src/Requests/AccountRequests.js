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
        console.log(error);
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
        console.log(error);
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

  addRewardProgram(tripData) {
    const token = localStorage.getItem("token");

    return axios
      .post(`${SERVER}/rewardPrograms/add`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }
}
