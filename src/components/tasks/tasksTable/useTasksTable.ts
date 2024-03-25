import React, { useCallback, useEffect, useState } from "react";
import { stableSort, getComparator } from "./tasksTable.helper";
import { Order, Data, Task, UpdatedTask } from "./tasksTable.interfaces";

import {
  query,
  collection,
  where,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useTasksTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<Data[]>([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const onAddTask = async (task: Task) => {
    setLoading(true);
    const userDoc = doc(db, "users", user?.uid as string);
    await addDoc(collection(db, "tasks"), {
      title: task.title,
      description: task.description,
      status: "pending",
      user: userDoc,
      createdAt: new Date(),
    });
    await fetchTasks();
  };

  const onEditTask = async (taskId: string, updatedTask: UpdatedTask) => {
    setLoading(true);
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { ...updatedTask });
    await fetchTasks();
    setLoading(false);
  };

  const onDeleteTasks = async () => {
    // delete from firestore
    setLoading(true);
    for (const id of selected) {
      await deleteDoc(doc(db, "tasks", id));
    }
    await fetchTasks();
    setSelected([]);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const userDoc = doc(db, "users", user?.uid as string);
    const q = query(collection(db, "tasks"), where("user", "==", userDoc));
    const docs = await getDocs(q);
    const tasks: Data[] = docs.docs.map((doc) => {
      const task = doc.data();
      return {
        id: doc.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt.toDate(),
        edit: "",
      };
    });
    setRows(tasks);
    setLoading(false);
  }, [user?.uid]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<Data>(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return {
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
    visibleRows,
    rows,
    onAddTask,
    loading,
    onDeleteTasks,
    onEditTask,
  };
};
