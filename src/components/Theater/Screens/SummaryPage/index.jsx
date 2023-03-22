import React from "react";
// import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ClearIcon from '@mui/icons-material/Clear';
import styles from "../styles/summery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TheaterInstance, UserInstance } from "../../../../axios/axios";
// import Food from '../Components/SummeryPage/Food';

function SummaryPage({ foodModalOpen, handleCloseFoodModal }) {
  const navigate = useNavigate();
  const [totalFood, setTotalFood] = React.useState(0);
  const selectDate = useSelector((state) => state.date);
  const { date } = selectDate;

const booking_details = useSelector(state=>state.dateInformationSelected)  
const movieInformation = useSelector(state => state.movie)
const { dateInfo, silver } = booking_details;
const movieInfo = useSelector((state) => state.movieInfo);
const { movie } = movieInfo.movieInformation;
// console.log("summery pag................e" ,movie._id)
const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const  handlePayment = async() => {

    const dates = new Date();
    dates.setFullYear(date.year);
    dates.setMonth(date.month); // 0 represents January
    dates.setDate(date.date);

    const isoString = dates.toISOString();
    const dateOnly = isoString.substring(0, 10);
    const data = {
      cinemaId: dateInfo.theaterId,
      cinemaScreen: dateInfo.screen,
      startAt: dateInfo.time,
      ticketPrice: "120",
      seats: silver,
      total: totalAmount,
      movieId: movie._id,
      userId: dateInfo.theaterId,
      showDate: dateOnly,
      bookedDate: new Date(),
      paymentId: "theater",
    };

    await TheaterInstance.post("/reservation", data).then((res) => {
        if (res) {
          console.log("POSTED");
          navigate("/theater/Reservation")
          // dispatch(getBookingDetails());
        }
      });
    // dispatch(postBookingDetails(data)).then((res) => {
    //   if (res) {
    //     console.log("POSTED");
    //     navigate("/theater/Reservation")
    //     // dispatch(getBookingDetails());
    //   }
    // });
    
    // setTimeout(() => {
    //   setCounter(false);
    // }, 2000);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  let totalAmount = booking_details.price + 28 + totalFood;

  return (
    <div className="">
      <Dialog
        fullScreen
        open={foodModalOpen}
        onClose={handleCloseFoodModal}
        TransitionComponent={Transition}
      >
        <AppBar style={{ position: "relative", background: "#1F2533" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFoodModal}
              aria-label="close"
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" style={{ flex: 1, color: "white" }}>
              {movie?.title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseFoodModal}>
              <ClearIcon />
            </Button>
          </Toolbar>
        </AppBar>

        <div className={styles.containerrr}>
          {/* <Food /> */}

          <div className={styles.summeryPart}>
            <div>Booking Summery</div>
            <div className={styles.categories}>
              <div style={{ textTransform: "uppercase" }}>
                {booking_details.dateInfo?.name}
              </div>
              <div>Rs {booking_details.price}</div>
            </div>
            <span>{booking_details.dateInfo?.screen}</span>
            <div className={styles.categories}>
              <div style={{ fontSize: "12px", lineHeight: "25px" }}>
                Internet handeling fees
              </div>
              <div>Rs 28.00</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.categories}>
              <div>Sub total</div>
              <div>{booking_details.price + 28}</div>
            </div>

        
            <div
              style={{ fontSize: "12px", margin: "0 30px", fontWeight: "600" }}
            >
              Your current State is <a href="">kerala
              </a>
            </div>
            <div className={styles.total}>
              <div>Amount Payable</div>
              <div>Rs {totalAmount}</div>
            </div>
        
            <div onClick={handlePayment} className={styles.proceedBtn}>
              <div>Total : Rs {totalAmount}</div>
              <div> Proceed</div>
            </div>
            <div className={styles.cancellation_policy}>
              You can cancel the tickets 20 min(s) before the show. Refunds will
              be done according to Cancellation Policyy
            </div>
          </div>
        </div>
      </Dialog>
      {/* <PaymentsPage proceed={proceed} /> */}
    </div>
  );
}

export default SummaryPage;