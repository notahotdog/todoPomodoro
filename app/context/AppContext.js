import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <AppContext.Provider value={{ counter, setCounter }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
