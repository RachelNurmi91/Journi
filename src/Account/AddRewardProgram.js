import { useState } from "react";
import { connect } from "react-redux";
import Button from "../Shared/UI/Button";
import Header from "../Shared/UI/Header";
import Input from "../Shared/UI/Input";
import Loader from "../Shared/UI/Loader";
import AccountRequests from "../Requests/AccountRequests";
import { fetchUpdatedTrips } from "../Redux/Operations/AccountOperations";

const DEFAULT_FORM_DATA = {
  programName: null,
  membershipId: null,
};

function AddHotel({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();

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
        fetchUpdatedTrips().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="content-body">
      <Header title="Add Reward Program" />
      <div className="container">
        <div className="row">
          <Input
            name="programName"
            onChange={handleChange}
            placeholder="Reward Program"
            label="Reward Program"
          />
        </div>
        <div className="row">
          <Input
            name="membershipId"
            onChange={handleChange}
            placeholder="Rewards Number"
            label="Rewards Number"
          />
        </div>
        <div className="row">
          <Button
            label={loading ? <Loader size="10px" /> : "Save"}
            onClick={onSave}
          />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
