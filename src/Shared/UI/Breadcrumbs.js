import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";

function Breadcrumbs({ activeTrip }) {
  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/profile">All Trips</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{activeTrip?.name}</BreadcrumbItem>
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
