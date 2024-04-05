import axios from "axios";

export default class AccountRequests {
  registerAccount(registrationData) {
    return axios
      .post("/users/register", registrationData)
      .then(function (response) {
        console.log(response);
        return response; // Return the response for chaining
      })
      .catch(function (error) {
        console.log(error);
        throw error; // Re-throw the error to propagate it
      });
  }

  getAccount(username) {
    return axios.get(`/users/${username}`);
  }
}
