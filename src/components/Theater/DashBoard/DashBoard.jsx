import axios from "../../../axios/axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import ApexChart from "../Charts/SalesChart";

function DashBoard() {
  const [cookies] = useCookies([]);
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    const token = cookies.theaterjwt;
    const decoded = jwt_decode(token);
    const id = decoded.id;

    async function getReservation() {
      await axios.get(`/theater/reservationDetails/${id}`).then(({ data }) => {
        setmovies(data);
      });
    }
    getReservation();
  }, []);
  const reservationsPerDay = movies?.reduce((acc, cur) => {
    const showDate = cur.showDate;
    if (!acc[showDate]) {
      acc[showDate] = 1;
    } else {
      acc[showDate]++;
    }
    return acc;
  }, {});

  const options = { month: "short", day: "numeric", year: "numeric" };
  const reservationsData = Object.keys(reservationsPerDay).map((showDate) => {
    const date = new Date(showDate);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return { x: formattedDate, y: reservationsPerDay[showDate] };
  });

  const xData = reservationsData?.map((reservation) => reservation.x);
  const yData = reservationsData?.map((reservation) => reservation.y);

  const totalRevenue = movies?.reduce(
    (acc, ticket) => acc + ticket.ticketPrice,
    0
  );
  console.log(movies);

  return (
    <div class="px-4 pt-6">
      <div class="grid gap-4 xl:grid-cols-1 2xl:grid-cols-1">
        {/* <!-- Main widget --> */}
        <div class="p-4  border rounded-lg shadow-sm 2xl:col-span-2 border-gray-700 sm:p-6 bg-gray-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex-shrink-0">
              <span class="text-xl font-bold leading-none  sm:text-2xl text-white">
                ${totalRevenue}
              </span>
              <h3 class="text-base font-light text-gray-400">Total Sales</h3>
            </div>
            <div class="flex items-center justify-end flex-1 text-base font-medium  text-green-400">
              12.5%
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div id="main-chart">
            <ApexChart xData={xData} yData={yData} />
          </div>
          {/* <!-- Card Footer --> */}
        </div>
        {/* <!--Tabs widget --> */}
      </div>

      {/* <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-3 2xl:grid-cols-3">
        <div class="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div class="w-full">
            <h3 class="text-base font-normal  text-gray-400">New products</h3>
            <span class="text-2xl font-bold leading-none  sm:text-3xl text-white">
              2,340
            </span>
            <p class="flex items-center text-base font-normal  text-gray-400">
              <span class="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                12.5%
              </span>
              Since last month
            </p>
          </div>
         
        </div>
        <div class="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div class="w-full">
            <h3 class="text-base font-normal  text-gray-400">Users</h3>
            <span class="text-2xl font-bold leading-none  sm:text-3xl text-white">
            {Users.length}
            </span>
            <p class="flex items-center text-base font-normal  text-gray-400">
              <span class="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                3,4%
              </span>
              Since last month
            </p>
          </div>
          
        </div>
        <div class="items-center justify-between p-4  border  rounded-lg shadow-sm sm:flex border-gray-700 sm:p-6 bg-gray-800">
          <div class="w-full">
            <h3 class="text-base font-normal  text-gray-400">Users</h3>
            <span class="text-2xl font-bold leading-none  sm:text-3xl text-white">
              2,340
            </span>
            <p class="flex items-center text-base font-normal  text-gray-400">
              <span class="flex items-center mr-1.5 text-sm  text-green-400">
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                3,4%
              </span>
              Since last month
            </p>
          </div>
          <div class="w-full" id="week-signups-chart"></div>
        </div>
      </div> */}
    </div>
  );
}

export default DashBoard;
