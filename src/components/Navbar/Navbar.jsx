import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import classes from "./Navbar.module.scss";
import { Avatar, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: "10vh",
  },
  button: {
    backgroundColor: "inherit",
    border: "none",
  },
  menu: {
    cursor: "pointer",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0),
  },
  profile: {
    cursor: "pointer",
  },
  dropdown: {},
}));

const Navbar = ({ user }) => {
  console.log(user);
  const [showDropdown, setShowDropdown] = useState(false);
  const muiClass = useStyles();

  const handleShowDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <>
      {user && (
        <AppBar position="static" className={muiClass.root} elevaion={0}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.brand}>
              <Typography
                className={muiClass.logo}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                TMP
              </Typography>
            </div>
            <div className={classes.menus}>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography className={muiClass.menu}>Home</Typography>
              </NavLink>
              <Link
                to="/messages"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography className={muiClass.menu}>Messages</Typography>
              </Link>
              <Link
                to="/favorites"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography className={muiClass.menu}>Favorites</Typography>
              </Link>
              <Typography className={muiClass.menu}>
                <Link
                  to="/post"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Post
                </Link>
              </Typography>
            </div>

            <div className={classes.profile}>
              <button onClick={handleShowDropdown} className={muiClass.button}>
                <Avatar className={muiClass.profile} src={user?.image}></Avatar>
              </button>

              {showDropdown && (
                <div className={muiClass.dropdown}>
                  <Menu
                    className={muiClass.dropdown}
                    open={showDropdown}
                    onClose={handleShowDropdown}
                    onClick={handleShowDropdown}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "hidden",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        top: 0,
                        right: 14,
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <BeenhereIcon fontSize="small" />
                      </ListItemIcon>
                      <Link
                        to="/myAds"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        My Ads
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <Link
                        to="/logout"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Logout
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <CancelIcon fontSize="small" />
                      </ListItemIcon>
                      Close
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// const Navbar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             TMP
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             TMP
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default Navbar;
