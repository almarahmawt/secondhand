import React, {useState, useEffect, useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import arrow from "../../images/fi_arrow-left.png";
import Rectangle127 from "../../images/Rectangle127.svg";
import {Stack, Button, Toast} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

import {
    updateProduct,
    getProductById,
  } from "../../redux/actions/productsActions";
import { getAllOffer, updateOffering } from "../../redux/actions/offeringActions";

export default function InfoPenawaran() {
    let [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { offering } = useSelector((state) => state.offering);
    const { status, detailProduct } = useSelector((state) => state.product);
    const [showTerima, setShowTerima] = useState(false);
    const [showTolak, setShowTolak] = useState(false);
    const [activeOfferingID, setActiveOfferingID] = useState(0);
    const [activeOfferingPrice, setActiveOfferingPrice] = useState(0);
    const [activeOfferingProductPrice, setActiveOfferingProductPrice] = useState(0);
    const [activeOfferingProductName, setActiveOfferingProductName] = useState("");   
    const [dataUser, setDataUser] = useState([]); 
    const form = useRef();

    useEffect(() => {
        dispatch(getAllOffer());
      }, [dispatch]);

    const handleCloseTerima = () => {
        setShowTerima(false);
        }

    const handleCloseTolak = () => {
        setShowTolak(false);
        }
    
    async function handleShowTolak (offeringId, userID, offeringPrice, productPrice, productName) {
        setShowTolak(true);
        setActiveOfferingID(offeringId);
        setActiveOfferingPrice(offeringPrice);
        setActiveOfferingProductPrice(productPrice);
        setActiveOfferingProductName(productName)
        const resuser = await fetch(`http://localhost:8000/api/v1/users/${userID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          });        
        const datauser = await resuser.json(); 
        setDataUser(datauser); 
        }
    
    async function handleShowTerima (offeringId, userID, offeringPrice, productPrice, productName, productID) {
        
        dispatch(getProductById(productID));

        setShowTerima(true);
        setActiveOfferingID(offeringId);
        setActiveOfferingPrice(offeringPrice);
        setActiveOfferingProductPrice(productPrice);
        setActiveOfferingProductName(productName)
        const resuser = await fetch(`http://localhost:8000/api/v1/users/${userID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          });        
        const datauser = await resuser.json(); 
        setDataUser(datauser); 
        }

    async function handleSendOffering(e){            
        e.preventDefault();   
        
        console.log(detailProduct);
        let file = detailProduct.image_1;        
        let id = detailProduct.id;
        let product_name = detailProduct.product_name;
        let price = detailProduct.price;
        let category = detailProduct.category;
        let description = detailProduct.description ;
        let statusProduct = "sold";
        let dataProduk = { id, product_name, price, category, description, file, statusProduct };
        dispatch(updateProduct(dataProduk));

        emailjs.sendForm('service_2fqkkkc', 'template_wi7g4vl', form.current, 'uE_vf4RW2-C-X4Shh')
            .then((result) => {
                console.log(result.text);
                if(result.text == "OK"){
                    let statusOffer = "Terima"
                    let data = { id : activeOfferingID, status : statusOffer };
                    dispatch(updateOffering(data));
                    // window.location.reload();                    
                }
            }, (error) => {
                console.log(error.text);
            });
        }

    function handleSendRejectOffering(e){            
        e.preventDefault();      
        emailjs.sendForm('service_2fqkkkc', 'template_sfog45h', form.current, 'uE_vf4RW2-C-X4Shh')
            .then((result) => {
                console.log(result.text);
                if(result.text == "OK"){
                    let statusOffer = "Tolak"
                    let data = { id : activeOfferingID, status : statusOffer };
                    dispatch(updateOffering(data));
                    // window.location.reload();
                }
            }, (error) => {
                console.log(error.text);
            });
        }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light d-inline-flex" style={{justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                <div className="d-inline-flex" style={{padding: "10px", justifyContent: "center", alignItems: "center"}}>
                    <a className="navbar-brand" href="/">
                        {" "}
                        <img src={Rectangle127} alt="" />
                    </a>
                </div>

                <div className="d-inline-flex" style={{justifyContent: "center", alignItems: "center"}}>
                    <span className="navbar-brand mb-0 h1" style={{fontWeight: "400px"}}>
                        Info Penawaran
                    </span>
                </div>

                <div className="d-inline-flex" style={{justifyContent: "center", alignItems: "center"}}>
                    <span className="navbar-brand mb-0 h1"></span>
                </div>
            </nav>
            <section className="d-flex justify-content-center">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="position-absolute notifToast px-2">
                    <Toast.Body>Status produk berhasil diperbarui</Toast.Body>
                </Toast>
                <div className="container mt-3" style={{maxWidth: "700px"}}>
                    <a href="/">
                        {" "}
                        <img src={arrow} alt="" />
                    </a>
                    <div className="mt-4" style={{padding: "5px"}}>
                        <h5 className="my-auto" style={{fontSize: "14px", lineHeight: "24px"}}>
                            Daftar Produkmu yang Ditawar
                        </h5>
                        {offering.length === 0 ? (
                            <>
                            <h4 className="text-center pt-5">Tidak ada produk yang ditawar.</h4>
                            </>
                        ) : (
                            offering.map((produk, index) => (
                                <div key={`modal${index}`}>
                                    <div style={{marginTop: "10px", marginBottom: "70px"}}>
                                        <Stack direction="horizontal" gap={3}>
                                            {produk.status === "Ditawarkan" ? (
                                                <img src={produk.image} alt="" style={{width:'200px'}} className="imageSmall align-self-start mt-1" />
                                            ): (
                                                <img src={produk.image} alt="" style={{width:'200px'}} className="imageSmall align-self-start mt-1" />
                                            )}
                                            <div>
                                                <p className="my-auto" style={{fontSize: "12px", color: "#BABABA"}}>
                                                    Penawaran Produk
                                                </p>
                                                <h5 className="my-auto" style={{fontSize: "14px", lineHeight: "26px"}}>
                                                    {produk.product_name}
                                                </h5>
                                                <h5 className="my-auto" style={{fontSize: "14px", lineHeight: "26px"}}>
                                                    Harga Asli : {produk.price}
                                                </h5>
                                                <h5 className="my-auto" style={{fontSize: "14px", lineHeight: "26px"}}>
                                                    Harga Penawaran : {produk.offering_price}
                                                </h5>
                                            </div>
                                            <p className="align-self-start ms-auto" style={{fontSize: "12px", color: "#BABABA"}}>
                                                {produk.updatedAt}
                                            </p>
                                        </Stack>
                                        {produk.status === "Ditawarkan" ? (
                                            <div className="float-end mt-2">
                                                <Button className="btnOutline me-2 px-5" data-bs-toggle="modal" 
                                                    onClick={()=>handleShowTolak(produk.id, produk.id_buyer, produk.offering_price, produk.price, produk.product_name)}>
                                                    Tolak
                                                </Button>
                                                <Button className="btnPrimary px-5" data-bs-toggle="modal" 
                                                    onClick={()=>handleShowTerima(produk.id, produk.id_buyer, produk.offering_price, produk.price, produk.product_name, produk.id_product)}>
                                                    Terima
                                                </Button>
                                            </div>
                                        ) : 
                                        produk.status=== "Tolak" ? (
                                            <div className="float-end mt-2">
                                                <a className="btn btn-warning px-3">
                                                    Penawaran di Tolak
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="float-end mt-2">
                                                <a className="btnPrimary px-3" href={`https://wa.me/${produk.no_hp}`} style={{textDecoration: 'none'}}>
                                                    Hubungi di <i className="bi bi-whatsapp ms-2"></i>
                                                </a>
                                            </div>
                                        )}     
                                    </div>
                                    <hr className="mb-4"></hr>
                                </div>

                                )
                            )
                        )}                        
                    </div>
                    
                    <Modal show={showTerima} onHide={handleCloseTerima}>
                        <form ref={form} onSubmit={handleSendOffering}>
                            <input type="hidden" id="name" name="name" value={dataUser.name}/>
                            <input type="hidden" id="email" name="email" value={dataUser.email}/>
                            <input type="hidden" id="product" name="product" value={activeOfferingProductName}/>
                            <input type="hidden" id="price" name="price" value={activeOfferingProductPrice}/>
                            <input type="hidden" id="offering_price" name="offering_price" value={activeOfferingPrice}/>
                            <Modal.Body style={{textAlign:'center'}}>
                                Yeay kamu berhasil mendapat harga yang sesuai.
                                <p className="align-self-start ms-auto" style={{fontSize: "14px", color: "#BABABA"}}>
                                    Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya.
                                </p>                                
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseTerima}>
                                    Close
                                </Button>
                                <button className="btn btn-primary" type="submit">OK</button>
                            </Modal.Footer>                        
                        </form>
                    </Modal>

                    <Modal show={showTolak} onHide={handleCloseTolak}>
                        <form ref={form} onSubmit={handleSendRejectOffering}>
                            <input type="hidden" id="name" name="name" value={dataUser.name}/>
                            <input type="hidden" id="email" name="email" value={dataUser.email}/>
                            <input type="hidden" id="product" name="product" value={activeOfferingProductName}/>
                            <input type="hidden" id="price" name="price" value={activeOfferingProductPrice}/>
                            <input type="hidden" id="offering_price" name="offering_price" value={activeOfferingPrice}/>
                            <Modal.Body style={{textAlign:'center'}}>
                                Apakah kamu yakin untuk menolak penawaran ini?                      
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseTolak}>
                                    Close
                                </Button>
                                <button className="btn btn-primary" type="submit">OK</button>
                            </Modal.Footer>                        
                        </form>
                    </Modal>
                </div>
            </section>
        </div>
    );
}
