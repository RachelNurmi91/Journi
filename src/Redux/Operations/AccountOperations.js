import AccountRequests from "../../Requests/AccountRequests";
import { updateTripsData, setActiveTrip } from "../Actions/AccountActions";
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
        resolve(response.data);

        //Update account to have new trips data
        dispatch(updateTripsData(response.data));

        // Update the current active trip data to reflect new data
        const activeTripId = activeTrip._id;
        let updatedActiveTrip = response.data.trips.find(
          (trip) => trip._id?.toString() === activeTripId?.toString()
        );

        dispatch(setActiveTrip(updatedActiveTrip));
      } else {
        throw new Error("Unable to parse user account.");
      }
    } catch (error) {
      reject(error);
    }
  });
};
