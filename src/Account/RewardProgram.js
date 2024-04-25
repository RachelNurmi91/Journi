import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../Shared/UI/Button";
import Header from "../Shared/UI/Header";
import Input from "../Shared/UI/Input";
import Loader from "../Shared/UI/Loader";
import AccountRequests from "../Requests/AccountRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../Redux/Operations/AccountOperations";
import { useLocation } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  programName: null,
  membershipId: null,
  id: null,
};

function AddHotel({ fetchUpdatedTrips, fetchUpdatedAccount, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();

  const location = useLocation();

  const { addProgram, editProgram, currentProgram } = location.state || {};

  const setCurrentProgram = useCallback(() => {
    if (currentProgram) {
      if (formData.id !== currentProgram?._id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          programName: currentProgram?.programName,
          membershipId: currentProgram?.membershipId,
          id: currentProgram?._id,
        }));
      }
    }
  }, [currentProgram, formData.id]);

  useEffect(() => {
    if (!addProgram && !editProgram) {
      props.navigate("/profile");
    }

    if (editProgram) {
      setCurrentProgram();
    }
  }, [addProgram, editProgram, props]);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onSave = async () => {
    setLoading(true);
    setErrorStatus(false);

    if (!formData.programName) {
      console.error("Save failed: Program name missing.");
      setErrorStatus("Please provide the program name.");
      setLoading(false);
      return;
    } else if (!formData.membershipId) {
      console.error("Save failed: Membership id missing.");
      setErrorStatus("Please provide the membership id.");
      setLoading(false);
      return;
    }

    accountRequest
      .addRewardProgram(formData)
      .then(() => {
        fetchUpdatedAccount().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.error(error));
  };

  const deleteRewardProgram = (id) => {
    accountRequest
      .deleteRewardProgram(id)
      .then(() => {
        fetchUpdatedAccount().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.error("Error: Cannot delete trip: ", error));
  };
  return (
    <div className="content-body">
      <Header
        title={editProgram ? "Edit Reward Program" : "Add Reward Program"}
        leftIcon
        destination={"/profile"}
      />
      <div className="container">
        <div className="row">
          <Input
            name="programName"
            onChange={handleChange}
            placeholder="Reward Program"
            label="Reward Program"
            value={editProgram ? formData.programName : ""}
          />
        </div>
        <div className="row">
          <Input
            name="membershipId"
            onChange={handleChange}
            placeholder="Rewards Number"
            label="Rewards Number"
            value={editProgram ? formData.membershipId : ""}
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={
                loading ? (
                  <Loader size="10px" />
                ) : editProgram ? (
                  "Update"
                ) : (
                  "Save"
                )
              }
              onClick={onSave}
            />
          </div>
          {editProgram ? (
            <div className="col-2 d-flex align-self-center">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                size="2x"
                onClick={() => {
                  deleteRewardProgram(formData?.id);
                }}
              />
            </div>
          ) : null}
        </div>
        {error ? (
          <div className="row">
            <div className="b13-mon text-center error-color py-2 px-3 mt-3">
              {error}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
