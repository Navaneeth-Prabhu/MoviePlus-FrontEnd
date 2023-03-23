import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../../components/User/Navbar";
import ShowReview from "../../../components/User/Review/showReview";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { moviedetails } from "../../../redux/actions/movieAction";
import "./detail.scss";
import { Input, Modal } from "antd";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ReviewModel from "../../../components/User/Review/index";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submit, setsubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.userLogin);
  const movieInfo = useSelector((state) => state.movieInfo);
  const { movieInformation } = movieInfo;

  const dispatch = useDispatch();
  const handleOpen = () => {
    if (user?.userInfo) {
      setOpen(true);
    } else {
      alert("Please login to book your tickets");
      // setAction(true)
    }
  };
  useEffect(() => {
    dispatch(moviedetails(id));
  }, []);
  const selectedMovieToState = () => {
    if (user?.userInfo) {
      navigate(`/buytickets/${movieInformation.movie._id}/select_screen`);
    } else {
      alert("Please login to book your tickets");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="flex flex-col  md:flex-row md:mt-32 md:w-[88%] md:m-auto" 
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(29, 30, 34) 24.97%, rgb(29, 30, 34) 38.3%, rgba(29, 30, 34, 0.04) 97.47%, rgb(18, 18, 18) 100%),url(${`../../../../../server/public/movies/${movieInformation?.movie._id}.jpg`})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" w-screen md:max-w-[240px] md:h-[350px] overflow-hidden relative">
          <div className=" w-full md:w-full md:h-full   bg-yellow-300" onClick={() => navigate("/movie/trailler")}>
            <img className="h-full w-full"
              src={movieInformation?.movie.PosterImg}
              alt=""
            />
          </div>
          <div className="absolute top-[50%] left-[30%] bg-white/60 px-3 py-1 rounded-full">
            <PlayCircleFilledWhiteIcon />
            <span>Trailer</span>
          </div>
        </div>
        <div className="text-white md:ml-10 md:w-full">
          <h1 className="title text-xl lg:text-6xl">{movieInformation?.movie.title}</h1>

          <div className="genres"></div>
          <div className="genres">
            {movieInformation?.movie?.Genre?.map((item) => (
            <span className="genres__item text-base">{item}</span> 
          ))}
            {/* <span className="genres__item">advanture</span> */}
          </div>
          <div className="m-0">
            <div className=" py-3 flex gap-4	my-3">
              {movieInformation?.movie.Review ? (
                <span className=" flex justify-center items-center">
                  <FavoriteRoundedIcon sx={{ color: "red" }} />
                  <div className="m-0 text-2xl">
                    {
                      movieInformation.Percentage?
                    <p className="m-0"> {movieInformation?.Percentage}%</p> : null
                    }

                  </div>{" "}
                  <p className="m-0 px-3 text-base">
                    {movieInformation?.ReviewCount} rated
                  </p>{" "}
                </span>
              ) : (
                <p>no review yet</p>
              )}
            </div>
          </div>
          <div className="cast w-full">
            <div className="flex-col"
              sx={{
                width: 300,
                color: "success.main",        
              }}
            >
              <h1 className="mt-4">3d /2d</h1> 
              <div className="flex">

              {
                movieInformation?.movie?.Language?.map((lang)=>(

                  <h2>.{lang}</h2>
                ))
              }
              </div>
            </div>
          </div>
          <div
            className="  mt-5 text-lg flex bg-[#ff0000] font-bold rounded-md px-8 py-4 max-w-fit cursor-pointer hover:bg-[#e00404] active:bg-[#ba0202]"
            onClick={() => selectedMovieToState()}
          >
            <button className="">Book Tickets</button>
          </div>
        </div>
      </div>

      <div className="movieDetails">
        {/* <div className="lines mb-4"></div> */}
        <div className="details text-white mt-5 max-w-4xl">
          <h2 className="text-2xl font-bold">About the Movie</h2>
          <p>hallooo{movieInformation?.movie.description}</p>
        </div>
        <div className="lines mb-4"></div>
        <div className="details text-white">
          <h2 className="text-2xl font-bold">TOP Review</h2>
          {/* <p>hallooorder--1</p> */}
          <div className=" rate flex justify-between bg-gray-800 py-2 rounded-xl max-w-max">
            <div className="review px-1 rounded flex flex-col justify-center">
              <h3 className="text-lg m-0 font-medium">
                Add your rating & review
              </h3>
              <p className="m-0 font-normal text-base text-gray-300">
                Your rating matters
              </p>
            </div>
            <button
              className="bg-white text-black rounded px-2 py-2  mx-10"
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              Rate now
            </button>
            <ReviewModel open={open} setOpen={setOpen} setsubmit={setsubmit} />
          </div>
          {movieInformation ? (
            <ShowReview movieInfo={movieInformation} submit={submit} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
