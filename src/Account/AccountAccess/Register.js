import { useState } from "react";
import { connect } from "react-redux";
import {
  addNewHotelData,
  setActiveTrip,
  setLoggedInUserData,
} from "../../Redux/Actions/AccountActions";
import { testAccount01 } from "../../Test/testAccount01";
import Button from "../../Shared/UI/Button";
import Input from "../../Shared/UI/Input";

const DEFAULT_FORM_DATA = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
};

function Register({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const generateUserId = () => {
    const nameId =
      formData.firstName.substring(0, 1).toUpperCase() +
      formData.lastName.substring(0, 1).toUpperCase();
    const numberId =
      Math.floor(Math.random() * 80) +
      100 +
      "-" +
      (Math.floor(Math.random() * 8) + 10) +
      "-" +
      (Math.floor(Math.random() * 80000) + 10000);
    return nameId + "-" + numberId;
  };

  const onRegister = () => {
    const newAccount = {
      id: generateUserId(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      trips: [],
    };
    // API Call to create an account.

    //On success we login automatically
    props.setLoggedInUserData(newAccount);

    props.navigate("/");
  };

  return (
    <div className="content-body">
      <Input
        name="firstName"
        onChange={handleChange}
        placeholder="First Name"
        label="First Name"
      />
      <Input
        name="lastName"
        onChange={handleChange}
        placeholder="Last Name"
        label="Last Name"
      />
      <Input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        label="Username"
      />
      <Input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        label="Email"
      />
      <Input
        name="password"
        onChange={handleChange}
        placeholder="Password"
        label="Password"
        type="password"
      />

      <Button label="Register" onClick={onRegister} />
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
