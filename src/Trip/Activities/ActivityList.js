import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function ActivityList({ fetchUpdatedTrips, activityListData, ...props }) {
  const [activityList, setActivityList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [activeTicketImg, setActiveTicketImg] = useState(false);
  const [openActivityId, setOpenActivityId] = useState(null);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenActivityId((prevId) => (prevId === id ? null : id));
  };

  const toggleTicketModal = (ticketImg) => {
    setActiveTicketImg(ticketImg);
    setShowTicketModal((prevState) => !prevState);
  };

  const sortByDateAndTime = useCallback(() => {
    let sortedActivities;

    let activities = [...activityListData];

    if (activities && activities?.length > 1) {
      sortedActivities = activities.sort((a, b) => {
        if (a.startDate > b.startDate) return 1;
        if (a.startDate < b.startDate) return -1;
        if (a.startDate === b.startDate) {
          if (a.startTime > b.startTime) return 1;
          if (a.startTime < b.startTime) return -1;
        }
        return 0;
      });
    } else {
      sortedActivities = activities;
    }

    setActivityList(sortedActivities);
  }, [activityListData]);

  useEffect(() => {
    sortByDateAndTime();
  }, [activityListData, sortByDateAndTime]);

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

  const allowExpand = (activity) => {
    const addOns = activity.addOns;
    if (
      !!activity.location ||
      !!addOns.comments ||
      !!addOns.ticketNo ||
      !!addOns.ticketUploads.length
    )
      return true;
  };

  const renderTickets = (tickets) => {
    return tickets.map((ticket, index) => (
      <div key={index} className="col-4 mt-2 p-1">
        <div className="d-flex flex-column align-items-start image-item">
          <img
            src={ticket?.data_url}
            alt=""
            className="thumbnail"
            onClick={() => toggleTicketModal(ticket?.data_url)}
          />
        </div>
      </div>
    ));
  };

  const navigateToUpdate = (id) => {
    props.navigate(`/activities/update/${id}`);
  };

  const displayActivities = () => {
    return activityList?.map((activity, index) => {
      let tickets = activity?.addOns?.ticketUploads;
      const isOpen = openActivityId === activity._id;
      return (
        <div className="shadow-box  mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(activity._id)}
              />
            </div>
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
              height: `${isOpen ? "" : "70px"}`,
              transition: "height 0.10s ease",
            }}
          >
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {activity?.name}
              </span>
            </div>

            <div className="row mt-2">
              <div className="text-center b13-mon">
                {Methods.formatLongDate(activity?.startDate)}

                {activity?.startTime ? (
                  <>
                    <div className="d-inline mx-2">
                      <FontAwesomeIcon
                        icon="fa-solid fa-clock"
                        style={{ color: "#0BB6C0" }}
                      />
                    </div>

                    {Methods.formatTime(activity?.startTime)}
                  </>
                ) : null}
              </div>
            </div>
            {activity.location ? (
              <div className="row my-3">
                <div className="b16-mon label">Location</div>
                <div className="mx-2">{activity?.location}</div>
              </div>
            ) : null}
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

            {activity.addOns.ticketUploads.length ? (
              <>
                <hr />
                <div className="row">
                  <div className="text-center b13-mon">
                    {renderTickets(tickets)}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          {allowExpand(activity) ? (
            <div className="text-center">
              {isOpen ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-angle-up"
                  style={{ color: "#0BB6C0" }}
                  onClick={() => toggleOpen(activity._id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-angle-down"
                  style={{ color: "#0BB6C0" }}
                  onClick={() => toggleOpen(activity._id)}
                />
              )}
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <>
      <div className="content-body activity-list">
        <Header
          title="Activities"
          rightIcon="add"
          destination={"/activities/add"}
        />
        {activityListData?.length
          ? displayActivities()
          : "Girly pop, add your first activity!"}
      </div>
      <Loading loading={loading} />
      <Modal show={showTicketModal}>
        <div style={{ position: "relative" }}>
          <div className="close" onClick={toggleTicketModal}>
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              style={{ color: "#0BB6C0" }}
              size="lg"
            />
          </div>
          <div>
            <img src={activeTicketImg} alt="Ticket" className="ticket" />
          </div>
        </div>
      </Modal>
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
