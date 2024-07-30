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
import { Collapse } from "reactstrap";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

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
      <div key={index} className="col-4 p-1">
        <div className="d-flex flex-column align-items-start image-item">
          <img
            src={ticket?.data_url}
            alt=""
            className="thumbnail"
            onClick={() => toggleTicketModal(ticket?.data_url)}
            style={{ border: "1px solid #ececec", borderRadius: "0" }}
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
        <div className="ticket p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div className="row">
              <div className="col-12">
                {Methods.formatLongDate(activity.startDate)}

                <FontAwesomeIcon
                  icon="fa-solid fa-clock"
                  style={{ color: "#0BB6C0" }}
                  className="mx-2"
                />
                {Methods.formatTime(activity?.startTime)}
              </div>
            </div>
            <div
              className={
                activity?.addOns?.ticketNo ||
                activity.addOns.ticketUploads.length
                  ? `my-4`
                  : `mt-4`
              }
            >
              <div
                className="b22-mon  primary-color"
                style={{ lineHeight: "20px" }}
              >
                {activity.name}
              </div>

              {activity.location && (
                <div>
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    style={{ color: "#0bb6c0" }}
                  />{" "}
                  {activity.location}
                </div>
              )}
            </div>

            {activity?.addOns?.ticketNo && (
              <div className=" align-content-center">
                <span className="b14-mon primary-color label">
                  Confirmation{" "}
                </span>
                {activity?.addOns?.ticketNo}
              </div>
            )}
            {(activity.addOns.ticketUploads.length ||
              activity.addOns.comments) && <hr className="dashed-line" />}
            {activity.addOns.ticketUploads.length ? (
              <>{renderTickets(tickets)}</>
            ) : null}
            {activity.addOns.comments && (
              <div
                className="link-action label"
                onClick={() => toggleOpen(activity._id)}
              >
                + View Comments
              </div>
            )}

            <Collapse isOpen={isOpen}>
              {activity.addOns.comments ? (
                <div className="row mx-2">
                  <div>{activity?.addOns?.comments}</div>
                </div>
              ) : null}
            </Collapse>
          </div>

          <div
            style={{
              backgroundColor: "#32AAAA",
              borderRadius: " 0 0 10px 10px",
              padding: "12px 0",
            }}
          >
            <div className="text-center row link-style">
              <div
                className="col-6"
                onClick={() => navigateToUpdate(activity._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div
                className="col-6"
                onClick={() => deleteActivity(activity._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumbs />
      <div
        className="content-body activity-list"
        style={{ paddingTop: "50px" }}
      >
        <Header
          title="Activities"
          rightTitle="+ Add New"
          destination={"/activities/add"}
        />
        {activityListData?.length
          ? displayActivities()
          : "Get going! Add your first activity!"}
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
