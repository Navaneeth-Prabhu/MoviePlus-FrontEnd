import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DateObject } from "react-multi-date-picker";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TheaterInstance } from "../../../../axios/axios";

function AddShows() {
 
  const [Show, setShow] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [status, setstatus] = useState();
  const [screen, setscreen] = useState([]);
  const [sname, setsname] = useState();
  const [time, setTime] = useState();
  const [values, setValues] = useState(
    [1, 2, 3].map((number) =>
      new DateObject().set({
        day: number,
        hour: number,
        minute: number,
        second: number,
      })
    )
  );

  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs(new Date()));

  const handleStrateDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
    const token = localStorage.getItem('theater');
    const decoded = jwt_decode(token);
    const id = decoded.id;

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
  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();



  const getScreen = async()=>{
    TheaterInstance
    .get(`/getScreen/${id}`)
    .then(({ data }) => {
      setscreen(data);
    })
    .catch((error) => {
      // console.log(error,".......................");    
    });
  }

  const getMovies = ()=>{
    TheaterInstance
    .get("/getMovies")
    .then(({ data }) => {
      setData(data);
    })
    .catch((error) => {
      // console.log(error,"........asdfasdf..........")
    });
  }
  

  useEffect(() => {
    async function getShowMovie() {
      // console.log("dddafffffffffffffffffffffff............",id)
      getMovies()
      getScreen()

      TheaterInstance
        .get(`/getShowMovie/${id}`)
        .then(({ data }) => {
          setShow(data);
          // console.log(data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getShowMovie();
  }, []);



  console.log("show", Show.reverse());
  const onSubmit = async (data) => {
    data.theaterId = id;
    data.movieName = name;
    data.price = price;
    data.status = status;
    data.screen = sname;
    let time2 = time.split(",");
    data.time = time2;

    data.id = id;
    data.startDate = startDate;
    data.endDate = endDate;
    await TheaterInstance.post("/addShow", data);
    navigate("/theater/");
  };

  const today = new Date();

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xm" color="secondary">
        {/* <CssBaseline /> */}
        <h2>Currunt Shows</h2>
        <div className="w-full flex flex-wrap my-6 " >
          {Show?.reverse().map((shows, screenIndex) => (
            <div key={screenIndex} className="flex  space-x-3 ">
              {shows?.showInfo?.map((item, index) => (
                <div className="flex flex-col items-center w-[11rem] h-80 ">
                  <p className="text-white underline decoration-1 underline-offset-4">{item?.screen}</p>
                  <p className="text-white text-center truncate w-full text-md p-4">{item?.movieName?.title}</p>
                  <div className="flex space-x-2">
                    {item?.time?.map((time) => (
                      <p className="text-white">{time}</p>
                    ))}
                  </div>
                  <div className="h-52 w-36">
                    <img
                      className="h-full w-full"
                      src={item?.movieName?.PosterImg}
                      alt=""
                    />
                  </div>
                  {/* <button onClick={()=>deleteShow(screenIndex, index)}>
                    delete
                  </button> */}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Typography component="h1" variant="h5">
          Add Shows
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
                    {data.map((moviename) => (
                      <MenuItem value={moviename._id}>
                        {moviename.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        minDate={today}
                        label="Date Start"
                        inputFormat="MM/DD/YYYY"
                        value={startDate}
                        onChange={handleStrateDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl variant="filled" color="secondary" fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        minDate={today}
                        label="Date Ends"
                        inputFormat="MM/DD/YYYY"
                        value={endDate}
                        onChange={handleEndDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <div>
                  <TextField
                    className="focus"
                    variant="filled"
                    label="Mention times in this formate 10:00 AM"
                    color="secondary"
                    fullWidth
                    margin="1"
                    onChange={handleTime}
                  />
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
         
                <Grid item xs={12} lg={6}>
                  <FormControl variant="filled" color="secondary" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Screen Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={name}
                      onChange={handleScreen}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {screen?.map((moviename) => {
                        return (
                          <MenuItem value={moviename.screenName}>
                            {moviename.screenName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
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
                    <MenuItem value=" ">
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
          </Box>
        </form>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default AddShows;
