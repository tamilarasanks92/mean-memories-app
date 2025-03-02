import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import styles from "./styles.module.css";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { LOGOUT } from "../../store/constants";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/login");
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar
      sx={{ flexDirection: "row", justifyContent: "space-between" }}
      className={styles["appbar"]}
      position="fixed"
      color="inherit"
    >
      <div
        style={{
          paddingLeft: 20,
          display: "flex",
          width: "50%",
          alignItems: "flex-end",
        }}
      >
        <Typography
          component={Link}
          to="/"
          className={styles["heading"]}
          variant="h2"
        >
          Memories
        </Typography>
        <img
          className={styles["image"]}
          src={memories}
          alt="memories"
          height={60}
          width={60}
        />
      </div>
      <Toolbar sx={{ width: "100%", justifyContent: "flex-end" }}>
        {user ? (
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              width: "50%",
              alignItems: "flex-end",
            }}
          >
            <Avatar alt={user.result.name} src={user.result.picture} />
            <Typography variant="h5">{user.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Signout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
