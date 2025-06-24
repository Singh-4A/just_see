import { useContext } from "react";
import * as React from "react";
import { Link, Outlet, Router, useLocation, useParams } from "react-router-dom";
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
const Layout = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const router = useLocation()
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
      path: !userData ? "Login" : "Logout",
    },
  ];

  function logoutUser() {
    window.open("/login");
    localStorage.clear();
  }

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
                          component={Link}
                          to={`/${page.path}`}
                          sx={{ color: "white", display: "block", backgroundColor: activeLink.includes(page.path) ? 'blue' : '' }}
                          onClick={() => {
                            setActiveLink((prev) => activeLink.includes(page.path) ? prev.filter((active) => active !== page.path) : [prev, page.path],
                              handleCloseNavMenu)
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
                    component={Link}
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
              {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip> */}
              {/* <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
              </Menu> */}

              {
                userData && <div style={{
                  fontWeight: 700
                }} className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">

                  Welcome   {userData?.name}

                </div>
              }

              {settings.map((page) => (
                // <MenuItem key={page} onClick={handleCloseNavMenu}>

                <Button
                  onClick={() => logoutUser()}
                  key={page.path}
                  component={Link}
                  to={`/${page.path}`}
                  sx={{
                    color: "black", display: "block",
                    backgroundColor: 'blue',
                    color: 'white'
                  }}
                >
                  {page.label ?? page.path}
                </Button>
                // </MenuItem>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
