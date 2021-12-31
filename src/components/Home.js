import LoginButton from "./LoginButton";

function Home() {
  const signup = (e) => {
    e.preventDefault();
    const data = `https://${process.env.REACT_APP_AUTH_DOMAIN}/authorize?scope=openid profile email&response_type=code&response_mode=query&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&redirect_uri=${window.location.origin}/signup&prompt=login&screen_hint=signup`;
    window.location.href = data;
  };

  return (
    <div>
      <h1>Team Task Manager</h1>
      <LoginButton />
      <button onClick={signup}>新規登録</button>
    </div>
  );
}

export default Home;
