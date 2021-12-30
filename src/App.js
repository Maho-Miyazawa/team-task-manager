import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import MyPage from "./components/MyPage";
import Home from "./components/Home";
import Member from "./components/Member";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="my-page" element={<MyPage />} />
        <Route path="member" element={<Member />} />
        {/* <Route path="member/tasks" element={<MemberTasks />} /> */}
      </Routes>
    </div>
  );
}

export default App;
