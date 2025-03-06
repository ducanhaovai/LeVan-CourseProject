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
import useRoutes  from "../src/routes"
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logos/logoLevan.png";
import LoadingSpinner from "hook/LoadingSpinner";
import { ChatProvider } from "hook/ChatContext";
import ChatDock from "layouts/Chat/components/ChatDock";
import { NotificationProvider } from "hook/NotificationContext";

import { jwtDecode } from "jwt-decode";
import checkTokenExpiration from "hook/checkTokenExpiration";
import { useTranslation } from 'react-i18next';
export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    checkTokenExpiration();
  }, [pathname]);
  const routes = useRoutes();
  const getRoutes = (allRoutes) => {
    const token = localStorage.getItem("token");
    let userRole = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    }

    return allRoutes.map((route) => {
      if (
        route.element?.type?.name === "ProtectedRoute" &&
        route.element?.props?.role === 1 &&
        userRole !== 1
      ) {
        return null;
      }

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
            <Route path="/" element={<Navigate to="/home" replace />} />
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/authentication/sign-in" replace />} />
          </Routes>
          {shouldShowChatDock && <ChatDock />}
        </ThemeProvider>
      </ChatProvider>
    </NotificationProvider>
  );
}
