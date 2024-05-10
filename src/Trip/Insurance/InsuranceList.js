import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../../Shared/UI/Header";
import Methods from "../../Shared/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUpdatedTrips } from "../../Redux/Operations/AccountOperations";
import TripRequests from "../../Requests/TripRequests";
import { deleteTripData } from "../../Redux/Actions/AccountActions";
import Loading from "../../Shared/UI/Loading";

function InsuranceList({ fetchUpdatedTrips, insuranceListData }) {
  const [insuranceList, setInsuranceList] = useState(null);
  const [openInsuranceId, setOpenInsuranceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRequest = new TripRequests();

  const toggleOpen = (id) => {
    setOpenInsuranceId((prevId) => (prevId === id ? null : id));
  };
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

  const displayInsurance = () => {
    return insuranceList?.map((insurance, index) => {
      const isOpen = openInsuranceId === insurance._id;
      return (
        <div className="shadow-box mb-4" key={index}>
          <div className="row d-flex justify-content-end mx-1">
            <div className="col-1">
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                style={{ color: "#d65d5d" }}
                onClick={() => deleteInsurance(insurance._id)}
              />
            </div>
          </div>
          <div
            className="container collapsible"
            style={{
              height: `${isOpen ? "" : "70px"}`,
              transition: "height 0.10s ease",
            }}
          >
            <div className="row">
              <span className="b22-mon primary-color text-center">
                {insurance.insurance}
              </span>
            </div>

            <div className="row">
              <div className="text-center b13-mon">
                {insurance.city}, {insurance.country}
              </div>
            </div>
            {insurance.confirmationNo ? (
              <div className="row mt-3">
                <div className="b16-mon label">Confirmation No.</div>
                <div
                  className="primary-color light-bg-color text-center font-weight-bold py-1 b-radius-10"
                  style={{ borderRadius: "5px" }}
                >
                  {insurance.confirmationNo}
                </div>
              </div>
            ) : null}

            <div className="row mt-3">
              <div className="col-6 d-flex justify-content-start">
                <div>
                  <div className="b16-mon label"> Pick-Up </div>
                  <div className="text-center">
                    {Methods.formatLongDate(insurance.arrivalDate)}
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <div className="b16-mon label"> Return </div>
                  <div className="text-center">
                    {Methods.formatLongDate(insurance.departureDate)}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="text-center b13-mon">
                Reserved under "{insurance.nameOnReservation}"
              </div>
            </div>
          </div>
          <div className="text-center">
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(insurance._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                style={{ color: "#0BB6C0" }}
                onClick={() => toggleOpen(insurance._id)}
              />
            )}
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
          : "Girly pop, add your first insurance!"}
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
