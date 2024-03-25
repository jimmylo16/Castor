import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import EnhancedTable from "../../components/tasks/tasksTable/TasksTable";

function App() {
  const { logOut, signInState } = useAuth();
  return (
    <div className="App" data-testid="app">
      {signInState.user && <Button onClick={logOut}>LogOut</Button>}
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Typography
          sx={{ textAlign: "center" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Todo List
        </Typography>
        <EnhancedTable />
      </Container>
    </div>
  );
}

export default App;
