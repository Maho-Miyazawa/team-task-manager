import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

function Header() {
  const profileUserName = useSelector((state) => state.signup.profileUserName);
  const profileTeamName = useSelector((state) => state.signup.profileTeamName);

  return (
    <div className="header">
      <div>
        <div>{profileUserName}</div>
        <div>{profileTeamName}</div>
      </div>
      <LogoutButton />
    </div>
  );
}

export default Header;
