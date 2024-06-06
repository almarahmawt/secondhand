import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getAllProductByIdSeller } from "../../redux/actions/productsActions";
import NavBar from "../NavBar";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FiBox,
  FiHeart,
  FiDollarSign,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";

export default function DaftarDiminati() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const { offering } = useSelector((state) => state.offering);

  useEffect(() => {
    if (token === null) {
      return navigate("/");
    }
    dispatch(getAllProductByIdSeller());
  }, [dispatch, navigate, token]);

  return (
    <div className="container">
      <div>
        <NavBar />
      </div>
      <div>
        <p className="fw-bold my-3">Daftar Jual Saya</p>
        <div className="row">
          {user === null ? (
            <></>
          ) : (
            <>
              <div
                className="col-xl-1 col-sm-1 col-1 d-flex"
                style={{ width: "70px" }}
              >
                <img
                  src={user.photo_profile}
                  alt=""
                  className="img-fluid align-items-center"
                  style={{ width: "70px", objectFit: "contain" }}
                />
              </div>
              <div className="col-xl-10  col-sm-6 col-9">
                <p className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                  {user.name}
                </p>
                <p className="mb-1" style={{ fontSize: "14px" }}>
                  {user.city}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="row my-4 ">
          <div className="col-3 card p-3">
            <p className="fw-bold" style={{ fontSize: "16px" }}>
              Kategori
            </p>
            <table>
              <tr>
                <td>
                  <FiBox />
                </td>
                <a href={`/daftarjual`}>Semua Produk</a>
                <td>
                  <FiChevronRight />
                </td>
              </tr>

              {/* <tr>
                <td>
                  <FiHeart />
                </td>
                <td>
                  <a href={`/daftarDiminati`}>Diminati</a>
                </td>
                <td>
                  <FiChevronRight />
                </td>
              </tr>
              <tr>
                <td>
                  <FiDollarSign />
                </td>
                <td>Terjual</td>
                <td>
                  <FiChevronRight />
                </td>
              </tr> */}
            </table>
          </div>
          <div className="col-9 ">
            <div className="row justify-content-center">
              <div
                className="col-xl-3 col-md-5 col-sm-12 card m-2"
                style={{
                  border: "2px dashed",
                  color: "#D0D0D0",
                  height: "400px",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                  borderRadius: "4px",
                }}
              >
                <Link
                  to="/infoproduk"
                  className="text-decoration-none m-auto align-items-center"
                  style={{ color: "black" }}
                >
                  <div className="ms-5">
                    <FiPlus />
                  </div>
                  <div>
                    <p>Tambah Produk</p>
                  </div>
                </Link>
              </div>
              {product.length && offering.length === 0 ? (
                <>
                  <h4 className="text-center pt-5">Produk Tidak Tersedia</h4>
                </>
              ) : product.id === offering.id_product ? (
                product.map((item) => (
                  <div
                    key={item.id}
                    className="col-xl-3 col-md-5 col-sm-12 m-2"
                    style={{ border: "1px solid rgba(0,0,0,.125)" }}
                  >
                    <a
                      href="/halamanproduk"
                      className="text-decoration-none"
                      style={{ color: "black" }}
                    >
                      <div
                        className="card "
                        style={{
                          border: "none",
                          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                          padding: "8px, 8px, 16px, 8px",
                          borderRadius: "4px",
                        }}
                      >
                        <div className="d-flex justify-content-center">
                          <img
                            className="card-img-top center-cropped m-1 img-fluid"
                            style={{ height: "250px", objectFit: "cover" }}
                            src={item.image_1}
                            alt="test"
                          />
                        </div>
                        <div className="card-body">
                          <h6
                            className="card-title text-decoration-none"
                            style={{ fontsize: "14px" }}
                          >
                            {item.product_name}
                          </h6>
                          <p
                            className="text-decoration-none"
                            style={{ fontsize: "10px" }}
                          >
                            {item.category}
                          </p>
                          <p
                            className="text-decoration-none"
                            style={{ fontsize: "14px" }}
                          >
                            Rp {item.price}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
