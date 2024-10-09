import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

function NoteList({ fetchUpdatedTrips, noteListData, activeTrip, ...props }) {
  const [loading, setLoading] = useState(false);
  const [sortedNotes, setSortedNotes] = useState(null);

  const tripRequest = new TripRequests();

  useEffect(() => {
    const notes = [...noteListData];

    const sortNotes = notes?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setSortedNotes(sortNotes);
  }, [noteListData]);

  const deleteNote = (id) => {
    setLoading(true);
    tripRequest
      .deleteNote(id)
      .then(() => {
        fetchUpdatedTrips().then(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error: Cannot delete trip: ", error);
        setLoading(false);
      });
  };

  const navigateToUpdate = (id) => {
    props.navigate(`/notes/update/${id}`);
  };

  const displayNotes = () => {
    return sortedNotes?.map((note, index) => {
      return (
        <div className="outlined-box mb-4">
          <div className="row">
            <div className="col">
              <li>{note.note}</li>
            </div>
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(note._id)}
              />
            </div>
            <div className="col-1 mx-3 d-flex align-items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteNote(note._id)}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumbs
        prevCrumb={activeTrip?.name}
        prevCrumbLink={"/trips"}
        currentCrumb="Activities"
      />
      <div className="content-body note-list">
        <Header title="Notes" rightIcon={true} destination={"/notes/add"} />
        {noteListData?.length ? (
          <div>
            <ul>{displayNotes()}</ul>
          </div>
        ) : (
          "You'll forget. Add your first note!"
        )}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    noteListData: state.account?.activeTrip?.notes,
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
