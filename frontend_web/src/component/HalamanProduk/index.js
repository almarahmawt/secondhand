import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import {
  addOffering,
  getOfferbyIDProduct,
} from "../../redux/actions/offeringActions";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import profilpenjual from "../../images/profilpenjual.png";
import nullprofil from "../../images/nullprofil.png";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { Carousel, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import { getProductById } from "../../redux/actions/productsActions";
import { getUserbyID } from "../../redux/actions/authActions";
import emailjs from 'emailjs-com';

export default function HalamanProduk() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailProduct } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const { offering } = useSelector((state) => state.offering);
  const [modalShow, setModalShow] = React.useState(false);
  const form = useRef();

  const [id_product, setIdProduct] = useState("");
  const [offering_price, setOfferingPrice] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(getUserbyID(detailProduct.id_seller));
  }, [dispatch, detailProduct.id_seller]);

  React.useEffect(() => {
    dispatch(getOfferbyIDProduct({ id }));
  }, [dispatch, id]);

  const handleInputOfferingPrice= (event) => {
      setOfferingPrice(event.target.value);
  };

  function handleEdit() {
    return navigate(`/edit-product/${id}`);
  }

  const handleCloseMessage = () => {
    setShowMessage(false);
    return navigate(-1);
    }

  const handleCloseDelete = () => {
    setShowDelete(false);
    }

  async function handleDeleteProduct (id) {
    console.log("delete product to API")
      const deleteproduct = await fetch(`http://localhost:8000/api/v1/product/destroy/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
          },
        });        
      const res = await deleteproduct.json(); 
      console.log(res.code)
      if (res.code !== 200) {
        setMessage("Penawaran Produk masih berjalan. Produk tidak bisa di hapus.");
      } else {
        setMessage("Produk berhasil di hapus.");
      }
      
      setShowMessage(true);
      setShowDelete(false);
      }


  function handleDelete(id) {
    // return navigate(`/edit-product/${id}`);
    console.log("Delete")
    console.log(id)
    setShowDelete(true);
    
  }

  function handleOfferProduct(e){            
    e.preventDefault();   
    const data = {
      id_product: detailProduct.id,
      offering_price: offering_price,
      no_hp: user.no_hp,
      product_name: detailProduct.product_name,
      price: detailProduct.price,
      image: detailProduct.image_1,
    };
    emailjs.sendForm('service_ebr17la', 'template_8eodpjv', form.current, 'RDYjpe7S1Pz1WRrCB')
            .then((result) => {
                console.log(result.text);
                if(result.text == "OK"){
                  dispatch(addOffering(data));
                }
            }, (error) => {
                console.log(error.text);
            });
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

  // handle carosel preview
  const imagepreview = [];
  if (detailProduct.image_1 !== null) {
    imagepreview.push(detailProduct.image_1);
  }
  if (detailProduct.image_2 !== null) {
    imagepreview.push(detailProduct.image_2);
  }
  if (detailProduct.image_3 !== null) {
    imagepreview.push(detailProduct.image_3);
  }
  if (detailProduct.image_4 !== null) {
    imagepreview.push(detailProduct.image_4);
  }

  let cekoffer = [];
  if (offering && user) {
    cekoffer = offering.find((x) => x.id_buyer === user.id);
  }

  return (
    <div className="container">
      {detailProduct.length === 0 ? (
        <></>
      ) : (
        <>
          <div>
            <NavBar />
          </div>
          {user === null ? (
            <>
            </>
          ) : (
            <>
              <div className="container-fluid mt-5">
                <div className="row mx-auto mb-3">
                  <div className="col-xl-6 col-sm-12">
                    {imagepreview === 0 ? (
                      <></>
                    ) : (
                      <Carousel className="boxCarousel">
                        {imagepreview.map((item, index) => {
                          return (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100 boxImagePreview"
                                src={item}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    )}
                    <h5 className="mt-5">Deskripsi</h5>
                    <p>{detailProduct.description}</p>
                  </div>
                  <div className="col-xl-4 col-sm-12">
                    <div className="card mt-1 p-2 rounded mb-2">
                      <h6 className="card-title " style={{ fontsize: "14px" }}>
                        {detailProduct.product_name}
                      </h6>
                      <p style={{ fontsize: "10px" }}>
                        {detailProduct.category}
                      </p>
                      <p style={{ fontsize: "14px" }}>
                        Rp {detailProduct.price}
                      </p>
                      {detailProduct.id_seller === user.id ?  (
                        detailProduct.id_seller === user.id && detailProduct.status === 'sold' ? (
                          <></>
                        ) : (
                          <>
                          <button
                            className="btn btn-custom me-3 mb-2 "
                            onClick={() => handleEdit(detailProduct.id)}
                          >
                            {" "}
                            Edit
                          </button>
                          <button
                            className="btn btn-custom me-3 mb-2 "
                            onClick={() => handleDelete(detailProduct.id)}
                          >
                            {" "}
                            Delete
                          </button>
                        </>
                        )                        
                      ) : (
                        <>
                          {cekoffer === null || cekoffer === undefined  && detailProduct.status !== 'sold' ? (
                            <>
                              <button
                                className="btn btn-custom me-3 mb-2 "
                                onClick={() => setModalShow(true)}
                                id="suksesnego"
                              >
                                Saya tertarik dan ingin nego
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-custom me-3 mb-2 "
                              // onClick={() => setModalShow(true)}
                              id="suksesnego"
                              disabled
                            >
                              Saya tertarik dan ingin nego
                            </button>
                          )}
                        </>
                      )}
                    </div>                    
                  </div>
                </div>
              </div>
              <div>
                {/* <ModalTawar
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}

              <Modal show={showDelete} onHide={handleCloseDelete}>
                  <Modal.Body style={{textAlign:'center'}}>
                      Anda yakin akan menghapus produk?                      
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                          Close
                      </Button>
                      <Button className="btnOutline me-2 px-3" data-bs-toggle="modal" 
                          onClick={()=>handleDeleteProduct(id)}>
                          OK
                      </Button>
                  </Modal.Footer>    
              </Modal>

              <Modal show={showMessage} onHide={handleCloseMessage}>
                  <Modal.Body style={{textAlign:'center'}}>
                      {message}                     
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseMessage}>
                          Close
                      </Button>
                  </Modal.Footer>    
              </Modal>

              <Modal show={modalShow} onHide={() => setModalShow(false)}>
                      <form ref={form} onSubmit={handleOfferProduct}>
                          <input type="hidden" id="name" name="name" value={user.name}/>
                          <input type="hidden" id="email" name="email" value={user.email}/>
                          <input type="hidden" id="no_hp" name="no_hp" value={user.no_hp}/>
                          <input type="hidden" id="product" name="product" value={detailProduct.product_name}/>
                          <input type="hidden" id="price" name="price" value={detailProduct.price}/>
                          <Modal.Body style={{textAlign:'center'}}>    
                              <p style={{ fontSize: "14px" }}>
                                Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan
                                segera dihubungi penjual.
                              </p>
                              <div className="row p-1">
                                <div className="col-6 m-auto" style={{textAlign:'right'}}>
                                  <img
                                    src={profilpenjual}
                                    alt="profilpenjual"
                                    style={{ widht: "48" }}
                                  />
                                </div>
                                <div
                                  className="col-6"
                                  style={{
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    paddingTop: "18px",
                                    paddingLeft: "5px",
                                    textAlign:'left'
                                  }}
                                >
                                  <b>{detailProduct.product_name}</b>
                                  <p>Rp {detailProduct.price}</p>
                                </div>
                              </div>  
                              <div className="mb-3">
                                <label htmlFor="offering_price" className="form-label">
                                  Harga Tawar
                                </label>
                                <input
                                  type="number"
                                  className="form-control rounded "
                                  id="offering_price"
                                  name="offering_price"
                                  placeholder="Rp 0,00"
                                  style={{ borderRadius: "16px" }}
                                  value={offering_price}
                                  onChange={handleInputOfferingPrice}
                                />
                              </div>                    
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={() => setModalShow(false)}>
                                  Close
                              </Button>
                              <button className="btn btn-primary" type="submit">OK</button>
                          </Modal.Footer>                        
                      </form>
              </Modal>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
