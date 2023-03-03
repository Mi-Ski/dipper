
import React from "react";

const RouteContext = React.createContext({
  currentRoute: null,
  setCurrentRoute: () => {},
});

export default RouteContext;

export function RouteProvider(props) {
  const [currentRoute, setCurrentRoute] = React.useState(null);

  return (
    <RouteContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
