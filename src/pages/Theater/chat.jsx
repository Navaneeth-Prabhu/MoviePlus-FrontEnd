import React, { useEffect, useState, useRef } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Theater/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Theater/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import styled from "styled-components";
import { TheaterInstance } from "../../axios/axios";
import Contacts from "../../components/Theater/Chat/Contacts/contacts";
import Welcome from "../../components/Theater/Chat/welcome";
import ChatContainer from "../../components/Theater/Chat/Container/chatContainer";
import jwt_decode from "jwt-decode";
import {io} from 'socket.io-client'

function Chat() {
  // const host = "http://localhost:3001"
  const host = "www.movieplus.online"
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect( () => {
    async function setUser(){
        const token = localStorage.getItem('theater');
        const decoded = await jwt_decode(token);
        setCurrentUser(decoded.id);
       
    }
    setUser()
  }, []);
  
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);


  useEffect(() => {
    async function fetchData(){
      const token = localStorage.getItem('theater');
      const decoded = await jwt_decode(token);
      const id =(decoded.id)
      const data = await TheaterInstance.get(`/allAdminStaff`);
   
      setContacts(data.data)
    }
    fetchData();
  }, [])
  


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
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
                <div className="container">
                  <Contacts contacts={contacts} changeChat={handleChatChange} currentUser={currentUser} />
                  {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser = {currentUser} socket={socket} />
          )}
                </div>
              </Container>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 90%;
    width: 90%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
