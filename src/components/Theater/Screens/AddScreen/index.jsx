import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { TheaterInstance } from "../../../../axios/axios";
import { Navigation } from "swiper";

const ErrorText = ({ children, ...props }) => (
  <Typography sx={{ color: "error.main" }} {...props}>
    {children}
  </Typography>
);

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const URL = "/api/admin/movieImage/upload";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormMovie() {
  const navigate = useNavigate()
  const [screen, setScreen] = React.useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('theater');
  const decoded = jwt_decode(token);
  const id = decoded.id;

  const getScreen = async () => {
    try {
      const { data } = await TheaterInstance.get(`/getScreen/${id}`);
      setScreen(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const screenNames = screen.map((name) => name.screenName.toLowerCase());
    const lowerCaseName = name.toLowerCase();
  
    if (lowerCaseName === '') {
      setError('Please enter a name.');
    } else if (screenNames.includes(lowerCaseName)) {
      setError(`${name} already exists.`);
    } else {
      try {
        const { data } = await TheaterInstance.post('/addScreen', { name });
        console.log(data);
        setScreen((prevScreen) => [...prevScreen, data]);
        setError('');
        setName('');
        navigate('/theater');
      } catch (error) {
        console.log(error);
        setError('An error occurred while adding the screen.');
      }
    }
  };

  useEffect(() => {
    getScreen()
  }, [screen])
  
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xm" color="secondary">
        <Typography component="h1" variant="h5">
         Add new Screen
        </Typography>
        <div>
    </div>
        <form onSubmit={handleSubmit}>
          
          <Box noValidate >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item lg={4} xs={4}>
                <div>
                  <TextField
                    className="focus"
                    variant="filled"
                    label="Name"
                    color="secondary"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    value={name}
                    margin="1"
                    // {...register("name", {
                    //   required: true,
                    //   minLength: 4,
                    //   maxLength: 20,
                    //   pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                    // })}
                  />
                  {/* <span className="text-danger">
                    {errors.name?.type === "required" && (
                      <span>name is required</span>
                    )}
                    {errors.name?.type === "minLength" && (
                      <span>name must morethan or equal to 4 Character</span>
                    )}
                    {errors.name?.type === "maxLength" && (
                      <span>name must less than 20 Character</span>
                    )}
                    {errors.name?.type === "pattern" && (
                      <span>Should not have spaces</span>
                    )}
                  </span> */}
                   {error && <p>{error}</p>}
                </div>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: "red" }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </form>
       
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
