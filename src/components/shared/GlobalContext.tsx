import { ReactNode, createContext, useEffect, useState } from "react";
import { SetState } from "../../interfaces/common";

type Context = {
  userId: string;
  setUserId: SetState<string>;
};

export const GlobalContext = createContext<Context>({
  userId: "",
  setUserId: () => {},
});
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).uid : "";
    if (userId != "") {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (
      userId != "" &&
      (window.location.pathname === "/signUp" ||
        window.location.pathname === "/signIn")
    ) {
      window.location.href = "/";
    }
  }, [userId]);

  return (
    <GlobalContext.Provider value={{ setUserId, userId }}>
      {children}
    </GlobalContext.Provider>
  );
};
