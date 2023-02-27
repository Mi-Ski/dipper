import React from "react";

const WebsocketContext = React.createContext({
  socket: null,
  setSocket: () => {},
	notificationMsg: null,
	setNotificationMsg: () => {},
});

export default WebsocketContext;

export function WebsocketProvider({children}) {
  const [socket, setSocket] = React.useState(null);
	const [notificationMsg, setNotificationMsg] = React.useState(null);

  return (
    <WebsocketContext.Provider
      value={{
        socket,
        setSocket,
				notificationMsg,
				setNotificationMsg
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
