import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "../../../../axios/axios";

// import './index.css'

export default function AddShow() {
  const cookies = useCookies([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // const [price,setprice] = useState('')
  const [movie, setmovie] = useState([]);
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [status, setstatus] = useState();
  const [screen, setscreen] = useState([]);
  const [sname, setsname] = useState();
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setname(event.target.value);
  };
  const handlePrice = (event) => {
    setprice(event.target.value);
  };
  const handleStatus = (event) => {
    setstatus(event.target.value);
  };
  const handleScreen = (event) => {
    setsname(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem('theater');
  // console.log(token, "helloo,,,,,,,,,,,,,,,");
  useEffect(async () => {
    const decoded = jwt_decode(token);
    const id = decoded.id;
    // axios.get("/theater/getMovies").then(({ data }) => {
    //   setmovie(data);
    //   });
    //   axios.get("/theater/getScreen").then(({ data }) => {
    //     setscreen(data);
    //   });
    try {
      await axios
        .get(`/theater/getShowMovie/${id}`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("......", error);
      // console.log('......',error.response);
    }
  }, []);

  const onSubmit = async (data) => {
    data.name = name;
    data.price = price;
    data.status = status;
    data.screen = sname;

    await axios.post("/theater/addShow", data);

    navigate("/theater/");
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
              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Movie Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={name}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {movie.map((mname) => (
                      <MenuItem value={mname.title}>{mname.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={6} xs={12}>
                <div>
                  <TextField
                    className="focus"
                    variant="filled"
                    label="Busness Days"
                    color="secondary"
                    fullWidth
                    margin="1"
                    {...register("weekly days", {
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
                </div>
              </Grid>
              <Grid item lg={6} xs={12}></Grid>
              <Grid item lg={6} xs={12}>
                <div>
                  <TextField
                    className=""
                    variant="filled"
                    label="Showtime"
                    color="secondary"
                    fullWidth
                    margin="1"
                    {...register("ShowTime", {
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
                </div>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="Status"
                    id="demo-simple-select-filled"
                    value={status}
                    onChange={handleStatus}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"canclled"}>canclled</MenuItem>
                    <MenuItem value={"open"}>Open</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Screen
                  </InputLabel>
                  <Select
                    labelId="Screen"
                    id="demo-simple-select-filled"
                    value={sname}
                    onChange={handleScreen}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {screen.map((data) => (
                      <MenuItem value={data.screenName}>
                        {data.screenName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Price
                  </InputLabel>
                  <Select
                    labelId="Price"
                    id="demo-simple-select-filled"
                    value={price}
                    onChange={handlePrice}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"120"}>120</MenuItem>

                    <MenuItem value={"140"}>140</MenuItem>
                  </Select>
                </FormControl>
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
