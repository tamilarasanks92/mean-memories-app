import React from "react";
import { AUTH, AUTH_ERROR, FAILED, LOGOUT, SUCCESS } from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...action?.payload, status: SUCCESS, message: "" };
    case LOGOUT:
      localStorage.clear();
      return null;
    case AUTH_ERROR:
      return {status: FAILED, message: action.payload}
    default:
      return state;
  }
};

export default reducer;
