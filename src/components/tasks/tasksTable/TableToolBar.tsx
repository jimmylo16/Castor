import {
  Toolbar,
  alpha,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Modal,
} from "@mui/material";
import { TableToolbarProps } from "./tasksTable.interfaces";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { TaskForm } from "../taskForm/TaskForm";

export const TableToolbar = ({
  selected,
  onDeleteTasks,
  onAddTask,
}: TableToolbarProps) => {
  const numSelected = selected.length;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const task = {
      title: data.get("title") as string,
      description: data.get("description") as string,
    };
    onAddTask(task);
    handleClose();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TaskForm onSubmitTask={handleOnAddTask}></TaskForm>
      </Modal>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button type="submit" variant="contained" onClick={handleOpen}>
            Add Task
          </Button>
        </Box>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteTasks}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
