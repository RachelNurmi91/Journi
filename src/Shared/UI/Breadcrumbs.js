import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";

function Breadcrumbs({
  showActiveTrip = false,
  activeTrip,
  prevCrumb,
  prevCrumbLink,
  currentCrumb,
}) {
  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={prevCrumbLink}>{prevCrumb}</Link>
        </BreadcrumbItem>
        {showActiveTrip && <BreadcrumbItem>{activeTrip?.name}</BreadcrumbItem>}
        <BreadcrumbItem>{currentCrumb}</BreadcrumbItem>
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
