import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Input from "../../Shared/UI/Input";
import Loading from "../../Shared/UI/Loading";
import AccountRequests from "../../Requests/AccountRequests";
import {
  fetchUpdatedTrips,
  fetchUpdatedAccount,
} from "../../Redux/Operations/AccountOperations";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

const DEFAULT_FORM_DATA = {
  name: null,
  membershipId: null,
  id: null,
};

function RewardProgram({ fetchUpdatedTrips, fetchUpdatedAccount, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState([]);

  const accountRequest = new AccountRequests();

  const handleChange = (event) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes(event.target.name)) {
        let updateError = inputError.filter((err) => err !== event.target.name);
        console.error(updateError);
        setInputError(updateError);
      }
    }

    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onSave = async () => {
    setLoading(true);

    let errors = [];

    // Account for all possible missing data error checks before attempting login.
    if (!formData.name) {
      console.error("Save failed: Reward program name missing.");
      errors.push("name");
      setLoading(false);
    }

    if (!formData.membershipId) {
      console.error("Save failed: Membership ID missing.");
      errors.push("membershipId");
      setLoading(false);
    }

    if (errors.length) {
      setInputError(errors);
      return;
    }

    accountRequest
      .addRewardProgram(formData)
      .then(() => {
        fetchUpdatedAccount().then(() => props.navigate("/profile"));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Breadcrumbs
        prevCrumb="Profile"
        prevCrumbLink={"/profile"}
        currentCrumb="Reward Programs"
      />
      <div className="content-body profile" style={{ paddingTop: "50px" }}>
        <Header
          title="Add Reward Program"
          leftIcon
          destination={"/reward-programs"}
        />
        <div className="container">
          <div className="row">
            <Input
              name="name"
              onChange={handleChange}
              placeholder="Reward Program"
              label="Reward Program"
              value={formData.name}
              inputError={inputError}
            />
          </div>
          <div className="row">
            <Input
              name="membershipId"
              onChange={handleChange}
              placeholder="Rewards Number"
              label="Rewards Number"
              value={formData.membershipId}
              inputError={inputError}
            />
          </div>
          <div className="row mt-3">
            <div className="col d-flex align-self-center">
              <Button label="Save" onClick={onSave} />
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
    </>
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
