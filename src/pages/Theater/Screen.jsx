import React from "react";
import AddScreen from "../../components/Theater/Screens/AddScreen";
import ShowScreen from "../../components/Theater/Screens/ShowScreen";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Theater/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Theater/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

function Screen() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProSidebarProvider>
            <div className="app">
              <SideBar />
              <main className="content">
                <Topbar></Topbar>
                {/* <ShowScreen /> */}
                <AddScreen />
              </main>
            </div>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default Screen;
