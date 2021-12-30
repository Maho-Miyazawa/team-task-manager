import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getMemberList } from "../slices/memberSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  setIsMyTask,
  setUserIdForTasks,
  setUserNmeForTasks,
} from "../slices/taskSlice";
import Header from "./Header";

function Member() {
  const dispatch = useDispatch();
  const profileUserId = useSelector((state) => state.user.profileUserId);
  const profileTeamId = useSelector((state) => state.user.profileTeamId);
  const memberList = useSelector((state) => state.member.teamMember);
  const navigate = useNavigate();

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

  const selectMember = (e, memberId, memberName) => {
    e.preventDefault();
    if (profileUserId === memberId) {
      dispatch(setIsMyTask(true));
    } else {
      dispatch(setIsMyTask(false));
    }
    dispatch(setUserIdForTasks(memberId));
    dispatch(setUserNmeForTasks(memberName));
    navigate("/member/tasks");
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
                  <button
                    onClick={(e) => selectMember(e, member.id, member.name)}
                  >
                    選択
                  </button>
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
