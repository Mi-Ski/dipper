
import React from "react";

const RouteContext = React.createContext({
  pingClicked: false,
  setPingClicked: () => {},
});

export default RouteContext;

export function RouteProvider(props) {
  const [pingClicked, setPingClicked] = React.useState(false);


  return (
    <RouteContext.Provider
      value={{
        pingClicked,
        setPingClicked,
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
