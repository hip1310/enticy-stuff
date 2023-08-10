import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";

const LoginButton = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  return (
    <button className="loginButton" onClick={() => !isLoading && !isAuthenticated && loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
