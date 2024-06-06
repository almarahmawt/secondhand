import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoUsers } from "../../redux/actions/authActions";

import NavBar from "../NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import arrow from "../../images/fi_arrow-left.png";
import Group1 from "../../images/Group_1.png";
import Swal from "sweetalert2";

export default function InfoProfil() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [role, setRole] = useState("");
  const [photo_profile, setPhotoProfile] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    getUserById();
  });

  const handleSubmit = async () => {
    const data = { name, city, address, no_hp, role, file };
    dispatch(updateInfoUsers(data));
    // swal loading
    Swal.fire({
      title: "Loading...",
      text: "Please wait...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  };

  const getUserById = async () => {
    if (name === "" && role === "") {
      const response = await fetch(`http://localhost:8000/api/v1/whoami`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setName(result.user.name);
      setRole(result.user.role);
      setPhotoProfile(result.user.photo_profile);
      setCity(result.user.city);
      setAddress(result.user.address);
      setNo_hp(result.user.no_hp);
    }
  };

  if (status === "UPDATE_SUCCESS") {
    window.location.href = "/";
  }

  return (
    <div>
      <NavBar />
      <section>
        <form>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            hidden
          />
          <div className="container" style={{ padding: "30px", width: "70%" }}>
            <a href="/">
              <img src={arrow} alt="" />
            </a>
            <label
              for="file-input"
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {photo_profile ? (
                <img
                  src={photo_profile}
                  alt=""
                  style={{ maxHeight: "150px" }}
                />
              ) : (
                <img src={Group1} alt=".." />
              )}
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="mb-3">
              <label for="nama" className="form-label">
                Nama<span style={{ color: "red}" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                placeholder="Nama"
                required
                style={{ borderRadius: "16px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="kota" className="form-label">
                Kota<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="kota"
                placeholder="Kota"
                required
                style={{ borderRadius: "16px" }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="alamat" className="form-label">
                Alamat<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                placeholder="contoh: Jalan Ikan Hiu 33"
                required
                style={{ borderRadius: "16px" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="nohp" className="form-label">
                No. Handphone<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="nohp"
                placeholder="contoh: 628123456789"
                required
                style={{ borderRadius: "16px" }}
                value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
              />
            </div>
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
                Simpan
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
