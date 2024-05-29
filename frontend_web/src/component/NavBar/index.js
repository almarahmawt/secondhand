import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, cekTokenExp} from "../../redux/actions/authActions";

import icon from "../../images/kotakbiru.svg";
import {FiLogIn, FiSearch, FiList, FiBell, FiUser, FiLogOut} from "react-icons/fi";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import fotoproduk from "../../images/Rectangle 23.png";
import alertnotif from "../../images/Ellipse.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
    const dispatch = useDispatch();
    const {isAuthenticated, user, status} = useSelector((state) => state.auth);

    useEffect(() => {
        if (localStorage.getItem("token") && user === null) {
            dispatch(cekTokenExp());
        }
    }, [dispatch, isAuthenticated, status, user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand>
                    <a href="/">
                        <img src={icon} alt="" />
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <form className="d-flex border buttonradius12 ">
                                <input className="form-control border-0" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn" type="submit">
                                    <FiSearch />
                                </button>
                            </form>
                        </Nav.Link>
                    </Nav>
                    {!isAuthenticated ? (
                        <Nav>
                            <Nav.Link href="/login">
                                <button type="button" className="btn btn-sm btn-custom nav-link text-light buttonradius12 active ">
                                    <FiLogIn /> Masuk
                                </button>
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <>
                            {user != null && user.email == 'renamuliani@gmail.com' ? (
                                <Nav>                            
                                    <Nav.Link href="/daftarjual">
                                        <button type="button" className="btn btn-sm nav-link text-dark rounded-12px active">
                                            <FiList />
                                        </button>
                                    </Nav.Link>
                                    <Nav.Link href="/infopenawaran">
                                        <button type="button" className="btn btn-sm nav-link text-dark rounded-12px active">
                                            <FiBell />
                                        </button>
                                    </Nav.Link>
                                    <Nav.Link href="/infoprofil">
                                        <button type="button" className="btn btn-sm nav-link text-dark rounded-12px active">
                                            <FiUser />
                                        </button>
                                    </Nav.Link>
        
                                    <Nav.Link href="/">
                                        <button type="button" className="btn btn-sm btn-custom nav-link text-light rounded-12px active" onClick={handleLogout}>
                                            <FiLogOut /> Logout
                                        </button>
                                    </Nav.Link>
                                </Nav>
                            ) : (
                                <Nav>                        
                                    <Nav.Link href="/infoprofil">
                                        <button type="button" className="btn btn-sm nav-link text-dark rounded-12px active">
                                            <FiUser />
                                        </button>
                                    </Nav.Link>
                                    <Nav.Link href="/">
                                        <button type="button" className="btn btn-sm btn-custom nav-link text-light rounded-12px active" onClick={handleLogout}>
                                            <FiLogOut /> Logout
                                        </button>
                                    </Nav.Link>
                                </Nav>
                            )}
                        </>                        
                    )}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
