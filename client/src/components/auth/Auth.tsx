import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import { useEffect } from "react";
import { axiosAPI } from "../../services/axiosAPI";
import { saveUser } from "../util/commonFunctions";

const Auth = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      axiosAPI
        .post("/user/create", user, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
        })
        .then((response) => {
          if (Object.keys(response?.data)?.length > 0) {
            saveUser(response?.data);
          }
        });
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isLoading && (
        <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>
      )}
    </>
  );
};

export default Auth;
