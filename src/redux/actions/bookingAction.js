import {
  GET_DATE_DETAILS_FAIL,
  GET_DATE_DETAILS_REQUEST,
  GET_DATE_DETAILS_SUCCESS,
  GET_BOOKED_DETAILS_SUCESS,
  GET_BOOKED_DETAILS_FAIL,
  GET_BOOKED_DETAILS,
  GET_SEATS_AND_TOTAL_AMOUNT,
  GET_SEATS_AND_TOTAL_AMOUNT_FAIL,
  ADD_TOTAL_AMOUNT_WHICH_BOOKED_FAIL,
  ADD_TOTAL_AMOUNT_WHICH_BOOKED,
  ADD_BOOKING_DETAILS,
  ADD_BOOKING_DETAILS_SUCCESS,
  ADD_BOOKING_DETAILS_FAIL,
  GET_SEATS_INFORMATION_REQUEST,
  GET_SEATS_INFORMATION_SUCCESS,
  GET_SEATS_INFORMATION_FAIL,
  ADD_DATE_AND_DAY_TO_STATE,
  ADD_DATE_AND_DAY_TO_STATE_FAIL,
  GET_RESERVATIONLIST_REQUEST,
  GET_RESERVATIONLIST_SUCCESS,
  GET_RESERVATIONLIST_FAIL,
} from "../Constants/bookingConstants";
import axios from "../../axios/axios";

export const handleSelectDate = (date, day, id) => async (dispatch) => {
  try {
    
 
    dispatch({ type: GET_DATE_DETAILS_REQUEST });

    const {data} = await axios.get(
      `/theater/getScreenInfo/${date}/${day}/${id}`
    );

    dispatch({ type: GET_DATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const handleSelectNameTime =(name, time, screen, theaterId) => async (dispatch) => {
    const data = {
      name,
      time,
      screen,
      theaterId,
    };
    try {
      dispatch({ type: GET_BOOKED_DETAILS_SUCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BOOKED_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const handleAddingSeatingData = (seating) => (dispatch) => {
  try {
    dispatch({ type: GET_SEATS_AND_TOTAL_AMOUNT, payload: seating });
  } catch (error) {
    dispatch({
      type: GET_SEATS_AND_TOTAL_AMOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const handleAddTotalPrice = (totalAmount) => (dispatch) => {
  try {
    dispatch({ type: ADD_TOTAL_AMOUNT_WHICH_BOOKED, payload: totalAmount });
  } catch (error) {
    dispatch({
      type: ADD_TOTAL_AMOUNT_WHICH_BOOKED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postBookingDetails = (datas) => async (dispatch) => {
  try {
    dispatch({ type: ADD_BOOKING_DETAILS });

    const { data } = await axios.post("/reservation", datas);

    dispatch({type:ADD_BOOKING_DETAILS_SUCCESS,payload:data})
  } catch (error) {
    dispatch({
      type: ADD_BOOKING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSeatInformation =(date, movieId, theaterId, time) => async (dispatch) => {

    const items = {
      date,
      movieId,
      theaterId,
      time,
    };
    try {
      dispatch({ type: GET_SEATS_INFORMATION_REQUEST });
      const { data } = await axios.post(
        "/reservation/getSeatInfo",
        items
      );
      dispatch({ type: GET_SEATS_INFORMATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SEATS_INFORMATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const selectDate = (date, day, month, year) => async (dispatch) => {

  try {
    
    dispatch({
      type: ADD_DATE_AND_DAY_TO_STATE,
      payload: { date, day, month, year },  
    });
  } catch (error) {
    dispatch({
      type: ADD_DATE_AND_DAY_TO_STATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReservationHistory =(movieId, theaterId) => async (dispatch) => {

 
  try {
    dispatch({ type: GET_RESERVATIONLIST_REQUEST });
    const { data } = await axios.get(
      `/theater/${theaterId}/getAllReservations/${movieId}`
    );
    dispatch({ type: GET_RESERVATIONLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RESERVATIONLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
