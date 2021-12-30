import LogoutButton from "./LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setProfileUserName, setProfileTeamName } from "../slices/signupSlice";
import axios from "axios";

function Header() {
  const dispatch = useDispatch();
  const profileUserName = useSelector((state) => state.signup.profileUserName);
  const profileTeamName = useSelector((state) => state.signup.profileTeamName);
  const { user } = useAuth0();

  const collateUserId = async () => {
    try {
      const collation = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                    CollateUserId(id: "${user.sub}") {
                        name
                        team {
                            name
                        }
                    }
                }`,
        },
      });

      let collationData = collation.data.data.CollateUserId;

      dispatch(setProfileUserName(collationData.name));
      dispatch(setProfileTeamName(collationData.team.name));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    collateUserId();
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
