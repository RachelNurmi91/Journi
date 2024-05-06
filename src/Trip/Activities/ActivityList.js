import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function ActivityList({
  fetchUpdatedTrips,
  activityListData,
  deleteTripData,
  trip,
  ...props
}) {
  const [activityList, setActivityList] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const sortByDate = useCallback(() => {
    let sortedActivities;

    let activities = activityListData;

    if (activities && activities?.length > 10) {
      sortedActivities = activities.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedActivities = activities;
    }

    setActivityList(sortedActivities);
  }, [activityListData]);

  useEffect(() => {
    sortByDate();
  }, [activityListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [activityListData, sortByDate]);

  const deleteActivity = (id) => {
    setLoading(true);
    tripRequest
      .deleteActivity(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error: Cannot delete activity: ", error);
        setLoading(false);
      });
  };

  const renderTickets = (tickets) => {
    return tickets.map((ticket, index) => (
      <div key={index} className="col-4 mt-2 p-1">
        <div className="d-flex flex-column align-items-start image-item">
          <img src={ticket?.data_url} alt="" className="cropped-ticket" />
        </div>
      </div>
    ));
  };

  const displayActivities = () => {
    return activityList?.map((activity, index) => {
      let tickets = activity?.addOns?.ticketUploads;
      return (
        <div className="shadow-box  mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteActivity(activity._id)}
              />
            </div>
          </div>
          <div
            className="container collapsible"
            style={{
              height: `${open ? "" : "70px"}`,
              transition: "height 0.10s ease",
            }}
          >
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {activity?.activityName}
              </span>
            </div>

            <div className="row mt-2">
              <div className="text-center b13-mon">
                {Methods.formatLongDate(activity?.activityDate)}

                {activity?.activityTime ? (
                  <>
                    <div className="d-inline mx-2">
                      <FontAwesomeIcon
                        icon="fa-solid fa-clock"
                        style={{ color: "#0BB6C0" }}
                      />
                    </div>

                    {Methods.formatTime(activity?.activityTime)}
                  </>
                ) : null}
              </div>
            </div>

            {activity.addOns.ticketNo ? (
              <div className="row my-3">
                <div className="b16-mon label">Ticket/Confirmation No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {activity?.addOns?.ticketNo}
                </div>
              </div>
            ) : null}

            {activity.addOns.comments ? (
              <div className="row my-3">
                <div className="b16-mon label">Comments</div>
                <div className="mx-2">{activity?.addOns?.comments}</div>
              </div>
            ) : null}
            <hr />
            <div className="row">
              <div className="text-center b13-mon">
                {renderTickets(tickets)}
              </div>
            </div>
          </div>
          <div className="text-center">
            {open ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpen}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={toggleOpen}
              />
            )}
          </div>
        </div>
      );
    });
  };

  console.log(activityListData, trip);

  return (
    <>
      <div className="content-body activity-list">
        <Header
          title="Activities"
          rightIcon="add"
          destination={"/activity/add"}
        />
        {activityListData?.length
          ? displayActivities()
          : "Girly pop, add your first activity!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    activityListData: state.account?.activeTrip?.activities,
    trip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
