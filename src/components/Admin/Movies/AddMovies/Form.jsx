
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {  ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "../../../../axios/axios";
import Autocomplete from "@mui/material/Autocomplete";
import UploadWidget from "./UploadWidget";


const ErrorText = ({ children, ...props }) => (
  <Typography sx={{ color: "error.main" }} {...props}>
    {children}
  </Typography>
);

const top100Films = [
  "Action",
  "Romance",
  "Dramas",
  "Thriller",
  "Horror",
  "Sci-fi",
  "Fantasy",
];
const Language = ["English", "Hindi", "Tamil", "Malayalam", "Kannada"];

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const URL = "/api/admin/movieImage/upload";

export default function FormMovie() {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const navigate = useNavigate();
  const [gener, setgener] = useState([]);
  const [language, setlanguage] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  const onSubmit = async (data) => {
    data.Genre = gener;
    data.Language = language;
    data.PosterImg = url;
    const formData = new FormData();

    await axios
      .post("/admin/movieinfo", data)
      .then(async (response) => {
        let id = response.data._id;
        navigate("/admin/movies");
      })
      .catch((error) => {
      });
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xm" color="secondary">
        {/* <CssBaseline /> */}
        <Typography component="h1" variant="h5">
          AddMovie
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box noValidate>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >

              <Grid item lg={6} xs={12}>
                <div>
                  <TextField
                    className="focus"
                    variant="filled"
                    label="Name"
                    color="secondary"
           
                    fullWidth
                    margin="normal"
                    {...register("title", {
                      required: true,
                      minLength: 4,
                      maxLength: 40,
                      pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                    })}
                  />
                  <span className="text-danger">
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
                  </span>
                </div>
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextField
                  variant="filled"
                  label="Discription"
                  color="secondary"
       
                  fullWidth
                  type={"text"}
                  multiline
                  margin="normal"
                  {...register("description", {
                    required: true,
                    minLength: 4,
                    maxLength: 200,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger" color="secondary">
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
                </span>
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextField
                  variant="filled"
                  label="Director"
                  color="secondary"
                
                  fullWidth
                  margin="normal"
                  {...register("director", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
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
                </span>
              </Grid>

              <Grid item xs={6} lg={6}>
                <TextField
                  variant="filled"
                  label="Youtube Link"
                  color="secondary"
                  // focused
                  fullWidth
                  margin="normal"
                  {...register("youtubeLink", {
                    required: true,
                    minLength: 4,
                    maxLength: 100,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
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
                </span>
              </Grid>
              <Grid item xs={6} lg={6}>
              
                  <Autocomplete
                    multiple
                    value={gener}
                   
                    onChange={(event, value) => setgener(value)}
                    options={top100Films}
                    renderInput={(params) => (
                      <TextField  color="secondary" variant="filled" {...params} label="Genre" />
                    )}
                  />
          
              </Grid>

              <Grid item xs={6} lg={6}>
          
                  <Autocomplete
                    multiple
                    value={language}
                    
                    // onChange={handleGener}
                    onChange={(event, value) => setlanguage(value)}
                    options={Language}
                    renderInput={(params) => (
                      <TextField  color="secondary" variant="filled" {...params} label="Language" />
                    )}
                  />
           
              </Grid>

              <Grid item xs={6} lg={6}>
                <div className="container">
                  <h2>Unsigned with Upload Preset</h2>
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button onClick={handleOnClick}>Upload an Image</button>
                      );
                    }}
                  </UploadWidget>

                  {error && <p>{error}</p>}

                  {url && (
                    <>
                      <p>
                        <img src={url} alt="Uploaded image" />
                      </p>
                      <p>{url}</p>
                    </>
                  )}
                </div>
                <span className="text-danger"></span>
                {/* {error && <ErrorText>{error}</ErrorText>} */}
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
              <Grid item></Grid>
            </Grid>
          </Box>
        </form>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
