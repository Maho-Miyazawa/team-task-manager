import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getMemberList } from "../slices/memberSlice";
import { Link } from "react-router-dom";
import Header from "./Header";

function Member() {
  const dispatch = useDispatch();
  const profileTeamId = useSelector((state) => state.user.profileTeamId);
  const memberList = useSelector((state) => state.member.teamMember);

  const getMember = async () => {
    try {
      const member = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                    Member(teamId: ${profileTeamId}) {
                        id
                        team_id
                        name
                        team {
                            name
                        }
                    }
                }`,
        },
      });
      dispatch(getMemberList(member.data.data.Member));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMember();
  });

  const selectMember = (e) => {
    e.preventDefault();
    console.log("選択");
  };

  return (
    <div>
      <Header />
      <Link to="/my-page">
        <button>マイページへ</button>
      </Link>
      <table>
        <thead>
          <tr>
            <td>名前</td>
            <td>チーム名</td>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member) => {
            return (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.team.name}</td>
                <td>
                  <button onClick={selectMember}>選択</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Member;
