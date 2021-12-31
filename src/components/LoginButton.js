import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const loginButtonClick = () => loginWithRedirect();

  return (
    <button className="login-button" onClick={loginButtonClick}>
      ログイン
    </button>
  );
};

export default LoginButton;
