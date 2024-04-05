import { useState } from "react";
import { connect } from "react-redux";
import {
  addNewHotelData,
  setActiveTrip,
  setLoggedInUserData,
} from "../../Redux/Actions/AccountActions";
import Button from "../../Shared/UI/Button";
import Header from "../../Shared/UI/Header";
import Input from "../../Shared/UI/Input";

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
      // props.setLoggedInUserData(testAccount01);
      //Set first trip in list as active. Will need to make sure date is soonest.
      // let activeTrip = testAccount01?.trips?.[0];
      // props.setActiveTrip(activeTrip);
    }
    props.navigate("/");
  };

  return (
    <div className="content-body">
      <Header title="Login" />
      <div className="container">
        <div className="row">
          <Input
            name="username"
            onChange={handleChange}
            placeholder="Username/Email"
            label="Username/Email"
          />
        </div>
        <div className="row">
          <Input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            label="Password"
          />
        </div>
        <div className="row">
          <Button label="Login" onClick={onLogin} />
        </div>
      </div>
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
