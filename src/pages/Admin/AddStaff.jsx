import React from 'react'

import StaffTable from '../../components/Admin/Staff/Stafftable'
import Somestaff from '../../components/Admin/Staff/StaffAdd'

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Admin/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Admin/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Container } from '@mui/system'



function AddStaff() {
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
              <Container>
          
              <Somestaff/>
              <StaffTable/>
          </Container>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AddStaff