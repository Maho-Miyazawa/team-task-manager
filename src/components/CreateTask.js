import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";

function CreateTask() {
  const dispatch = useDispatch();
  const profileUserId = useSelector((state) => state.user.profileUserId);
  const [open, setOpen] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const modalOpen = () => setOpen(true);
  const modalClose = () => {
    setOpen(false);

    reset({ newTask: "", newPriorityId: 1 });
  };

  const getUser = () => dispatch(fetchUserData(profileUserId));

  async function addNewTask(data) {
    try {
      await axios({
        method: "POST",
        url: "/graphql",
        data: {
          query: `mutation {
                createNewTask(
                  user_id: "${profileUserId}"
                  task: "${data.newTask}"
                  priority_id: ${data.newPriorityId}
                )
                {
                  id
                }
              }`,
        },
      });

      getUser();
    } catch (err) {
      console.error(err);
    }
    reset({ newTask: "", newPriorityId: 1 });
  }

  return (
    <>
      <button onClick={modalOpen} className="create-task-button">
        タスク作成
      </button>
      <Modal open={open} onClose={modalClose}>
        <Box className="modal">
          <Typography className="modal-contents">
            <Typography className="modal-title-area">
              <label className="modal-title">新規作成</label>
            </Typography>
            <Typography>
              <label className="modal-label">タスク: </label>
              <input
                type="text"
                name="newTask"
                className="modal-input-task"
                {...register("newTask", { required: true })}
              />
              <Typography className="form-error-message">
                {errors.newTask && "＊必須項目です"}
              </Typography>
            </Typography>
            <Typography>
              <label className="modal-label">優先度: </label>
              <select
                className="modal-input-priority"
                name="newPriorityId"
                {...register("newPriorityId")}
              >
                <option value={1}>低い</option>
                <option value={2}>普通</option>
                <option value={3}>高い</option>
              </select>
            </Typography>
            <Typography className="modal-finish-button-area">
              <input
                className="modal-confirm-finish-button"
                type="submit"
                value="作成"
                onClick={handleSubmit(addNewTask)}
              />
              <button className="modal-close-button" onClick={modalClose}>
                閉じる
              </button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CreateTask;
