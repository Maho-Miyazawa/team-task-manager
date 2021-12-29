import { useSelector, useDispatch } from "react-redux";
import { inputUserName, inputTeam } from "../slices/signupSlice";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Signup() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.signup.userName);
  const team = useSelector((state) => state.signup.team);
  const { user } = useAuth0();

  function createUserData() {
    console.log("Sign UP!!!!");
  }

  function handleChangeUserName(e) {
    e.preventDefault();
    dispatch(inputUserName(e.target.value));
  }

  function handleChangeTeam(e) {
    e.preventDefault();
    dispatch(inputTeam(e.target.value));
  }

  async function collateUserId(e) {
    try {
      e.preventDefault();
      const collationResult = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
            CollateUserId(id: "${user.sub}")
           }`,
        },
      });

      if (collationResult.data.data.CollateUserId) {
        console.log("登録されています!");
      } else {
        console.log("登録されていません!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div>サインアップ</div>
      <form onSubmit={createUserData}>
        <input type="text" value={userName} onChange={handleChangeUserName} />
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
        <button onClick={collateUserId}>照合</button>
        <input type="submit" value="確定" />
      </form>
    </div>
  );
}

export default Signup;
