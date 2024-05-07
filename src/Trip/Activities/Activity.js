import { useState } from "react";
import { connect } from "react-redux";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../Shared/UI/Calendar";
import Time from "../../Shared/UI/Time";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Checkbox from "../../Shared/UI/Checkbox";
import ImageUploading from "react-images-uploading";
import Loading from "../../Shared/UI/Loading";
import Textarea from "../../Shared/UI/Textarea";

const DEFAULT_FORM_DATA = {
  activityName: null,
  location: null,
  activityDate: null,
  activityTime: null,
  addOns: {
    comments: null,
    ticketNo: null,
    ticketUploads: [],
  },
};

function Activity({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const tripRequest = new TripRequests();

  // onSave is for new activities
  const saveActivity = async () => {
    setLoading(true);

    formData.tripId = props.activeTripId;
    tripRequest
      .addActivity(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/activities"));
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const handleAddOnChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      addOns: {
        ...prevFormData.addOns,
        [targetKey]: newValue,
      },
    }));
  };

  const handleActivityTime = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activityTime: time,
    }));
  };

  const handleActivityDate = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activityDate: date,
    }));
  };

  const handleTicketUpload = (imageList, addUpdateIndex) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      addOns: {
        ...prevFormData.addOns,
        ticketUploads: imageList,
      },
    }));
  };

  const renderOptionsBox = () => {
    return (
      <>
        <div className="outlined-box p-4">
          <div className="row">
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Date</span>
              <Calendar
                selectedDate={formData.activityDate}
                onDateChange={handleActivityDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-calendar-days"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Time</span>
              <Time
                selectedDate={formData.activityTime}
                onDateChange={handleActivityTime}
                placeholder="Select Time"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="content-body activity">
      <Header
        title="Add Activity"
        leftIcon={true}
        destination={"/activities"}
        subtitle="Add any activity, event or excursion."
        props={{
          addNew: true,
        }}
      />

      <div className="container">
        <div className="row"> {renderOptionsBox()}</div>
        <div className="row mt-2">
          <Input
            name="activityName"
            onChange={handleChange}
            placeholder="Activity"
            label="Activity"
            value={formData.activityName}
          />

          <Input
            name="location"
            onChange={handleChange}
            placeholder="Location"
            label="Location"
            value={formData.location}
          />
        </div>
        <div className="ticketed row my-2">
          <Checkbox
            label="Add ticket information"
            toggleCheckbox={toggleTickets}
          />
          {showTickets ? (
            <>
              <Input
                name="ticketNo"
                onChange={handleAddOnChange}
                placeholder="Confirmation Number"
                label="Ticket/Reservation Confirmation"
                value={formData.addOns.ticketNo}
              />

              <ImageUploading
                multiple
                value={formData?.addOns?.ticketUploads}
                onChange={handleTicketUpload}
                maxNumber={12}
                dataURLKey="data_url"
                acceptType={[]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper my-3">
                    <div className="mx-auto w-50">
                      <Button
                        label="Select File"
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      />
                    </div>

                    <div className="container">
                      <div className="row">
                        {imageList.map((image, index) => (
                          <div key={index} className="col-4 mt-2 p-1">
                            <div className="d-flex flex-column align-items-start image-item">
                              <img
                                src={image.data_url}
                                alt=""
                                className="thumbnail"
                              />
                              <div
                                className="mx-2 error-color b13-mon"
                                onClick={() => onImageRemove(index)}
                              >
                                Remove
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ImageUploading>
            </>
          ) : null}
        </div>
        <div>
          <Checkbox
            label="Add additional comments"
            toggleCheckbox={toggleComments}
          />
          {showComments ? (
            <Textarea
              name="comments"
              onChange={handleAddOnChange}
              placeholder="Add additional information..."
              label="Comments"
            />
          ) : null}
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={saveActivity} />
          </div>
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    activeTripId: state.account?.activeTrip?._id,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = {
  fetchUpdatedTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
