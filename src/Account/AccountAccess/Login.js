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
import AccountRequests from "../../Requests/AccountRequests";
import Loading from "../../Shared/UI/Loading";

const DEFAULT_FORM_DATA = {
  username: null,
  password: null,
};

function Login({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [inputError, setInputError] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const accountRequest = new AccountRequests();

  const handleChange = (event) => {
    //If theres an error and user updates field remove error.
    if (inputError) {
      if (inputError?.includes(event.target.name)) {
        let updateError = inputError.filter((err) => err !== event.target.name);
        console.error(updateError);
        setInputError(updateError);
      }
    }

    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onLogin = async () => {
    setLoading(true);
    setError(false);

    let errors = [];

    // Account for all possible missing data error checks before attempting login.

    if (!formData.username) {
      console.error("Registration failed: Username missing.");
      errors.push("username");
      setLoading(false);
    }

    if (!formData.password) {
      console.error("Registration failed: Password missing.");
      errors.push("password");
      setLoading(false);
    }

    if (errors.length) {
      setInputError(errors);
      return;
    }

    await accountRequest
      .login(formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        // If there is no token don't attempt to fetch the account.
        if (!token) {
          console.error("Login failed: No token returned.");
          setError("Login unsuccessful.");
          setLoading(false);
          return;
        }

        accountRequest
          .fetchAccountData(formData.username, token)
          .then((account) => {
            if (!account) {
              console.error("Login failed: No account found.");
              setError("Login unsuccessful.");
              setLoading(false);
              return;
            }

            //On success we login automatically

            const accountData = {
              id: account.data._id,
              firstName: account.data.firstName,
              lastName: account.data.lastName,
              username: account.data.username,
              rewardPrograms: account.data.rewardPrograms,
              trips: account.data.trips,
              activities: account.data.activities,
            };

            props.setLoggedInUserData(accountData);

            let activeTrip = account.data.trips?.[0];
            props.setActiveTrip(activeTrip);
            props.navigate("/");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        console.error("Login failed: Server login error.");
        setError("Login unsuccessful.");
        setLoading(false);
      });
  };

  return (
    <div className="content-body">
      <Header title="Login" />
      <div className="container">
        <div className="row">
          <Input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            label="Username"
            value={formData.username}
            inputError={inputError}
          />
        </div>
        <div className="row">
          <Input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            label="Password"
            type="password"
            value={formData.password}
            inputError={inputError}
          />
        </div>
        <div className="row mt-3">
          <Button label="Login" onClick={onLogin} />
        </div>
        {inputError.length ? (
          <div className="row">
            <div
              className="b13-mon text-center error-color py-2 px-3"
              style={{ fontWeight: "700" }}
            >
              * Please fill out all required fields
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="row">
            <div
              className="b13-mon text-center error-color py-2 px-3 mt-3"
              style={{ fontWeight: "700" }}
            >
              {error}
            </div>
          </div>
        ) : null}
      </div>
      <Loading loading={loading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
