import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";

function Breadcrumbs({ activeTrip, additionalCrumb }) {
  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/trips">All Trips</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Active Trip</BreadcrumbItem>
        <BreadcrumbItem>{activeTrip?.name}</BreadcrumbItem>
        {additionalCrumb && <BreadcrumbItem>{additionalCrumb}</BreadcrumbItem>}
      </Breadcrumb>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeTrip: state.account?.activeTrip,
  };
}

export default connect(mapStateToProps)(Breadcrumbs);
