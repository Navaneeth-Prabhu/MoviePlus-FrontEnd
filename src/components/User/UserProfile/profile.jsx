import {
  List,
  ListItemButton,
  ListItemText,
  Input,
  TextField,
  Grid,
  FormControl,
} from "@mui/material";
import { Box, Container, display, padding } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import "./profile.scss";

function Profile() {

  const user = useSelector((state) => state.userLogin);
  console.log("userrrrrr",user)


    const styles = theme => ({
        notchedOutline: {
          borderWidth: "1px",
          borderColor: "yellow !important"
        }
      });
  return (
    <div className="profileBg">
      <h1>hellooo</h1>
      <Navbar>

      </Navbar>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "708px",
            height: "500px",
            margin: 12,
            backgroundColor: "#232323",
            color: "white",
            borderRadius: "6px",
            boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }}
        >
          <Box
            sx={{
              height: "96px",
              widht: "100%",
            //   background: "linear-gradient(to right bottom, #430089, #82ffa1)",
              background: "linear-gradient(312deg, rgba(159,0,0,1) 0%, rgba(243,34,3,1) 100%)",
              borderRadius: "5px 5px 0 0",
              display:'flex',
              alignItems:'center',
              padding:'30px',
              boxShadow:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            }}
          >
            Heading
          </Box>


          <List sx={{padding:'10px 30px 10px 30px' , display:'flex', justifyItems:'center'}}>  
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} sx={{display:'flex', alignItems:"center"}}>
                    <ListItemText >Email Address</ListItemText>
                </Grid>
                <Grid item xs={4} md={8}>
                <TextField
                 InputProps={{
                    style: {
                      borderColor: 'red',
                      border:'10px',
                      color:'white',
                      boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    },
                  }}

              variant="outlined"
              border='5px'
              fullWidth
              ></TextField>
             
                </Grid>
            </Grid>
          </List>
          <List sx={{padding:'10px 30px 10px 30px' , display:'flex', justifyItems:'center'}}>  
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} sx={{display:'flex', alignItems:"center"}}>
                    <ListItemText >Email Address</ListItemText>
                </Grid>
                <Grid item xs={4} md={8}>
                <TextField
                sx={{borderColor:'white',
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}}
            //   color="error"
            //   label="Soft"
            
              variant="filled"
              fullWidth
              ></TextField>
             
                </Grid>
            </Grid>
          </List>
          <List sx={{padding:'10px 30px 10px 30px' , display:'flex', justifyItems:'center'}}>  
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} sx={{display:'flex', alignItems:"center"}}>
                    <ListItemText >Email Address</ListItemText> 
                </Grid>
                <Grid item xs={4} md={8}>
                <TextField
                sx={{borderColor:'white'}}
            //   color="error"
            //   label="Soft"
            // value={user.userInfo}
            disabled
              variant="filled"
              fullWidth
              >{user.userInfo}</TextField>
             
                </Grid>
            </Grid>
          </List>
          <List sx={{padding:'10px 30px 10px 30px' , display:'flex', justifyItems:'center'}}>  
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} sx={{display:'flex', alignItems:"center"}}>
                    <ListItemText >Email Address</ListItemText>
                </Grid>
                <Grid item xs={4} md={8}>
                <TextField
                sx={{borderColor:'white'}}
            //   color="error"
            //   label="Soft"
            
              variant="filled"
              fullWidth
              ></TextField>
             
                </Grid>
            </Grid>
          </List>
          <List sx={{padding:'10px 30px 10px 30px' , display:'flex', justifyItems:'center'}}>  
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} sx={{display:'flex', alignItems:"center"}}>
                    <ListItemText >Email Address</ListItemText>
                </Grid>
                <Grid item xs={4} md={8}>
                <TextField
                sx={{borderColor:'white'}}
            //   color="error"
            //   label="Soft"
            
              variant="filled"
              fullWidth
              ></TextField>
             
                </Grid>
            </Grid>
          </List>
            
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
