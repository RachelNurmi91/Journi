import { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  name: null,
  location: null,
  startDate: null,
  startTime: null,
  addOns: {
    comments: null,
    ticketNo: null,
    ticketUploads: [],
  },
};

function Activity({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedActivity = activeTrip.activities.find(
        (activity) => activity._id?.toString() === id
      );

      if (selectedActivity.addOns.comments) setShowComments(true);
      if (
        selectedActivity.addOns.ticketNo ||
        selectedActivity.addOns.ticketUploads
      )
        setShowTickets(true);

      setFormData(selectedActivity);
    }
  }, [activeTrip.activities, location.pathname]);

  // onSave is for new activities
  const saveActivity = async () => {
    setLoading(true);

    // Account for all possible missing data error checks before attempting save.
    let errors = [];

    if (!formData.startDate) {
      console.error("Save failed: Start date missing.");
      errors.push("startDate");
    }

    if (!formData.name) {
      console.error("Save failed: Rental agency name missing.");
      errors.push("name");
    }

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

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

  const updateActivity = () => {
    tripRequest
      .updateActivity(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/activities"));
      })
      .catch((error) => console.error(error));
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleChange = (event) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes(event.target.name)) {
        let updateError = inputError.filter((err) => err !== event.target.name);
        console.log(updateError);
        setInputError(updateError);
      }
    }

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
      startTime: time,
    }));
  };

  const handleStartDate = (date) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes("startDate")) {
        let updateError = inputError.filter((err) => err !== "startDate");
        console.log(updateError);
        setInputError(updateError);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: date,
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
              <span
                className={
                  inputError?.includes("startDate")
                    ? "label error-color mx-3"
                    : "label mx-3"
                }
              >
                Date
              </span>
              <Calendar
                selectedDate={formData.startDate}
                onDateChange={handleStartDate}
                placeholder="Select Date"
              />
            </div>
            <div className="col text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-clock"
                style={{ color: "#0bb6c0" }}
              />
              <span className="label mx-3">Time</span>
              <Time
                selectedDate={formData.startTime}
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
        title={updating ? "Update Activity" : "Add Activity"}
        leftIcon={activeTrip?.activities?.length ? true : false}
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
            name="name"
            onChange={handleChange}
            placeholder="Activity"
            label="Activity"
            value={formData.name}
            inputError={inputError}
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
            checked={showTickets}
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
                    <div className="b13-mon text-center mt-1">
                      *Only PNG, JPG of GIF files allowed.
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
            checked={showComments}
          />
          {showComments ? (
            <Textarea
              name="comments"
              onChange={handleAddOnChange}
              placeholder="Add additional information..."
              label="Comments"
              value={formData?.addOns?.comments}
            />
          ) : null}
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            {updating ? (
              <Button label="Update" onClick={updateActivity} />
            ) : (
              <Button label="Save" onClick={saveActivity} />
            )}
          </div>
        </div>
        {inputError.length ? (
          <div className="row">
            <div
              className="b13-mon text-center error-color py-2 px-3"
              style={{ fontWeight: "700" }}
            >
              * Please fill out all required fields
            </div>
          </div>
        ) : null}
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
