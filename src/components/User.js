import "../App.css";
import { useSelector } from "react-redux";

function User() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <>
      {userData ? (
        <div>
          <div>ID: {userData.id}</div>
          <div>Name: {userData.name}</div>
        </div>
      ) : (
        <div>存在しません</div>
      )}
    </>
  );
}

export default User;
