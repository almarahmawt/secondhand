import Swal from "sweetalert2";
import {
  CREATE_OFFERING,
  GET_ALL_OFFERING,
  OFFERING_ERROR,
  GET_ALL_OFFER,
  GET_OFFER,
  UPDATE_OFFERING,
} from "./types";
import axios from "axios";

export const getAllOffer = () => async (dispatch) => {
  try {
      const res = await fetch(`http://localhost:8000/api/v1/products/alloffer`);
      const data = await res.json();
      dispatch({
          type: GET_ALL_OFFER,
          offering: data,
          status: "OK",
      });
  } catch (err) {
      dispatch({
          type: OFFERING_ERROR,
          payload: err.response.data.msg,
      });
  }
};

export const addOffering = (params) => async (dispatch) => {
  try {
    const id_product = params.id_product;
    const offering_price = params.offering_price;
    const no_hp = params.no_hp;
    const product_name = params.product_name;
    const price = params.price;
    const image = params.image;
    const status = 'Ditawarkan';
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "http://localhost:8000/api/v1/products/offer",
      {
        id_product,
        offering_price,
        no_hp,
        status,
        product_name,
        price,
        image
      },
      config
    );
    const data = await response.data;

    console.log(data);

    dispatch({
      type: CREATE_OFFERING,
      status: data.status,
    });
    Swal.fire({
      title: "Berhasil",
      text: "Harga tawaranmu telah terkirim",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 150000,
    });
  }
};

export const updateOffering = (params) => async (dispatch) => {
  try {
      const id = params.id;
      const status = params.status;

      const response = await fetch(`http://localhost:8000/api/v1/product/offered/update/${id}/${status}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      const data = await response.json();

      dispatch({
          type: UPDATE_OFFERING,
          status: data.status,
      });

      Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
      });
  } catch (error) {
      dispatch({
          type: OFFERING_ERROR,
          payload: error.response,
      });

      Swal.fire({
          position: "center",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500,
      });
  }
};

export const getOfferbyIDProduct = (params) => async (dispatch) => {
  try {
    const id = params.id;
    const response = await fetch(
      `http://localhost:8000/api/v1/products/offered/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    console.log("ini data" + JSON.stringify(data));
    dispatch({
      type: GET_OFFER,
      detailoffer: data,
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
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

export const getOfferingByIdBuyer = (params) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/products/offer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: GET_ALL_OFFERING,
      offering: data,
      status: "ID_BUYER",
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
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
