import React, { useState } from "react";

// const UserContext = React.createContext();
// export default UserContext;

const UserContext = React.createContext({
  isSignedIn: "Yes",
  setSignIn: () => undefined,
});

export default UserContext;

export const UserProvider = ({ children }) => {
  const [isSignedIn, setSignIn] = useState(null);

  return (
    <UserContext.Provider value={{ isSignedIn, setSignIn }}>
      {children}
    </UserContext.Provider>
  );
};
