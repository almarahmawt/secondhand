import Swal from "sweetalert2";
import {
  AUTH_ERROR,
  LOGIN,
  REGISTER,
  CLEAR,
  LOGOUT,
  UPDATE_INFO_USERS,
  GET_USER,
  GET_USER_ERROR,
} from "./types";

export const login = (data) => async (dispatch) => {
  // localStorage.setItem("userId", user.data.id);
  // localStorage.setItem("userEmail", user.data.email);
  // localStorage.setItem("userInfo", JSON.stringify(data));
  try {
    const response = await fetch("http://localhost:8000/api/v1/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.token) {
      dispatch({
        type: LOGIN,
        token: result.token,
        user: result.user,
        status: result.status,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      authError(result.error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Email or Password is incorrect",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const regis = (data) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 422) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    dispatch({
      type: REGISTER,
      status: result.status,
    });
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Registration Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
  try {
    const data = {
      access_token: accessToken,
    };
    const response = await fetch("http://localhost:8000/api/v1/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.token) {
      await dispatch({
        type: LOGIN,
        token: result.token,
        user: result.user,
        status: result.status,
      });
      await Swal.fire({
        title: "Success",
        text: "You have successfully logged in",
        icon: "success",
      });
    } else {
      authError(result.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }
  } catch (error) {
    authError(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export const cekTokenExp = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/whoami`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();

    if (response.status === 401) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({
        type: LOGOUT,
      });
    } else {
      dispatch({
        type: LOGIN,
        token: localStorage.getItem("token"),
        user: result.user,
      });
    }
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Session Expired, Please Login Again",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const updateInfoUsers = (data) => async (dispatch) => {
  try {
    var formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("city", data.city);
    formdata.append("address", data.address);
    formdata.append("no_hp", data.no_hp);

    if (data.file) {
      formdata.append("picture", data.file);
    }

    const response = await fetch(
      "http://localhost:8000/api/v1/profile/update",
      {
        method: "PUT",
        body: formdata,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = await response.json();
    console.log(result);

    dispatch({
      type: UPDATE_INFO_USERS,
      user: result.user,
      status: result.status,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update Successful",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Update Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR,
  });
};

const authError = (error) => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: error.message,
  });

  setTimeout(() => {
    dispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  }, 5000);
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Logout Successful",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const getUserbyID = (params) => async (dispatch) => {
  try {
    const id = params;
    console.log(id);
    const response = await fetch(`http://localhost:8000/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ERROR,
      payload: error.response,
    });
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
