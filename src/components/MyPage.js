import Header from "./Header";
import Tasks from "./Tasks";

function MyPage() {
  return (
    <div>
      <Header />
      <div className="tasks-container">
        <Tasks />
      </div>
    </div>
  );
}

export default MyPage;
