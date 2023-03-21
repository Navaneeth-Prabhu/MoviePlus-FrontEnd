import React, { useEffect, useState } from "react";
import "./order.scss";
import axios from "../../../axios/axios";

function Order() {
  const [history, sethistory] = useState([]);
  useEffect(() => {
    async function getHistroy() {
      const user = localStorage.getItem("userInfo");
      let userEmail = JSON.parse(user);
      const { data } = await axios.get(
        `/history/${userEmail}`
      );

      
      sethistory(data);
    }
    getHistroy();
  }, []);


  return (
    <>
      
      {history?.map((item) => (
        <div className="ticket3 flex h-full px-24 py-5">
          <div className="firsthalf flex">
            <div className="posters p-4 w-56">
              <img
                className="h-full rounded-xl"
                src={item?.movieId.PosterImg}
                alt=""
              />
            </div>
            <div className="details  px-10">
              <div className="title ">{item?.movieId?.title}</div>
              {/* <p>EVM ,Cherthala</p> */}
              <div className="theaterDetail text-sm ">
                <p className="mb-0">EVM , Cherthala , Alappuzha</p>
                <p className="time">
                  {item?.startAt} | {item?.showDate}
                </p>
              </div>
              <div className="seatDetails mt-3 flex justify-between">
                <p className="quantiy text-sm">
                  Quantity : <span>{item?.seats.length}</span>
                </p>
                <p className="flex font-semibold">
                  <span>Seats : </span>
                  {item?.seats?.map((dataSeat) => (
                    <p>{dataSeat.seat},</p>
                  ))}
                </p>
              </div>
              <div className="price mt-1 flex justify-between">
                <div>
                  <p className="mb-1">TicketPrice</p>
                </div>
                <div className="">
                  <span>Rs</span> 240
                </div>
              </div>
              <div className="price  flex justify-between">
                <div>
                  <p>Convinience fee</p>
                </div>
                <div className="">
                  <span>Rs</span> 40
                </div>
              </div>
              <div className="divide-y divide-dashed">
                <div className="mb-4 flex justify-between text-lg font-bold">
                  <div>
                    <p>AMOUNT PAID</p>
                  </div>
                  <div className="font-bold">
                    <span>Rs</span> {item?.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dash border-dashed border-0 border-l-2 border-white-500 ..."></div>
          {/* <div class="dash border-dashed border-l-2 border-white-500 ..."></div> */}
          <div className="secondhalf p-5">
            <div className=" h-full w-50 p-5 flex justify-center text-center">
              <div className="qr w-full h-full">
                <img className="h-full w-full" src={item?.qrcode} alt="" />
                <p>CODE</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Order;
