import { TheaterInstance } from "../../../../axios/axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { moviedetails } from "../../../../redux/actions/movieAction";

function Reservation() {
  let dispatch = useDispatch()
  const [MovieDet, setMovieDet] = useState('')
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const token = localStorage.getItem('theater');
  const decoded = jwt_decode(token);
  const [Show, setShow] = useState([]);
  const movieInfo = useSelector((state) => state.movieInfo);
  const { movieInformation } = movieInfo;
  console.log("movieInfoo",movieInformation)
  useEffect(() => {
   
      const id = decoded.id;
       TheaterInstance
        .get(`/getShowMovie/${id}`,{
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
          }
      })
        .then(({ data }) => {
          setShow(data);
          // console.log(data)
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

console.log("movieDet",Show)
  const selectedMovieToState = (data) => {
     dispatch(moviedetails(data.movieName._id));
     setTimeout(() => {
       navigate(`/theater/buytickets/${data.movieName._id}/select_screen`);
     }, 1000);
  };

  return (
    <>
      Reservation
      <h2>Currunt shows</h2>
      <div className="w-full flex flex-wrap my-6">
        {Show?.reverse().map((shows, index) => (
          <div key={index} className="flex">
            {shows?.showInfo?.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-[11rem] h-80">
                <p className="text-white">{item?.screen}</p>
                <p className="text-white">{item?.movieName?.title}</p>
                <div className="flex space-x-2">
                  {item?.time?.map((time,index) => (
                    <p key={index} className="text-white">{time}</p>
                  ))}
                </div>
                <div className="h-52 w-36">
                  <img
                    className="h-full w-full"
                    src={item?.movieName?.PosterImg}
                    alt=""
                  />
                </div>
                <button onClick={() => selectedMovieToState(item)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Reservation;
