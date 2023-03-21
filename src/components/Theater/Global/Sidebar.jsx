
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import AirplayIcon from '@mui/icons-material/Airplay';
import ChatIcon from '@mui/icons-material/Chat';


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" ,path:"/theater" ,icon:<DashboardIcon/>},
    { title: "AddMovies", src: "AddMovie", gap: true ,path:"/theater/addMovies" ,icon:<MovieRoundedIcon/>},
    { title: "Screen ", src: "Screen", path:"/theater/screen", icon:<AirplayIcon/>},
    { title: "Inbox", src: "Chat" ,    path: "/theater/chat", icon:<ChatIcon/>},
    { title: "Reservation", src: "Reservation" ,    path: "/theater/Reservation", icon:<ChatIcon/>},
    { title: "AllReservation", src: "Reservation" ,    path: "/theater/AllReservation", icon:<ChatIcon/>},
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        }  h-screen p-5  bg--dark-purple dark:bg-gray-purple  pt-8 relative duration-300`}
      >
        {/* <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}
        <ArrowBackIosIcon  onClick={() => setOpen(!open)} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             ${!open && "rotate-180"}`}/>
        <div className="flex gap-x-4 items-center">
          {/* <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          /> */}
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Theater
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.path} className='flex gap-1'>
             {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div> */}
    </div>
  );
};
export default Sidebar;