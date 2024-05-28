import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function InsuranceList({ fetchUpdatedTrips, insuranceListData, ...props }) {
  const [insuranceList, setInsuranceList] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const sortByDate = useCallback(() => {
    let sortedInsurance;

    let insurance = insuranceListData;

    if (insurance && insurance?.length > 10) {
      sortedInsurance = insurance.sort((a, b) => {
        if (a.arrivalDate > b.arrivalDate) return 1;
        if (a.arrivalDate < b.arrivalDate) return -1;
        return 0;
      });
    } else {
      sortedInsurance = insurance;
    }

    setInsuranceList(sortedInsurance);
  }, [insuranceListData]);

  useEffect(() => {
    sortByDate();
  }, [insuranceListData, sortByDate]);

  useEffect(() => {
    sortByDate();
  }, [insuranceListData, sortByDate]);

  const deleteInsurance = (id) => {
    setLoading(true);
    tripRequest
      .deleteInsurance(id)
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
    props.navigate(`/insurance/update/${id}`);
  };

  const displayInsurance = () => {
    return insuranceList?.map((insurance, index) => {
      return (
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="primary-color"
                onClick={() => navigateToUpdate(insurance._id)}
              />
            </div>
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteInsurance(insurance._id)}
              />
            </div>
          </div>
          <div className="container collapsible">
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {insurance.name}
              </span>
            </div>

            <div className="row mt-3">
              <div className="b16-mon label">Policy No.</div>
              <div className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10">
                {insurance.policyNo}
              </div>
            </div>
            {insurance.comments ? (
              <div className="row mt-3">
                <div className="b16-mon label">Comments</div>
                <div>{insurance.comments}</div>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="content-body insurance-list">
        <Header
          title="Insurance"
          rightIcon="add"
          destination={"/insurance/add"}
        />
        {insuranceListData?.length
          ? displayInsurance()
          : "Shit happens. Add your first insurance!"}
      </div>
      <Loading loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    insuranceListData: state.account?.activeTrip?.insurance,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceList);
