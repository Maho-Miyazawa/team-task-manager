import "../App.css";

function OneTask(props) {
  function Priority(num) {
    const obj = {
      1: "priority-tag-low",
      2: "priority-tag-middle",
      3: "priority-tag-high",
    };

    let className = "";
    for (const key in obj) {
      if (Number(num) === Number(key)) {
        className = obj[key];
        break;
      }
    }

    return <div className={className}>優先度: {props.priorityLevel}</div>;
  }

  return (
    <div className="task" key={props.taskId}>
      <div>{props.task}</div>
      <>{Priority(props.priorityId)}</>
    </div>
  );
}

export default OneTask;
