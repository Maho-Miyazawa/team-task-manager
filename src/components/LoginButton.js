import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const loginButtonClick = () => loginWithRedirect();

  return (
    <div>
      <button onClick={loginButtonClick}>ログイン</button>
    </div>
  );
};

export default LoginButton;
