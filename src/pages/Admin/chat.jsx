import React, { useEffect, useState, useRef } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../thems";
import Topbar from "../../components/Admin/Global/Topbar";
import "./dashboard.css";
import SideBar from "../../components/Admin/Global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import styled from "styled-components";
import { AdminInstance } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../../components/Admin/Chat/Contacts/contacts";
import Welcome from "../../components/Admin/Chat/welcome";
import ChatContainer from "../../components/Admin/Chat/Container/chatContainer";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

function Chat() {
  // const host = "http://localhost:3001";
  const host = "www.movieplus.online";
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function setUser() {
      const token = localStorage.getItem('admin');
      const decoded = await jwt_decode(token);
      setCurrentUser(decoded.id);
    }
    setUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   const token = localStorage.getItem('admin');
  //   const decoded = await jwt_decode(token);
  //   const id = decoded.id;
  //   // Fetch all the users from the theater collection
  //   const users = await AdminInstance.get(`/allTheater`);

  //   // Fetch the latest message for each user from the message collection
  //   const messagePromises = users.data.map(async (user) => {
  //     const message = await AdminInstance.get(
  //       `/latestMessage/${user._id}`
  //     );
  //     return {
  //       ...user,
  //       latestMessageCreatedAt: message.data ? message.data.createdAt : null,
  //     };
  //   });



  //   // Wait for all the latest message promises to resolve
  //   const usersWithLatestMessages = await Promise.all(messagePromises);

  //   // Sort the users based on the latest message's createdAt time in descending order
  //   const sortedUsers = usersWithLatestMessages.sort((a, b) => {
  //     return (
  //       new Date(b.latestMessageCreatedAt) - new Date(a.latestMessageCreatedAt)
  //     );
  //   });

  //   setContacts(sortedUsers);
  // }

  useEffect(() => {
    async function fetchData(){
      const token = localStorage.getItem('admin');
      const decoded = await jwt_decode(token);
      const id =(decoded.id)
      const data = await AdminInstance.get(`/allTheater`);
   
      setContacts(data.data)
    }
    fetchData();
  }, [])

  // const updateContacts = (newContact) => {
  //   // Find the index of the contact in the contacts array
  //   const index = contacts.findIndex(
  //     (contact) => contact._id === newContact._id
  //   );

  //   if (index !== -1) {
  //     // If the contact already exists in the contacts array, update its data
  //     setContacts((prevContacts) => [
  //       newContact,
  //       ...prevContacts.slice(0, index),
  //       ...prevContacts.slice(index + 1),
  //     ]);
  //   } else {
  //     // If the contact doesn't exist in the contacts array, add it to the top
  //     setContacts((prevContacts) => [newContact, ...prevContacts]);
  //   }

  //   // Sort the contacts based on the latest message's createdAt time in descending order
  //   const sortedContacts = contacts.sort((a, b) => {
  //     return (
  //       new Date(b.latestMessageCreatedAt) - new Date(a.latestMessageCreatedAt)
  //     );
  //   });
  //   setContacts(sortedContacts);
  // };

  // async function fetchMessages() {
  //   if (currentChat) {
  //     const response = await UserInstance.post(
  //       "/message/getmsg",
  //       {
  //         from: currentUser,
  //         to: currentChat._id,
  //       }
  //     );
  //     console.log(response.data)
  //     setMessages(response.data);
  //   }
  // }
  // const updateMessages = (chatId, newMessages) => {
  //   const updatedMessages = messages.map(chat => {
  //     if (chat._id === chatId) {
  //       return {
  //         ...chat,
  //         messages: newMessages
  //       }
  //     }
  //     return chat
  //   })
  //   setMessages(updatedMessages)
  //   updateContacts(chatId, updatedMessages);
  // }

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // const sendMessage = (messageText) => {
  //   const message = {
  //     sender: currentUser,
  //     receiver: currentChat._id,
  //     text: messageText,
  //   };
  //   socket.current.emit("send-message", message);
  //   setMessages((prevMessages) => [...prevMessages, message]);
  // };

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
