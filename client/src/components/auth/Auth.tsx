import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      {!isLoading && (
        <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>
      )}
    </>
  );
};

export default Auth;
