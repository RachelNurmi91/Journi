import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";
import Breadcrumbs from "../../Shared/UI/Breadcrumbs";

function InsuranceList({
  fetchUpdatedTrips,
  insuranceListData,
  activeTrip,
  ...props
}) {
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
        <div className="outlined-box p-0 mb-4" key={index}>
          <div style={{ padding: "25px" }}>
            <div
              className="b22-mon  primary-color"
              // style={{ lineHeight: "20px" }}
            >
              {insurance.name}
            </div>
            <span className="b14-mon primary-color label">Policy No. </span>
            {insurance.policyNo}

            {insurance.comments ? (
              <div className="row mt-3">
                <div className="b16-mon label primary-color">Comments</div>
                <div className=" b13-mon ">{insurance.comments}</div>
              </div>
            ) : null}
          </div>

          <div
            style={{
              backgroundColor: "#32AAAA",
              borderRadius: " 0 0 10px 10px",
              padding: "12px 0",
            }}
          >
            <div className="text-center row link-style">
              <div
                className="col-6"
                onClick={() => navigateToUpdate(insurance._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
              </div>
              <div
                className="col-6"
                onClick={() => deleteInsurance(insurance._id)}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> Delete
              </div>
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
        currentCrumb="Insurance"
      />
      <div
        className="content-body insurance-list"
        style={{ paddingTop: "50px" }}
      >
        <Header
          title="Insurance"
          rightIcon={true}
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
    activeTrip: state.account?.activeTrip,
  };
}

const mapDispatchToProps = { fetchUpdatedTrips, deleteTripData };

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceList);
