import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";

const LoginButton = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  return (
    <p
      className="loginButton"
      onClick={() => !isLoading && !isAuthenticated && loginWithRedirect()}
    >
      Log In | Sign Up
    </p>
  );
};

export default LoginButton;
