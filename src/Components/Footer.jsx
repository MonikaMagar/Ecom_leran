import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer bg-black text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>About QuickCart</h5>
                        <p>Your go-to destination for all things shopping. QuickCart brings you the best products at unbeatable prices.</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link className="text-white" to="/">Home</Link></li>
                            <li><Link className="text-white" to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link className="text-white" to="/featured-products">Featured Products</Link></li>
                            <li><Link className="text-white" to="/about">About Us</Link></li>
                            <li><Link className="text-white" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <Link className="text-white" to="#" aria-label="Facebook"><FaFacebook /></Link>
                            <Link className="text-white" to="#" aria-label="Twitter"><FaTwitter /></Link>
                            <Link className="text-white" to="#" aria-label="Instagram"><FaInstagram /></Link>
                            <Link className="text-white" to="#" aria-label="LinkedIn"><FaLinkedin /></Link>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; {new Date().getFullYear()} QuickCart. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
