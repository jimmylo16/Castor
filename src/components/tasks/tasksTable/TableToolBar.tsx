import {
  Toolbar,
  alpha,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { TableToolbarProps } from "./tasksTable.interfaces";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected } = props;

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
          <Button type="submit" variant="contained">
            Add Task
          </Button>
          <span>Filter</span>
        </Box>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
