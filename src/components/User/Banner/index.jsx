import React from "react";
import "./banner.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";

function Index() {
  return (
    // <div className="gradient">
    //   <div className="overlay">
    //     <img className="banner" src={require("../../../images/Rectangle 2.jpg")} alt="" />
    //   </div>
    //   <div className=" content">
    //     <h1 className="title">Joker</h1>
    //     <p className="discription">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quos
    //       consectetur nisi impedit laudantium numquam aperiam expedita et eius
    //       quibusdam, dignissimos iure cum fugiat ipsum. Exercitationem iusto
    //       ducimus animi alias.
    //     </p>
    //     <h5>somethign new</h5>
    //   </div>

    // </div>

    <>
     <div className="max-h-[500px] bg-yellow-400">

        <Swiper
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={5}
          loop={true}
          navigation={true}
           modules={[Navigation]}
          className="w-full h-ful bg-black max-h-[400px]"
        >
          <SwiperSlide>
            <div className="containerr">
              <div className="">
                {/* <div className="fade"> */}
                <div className="topGradient">
                  {/* <div className="gradientwhole"> */}
                  <img
                    className=""
                    style={{ width: "100%", height: "100%" }}
                    src={require("../../../images/l34820221122130003.webp")}
                    alt="First slide"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="containerr">
              <div className="">
                <div className="topGradient">
                  {/* <div className="gradientwhole"> */}
                  <div className="left">
                    <img
                      className="left"
                      style={{ width: "100%", height: "100%" }}
                      src={require("../../../images/5c1cff971789a-wallpaper-preview.jpg")}
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="containerr">
              <div className="">
                {/* <div className="fade"> */}
                <div className="topGradient">
                  {/* <div className="gradientwhole"> */}
                  <img
                    className=""
                    style={{ width: "100%", height: "100%" }}
                    src={require("../../../images/l34820221122130003.webp")}
                    alt="First slide"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="containerr">
              <div className="">
                <div className="topGradient">
                  {/* <div className="gradientwhole"> */}
                  <div className="left">
                    <img
                      className="left"
                      style={{ width: "100%", height: "100%" }}
                      src={require("../../../images/5c1cff971789a-wallpaper-preview.jpg")}
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
     </div>
      </>

  );
}

export default Index;
