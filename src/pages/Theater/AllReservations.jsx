import React from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Theater/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Theater/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import ReservationHistory from '../../components/Theater/Screens/ReservationHistory.jsx/Reservation';

function AllReservation() {
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
                  <ReservationHistory />
                </main>
              </div>
            </ProSidebarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </>
    );
}

export default AllReservation