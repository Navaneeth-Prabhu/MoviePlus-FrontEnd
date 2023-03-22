import React from "react";
import AddShow from "../../components/Theater/Screens/AddShow";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Theater/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Theater/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

function AddTheaterscreen() {
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
                <AddShow />
              </main>
            </div>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default AddTheaterscreen;
