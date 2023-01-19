import { useState, createContext, useContext } from "react";

const UserContext = createContext();
const SetUserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useSetUser() {
  return useContext(SetUserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {props.children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
