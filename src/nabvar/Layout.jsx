import { useContext } from "react";
import * as React from "react";

import { Link, NavLink, Outlet, redirect, Router, useLocation, useParams } from "react-router-dom";

import { createContextData } from "../contextapi/contextApi";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router"


import "./navbar.css"


const Layout = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(token);
  const router = useLocation()
  const navigate = useNavigate()
  const { darkTheme, darkThemeHandler } = useContext(createContextData);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [activeLink, setActiveLink] = React.useState([router.pathname.replace(/^\/+/, '')])

  const routePath = [
    {
      path: "home",
    },
    {
      path: "traffic",
    },
    {
      path: "autocomplete",
    },
    {
      path: "todo",
    },
    {
      path: "stopwatch",
    },
    {
      path: "progress",
    },
    {
      path: "drag",
    },
    {
      path: "chatbot"
    }
  ];

  const settings = [


    {
      path: "login",
    },
  ];

  function logoutUser() {
    // navigate("/login");
    localStorage.clear();
  }

  console.log(userData)

  return (
    <>
      <AppBar position="static">
        <Container style={{
          backgroundColor: 'black'
        }} maxWidth="xl">
          <Toolbar disableGutters>
            {userData && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  PaperProps={{
                    sx: {
                      backgroundColor: 'black',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",

                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none", } }}
                >
                  {userData &&
                    routePath.map((page, index) => (

                      <MenuItem key={index} onClick={handleCloseNavMenu}

                      >
                        <Button
                          key={page.path}
                          component={NavLink}
                          to={`/${page.path}`}
                          sx={{ color: "white", display: "block", backgroundColor: activeLink.includes(page.path) ? 'blue' : '' }}
                          onClick={() => {
                            setActiveLink((prev) => activeLink.includes(page.path) ? prev.filter((active) => active !== page.path) : [prev, page.path]);
                            handleCloseNavMenu();
                          }}
                        >
                          {page.label ?? page.path}
                        </Button>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {userData &&
                routePath?.map((page) => {

                  return <Button
                    key={page.path}
                    component={NavLink}
                    to={`/${page.path}`}
                    sx={{
                      my: 2, color: "white", display: "block",
                      backgroundColor: activeLink.includes(page.path) ? 'blue' : ''
                    }}
                    onClick={() => setActiveLink((prev) => activeLink.includes(page.path) ? prev.filter((active) => active !== page.path) : [prev, page.path])}

                  >
                    {page.label ?? page.path}
                  </Button>
                })}
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: "center",
              gap: '10px'
            }}>


              {
                userData && <div style={{
                  fontWeight: 700
                }} className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">

                  Welcome   {userData?.name}

                </div>
              }

              {settings.map((page) => (
                !userData && (
                  <Button
                    onClick={logoutUser}
                    key={page.path}
                    component={Link}
                    to={`/${page.path}`}
                    sx={{
                      color: "black", display: "block",
                      backgroundColor: 'blue',
                    }}
                  >
                    {page.label ?? page.path}
                  </Button>
                )
              ))}

              {
                userData && <Button
                  onClick={logoutUser}
                  component={Link}
                  to={`/login`}
                  sx={{
                    color: "black", display: "block",
                    backgroundColor: 'blue',
                  }}
                >
                  Logout
                </Button>
              }


              {
                !userData && <Button
                  // onClick={}
                  component={Link}
                  to={`/signup`}
                  sx={{
                    color: "black", display: "block",
                    backgroundColor: 'blue',
                  }}
                >
                  signup
                </Button>
              }

            </Box>
          </Toolbar>
        </Container>

      </AppBar>
      <Outlet />

    </>
  );
};

export default Layout;
