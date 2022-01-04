import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getMemberList } from "../slices/memberSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  setIsMyTask,
  setUserIdForTasks,
  setUserNameForTasks,
} from "../slices/taskSlice";
import { setMemberTeamId } from "../slices/memberSlice";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Member() {
  const dispatch = useDispatch();
  const profileUserId = useSelector((state) => state.user.profileUserId);
  const profileTeamId = useSelector((state) => state.user.profileTeamId);
  const memberList = useSelector((state) => state.member.teamMember);
  const memberTeamId = useSelector((state) => state.member.memberTeamId);
  const navigate = useNavigate();

  const getMember = async () => {
    try {
      let teamId;
      if (memberTeamId) {
        teamId = memberTeamId;
      } else {
        dispatch(setMemberTeamId(profileTeamId));
        teamId = profileTeamId;
      }

      const member = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                    Member(teamId: ${teamId}) {
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

  const changeDisplayTeam = (e) => {
    e.preventDefault();
    dispatch(setMemberTeamId(e.target.value));
    getMember();
  };

  useEffect(() => {
    getMember();
  });

  const selectMember = (e, memberId, memberName, memberTeamId) => {
    e.preventDefault();
    dispatch(setUserIdForTasks(memberId));
    dispatch(setUserNameForTasks(memberName));
    dispatch(setMemberTeamId(memberTeamId));

    if (profileUserId === memberId) {
      dispatch(setIsMyTask(true));
      navigate("/my-page");
    } else {
      dispatch(setIsMyTask(false));
      navigate(`/member/${memberId}/${memberName}/${memberTeamId}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="member-page-container">
        <div className="member-page-container-button-area">
          <Link to="/my-page">
            <button className="go-my-page-button">マイページへ</button>
          </Link>
          <div>
            <select
              className="member-page-team-select"
              value={memberTeamId}
              onChange={changeDisplayTeam}
            >
              <option value={1}>総務部</option>
              <option value={2}>人事部</option>
              <option value={3}>経理部</option>
              <option value={4}>広報部</option>
              <option value={5}>営業部</option>
              <option value={6}>企画部</option>
              <option value={7}>社長室</option>
            </select>
          </div>
        </div>
        <div className="member-table-container">
          <table className="member-table">
            <thead>
              <tr>
                <td className="member-table-td member-table-head member-table-td-person"></td>
                <td className="member-table-td member-table-head member-table-td-name">
                  名前
                </td>
                <td className="member-table-td member-table-head member-table-td-team">
                  チーム名
                </td>
                <td className="member-table-td member-table-head member-table-td-button">
                  メンバー選択
                </td>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member) => {
                return (
                  <tr
                    className="member-table-tr"
                    key={member.id}
                    onClick={(e) =>
                      selectMember(e, member.id, member.name, member.team_id)
                    }
                  >
                    <td className="member-table-td member-table-td-person">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="member-table-image-person"
                      />
                    </td>
                    <td className="member-table-td member-table-td-name">
                      {member.name}
                    </td>
                    <td className="member-table-td member-table-td-team">
                      {member.team.name}
                    </td>
                    <td className="member-table-td member-table-td-button">
                      <button
                        className="member-select-button"
                        onClick={(e) =>
                          selectMember(
                            e,
                            member.id,
                            member.name,
                            member.team_id
                          )
                        }
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
      </div>
    </div>
  );
}

export default Member;
