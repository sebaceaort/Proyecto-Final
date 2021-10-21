import { UserContext } from "./user-context";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const refreshData = JSON.parse(window.localStorage.getItem("user"));
    setUser(refreshData);
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { ContextProvider };
