import { Box } from "@mui/material";
export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface Data {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  edit: string;
}
export interface Task {
  title: string;
  description: string;
}

export interface UpdatedTask extends Task {
  status: string;
}

export interface TableToolbarProps {
  selected: string[];
  onAddTask: (task: Task) => void;
  onDeleteTasks: () => void;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export type Order = "asc" | "desc";

export type BoxRef = React.ElementRef<typeof Box>;
export interface TaskFormProps
  extends React.ComponentPropsWithoutRef<typeof Box> {
  onSubmitTask: (event: React.FormEvent<HTMLFormElement>) => void;
  taskId?: string;
}

export interface TableActionBtnProps {
  taskId: string;
  onEditTask: (taskId: string, updatedTask: UpdatedTask) => void;
}
