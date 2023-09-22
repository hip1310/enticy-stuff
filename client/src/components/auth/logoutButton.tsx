import { useAuth0 } from "@auth0/auth0-react";
import "./auth.css";
import { clearAllData } from "../util/commonFunctions";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <a
      href="javascript:void(0)"
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
    </a>
  );
};

export default LogoutButton;
