import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/apiAuth";
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { io } from "socket.io-client";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
  setOpenConfiguratorChat,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { Popover } from "@mui/material";
import ProfilesList from "examples/Lists/ProfilesList";
import { fetchNotifications } from "api/apiNotifications";

function DashboardNavbar({ absolute = false, light = false, isMini = false }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, openConfiguratorChat } =
    controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElChat, setAnchorElChat] = useState(null);
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();
  const socket = io("https://node.levanacademy.com");
  const [notifications, setNotifications] = useState([]);
  const [enrollmentNotifications, setEnrollmentNotifications] = useState([]);
  const [registrationNotifications, setRegistrationNotifications] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id, role } = decodedToken;
        if (role === 1) {
          fetchNotifications(id)
            .then((data) => {
              if (data && data.success) {
                setNotifications(data.data[0]);
              } else {
                setNotifications([]);
              }
            })
            .catch((error) => {
              console.error("Fetching notifications failed", error);
              setNotifications([]);
            });
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);
  useEffect(() => {
    if (userID) {
      async function loadNotifications() {
        const result = await fetchNotifications(userID);
        if (result.success) {
          setNotifications(result.data);
        } else {
          console.error(result.error);
        }
      }
      loadNotifications();
    }
  }, [userID]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id } = decodedToken;
        setUserID(id);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { first_name, last_name } = decodedToken;
        setUser({ first_name, last_name });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
  const handleNotificationClick = (index) => {
    setNotifications((prev) =>
      prev.map((notification, i) => (i === index ? { ...notification, read: true } : notification))
    );
  };
  const handleProfileMenuClose = () => {
    navigate(`/profile`);
    setAnchorElProfile(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleChatOpen = (event) => {
    setAnchorElChat(event.currentTarget);
  };
  const handleChatClose = () => {
    setAnchorElChat(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logout(token);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
        handleProfileMenuClose();
        navigate("/authentication/sign-in");
      } catch (error) {
        console.error("Error during logout", error);
      }
    }
  };
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleConfiguratorChatOpen = () => setOpenConfiguratorChat(dispatch, !openConfiguratorChat);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 300, // Set a maximum height for the menu
            overflow: "auto", // Make the menu scrollable
          },
        }}
        sx={{ mt: 2 }}
      >
        {/* notification */}
        <h2 className="text-lg font-semibold">Notifications</h2>
        {notifications.slice(0, 6).map((notification, index) => {
          const parsedDate = new Date(notification.created_at);
          const displayDate = isNaN(parsedDate.getTime())
            ? "Invalid Date"
            : parsedDate.toLocaleString();

          return (
            <NotificationItem
              key={index}
              title={notification.message}
              date={displayDate}
              email={notification.email}
              onClick={() => handleNotificationClick(index)}
              isRead={notification.read}
            />
          );
        })}
      </Menu>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "chat-popover" : undefined;

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
            <SoftBox
              color={light ? "white" : "inherit"}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {user ? (
                <div className="min-w-fit">
                  <SoftBox display="flex" flexDirection="row  " alignItems="center" flex={1}>
                    <IconButton sx={navbarIconButton} size="small" onClick={handleProfileMenuOpen}>
                      <img
                        src={team2}
                        alt="profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                    <SoftTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    ></SoftTypography>
                    <Menu
                      anchorEl={anchorElProfile}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElProfile)}
                      onClose={handleProfileMenuClose}
                    >
                      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                      <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </SoftBox>
                </div>
              ) : (
                <Link to="/authentication/sign-in">
                  <IconButton sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <SoftTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    >
                      Sign in
                    </SoftTypography>
                  </IconButton>
                </Link>
              )}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <div>
                <IconButton
                  size="small"
                  color="inherit"
                  aria-haspopup="true"
                  sx={navbarIconButton}
                  onClick={handleChatOpen} // Mở Popover
                >
                  <Icon>message-circle</Icon>
                </IconButton>
                <Popover
                  id={id}
                  open={Boolean(anchorElChat)}
                  anchorEl={anchorElChat}
                  onClose={handleChatClose} // Đóng Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      width: "400px", // Điều chỉnh kích thước popup
                      maxHeight: "500px",
                    },
                  }}
                  disableScrollLock={true}
                >
                  <ProfilesList title="Chat with Users" />
                </Popover>
              </div>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
                {Array.isArray(notifications) && notifications.some((n) => !n.read) && (
                  <SoftBox
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: "red",
                      borderRadius: "50%",
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  />
                )}
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavbar;
