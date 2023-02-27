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
			type: "POST_REMOVED",
      message: "Post usunięty",
      color: "bg-border-dark",
      time: 5000,
      key: Math.random(),
			onClickAction: () => removeNotification(key),
    },
    // {
    //   message: "Pojawił się nowy wpis!",
		// 	type: "NEW_POST",
    //   color: "bg-brand-accent",
    //   time: 5000,
    //   key: Math.random(),
		// 	onClickAction: () => removeNotification(key),
    // },
  ]);

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
