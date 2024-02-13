import { useState } from "react";
import { connect } from "react-redux";
import {
  addNewHotelData,
  setActiveTrip,
  setLoggedInUserData,
} from "../../Redux/Actions/AccountActions";
import { testAccount01 } from "../../Test/testAccount01";
import Button from "../../Layout/Shared/Button";
import Input from "../../Layout/Shared/Input"

const DEFAULT_FORM_DATA = {
  username: null,
  password: null,
};

function Register({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const handleRegister = () => {
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
      <Input name="firstName" onChange={handleChange} placeholder="First Name" label="First Name"/>
      <Input name="lastName" onChange={handleChange} placeholder="Last Name" label="Last Name"/>
      <Input name="email" onChange={handleChange} placeholder="Email" label="Email"/>
      <Input name="password" onChange={handleChange} placeholder="Password" label="Password"/>

      <Button label="Register" onClick={handleRegister}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
