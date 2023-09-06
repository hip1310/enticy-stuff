import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";
import { clearAllData } from "../util/commonFunctions";

const LoginButton = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  return (
    <p
      className="loginButton"
      onClick={() => {
        if (!isLoading && !isAuthenticated) {
          clearAllData();
          loginWithRedirect();
        }
      }}
    >
      Log In | Sign Up
    </p>
  );
};

export default LoginButton;
