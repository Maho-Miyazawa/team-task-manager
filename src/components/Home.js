import LoginButton from "./LoginButton";
import topPageImg from "../images/img-top-page.png";

function Home() {
  const signup = (e) => {
    e.preventDefault();
    const data = `https://${process.env.REACT_APP_AUTH_DOMAIN}/authorize?scope=openid profile email&response_type=code&response_mode=query&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&redirect_uri=${window.location.origin}/signup&prompt=login&screen_hint=signup`;
    window.location.href = data;
  };

  return (
    <div className="top-page-wrapper">
      <div className="top-title-container">
        <div>
          <h1 className="top-title">
            Team <span className="top-title-decoration">Task</span> Manager
          </h1>
          <p className="top-title-description">
            Team Task
            Managerアプリは、会社の同じ部署のメンバーや、同じチームのメンバーとタスクの進捗度を共有することができるアプリです。
            <br />
            マイページで、自分のタスク管理ができるのはもちろんのこと、別のページでは、チームメンバーの現在のタスクの状況を確認することができます。
            <br />
            さあ、チームコミュニケーションを活発化しましょう！
          </p>
          <div className="top-page-login-signup-area">
            <LoginButton />
            <button className="signup-button" onClick={signup}>
              新規登録
            </button>
          </div>
        </div>
      </div>
      <div className="top-page-right-container">
        <div className="top-page-img-area">
          <img
            className="top-page-img"
            src={topPageImg}
            alt="Team Task Managerのイメージ画像"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
