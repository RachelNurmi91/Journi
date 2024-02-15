import { useState } from "react";
import { connect } from "react-redux";
import {
  addNewHotelData,
  setActiveTrip,
  setLoggedInUserData,
} from "../../Redux/Actions/AccountActions";
import { testAccount01 } from "../../Test/testAccount01";
import Button from "../../Shared/UI/Button";

const DEFAULT_FORM_DATA = {
  username: null,
  password: null,
};

function AddHotel({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onLogin = () => {
    if (formData.username === "snurmi2" && formData.password === "123") {
      //Set logged in user data if username and password are correct.
      props.setLoggedInUserData(testAccount01);

      //Set first trip in list as active. Will need to make sure date is soonest.
      let activeTrip = testAccount01?.trips?.[0];
      props.setActiveTrip(activeTrip);
    }
    props.navigate("/");
  };

  return (
    <div className="content-body">
      <div className="form-floating mb-3">
        <input
          className="form-control"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <label for="username">Username</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <label for="password">Password</label>
      </div>

      <Button label="Login" onClick={onLogin} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    tripList: state.account?.userAccount?.trips,
  };
}

const mapDispatchToProps = {
  addNewHotelData,
  setLoggedInUserData,
  setActiveTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
