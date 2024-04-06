import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuards = (props) => {
  const loggedInUser = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/", { replace: true });
    }
    if (pathname === "/" && !loggedInUser) {
      navigate("/login", { replace: true });
    }
  }, [loggedInUser, navigate, pathname]);
  return <>{!loggedInUser && props.children}</>;
};

export default GuestGuards;
