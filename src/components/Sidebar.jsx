import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Table.module.css";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Change_password from "../Modals/Change_password";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ header_name }) {
  const storage = window.sessionStorage;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);
  const [change4, setChange4] = useState(false);
  const [change5, setChange5] = useState(false);
  const [change6, setChange6] = useState(false);
  let img = storage.getItem("profile_img");
  let f_name = storage.getItem("first_name");
  let l_name = storage.getItem("last_name");

  let role_id = storage.getItem("Role_id") 

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    storage.setItem("USER_GUID", "");
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#007cc3",height:"50px"  }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            {header_name}
          </Typography>
          
          <Box
            sx={{
              marginLeft: "70%",
              display: "flex",
              marginTop: "5px",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img
              src={img}
              alt=""
              style={{
                height: "40px",
                width: "40px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <p style={{ marginTop: "15px" }}>
              {f_name} {l_name}
            </p>
            <Tooltip title="Sign Out" placement="top">
              <div
                style={{
                  marginLeft: "0px",
                  color: "#007cc3",
                  backgroundColor: "#F0EEED",
                  height:"30px",
                  width: "30px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  cursor:"pointer",
                  borderRadius:"5px"
                }}
                onClick={handleLogout}
              >
                <PowerSettingsNewIcon sx={{height:"20px"}} />
              </div>

            </Tooltip>
            {/* <Tooltip title="Change Password" placement="top">
            <div
                 style={{
                  marginLeft: "0px",
                  color: "#007cc3",
                  backgroundColor: "#F0EEED",
                  height:"30px",
                  width: "30px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  cursor:"pointer",
                  borderRadius:"5px"
                 }}
                 onClick={handleOpen2}
              >
              <PublishedWithChangesIcon sx={{height:"20px"}} />
              </div>
              </Tooltip> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseLeave={handleDrawerClose}
        onMouseOver={handleDrawerOpen}
      >
        <DrawerHeader sx={{ backgroundColor: "white" }}>
          <IconButton
            //  onClick={handleDrawerClose}
            sx={{ color: "#007cc3" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HouseIcon
                  sx={{ color: "#007cc3", fontSize: "27px" }}
                  onClick={() => navigate("/admin")}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Admin"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: change1 ? "#007cc3" : "black",
                }}
                onClick={() => navigate("/admin")}
                onMouseEnter={() => setChange1(true)}
                onMouseLeave={() => setChange1(false)}
              />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon
                  sx={{ color: "#007cc3", fontSize: "27px" }}
                  onClick={() => navigate("/master")}
                />
              </ListItemIcon>
              <ListItemText
                primary={"User Dashboard"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: change3 ? "#007cc3" : "black",
                }}
                onMouseEnter={() => setChange3(true)}
                onMouseLeave={() => setChange3(false)}
              />
            </ListItemButton>
          </ListItem> */}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/candidate_database")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBoxIcon sx={{ color: "#007cc3", fontSize: "27px" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Candidate Database"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: change5 ? "#007cc3" : "black",
                }}
                onMouseEnter={() => setChange5(true)}
                onMouseLeave={() => setChange5(false)}
              />
            </ListItemButton>
          </ListItem>
         {role_id === "a758b712-1aaa-445a-a629-df0c3dde9061"?<></>: <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/master")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LibraryAddIcon sx={{ color: "#007cc3", fontSize: "27px" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Master"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: change4 ? "#007cc3" : "black",
                }}
                onMouseEnter={() => setChange4(true)}
                onMouseLeave={() => setChange4(false)}
              />
            </ListItemButton>
          </ListItem>}
          {role_id === "a758b712-1aaa-445a-a629-df0c3dde9061"?<ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/scheduled_interviews")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EventAvailableIcon sx={{ color: "#007cc3", fontSize: "27px" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Scheduled Interviews"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: change6 ? "#007cc3" : "black",
                }}
                onMouseEnter={() => setChange6(true)}
                onMouseLeave={() => setChange6(false)}
              />
            </ListItemButton>
          </ListItem>:<></>}
        </List>
      </Drawer>

     


    </Box>
  );
}
