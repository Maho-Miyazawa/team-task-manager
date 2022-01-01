import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faStar,
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";

function OneTask(props) {
  const dispatch = useDispatch();
  const isMyTask = useSelector((state) => state.task.isMyTask);
  const userIdForTask = useSelector((state) => state.task.userIdForTask);
  const [originTask, setOriginTask] = useState(props.task);
  const [originPriorityId, setOriginPriorityId] = useState(props.priorityId);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [open, setOpen] = useState(false);

  const modalOpen = async () => {
    setOpen(true);
    try {
      const oneTask = await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `query {
                        OneTask(taskId: ${props.taskId}) {
                        task
                        priority_id
                        }
                    }`,
        },
      });
      setOriginTask(oneTask.data.data.OneTask.task);
      setOriginPriorityId(oneTask.data.data.OneTask.priority_id);
    } catch (err) {
      console.error(err);
    }
  };
  const modalClose = () => {
    setOpen(false);

    reset({ currentTask: props.task, currentPriorityId: props.priorityId });
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
    const priorityStars = [];

    for (let i = 0; i < Number(num); i++) {
      priorityStars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="priority-tag" />
      );
    }

    return priorityStars.map((star) => star);
  }

  const editButtonClick = (e) => {
    e.preventDefault();

    modalOpen();
  };

  async function updateTaskButtonClick(data) {
    try {
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
            updateTask(
                taskId: ${props.taskId}
                task: "${data.currentTask}"
                priority_id: ${data.currentPriorityId}
            )
            {
              id
            }
           }`,
        },
      });
      getUser();
      reset({
        currentTask: data.currentTask,
        currentPriorityId: data.currentPriorityId,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="task" key={props.taskId}>
        <div>{props.task}</div>

        <div>
          <>{Priority(props.priorityId)}</>
          <div className="task-handle-button-area">
            <div className="task-move-button-area">
              <>
                {isMyTask && props.progressId !== 1 && (
                  <FontAwesomeIcon
                    icon={faCaretSquareLeft}
                    className="task-move-button task-move-button-left"
                    onClick={() =>
                      progressChange(-1, props.taskId, props.progressId)
                    }
                  />
                )}
              </>
              <>
                {isMyTask && props.progressId !== 3 && (
                  <FontAwesomeIcon
                    icon={faCaretSquareRight}
                    className="task-move-button task-move-button-right"
                    onClick={() =>
                      progressChange(1, props.taskId, props.progressId)
                    }
                  />
                )}
              </>
            </div>
            <div className="task-edit-delete-area">
              {isMyTask && (
                <>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={editButtonClick}
                    className="task-edit-delete-button task-edit-button"
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={taskDeleteButtonClick}
                    className="task-edit-delete-button task-delete-button"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        <Modal open={open} onClose={modalClose}>
          <Box className="modal">
            <Typography className="modal-contents">
              <Typography className="modal-title-area">
                <label className="modal-title">編集</label>
              </Typography>
              <Typography>
                <label className="modal-label">タスク: </label>
                <input
                  type="text"
                  name="currentTask"
                  defaultValue={originTask}
                  className="modal-input-task"
                  {...register("currentTask", { required: true })}
                />
                <Typography className="form-error-message">
                  {errors.currentTask && "＊必須項目です"}
                </Typography>
              </Typography>
              <Typography>
                <label className="modal-label">優先度: </label>
                <select
                  className="modal-input-priority"
                  name="currentPriorityId"
                  defaultValue={originPriorityId}
                  {...register("currentPriorityId")}
                >
                  <option value={1}>低い</option>
                  <option value={2}>普通</option>
                  <option value={3}>高い</option>
                </select>
              </Typography>
              <Typography className="modal-finish-button-area">
                <input
                  type="submit"
                  className="modal-confirm-finish-button"
                  value="更新"
                  onClick={handleSubmit(updateTaskButtonClick)}
                />
                <button className="modal-close-button" onClick={modalClose}>
                  キャンセル
                </button>
              </Typography>
            </Typography>
          </Box>
        </Modal>
      </>
    </>
  );
}

export default OneTask;
