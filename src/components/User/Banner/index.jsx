

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./banner2.css";

// import required modules
import { Pagination } from "swiper";

function Index() {
  return (
    <>
      <div className="max-w-[1200px] m-auto">
        <Swiper
          
          loop={true}
          centeredSlides={true}
        
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
           
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
      

          <SwiperSlide>
          <div className="topGradient">

            <img
              className="bg-cover"
              style={{ width: "100%", height: "100%" }}
              src="https://www.sho.com/site/image-bin/images/0_0_3493875/0_0_3493875_00h_1280x640.jpg"
              alt="First slide"
            />
          </div>
          </SwiperSlide>
     
          <SwiperSlide>
          <div className="topGradient">

            {" "}
            <img
              className="bg-cover"
              style={{ width: "100%", height: "100%" }}
              src="https://www.nicepng.com/png/full/106-1060641_make-action-gifs-john-wick-chapter-2-blu.png"
              alt="First slide"
            />
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="topGradient">
            {" "}
            <img
              className="bg-cover"
              style={{ width: "100%", height: "100%" }}
              src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/everything-everywhere-all-at-once-cover.jpg"
              alt="First slide"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="topGradient">
            {" "}
            <img
              className="bg-cover"
              style={{ width: "100%", height: "100%" }}
              src="https://northcoastcourier.co.za/wp-content/uploads/sites/73/2021/11/Dune-Movie.jpg"
              alt="First slide"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="topGradient">
            {" "}
            <img
              className="bg-cover"
              style={{ width: "100%", height: "100%" }}
              src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/1400x700-14-1.jpg"
              alt="First slide"
            />
            </div>
          </SwiperSlide>
         
         
        </Swiper>
      </div>
    </>
  );
}

export default Index;
