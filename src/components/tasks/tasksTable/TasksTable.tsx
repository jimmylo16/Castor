import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  CircularProgress,
} from "@mui/material";

import { useTasksTable } from "./useTasksTable";
import { TableToolbar } from "./TableToolBar";
import { TableHead } from "./TableHead";
import { TableActionBtn } from "./TableActionBtn";

export default function EnhancedTable() {
  const {
    selected,
    order,
    orderBy,
    handleSelectAllClick,
    handleRequestSort,
    rows,
    visibleRows,
    isSelected,
    handleClick,
    emptyRows,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    onAddTask,
    loading,
    onDeleteTasks,
    onEditTask,
  } = useTasksTable();
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar
          selected={selected}
          onAddTask={onAddTask}
          onDeleteTasks={onDeleteTasks}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody style={{ textAlign: "center" }}>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.length > 0 &&
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={() => handleClick(row.id)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="right">
                        {row.createdAt.toISOString()}
                      </TableCell>
                      <TableActionBtn
                        taskId={row.id}
                        onEditTask={onEditTask}
                      ></TableActionBtn>
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
