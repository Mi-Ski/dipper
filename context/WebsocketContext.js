import React from "react";

const WebsocketContext = React.createContext({
  socket: null,
  setSocket: () => {},
});

export default WebsocketContext;

export function WebsocketProvider({children}) {
  const [socket, setSocket] = React.useState(null);

  return (
    <WebsocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
