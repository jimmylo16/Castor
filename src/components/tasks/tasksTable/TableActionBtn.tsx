import { Edit } from "@mui/icons-material";
import { Modal, TableCell } from "@mui/material";
import React, { useState } from "react";
import { TaskForm } from "../taskForm/TaskForm";
import { TableActionBtnProps } from "./tasksTable.interfaces";

export const TableActionBtn = ({ taskId, onEditTask }: TableActionBtnProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  console.log(taskId);

  const handleOnAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const task = {
      title: data.get("title") as string,
      description: data.get("description") as string,
      status: data.get("status") as string,
    };
    onEditTask(taskId, task);

    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TaskForm onSubmitTask={handleOnAddTask} taskId={taskId}></TaskForm>
      </Modal>
      <TableCell align="right">
        <Edit onClick={handleOpen}></Edit>
      </TableCell>
    </>
  );
};
