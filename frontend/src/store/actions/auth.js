import * as api from "../../api";
import { AUTH, AUTH_ERROR } from "../constants";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error?.response?.data?.message || error.message });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    navigate("/verify", { state: data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error?.response?.data?.message || error.message });
  }
};

export const verify = (verifyData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.verifyOTP(verifyData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error?.response?.data?.message || error.message });
  }
};
