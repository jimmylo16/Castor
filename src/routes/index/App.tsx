import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

function App() {
  const { logOut, signInState } = useAuth();
  return (
    <div className="App" data-testid="app">
      hello main page
      {signInState.user && <Button onClick={logOut}>LogOut</Button>}
    </div>
  );
}

export default App;
