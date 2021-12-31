import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import { editTask, editPriorityId } from "../slices/taskSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import imgArrowRight from "../images/img-arrow-right.png";
import imgArrowLeft from "../images/img-arrow-left.png";

function OneTask(props) {
  const dispatch = useDispatch();
  const isMyTask = useSelector((state) => state.task.isMyTask);
  const userIdForTask = useSelector((state) => state.task.userIdForTask);
  const currentTask = useSelector((state) => state.task.currentTask);
  const currentPriorityId = useSelector(
    (state) => state.task.currentPriorityId
  );
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => {
    setOpen(false);
    dispatch(editTask(""));
    dispatch(editPriorityId("1"));
  };

  const getUser = () => dispatch(fetchUserData(userIdForTask));

  async function progressChange(addNum, taskId, progressId) {
    try {
      let newProgressId = progressId + addNum;
      if (newProgressId >= 1 && newProgressId <= 3) {
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
                  updateProgress(taskId: ${taskId}, afterProgressNum: ${newProgressId}) {
                    id
                  }
                }`,
          },
        });

        getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function taskDeleteButtonClick(e) {
    try {
      if (
        window.confirm(`タスク「${props.task}」を削除します。よろしいですか？`)
      ) {
        e.preventDefault();
        await axios({
          method: "POST",
          url: "/graphql",
          data: {
            query: `mutation {
            deleteTask(
                taskId: ${props.taskId}
            )
            {
              id
            }
            }`,
          },
        });
        getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

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

  const editButtonClick = (e) => {
    e.preventDefault();
    dispatch(editTask(props.task));
    dispatch(editPriorityId(props.priorityId));
    modalOpen();
  };

  async function updateTaskButtonClick(e) {
    try {
      e.preventDefault();
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
            updateTask(
                taskId: ${props.taskId}
                task: "${currentTask}"
                priority_id: ${currentPriorityId}
            )
            {
              id
            }
           }`,
        },
      });
      getUser();
      modalClose();
    } catch (err) {
      console.error(err);
    }
  }

  const updateCancel = (e) => {
    e.preventDefault();
    modalClose();
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    dispatch(editTask(e.target.value));
  };

  const handleEditPriority = (e) => {
    e.preventDefault();
    dispatch(editPriorityId(Number(e.target.value)));
  };

  return (
    <>
      <div className="task" key={props.taskId}>
        <div>{props.task}</div>
        <>{Priority(props.priorityId)}</>
        <>
          {isMyTask && props.progressId !== 1 && (
            <img
              src={imgArrowLeft}
              alt="左矢印"
              className="task-move-button task-move-button-left"
              onClick={() => progressChange(-1, props.taskId, props.progressId)}
            />
          )}
        </>
        <>
          {isMyTask && props.progressId !== 3 && (
            <img
              src={imgArrowRight}
              alt="右矢印"
              className="task-move-button task-move-button-right"
              onClick={() => progressChange(1, props.taskId, props.progressId)}
            />
          )}
        </>
        {isMyTask && (
          <>
            <button onClick={editButtonClick}>編集</button>
            <button onClick={taskDeleteButtonClick}>削除</button>
          </>
        )}
      </div>
      <>
        <Modal open={open} onClose={modalClose}>
          <Box className="modal">
            <Typography>タスク編集</Typography>
            <>
              <input
                type="text"
                value={currentTask}
                onChange={handleEditTask}
              />
              <select value={currentPriorityId} onChange={handleEditPriority}>
                <option value={1}>低い</option>
                <option value={2}>普通</option>
                <option value={3}>高い</option>
              </select>
              <button onClick={updateCancel}>キャンセル</button>
              <input
                type="submit"
                value="更新"
                onClick={updateTaskButtonClick}
              />
              <button onClick={modalClose}>閉じる</button>
            </>
          </Box>
        </Modal>
      </>
    </>
  );
}

export default OneTask;
