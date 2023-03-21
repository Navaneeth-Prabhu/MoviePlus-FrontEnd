import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocalActivitySharpIcon from "@mui/icons-material/LocalActivitySharp";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { Box } from "@mui/system";

import Modal from "../Register/index";
// import { makeStyles } from '@material-ui/styles';

import "./nav.scss";
import { useSelector } from "react-redux";

// import logo from '../../assets/tmovie.png';

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/SeeAll",
  },
  // {
  //   display: "TV Series",
  //   path: "/tv",
  // },
];
const listItems = [
  {
    listIcon: <AccountCircleRoundedIcon />,
    listText: "Profile",
    path: "/profile",
  },
  {
    listIcon: <LocalActivitySharpIcon />,
    listText: "Your Orders",
    path: "/orderhistory",
  },
  {
    listIcon: <ContactSupportSharpIcon />,
    listText: "Help & Support",
  },
  {
    listIcon: <SettingsSharpIcon />,
    listText: "Account & Settings",
  },
  {
    listIcon: <SettingsSharpIcon />,
    listText: "Account & Settings",
    path:"/theater/reg"
  },
];

function Navbar() {
  const user = useSelector((state) => state.userLogin);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const logout = () => {
    // window.open("http://localhost:3008/auth/logout", "_self");
    localStorage.clear();
  };

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };
  // let anchor = left
  const list = () => (
    <Box
      sx={{
        width: 350,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List>{}</List>

      <Box
        sx={{
          width: 350,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <List >
          {listItems.map((text, index) => (
            <ListItem key={text} disablePadding>
              <Divider />
              <Link to={text.path}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    {text.listIcon}
                  </ListItemIcon>
                  <ListItemText primary={text.listText} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Button
          onClick={logout}
          variant="outlined"
          sx={{ bottom: 1, margin: 1, border: 1.5, color: "white" }}
        >
          LogOut
        </Button>
      </Box>
    </Box>
  );

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container m-auto">
        <div className="logo">
          {/* <img src={logo} alt="" /> */}
          <Link to="/">Movie+</Link>
        </div>
        <ul className="header__nav mb-0">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}

          {user?.userInfo ? (
            <li className="nav-item">
              <div onClick={toggleDrawer()}>Hello Gust</div>
              <SwipeableDrawer
                open={open}
                anchor="right"
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
                sx={{ borderRadius: "20px 20px 0 0" }}
              >
                {list()}
              </SwipeableDrawer>
            </li>
          ) : (
            <li className="nav-item">
              {button && (
                <li className="nav-links">
                  <Modal open={openModal} onClose={() => setOpenModal(false)} />
                </li>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
