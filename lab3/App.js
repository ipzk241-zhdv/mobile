import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/Themes";
import MainTabs from "./components/MainTabs";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <NavigationContainer>
        <MainTabs toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
