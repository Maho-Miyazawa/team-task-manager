import LogoutButton from "./LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  setProfileUserName,
  setProfileTeamId,
  setProfileUserId,
} from "../slices/userSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const dispatch = useDispatch();
  const profileUserName = useSelector((state) => state.user.profileUserName);
  const { user } = useAuth0();

  const setProfileData = async () => {
    try {
      const collation = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                    CollateUserId(id: "${user.sub}") {
                        team_id
                        name
                        team {
                            name
                        }
                    }
                }`,
        },
      });

      let collationData = collation.data.data.CollateUserId;

      dispatch(setProfileUserId(user.sub));

      if (collationData) {
        dispatch(setProfileTeamId(Number(collationData.team_id)));
        dispatch(setProfileUserName(collationData.name));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData();
    }
  });

  return (
    <div className="header">
      <Link to="/my-page">
        <div className="header-left-area">
          <FontAwesomeIcon icon={faAddressCard} className="header-icon" />
          <div className="header-profile-name">{profileUserName}</div>
        </div>
      </Link>
      {/* <div>{profileTeamName}</div> */}
      <LogoutButton />
    </div>
  );
}

export default Header;
