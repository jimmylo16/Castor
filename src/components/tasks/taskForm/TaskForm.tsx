import {
  Box,
  Button,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  gap: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
};

type BoxRef = React.ElementRef<typeof Box>;
interface TaskFormProps extends React.ComponentPropsWithoutRef<typeof Box> {
  onSubmitTask: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const TaskForm = React.forwardRef<BoxRef, TaskFormProps>(
  ({ onSubmitTask, ...props }, ref) => (
    <Box
      sx={style}
      ref={ref}
      component="form"
      onSubmit={onSubmitTask}
      {...props}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Task
      </Typography>
      <TextField
        required
        fullWidth
        id="title"
        label="Task title"
        name="title"
        autoComplete="title"
      />
      <TextField
        required
        fullWidth
        id="description"
        label="Task description"
        name="description"
        autoComplete="description"
      />
      <Button type="submit" variant="contained" sx={{ width: "50%" }}>
        Add
      </Button>
    </Box>
  )
);
