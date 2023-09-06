import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";
import { clearAllData } from "../util/commonFunctions";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <p
      className="logoutButton"
      onClick={() => {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
        clearAllData();
      }}
    >
      Log Out
    </p>
  );
};

export default LogoutButton;
