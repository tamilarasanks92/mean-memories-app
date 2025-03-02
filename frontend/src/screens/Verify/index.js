import React, { useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import InputTextField from "../../components/InputTextField";
import { verify } from "../../store/actions/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { FAILED } from "../../store/constants";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useSelector((state) => state?.profile);
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerify = () => {
    setLoading(true);
    dispatch(
      verify({ data: location.state.data, otp: password }, navigate)
    ).then(() => setLoading(false));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={styles.paper} elevation={3}>
        <Avatar
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            margin: theme.spacing(1),
          })}
        >
          <LockIcon />
        </Avatar>
        <InputTextField
          name="OTP"
          label="Enter OTP"
          handleChange={handleChange}
          autoFocus
          half
        />
        {profile?.status === FAILED && (
          <Typography color="red" component="p" variant="body2">
            {profile.message}
          </Typography>
        )}
        <Button
          sx={{ marginTop: 2 }}
          disabled={loading}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleVerify}
        >
          {loading ? <CircularProgress size={23} color="white" /> : "Verify"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Verify;
