import { useState } from "react";
import { connect } from "react-redux";
import {
  addNewHotelData,
  setActiveTrip,
  setLoggedInUserData,
} from "../../Redux/Actions/AccountActions";
import Button from "../../Shared/UI/Button";
import Input from "../../Shared/UI/Input";
import Header from "../../Shared/UI/Header";
import AccountRequests from "../../Requests/AccountRequests";

const DEFAULT_FORM_DATA = {
  firstName: null,
  lastName: null,
  username: null,
  password: null,
};

function Register({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const accountRequest = new AccountRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onRegister = async () => {
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
    };
    await accountRequest
      .registerAccount(registrationData)
      .then((response) => {
        console.log("We got a response! ", response);
        accountRequest
          .getAccount(formData.username)
          .then((account) => {
            if (!account) console.error("No account found");
            //On success we login automatically

            const accountData = {
              id: account.data._id,
              firstName: account.data.firstName,
              lastName: account.data.lastName,
              username: account.data.username,
              password: null,
              trips: [],
            };

            props.setLoggedInUserData(accountData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Failed to register: ", err));

    props.navigate("/");
  };

  return (
    <div className="content-body">
      <Header title="Register" />
      <div className="container">
        <div className="row">
          <div className="col">
            <Input
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
              label="First Name"
            />
          </div>
          <div className="col">
            <Input
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              label="Last Name"
            />
          </div>
          <div className="row">
            <Input
              name="username"
              onChange={handleChange}
              placeholder="Username"
              label="Username"
            />
          </div>
          <div className="row">
            <Input
              name="password"
              onChange={handleChange}
              placeholder="Password"
              label="Password"
              type="password"
            />
          </div>
          <div className="row">
            <Button label="Register" onClick={onRegister} />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
