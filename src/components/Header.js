import LogoutButton from "./LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {
  setProfileUserName,
  setProfileTeamId,
  setProfileTeamName,
  setProfileUserId,
} from "../slices/userSlice";
import axios from "axios";

function Header() {
  const dispatch = useDispatch();
  const profileUserName = useSelector((state) => state.user.profileUserName);
  const profileTeamName = useSelector((state) => state.user.profileTeamName);
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
      dispatch(setProfileTeamId(Number(collationData.team_id)));
      dispatch(setProfileUserName(collationData.name));
      dispatch(setProfileTeamName(collationData.team.name));
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
      <div>
        <div>{profileUserName}</div>
        <div>{profileTeamName}</div>
      </div>
      <LogoutButton />
    </div>
  );
}

export default Header;
