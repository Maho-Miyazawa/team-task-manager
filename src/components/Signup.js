import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "./Header";
import "../App.css";

function Signup() {
  const { user } = useAuth0();
  const [isCollationResult, setIsCollationResult] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const loginButtonClick = () => loginWithRedirect();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

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

      if (collationData) {
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

  const createUserData = async (data) => {
    try {
      if (!isCollationResult) {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
                          createNewUser(
                              id: "${user.sub}"
                              teamId: ${data.team}
                              name: "${data.userName}"
                          )
                          {
                          id
                          }
                      }`,
          },
        });

        collateUserId();
      }
    } catch (err) {
      console.error(err);
    }
    reset();
  };

  useEffect(() => {
    if (user) {
      collateUserId();
    }
  });

  return (
    <div>
      <Header />
      {!isDraw && (
        <div className="account-setting-container">
          <div className="account-setting-container-contents">
            <p className="account-setting-description">
              はじめに
              <span className="account-setting-description-decoration">
                アカウント
              </span>
              の設定を行います。
              <br />
              アカウント設定ボタンをクリックしてください。
            </p>
            <button
              className="account-setting-button"
              onClick={(e) => {
                e.preventDefault();
                loginButtonClick();
              }}
            >
              アカウント設定
            </button>
          </div>
        </div>
      )}
      {isCollationResult && <Link to="/my-page">マイページへ</Link>}
      <>
        {!isCollationResult && isDraw && (
          <div className="signup-container">
            <div className="signup-container-contents">
              <form onSubmit={handleSubmit(createUserData)}>
                <div className="signup-form-parts">
                  <div className="signup-title">アカウント設定</div>
                  <div className="signup-input-name-area">
                    <label className="signup-input-name-label">名前: </label>
                    <input
                      type="text"
                      className="signup-input-name"
                      name="userName"
                      {...register("userName", { required: true })}
                    />
                    <p className="form-error-message">
                      {errors.userName && "＊必須項目です"}
                    </p>
                  </div>
                  <div className="signup-input-team-area">
                    <label className="signup-input-team-label">
                      チーム名:{" "}
                    </label>
                    <select
                      className="signup-input-team"
                      name="team"
                      {...register("team")}
                    >
                      {/* TODO データベースから取得して表示する */}
                      <option value={1}>総務部</option>
                      <option value={2}>人事部</option>
                      <option value={3}>経理部</option>
                      <option value={4}>広報部</option>
                      <option value={5}>営業部</option>
                      <option value={6}>企画部</option>
                      <option value={7}>社長室</option>
                    </select>
                  </div>
                  <input
                    className="signup-confirm-button"
                    type="submit"
                    value="確定"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Signup;
