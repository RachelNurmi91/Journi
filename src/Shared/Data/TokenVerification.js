import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Methods from "../Methods";

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return {};
  }
};

const TokenVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const handleHistoryChange = () => {
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
          Methods.logout();
          navigate("/login"); // Redirect to login page after logout
        }
      }
    };

    const removeTokenListen = navigate(handleHistoryChange);

    return removeTokenListen; // Return the cleanup function
  }, [navigate]);

  return null;
};

export default TokenVerification;
