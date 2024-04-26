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

function RewardProgram({ fetchUpdatedTrips, fetchUpdatedAccount, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();

  const location = useLocation();

  const { addNew, edit, selectedItem } = location.state || {};

  const setCurrentProgram = useCallback(() => {
    if (selectedItem) {
      if (formData.id !== selectedItem?._id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          programName: selectedItem?.programName,
          membershipId: selectedItem?.membershipId,
          id: selectedItem?._id,
        }));
      }
    }
  }, [selectedItem, formData.id]);

  useEffect(() => {
    if (!addNew && !edit) {
      props.navigate("/profile");
    }

    if (edit) {
      setCurrentProgram();
    }
  }, [addNew, edit, props]);

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
        title={edit ? "Edit Reward Program" : "Add Reward Program"}
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
            value={edit ? formData.programName : ""}
          />
        </div>
        <div className="row">
          <Input
            name="membershipId"
            onChange={handleChange}
            placeholder="Rewards Number"
            label="Rewards Number"
            value={edit ? formData.membershipId : ""}
          />
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button
              label={
                loading ? <Loader size="10px" /> : edit ? "Update" : "Save"
              }
              onClick={onSave}
            />
          </div>
          {edit ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(RewardProgram);
