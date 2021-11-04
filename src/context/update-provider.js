import { UpdateContext } from "./update-context";
import { useState } from "react";
import { useMemo } from "react";

const UpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(true);
  const value = useMemo(() => ({ update, setUpdate }), [update, setUpdate]);

  return <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>;
};

export { UpdateProvider };
