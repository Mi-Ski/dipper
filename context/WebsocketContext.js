import React from "react";

const WebsocketContext = React.createContext({
  socket: null,
  setSocket: () => {},
  notifications: [],
  setNotifications: () => {},
});

export default WebsocketContext;

export function WebsocketProvider({ children }) {
  const [socket, setSocket] = React.useState(null);

  const [notifications, setNotifications] = React.useState([]);

  return (
    <WebsocketContext.Provider
      value={{
        socket,
        setSocket,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
