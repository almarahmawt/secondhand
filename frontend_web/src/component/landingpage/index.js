import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/actions/productsActions";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import CarouselBanner from "../Carousel";
import { FiSearch } from "react-icons/fi";
import ButtonJual from "../ButtonJual";
import Footer from "../Footer";
import { Container } from "react-bootstrap";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);  
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch, user]);

  
  console.log(user);

  return (
    <Container className="App">
      <NavBar />
      <CarouselBanner />
      <Container className="container py-3">
        <p className="fw-bold">Telusuri Kategori</p>
        <div
          className="container py-3 d-flex buttonradius12"
          style={{ overflowX: "auto" }}
        >
          <button
            className="btn btn-custom me-3 buttonradius12 "
            id="filtersemua"
          >
            <FiSearch /> Semua
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterHobi"
          >
            <FiSearch /> Hobi
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterKendaraan"
          >
            <FiSearch /> Kendaraan
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterBaju"
          >
            <FiSearch /> Baju
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterElektronik"
          >
            <FiSearch /> Elektronik
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterKesehatan"
          >
            <FiSearch /> Kesehatan
          </button>
        </div>
      </Container>
      <div id="card" className="container">
        <div className="row">
          {product.length === 0 ? (
            <>
              <h4 className="text-center py-4">Produk Tidak Tersedia</h4>
            </>
          ) : (
            product.map((item) => (
              <div key={item.id} className="col-md-4 col-xl-2 col-sm-12">
                <a
                  href={`/halamanproduk/${item.id}`}
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <div className="card " style={{ border: "none" }}>
                    <div className="d-flex justify-content-center ">
                      <img
                        className="card-img-top center-cropped m-1 img-fluid"
                        src={item.image_1}
                        style={{
                          width: "200px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                        alt="test"
                      />
                    </div>
                    <div className="card-body mb-3">
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
          )}
        </div>
      </div>
      {user != null && user.email == 'renamuliani@gmail.com' ? (
            <ButtonJual />
          ) : (
            <></>
          )}
      <div>
        <Footer />
      </div>
    </Container>
  );
}
