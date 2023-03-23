import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./model.css";
import Modal from "@mui/material/Modal";
// import { Button } from "../../User/Buttons/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../../axios/axios";
import Button from "@mui/material/Button";
import { Experimental_CssVarsProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { otpValidate, registration } from "../../../redux/actions/userAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modals() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(10);
  const [showResend, setShowResend] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [otp, setOtp] = React.useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userInformation);

  useEffect(() => {
    if (userLogin?.userInfo) {
      handleClose();
      setState(false);
      navigate("/");
    } else {
      setError("Check your otp");
    }
  }, [navigate, userLogin?.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (count === 0) {
      setShowResend(true);
    } else {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleButtonClick = () => {
    // code for handling submit button click goes here
    setCount(60);
  };

  const handleResendClick = () => {
    setCount(10);
    setShowResend(false);
  };
  const onSubmit = async (data) => {
    setEmail(data);
    console.log("email", data);
    setState(true);
    handleButtonClick();
    dispatch(registration(data));
  };

  const resent = async (data) => {
    console.log("dataaaaa", data);
    dispatch(registration(data));
    handleResendClick();
  };

  const otpSubmit = () => {
    const data = {
      otp,
      email,
    };
    dispatch(otpValidate(data));
  };

  console.log(errors);

  const handleclosex = () => {
    handleClose();
  };

  return (
    <div>
      <Button buttonStyle="btn--outline" onClick={handleOpen}>
        Sign Up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="" sx={style}>
          <div className="absolute top-7 right-5 ">
            <i className="fa-solid fa-xmark fa-xl " onClick={handleclosex} />
          </div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-semibold text-lg">Sign up</h1>
              <div className="ui divider"></div>
              <div className="ui form flex-col space-y-4 items-center justify-center">
                <div className="field flex items-center space-x-2">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control w-full"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                    })}
                  />
                </div>
                <span className="text-danger">
                  {errors.email?.type === "required" && (
                    <span>Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span>Email must be properly fomatted</span>
                  )}
                </span>
                <div className=" w-full justify-center items-center flex">
                  <button
                    className="bg-[#ff0c0c] px-6 text-white py-2 rounded-md"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      <Dialog
        aria-labelledby="customized-dialog-title"
        open={state}
        TransitionComponent={Transition}
      >
        <DialogContent dividers>
          <div
            style={{
              textAlign: "center",
              color: "white",
              background: "white",
              padding: "50px 40px",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ color: "black" }}>Enter your OTP</h1>
            <TextField
              id="filled-basic"
              label="OTP"
              variant="filled"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="secondary"
            onClick={otpSubmit}
          >
            OK
          </Button>
          {/* <button
            className="bg-[#ff0c0c] px-6 text-white py-2 rounded-md"
            onClick={() => resent(email)}
          >
            resent
          </button> */}
          {showResend ? (
            <button
              className="bg-[#ff0c0c] px-6 text-white py-2 rounded-md"
              onClick={() => resent(email)}
            >
              resent
            </button>
          ) : (
            <p>{count} seconds left</p>
          )}

          <div>{/* <button onClick={handleReset}>Reset</button> */}</div>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
}

export default Modals;
