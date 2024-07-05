import Swal from "sweetalert2";
import { 
    GET_ALL_PRODUCT, 
    GET_PRODUCT, 
    CREATE_PRODUCT, 
    UPDATE_PRODUCT, 
    CLEAR_PRODUCT,
    PRODUCT_ERROR, 
    DELETE_PRODUCT } from "./types";

const { REACT_APP_BACKEND } = process.env;

// Di Halaman Landing Page
export const getAllProduct = () => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:8000/api/v1/products`);
        const data = await res.json();
        dispatch({
            type: GET_ALL_PRODUCT,
            product: data,
            status: "OK",
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.msg,
        });
    }
};

// Di Halaman Daftar Jual
export const getAllProductByIdSeller = (params) => async (dispatch) => {

    try {
        const response = await fetch(`http://localhost:8000/api/v1/product`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();

        dispatch({
            type: GET_ALL_PRODUCT,
            product: data,
            status: "ID_SELLER",
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
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

export const getProductById = (id) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:8000/api/v1/product/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        dispatch({
            type: GET_PRODUCT,
            detailproduct: data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.msg,
        });
    }
};

export const addProduct = (params) => async (dispatch) => {
    try {
        var formdata = new FormData();
        formdata.append("product_name", params.product_name);
        formdata.append("price", params.price);
        formdata.append("category", params.category);
        formdata.append("description", params.description);
        formdata.append("picture", params.file);

        for (let i = 0; i < params.file.length; i++) {
            formdata.append("picture", params.file[i]);
        }

        console.log(formdata)

        const response = await fetch("http://localhost:8000/api/v1/product", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formdata,
        });

        const data = await response.json();
        console.log("ini" + JSON.stringify(data))
        dispatch({
            type: CREATE_PRODUCT,
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
            type: PRODUCT_ERROR,
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

export const updateProduct = (params) => async (dispatch) => {
    try {
        var formdata = new FormData();
        // formdata.append("id_seller", params.idSeller);
        formdata.append("product_name", params.product_name);
        formdata.append("price", params.price);
        formdata.append("category", params.category);
        formdata.append("description", params.description);
        
        formdata.append("status", params.statusProduct);

        // Upload new image
        if (params.file) {
            for (let i = 0; i < params.file.length; i++) {
                formdata.append("picture", params.file[i]);
            }
        } else {
            formdata.append("picture", "");
        }
        
        console.log(formdata)

        const response = await fetch(`http://localhost:8000/api/v1/product/update/${params.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formdata,
        });

        const data = await response.json();

        dispatch({
            type: UPDATE_PRODUCT,
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
            type: PRODUCT_ERROR,
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

export const deleteProduct = (params) => async (dispatch) => {
    const { id, oldImage } = params;
    try {
        const response = await fetch(REACT_APP_BACKEND + "/api/v1/product?" + new URLSearchParams({ id, oldImage }), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        dispatch({
            type: DELETE_PRODUCT,
            payload: data.status,
        });

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Delete success",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: error,
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

export const clearProduct = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCT,
    });
};
