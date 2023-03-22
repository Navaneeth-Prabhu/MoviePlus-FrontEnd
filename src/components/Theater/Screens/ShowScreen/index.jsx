import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Movies from "../../../Admin/Movies/MovieList";
import  { UserInstance } from "../../../../axios/axios";

export default function ImgMediaCard() {
  const [cookies] = useCookies([]);
  const [Screen, setScreen] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('theater');
  const decoded = jwt_decode(token);
  const id = decoded.id;
  useEffect(() => {
    async function movieShow(){
console.log("asdfasdfasdfsadfsadf",id)
      await UserInstance.get(`/getTheaterShow/${id}`)
        .then(({ data }) => {
          console.log(data)
          setScreen(data);
        })
  
        .catch((error) => {
          console.log(error);
        });
    }
    movieShow()
  }, []);

  
  return (
    <>
      <Container>
        heloo
        {Screen.map((data) => (
          <Card sx={{ maxWidth: 190 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="14"
              width={"20px"}
              image={require("../../../../images/Everything_Everywhere_All_at_Once.jpg")}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.screenName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Row : {data.row}
                Col : {data.col}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  navigate("/theater/addMovies");
                }}
              >
                Edit
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
}
