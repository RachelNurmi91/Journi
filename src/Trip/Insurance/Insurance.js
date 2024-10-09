import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Checkbox from "../../Shared/UI/Checkbox";
import Textarea from "../../Shared/UI/Textarea";
import { useLocation } from "react-router-dom";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

const DEFAULT_FORM_DATA = {
  name: null,
  policyNo: null,
  comments: null,
};

function Insurance({ fetchUpdatedTrips, activeTrip, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const tripRequest = new TripRequests();

  useEffect(() => {
    if (location.pathname.includes("update")) {
      setUpdating(true);

      const pathSegments = location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      let selectedInsurance = activeTrip.insurance.find(
        (insurance) => insurance._id?.toString() === id
      );

      if (selectedInsurance.comments) setShowComments(true);

      setFormData(selectedInsurance);
    }
  }, [activeTrip.insurance, location.pathname]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleChange = (event) => {
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

  // onSave is for new insurance
  const saveInsurance = async () => {
    setLoading(true);

    let errors = [];

    // Account for all possible missing data error checks before attempting login.
    if (!formData.name) {
      console.error("Save failed: Insurance name missing.");
      errors.push("name");
      setLoading(false);
    }

    if (!formData.policyNo) {
      console.error("Save failed: Policy number missing.");
      errors.push("policyNo");
      setLoading(false);
    }

    if (errors.length) {
      setInputError(errors);
      return;
    }

    formData.tripId = props.activeTripId;
    tripRequest
      .addInsurance(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/insurance"));
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

  const updateInsurance = () => {
    tripRequest
      .updateInsurance(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/insurance"));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Breadcrumbs
        prevCrumb={activeTrip?.name}
        prevCrumbLink={"/trips"}
        currentCrumb="Insurance"
      />

      <div className="content-body">
        <Header
          title={updating ? "Update Insurance" : "Add Insurance"}
          leftIcon={activeTrip?.insurance?.length ? true : false}
          destination={"/insurance"}
          props={{
            addNew: true,
          }}
        />
        <div className="container">
          <div className="row">
            <Input
              name="name"
              onChange={handleChange}
              placeholder="Insurance Provider"
              label="Insurance Provider"
              value={formData.name}
              inputError={inputError}
            />
            <Input
              name="policyNo"
              onChange={handleChange}
              placeholder="Policy No."
              label="Policy No."
              value={formData.policyNo}
              inputError={inputError}
            />
            <div>
              <Checkbox
                label="Add additional comments"
                toggleCheckbox={toggleComments}
                checked={showComments}
              />
              {showComments ? (
                <Textarea
                  name="comments"
                  onChange={handleChange}
                  placeholder="Add additional information..."
                  label="Comments"
                  value={formData?.comments}
                />
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col d-flex align-self-center">
              {updating ? (
                <Button label="Update" onClick={updateInsurance} />
              ) : (
                <Button label="Save" onClick={saveInsurance} />
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
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
