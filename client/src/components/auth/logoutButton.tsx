import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <p
      className="logoutButton"
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }
    >
      Log Out
    </p>
  );
};

export default LogoutButton;
