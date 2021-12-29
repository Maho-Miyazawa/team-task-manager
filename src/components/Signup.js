import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inputUserName, inputTeam } from "../slices/signupSlice";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const { user } = useAuth0();
  const [isCollationResult, setIsCollationResult] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.signup.userName);
  const team = useSelector((state) => state.signup.team);
  const navigate = useNavigate();

  const handleChangeUserName = (e) => {
    e.preventDefault();
    dispatch(inputUserName(e.target.value));
  };

  const handleChangeTeam = (e) => {
    e.preventDefault();
    dispatch(inputTeam(e.target.value));
  };

  const collateUserId = async () => {
    try {
      const collation = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                            CollateUserId(id: "${user.sub}")
                          }`,
        },
      });

      if (collation.data.data.CollateUserId) {
        setIsCollationResult(true);
        navigate("/my-page");
      } else {
        setIsCollationResult(false);
      }
      setIsDraw(true);
    } catch (err) {
      console.error(err);
    }
  };

  const createUserData = async (e) => {
    try {
      e.preventDefault();
      if (!isCollationResult) {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
                          createNewUser(
                              id: "${user.sub}"
                              teamId: ${team}
                              name: "${userName}"
                          )
                          {
                          id
                          }
                      }`,
          },
        });
        dispatch(inputUserName(""));
        dispatch(inputTeam(1));
        collateUserId();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    collateUserId();
  });

  return (
    <div>
      {isCollationResult && <Link to="/my-page">マイページへ</Link>}
      <>
        {!isCollationResult && isDraw && (
          <>
            <div>サインアップ</div>
            <form onSubmit={createUserData}>
              <input
                type="text"
                value={userName}
                onChange={handleChangeUserName}
              />
              <select value={team} onChange={handleChangeTeam}>
                {/* TODO データベースから取得して表示する */}
                <option value={1}>総務部</option>
                <option value={2}>人事部</option>
                <option value={3}>経理部</option>
                <option value={4}>広報部</option>
                <option value={5}>営業部</option>
                <option value={6}>企画部</option>
                <option value={7}>社長室</option>
              </select>
              <input type="submit" value="確定" />
            </form>
          </>
        )}
      </>
    </div>
  );
}

export default Signup;
