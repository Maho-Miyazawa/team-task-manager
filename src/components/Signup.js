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
              ????????????
              <span className="account-setting-description-decoration">
                ???????????????
              </span>
              ???????????????????????????
              <br />
              ??????????????????????????????????????????????????????????????????
            </p>
            <button
              className="account-setting-button"
              onClick={(e) => {
                e.preventDefault();
                loginButtonClick();
              }}
            >
              ?????????????????????
            </button>
          </div>
        </div>
      )}
      {isCollationResult && <Link to="/my-page">??????????????????</Link>}
      <>
        {!isCollationResult && isDraw && (
          <div className="signup-container">
            <div className="signup-container-contents">
              <form onSubmit={handleSubmit(createUserData)}>
                <div className="signup-form-parts">
                  <div className="signup-title">?????????????????????</div>
                  <div className="signup-input-name-area">
                    <label className="signup-input-name-label">??????: </label>
                    <input
                      type="text"
                      className="signup-input-name"
                      name="userName"
                      {...register("userName", { required: true })}
                    />
                    <p className="form-error-message">
                      {errors.userName && "?????????????????????"}
                    </p>
                  </div>
                  <div className="signup-input-team-area">
                    <label className="signup-input-team-label">
                      ????????????:{" "}
                    </label>
                    <select
                      className="signup-input-team"
                      name="team"
                      {...register("team")}
                    >
                      {/* TODO ???????????????????????????????????????????????? */}
                      <option value={1}>?????????</option>
                      <option value={2}>?????????</option>
                      <option value={3}>?????????</option>
                      <option value={4}>?????????</option>
                      <option value={5}>?????????</option>
                      <option value={6}>?????????</option>
                      <option value={7}>?????????</option>
                    </select>
                  </div>
                  <input
                    className="signup-confirm-button"
                    type="submit"
                    value="??????"
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
