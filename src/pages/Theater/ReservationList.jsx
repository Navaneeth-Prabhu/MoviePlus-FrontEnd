import React from 'react'
import Reserve from '../../components/Theater/Screens/Reservation/Reservation'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Theater/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Theater/Global/Sidebar";
import HistoryList from '../../components/Theater/Screens/ReservationHistory.jsx/HistoryList/index'
import { ProSidebarProvider } from "react-pro-sidebar";

function ReservationList() {
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
                  <HistoryList/>
                </main>
              </div>
            </ProSidebarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </>
    );
}

export default ReservationList