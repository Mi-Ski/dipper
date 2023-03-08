import React, {useState, useEffect} from "react";

const ThemeContext = React.createContext({
  isDarkMode: true,
  toggleThemeHandler: () => {},
});

export default ThemeContext;

export function ThemeProvider(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty() {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler() {
    if (isLocalStorageEmpty()) {
      localStorage.setItem("isDarkTheme", `true`);
      document.querySelector("body").classList.add("dark");
      setIsDarkTheme(true);
    } else {
      const isDarkTheme = JSON.parse(
        localStorage.getItem("isDarkTheme")
      );
      isDarkTheme &&
        document.querySelector("body").classList.add("dark");
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler() {
    const isDarkTheme = JSON.parse(
      localStorage.getItem("isDarkTheme")
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  function toggleDarkClassToBody() {
    document.querySelector("body").classList.toggle("dark");
  }

  function setValueToLocalStorage() {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleThemeHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
