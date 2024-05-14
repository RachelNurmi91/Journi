import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Textarea from "../../Shared/UI/Textarea";

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  note: null,
};

function Note({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  // onSave is for new note
  const saveNote = async () => {
    setLoading(true);

    formData.tripId = props.activeTripId;
    tripRequest
      .addNote(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/notes"));
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

  // onUpdate is for editing exiting note
  // const updateNote = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateNote(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/notes")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  return (
    <div className="content-body">
      <Header
        title="Add Note"
        leftIcon={true}
        destination={"/notes"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row">
          <Textarea
            name="note"
            onChange={handleChange}
            placeholder="Add notes about your trip..."
            label="Add a Note"
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={saveNote} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Note);
