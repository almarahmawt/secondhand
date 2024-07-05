import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductById,
} from "../../redux/actions/productsActions";
import Swal from "sweetalert2";
import { Navigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fi_plus from "../../images/fi_plus.png";
import NavBar from "../NavBar";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { status, detailProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [statusProduct, setStatusProduct] = useState("");

  const checkProductById = async () => {
    if (product_name === "") {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/${id}`
      );
      const result = await response.json();

      setProductName(result.product_name);
      setPrice(result.price);
      setCategory(result.category);
      setDescription(result.description);
      setFile(result.image_1);
    }
  };
  checkProductById();

  const handleSubmit = async () => {    
    setStatusProduct("available");
    let data = { id, product_name, price, category, description, statusProduct };
    if (file !== detailProduct.image_1) data = { ...data, file };
    dispatch(updateProduct(data));
    Swal.fire({
      position: "center",
      title: "Loading...",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to="/" />;
  };

  if (status === "UPDATE_PRODUCT_SUCCESS") {
    window.location.href = "/daftarjual";
  }

  if (user !== null) {
    if (user.address === null) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Harap Lengkapi Info Akun",
        showConfirmButton: false,
        timer: 1000,
      });
      return <Navigate to="/infoprofil" />;
    }
  }

  if (localStorage.getItem("token") === null) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Harap Login Terlebih Dahulu",
      showConfirmButton: false,
      timer: 1000,
    });
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <section className="container my-5">
        <form style={{ maxWidth: "800px" }} className="mx-auto">
          <div>
            <div className="mb-3">
              <label htmlFor="namaproduk" className="form-label">
                Nama Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="namaproduk"
                placeholder="Nama Produk"
                required
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                min="1"
                step="any"
                className="form-control"
                id="harga"
                placeholder="Rp 0,00"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kategori" className="form-label">
                Kategori<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-select"
                id="kategori"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Pilih Kategori</option>
                <option value="Hobi">Hobi</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Baju">Baju</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                placeholder="contoh: Jalan Ikan Hiu 33"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Foto Produk<span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      {file ? (
                        <img src={file} style={{ width: "90px" }} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        placeholder="Upload Image"
                        onChange={(e) => setFile(e.target.files)}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      backgroundColor: "#7126B5",
                      borderRadius: "16px",
                    }}
                  >
                    Terbitkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
