import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"
import axios from '../../../axios/axios';
import { ToastContainer,toast } from 'react-toastify';
import { useEffect } from 'react'

function Index() {
    const navigate = useNavigate();
    const[cookies,setCookies,removeCookie]=useCookies([]);
    useEffect(() => {
      const verifyUser = async() =>{
        if(!cookies.theaterjwt){
            navigate("/theater/login")
        }else{
            const { data } = await axios.post(
                "/theater",
                {},
                {
                  withCredentials: true,
                }
              );
              if (!data.status) {
                removeCookie("theaterjwt");
                navigate("/theater/login");
              } else {
                toast(`welcome.... ${data.user} `, {
                  theme: "dark",
                });
              }
        }
      }
      verifyUser();
    }, [cookies,navigate,removeCookie])
    

    const logOut =()=>{
        removeCookie("theaterjwt")
        navigate('/theater/login')
    }
  return (
    <>
    <div className="private">
        <h1>welcome home</h1>
        <button onClick={logOut}>logout</button>
        <ToastContainer/>
    </div>
    </>
  )
}

export default Index