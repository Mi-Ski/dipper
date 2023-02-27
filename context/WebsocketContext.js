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
  const [notifications, setNotifications] = React.useState([
    {
      message: "Post usunięty",
      color: "neon-accent2-opaque",
      time: 5000,
			key: Math.random()
    },
    {
      message: "Post dodany",
      color: "neon-accent-opaque",
      time: 5000,
			key: Math.random()
    },
  ]);


  return (
    <WebsocketContext.Provider
      value={{
        socket,
        setSocket,
        notifications,
				setNotifications
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
