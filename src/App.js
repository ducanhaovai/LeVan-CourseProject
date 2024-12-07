import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logos/logoLevan.png";
import LoadingSpinner from "hook/LoadingSpinner";
import { ChatProvider } from "hook/ChatContext";
import ChatDock from "layouts/Chat/components/ChatDock";
import { NotificationProvider } from "hook/NotificationContext";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enters on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Manage loading spinner on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      return route.route ? (
        <Route path={route.route} element={route.element} key={route.key} />
      ) : null;
    });
  };

  const configsButton = (
    <SoftBox
      display="none"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        setting
      </Icon>
    </SoftBox>
  );

  // Determine if we should show ChatDock
  const shouldShowChatDock = !["/authentication/sign-in", "/authentication/sign-up"].includes(
    pathname
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <NotificationProvider>
      <ChatProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="Le Van Academy"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          </Routes>
          {shouldShowChatDock && <ChatDock />}
        </ThemeProvider>
      </ChatProvider>
    </NotificationProvider>
  );
}
