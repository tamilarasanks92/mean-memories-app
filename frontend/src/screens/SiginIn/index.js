import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid2 as Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, FAILED } from "../../store/constants";
import { signin, signup } from "../../store/actions/auth";
import FormTextField from "../../FormComponents/FormTextField";

const initialSignupForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialSigninForm = {
  email: "",
  password: "",
};

const signinValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("No password provided")
    .min(3, "Password is too short, minimum 8 characters")
    .max(15, "Password is long maximum 15 characters"),
});

const signupValidationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("No password provided")
    .min(3, "Password is too short, minimum 8 characters")
    .max(15, "Password is long maximum 15 characters"),
  confirmPassword: yup
    .string()
    .required("No confirm password provided")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(
      isSignUp ? signupValidationSchema : signinValidationSchema
    ),
    defaultValues: isSignUp ? initialSignupForm : initialSigninForm,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.profile);
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onSubmit = (formData) => {
    setLoading(true);
    if (isSignUp) {
      dispatch(signup(formData, navigate)).then(() => {
        setLoading(false);
      });
    } else {
      dispatch(signin(formData, navigate)).then(() => {
        setLoading(false);
      });
    }
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
        <Typography>{isSignUp ? "SignUp" : "SignIn"}</Typography>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <FormTextField
                  name="firstName"
                  label="First Name"
                  control={control}
                  half
                />
                <FormTextField
                  name="lastName"
                  label="Last Name"
                  control={control}
                  half
                />
              </>
            )}
            <FormTextField
              name="email"
              label="Email Address"
              control={control}
              autoFocus={!isSignUp}
            />
            <FormTextField
              name="password"
              label="Password"
              control={control}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <FormTextField
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                control={control}
              />
            )}
            {profile?.status === FAILED && (
              <Typography color="red" component="p" variant="body2">
                {profile.message}
              </Typography>
            )}
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
              size="small"
              fullWidth
            >
              {loading ? (
                <CircularProgress size={23} color="white" />
              ) : isSignUp ? (
                "SignUp"
              ) : (
                "SignIn"
              )}
            </Button>
          </Grid>
        </form>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const data = jwtDecode(credentialResponse.credential);
            try {
              dispatch({
                type: AUTH,
                payload: { result: data, token: credentialResponse.credential },
              });
              navigate("/");
            } catch (error) {
              console.log("Error while dispatching auth reducer");
            }
          }}
          onError={(error) => {
            console.log("Error: ", error);
          }}
        />
        <Grid container spacing={2}>
          <Typography>
            {isSignUp ? "Already registered?" : "Don't have an account?"}
          </Typography>
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={() =>  {
              reset()
              setIsSignUp((prevState) => !prevState)
            }}
          >
            {isSignUp ? "SignIn" : "SignUp"}
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignIn;
