import { ReactNode, createContext, useState } from "react";
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

  return (
    <GlobalContext.Provider value={{ setUserId, userId }}>
      {children}
    </GlobalContext.Provider>
  );
};
