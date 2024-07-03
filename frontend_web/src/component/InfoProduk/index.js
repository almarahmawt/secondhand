import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/productsActions";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import fi_plus from "../../images/fi_plus.png";
import NavBar from "../NavBar";

export default function InfoProduk() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.product);

  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { product_name, price, category, description, file };
    console.log(data)
    dispatch(addProduct(data));
  };

  if (status === "PRODUCT_ADDED") {
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
              <label for="namaproduk" className="form-label">
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
              <label for="harga" className="form-label">
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
              <label for="kategori" className="form-label">
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
              <label for="deskripsi" className="form-label">
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
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
              <label for="deskripsi" className="form-label">
                Foto Produk<span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      {file ? (
                        <img src={file} alt="" />
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
