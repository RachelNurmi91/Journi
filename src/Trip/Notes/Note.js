import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Textarea from "../../Shared/UI/Textarea";
import { useLocation } from "react-router-dom";
import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  note: null,
};

function Note({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedNote = activeTrip.notes.find(
        (note) => note._id?.toString() === id
      );

      setFormData(selectedNote);
    }
  }, [activeTrip.notes, location.pathname]);

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

  // onSave is for new note
  const saveNote = async () => {
    setLoading(true);

    // Account for all possible missing data error checks before attempting save.
    let errors = [];

    if (!formData.note) {
      console.error("Save failed: Note missing.");
      errors.push("note");
    }

    if (errors.length) {
      setInputError(errors);
      setLoading(false);
      return;
    }

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

  const updateNote = () => {
    tripRequest
      .updateNote(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/notes"));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="content-body">
      <Header
        title={updating ? "Update Note" : "Add Note"}
        leftIcon={activeTrip?.notes?.length ? true : false}
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
            inputError={inputError}
            value={formData?.note}
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            {updating ? (
              <Button label="Update" onClick={updateNote} />
            ) : (
              <Button label="Save" onClick={saveNote} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Note);
