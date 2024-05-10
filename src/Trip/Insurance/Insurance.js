import { useState } from "react";
import { connect } from "react-redux";
import Input from "../../Shared/UI/Input";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import TripRequests from "../../Requests/TripRequests";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import Checkbox from "../../Shared/UI/Checkbox";
import Textarea from "../../Shared/UI/Textarea";

import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  insuranceProvider: null,
  policyNo: null,
  comments: null,
};

function Insurance({ fetchUpdatedTrips, ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const tripRequest = new TripRequests();

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  // onSave is for new insurance
  const saveInsurance = async () => {
    setLoading(true);

    formData.tripId = props.activeTripId;
    tripRequest
      .addInsurance(formData)
      .then(() => {
        fetchUpdatedTrips().then(() => props.navigate("/insurances"));
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

  // onUpdate is for editing exiting insurance
  // const updateInsurance = () => {
  //   setLoading(true)
  //   tripRequest
  //     .updateInsurance(formData)
  //     .then(() => {
  //       fetchUpdatedTrips().then(() => {props.navigate("/insurances")
  //       setLoading(false)});
  //     })
  //     .catch((error) => {console.error(error); setLoading(false)});
  // };

  return (
    <div className="content-body">
      <Header
        title="Add Insurance"
        leftIcon={true}
        destination={"/insurances"}
        props={{
          addNew: true,
        }}
      />
      <div className="container">
        <div className="row">
          <Input
            name="insuranceProvider"
            onChange={handleChange}
            placeholder="Insurance Provider"
            label="Insurance Provider"
            value={formData.insuranceProvider}
          />
          <Input
            name="policyNo"
            onChange={handleChange}
            placeholder="Policy No."
            label="Policy No."
            value={formData.policyNo}
          />
          <div>
            <Checkbox
              label="Add additional comments"
              toggleCheckbox={toggleComments}
            />
            {showComments ? (
              <Textarea
                name="comments"
                onChange={handleChange}
                placeholder="Add additional information..."
                label="Comments"
              />
            ) : null}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex align-self-center">
            <Button label="Save" onClick={saveInsurance} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
