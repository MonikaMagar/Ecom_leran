import React, { useContext, useState } from 'react';
import { FaShoppingCart, FaHeart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { authContent } from '../store';
import { InputGroup, FormControl, Button, Navbar, Nav, Container, Dropdown, Modal } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import './Navbar.css';

const Navigation = ({ searchTerm, setSearchTerm }) => {
    const { cart, wishlist } = useContext(authContent);
    const [showModal, setShowModal] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLoginClick = () => {
        // Logic for handling login would go here
        setShowModal(false);
    };

    const handleLogoutClick = () => {
        // Logic for handling logout would go here
        setShowModal(false);
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-custom shadow-sm sticky-top">
                <Container fluid>
                    <Link className="navbar-brand" to="/">QuickCart</Link>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <InputGroup className="search-input mx-auto">
                            <FormControl
                                type="search"
                                placeholder="Search for products"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-bar"
                            />
                            <Button variant="outline-light" className="search-button">
                                <IoIosSearch />
                            </Button>
                        </InputGroup>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart /> Cart ({cart.length})
                            </Nav.Link>
                            <Nav.Link as={Link} to="/wishlist">
                                <FaHeart /> Wishlist ({wishlist.length})
                            </Nav.Link>

                            <Dropdown className="ml-auto">
                                <Dropdown.Toggle as={Nav.Link} id="navbarDropdown" className="dropdown-toggle">
                                    <FaUserCircle /> User
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/wishlist">My Wishlist</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/cart">My Cart</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setShowModal(true)}>Login</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLoginClick}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Navigation;
