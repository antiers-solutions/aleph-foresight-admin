import { createContext, useContext, useEffect, useState } from "react";

export const MyLoggedInContext = createContext();

export const LoggedInProvider = ({ children }) => {
  const [loggedInValue, setLoggedInValue] = useState("");
  const address = localStorage.getItem("isLogged");

  useEffect(() => {
    if (address?.length) {
      setLoggedInValue(address);
    }
  }, [address]);

  return (
    <MyLoggedInContext.Provider value={{ loggedInValue, setLoggedInValue }}>
      {children}
    </MyLoggedInContext.Provider>
  );
};

export const useIsLoggedIn = () => useContext(MyLoggedInContext);
