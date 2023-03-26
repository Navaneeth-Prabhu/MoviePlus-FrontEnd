import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { UserInstance } from "../../../axios/axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import { Navigation } from "swiper";

export default function Slider() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    UserInstance
      .get("/GetTheaterMovies")
      .then(({ data }) => {
        setData(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      <div className="section">
        <div className="flex w-full content-center">
          <h2 className="text-2xl m-0 ml-4"> Book now </h2>
          <div className="titleline flex-1 w-full m-0 ml-2"></div>
          <div className="showmore z-20 cursor-pointer" onClick={()=>{
            navigate('/SeeAll')
          }}><p>show all</p></div>
        </div>
        {/* <div className="cards"> */}

        <Swiper
          slidesPerView={4}
          spaceBetween={4}
          slidesPerGroup={4}
          speed={600}
          pagination={{
            clickable: false,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          clickable={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 2,
              slidesPerGroup: 2,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerGroup: 3,
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1240: {
              slidesPerGroup: 4,
              slidesPerView: 4,
              spaceBetween: 4,
            },
          }}
        >
          {" "}
          {data.map((movie) => (
            <SwiperSlide className="p-4">
              {/* <div className="card" onClick={() => {setMovieDetails(movie)  */}
              <div
                className="card"
                onClick={() => {
                  navigate(`/moviedetails/${movie._id}`);
                }}
              >
                <img
                  src={movie?.PosterImg}
                  alt=""
                />

                <div className="cardContent">
                  <p className="title">{movie.title}</p>
                  <div className="flex">

                  {
                    movie?.Language?.map((lang=>(
                      <p className="description mb-1">.{lang}</p>

                    )))
                  }
                  </div>
                  <div className="flex">

                  {
                    movie?.Genre?.map((gen)=>(
                      <p className="description m-0">.{gen}</p>
                    ))
                  }
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </div>
    </>
  );
}
