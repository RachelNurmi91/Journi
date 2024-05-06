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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DEFAULT_FORM_DATA = {
  username: null,
  password: null,
};

function Login({ ...props }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const accountRequest = new AccountRequests();

  const handleChange = (event) => {
    const targetKey = event.target.name;
    const newValue = event.target.value;

    setFormData((prevState) => ({ ...prevState, [targetKey]: newValue }));
  };

  const onLogin = async () => {
    setLoading(true);
    setErrorStatus(false);

    // Account for all possible missing data error checks before attempting login.
    if (!formData.username && !formData.password) {
      console.error("Login failed: Username and password missing.");
      setErrorStatus("Please provide username and password.");
      setLoading(false);
      return;
    } else if (!formData.username) {
      console.error("Login failed: Username missing.");
      setErrorStatus("Please provide your username.");
      setLoading(false);
      return;
    } else if (!formData.password) {
      console.error("Login failed: Password missing.");
      setErrorStatus("Please provide your password.");
      setLoading(false);
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
          setErrorStatus("Login unsuccessful.");
          setLoading(false);
          return;
        }

        accountRequest
          .fetchAccountData(formData.username, token)
          .then((account) => {
            if (!account) {
              console.error("Login failed: No account found.");
              setErrorStatus("Login unsuccessful.");
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
        setErrorStatus("Login unsuccessful.");
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
            placeholder="Username/Email"
            label="Username/Email"
            value={formData.username}
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
          />
        </div>
        <div className="row mt-3">
          <Button label="Login" onClick={onLogin} />
        </div>
        {error ? (
          <div className="row">
            <div className="b13-mon text-center error-color py-2 px-3 mt-2">
              <FontAwesomeIcon
                icon="fa-solid fa-circle-exclamation"
                style={{ color: "#d65d5d" }}
              />
              <span className="mx-1"> {error}</span>
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
