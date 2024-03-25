import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import { style } from "../tasksTable/tasksTable.helper";
import { BoxRef, TaskFormProps } from "../tasksTable/tasksTable.interfaces";

import { useTaskForm } from "./useTaskForm";

export const TaskForm = React.forwardRef<BoxRef, TaskFormProps>(
  ({ onSubmitTask, taskId, ...props }, ref) => {
    const { formValues, onFormInputChange } = useTaskForm(taskId);

    return (
      <Box
        sx={style}
        ref={ref}
        component="form"
        onSubmit={onSubmitTask}
        {...props}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {taskId ? "Edit Task" : "Add Task"}
        </Typography>
        <TextField
          required
          fullWidth
          id="title"
          label="Task title"
          name="title"
          autoComplete="title"
          value={formValues.title}
          onChange={(e) => onFormInputChange("title", e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="description"
          label="Task description"
          name="description"
          autoComplete="description"
          value={formValues.description}
          onChange={(e) => onFormInputChange("description", e.target.value)}
        />
        {taskId && (
          <FormControl fullWidth>
            <InputLabel id="status">Task status</InputLabel>
            <Select
              fullWidth
              id="status"
              label="Task status"
              name="status"
              autoComplete="status"
              value={formValues.status}
              onChange={(e) => onFormInputChange("status", e.target.value)}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        )}
        <Button type="submit" variant="contained" sx={{ width: "50%" }}>
          {taskId ? "Edit" : "Add"}
        </Button>
      </Box>
    );
  }
);
