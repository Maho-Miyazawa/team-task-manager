import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const logoutButtonClick = () => logout({ returnTo: window.location.origin });

  return (
    <div>
      <button className="logout-button" onClick={logoutButtonClick}>
        ログアウト
      </button>
    </div>
  );
};

export default LogoutButton;
