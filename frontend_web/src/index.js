import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import reportWebVitals from "./reportWebVitals";
import {
  LandingPage,
  HalamanProduk,
  Login,
  Regis,
  InfoProduk,
  DaftarJual,
  DaftarDiminati,
  EditProduct,
  InfoPenawaran,
} from "./component";
import { InfoProfil } from "./component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId="1015150245337-9ipu5ts9u5n4o1e7n20bqfo6dlqgsr5p.apps.googleusercontent.com">
              <Login />
            </GoogleOAuthProvider>
          }
        />
        <Route path="/regis" element={<Regis />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/halamanproduk/:id" element={<HalamanProduk />} />
        <Route path="/infoprofil" element={<InfoProfil />} />
        <Route path="/infoproduk" element={<InfoProduk />} />
        <Route path="/daftarjual" element={<DaftarJual />} />
        <Route path="/daftarDiminati" element={<DaftarDiminati />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />        
        <Route path="/infopenawaran" element={<InfoPenawaran />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
