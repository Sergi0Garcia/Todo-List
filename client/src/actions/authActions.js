import axios from "axios";
import { returnErrors } from "./errorActions";
import { setTasksLoading } from "./taskActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_TASKS
} from "./types";

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User laoding
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//REGISTER USER
export const register = ({ name, email, password }) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//LOGIN USER
export const login = ({ email, password }) => (dispatch, getState) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res => {
      dispatch(setTasksLoading());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      axios
        .get("/api/tasks", tokenConfig(getState))
        .then(res => {
          return dispatch({
            type: GET_TASKS,
            payload: res.data
          });
        })
        .catch(err => {
          console.log("dcasdvdsva");
          return dispatch(returnErrors(err.response.data, err.response.status));
        });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//LOGOUT User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
