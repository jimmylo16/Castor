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
  state: string;
  createdAt: Date;
}
export interface Task {
  title: string;
  description: string;
}

export interface TableToolbarProps {
  numSelected: number;
  onAddTask: (task: Task) => void;
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
