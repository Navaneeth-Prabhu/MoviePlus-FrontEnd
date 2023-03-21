import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";

import styles from "../Cinemas.module.css";
import "react-multi-carousel/lib/styles.css";
// import { handleSelectDate,selectDate } from "../../../redux/actions/bookingAction";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useParams } from "react-router-dom";
import { handleSelectDate, selectDate } from "../../../redux/actions/bookingAction";

function Calendar() {
  let currentDate = new Date().getDate();
  let currentDay = new Date().getDay();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let [selectedDate, setSelectedDate] = useState(0);
  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state?.movieInfo);
  // const { movie } = movieInfo?.movieInformation;
  console.log(".......",movieInfo?.movieInformation?.movie)
  

  let dates = [];
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < 5; i++) {
    if (currentDate > 30) currentDate = 1;
    if (currentDay === 7) currentDay = 0;

    dates.push({
      date: currentDate,
      day: weekdays[currentDay],
      month: currentMonth,
      year: currentYear,
    });
    currentDate++;
    currentDay++;
  }
  // const CustomRightArrow = ({ onClick, ...rest }) => {
  //   const {
  //     onMove,
  //     carouselState: { currentSlide, deviceType }
  //   } = rest;
  //   // onMove means if dragging or swiping in progress.
  //   return <ArrowRightIcon onClick={() => onClick()} />;
  // };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleDateChange = (index) => {
    setSelectedDate(index);
   
  };
  return (
    <div  style={{ width: 250 }}>
    <Carousel
      className={styles.arrow}

      responsive={responsive}
      removeArrowOnDeviceType={["mobile"]}
    >
      {dates?.map((item, index) => (
        <div
          className={styles.dateItem}
          onClick={() => {
            handleDateChange(index);
            dispatch(
              handleSelectDate(
                dates[index].date,
                dates[index].day,
    
                movieInfo?.movieInformation?.movie?._id
              )
            );
            dispatch(selectDate(dates[index].date, dates[index].day, dates[index].month, dates[index].year));
          }}
          style={
            index === selectedDate
              ? { backgroundColor: "", color: "white" ,border:"solid",borderColor:"rgb(29, 30, 34)", borderRadius:"0px" ,borderBottomColor:"red" ,borderTopColor:"red"}
              : { backgroundColor: "transparent" }
          }
          key={item.date}
        >
          <p style={{color:'white',margin:0}}>{item.day.slice(0, 3)}</p>
          <h2
            style={
              index === selectedDate ? { color: "white" } : { color: "white" }
            }
          >
            {item.date}
          </h2>
          {/* <p style={{color:'white'}}>{item.month.slice(0, 3)}</p> */}
        </div>
        
      ))}
    </Carousel>
  </div>
);
}
export default Calendar;