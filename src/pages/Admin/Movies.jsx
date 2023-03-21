import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Admin/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Admin/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Movies from '../../components/Admin/Movies/MovieList';

function Movie() {
    const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProSidebarProvider>
        <div className="app">
          <SideBar />
          <main className="content">
            <Topbar></Topbar>
            <Movies />
          </main>
        </div>
      </ProSidebarProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default Movie