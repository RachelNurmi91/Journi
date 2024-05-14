import AccountRequests from "../../Requests/AccountRequests";
import {
  updateTripsData,
  setActiveTrip,
  updateUserData,
} from "../Actions/AccountActions";
const accountRequest = new AccountRequests();

export const fetchUpdatedTrips = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        account: {
          userAccount: { username },
          activeTrip,
        },
      } = getState();
      const token = localStorage.getItem("token");
      const response = await accountRequest.fetchAccountData(username, token);
      if (response.data) {
        debugger;
        const updatedTrips = response.data.trips;
        resolve(updatedTrips);

        //Update account to have new trips data
        dispatch(updateTripsData(updatedTrips));

        // Update the current active trip data to reflect new data
        const activeTripId = activeTrip._id;
        let updatedActiveTrip = updatedTrips.find(
          (trip) => trip._id?.toString() === activeTripId?.toString()
        );

        if (!updatedActiveTrip) updatedActiveTrip = updatedTrips?.[0];

        dispatch(setActiveTrip(updatedActiveTrip));
      } else {
        throw new Error("Unable to parse user account.");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUpdatedAccount = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        account: {
          userAccount: { username },
        },
      } = getState();
      const token = localStorage.getItem("token");
      const response = await accountRequest.fetchAccountData(username, token);
      if (response.data) {
        resolve(response.data);
        //Update account to have new trips data
        dispatch(updateUserData(response.data));
      } else {
        throw new Error("Unable to parse user account.");
      }
    } catch (error) {
      reject(error);
    }
  });
};
