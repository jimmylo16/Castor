import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import EnhancedTable from "../../components/tasks/tasksTable/TasksTable";
import { Logout } from "@mui/icons-material";

function App() {
  const { logOut, signInState } = useAuth();
  return (
    <div className="App" data-testid="app">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ textAlign: "center" }}
            color="inherit"
            variant="h3"
            component="h1"
          >
            Todo App
          </Typography>
          {signInState.user && (
            <Logout style={{ cursor: "pointer" }} onClick={logOut}>
              LogOut
            </Logout>
          )}
        </Box>
        <EnhancedTable />
      </Container>
    </div>
  );
}

export default App;
