import React from "react";

const ThemeContext = React.createContext({
  dark: true,
  toggleDarkContext: () => {},
});

export default ThemeContext;

export function ThemeProvider(props) {
  const [darkContext, setDarkContext] = React.useState(true);
	const toggleDarkContext = () => {
		setDarkContext( current => !current)
	};

  return (
    <ThemeContext.Provider
      value={{
        darkContext,
        toggleDarkContext,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
