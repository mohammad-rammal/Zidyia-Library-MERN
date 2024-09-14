import React, { useEffect, useState } from "react";
import styles from "./navbar.css";
import menu from "../../assets/icons/Burger Menu.png";
import search from "../../assets/icons/searchs.png";
import contact from "../../assets/icons/contact.png";
import blog from "../../assets/icons/blog.png";
import sub from "../../assets/icons/sub.png";
import about from "../../assets/icons/about.png";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiOutlineRectangleStack } from "react-icons/hi2";


function Navbar() {

    // State to keep track of the active link
    const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || null);

    // Function to handle click on a link
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        localStorage.setItem('activeLink', linkName);
    };

    useEffect(() => {
        const storedActiveLink = localStorage.getItem('activeLink');
        if (storedActiveLink) {
            setActiveLink(storedActiveLink);
        }
    }, []);

    return (
        <div className="navBar app.light ">
            <div className="left">
                <i className="bi bi-justify left-menu"></i>
            </div>

            <div className="main">
                <div className={`menu-item ${activeLink === "about" ? "active-link" : ""}`}>
                    <IoIosInformationCircleOutline />

                    <Link to="/about" onClick={() => handleLinkClick("about")}  ><strong>About</strong></Link>
                </div>

                <div className="line line1"></div>

                <div className={`menu-item ${activeLink === "search" ? "active-link" : ""}`}>
                    <i className="bi bi-search"></i>

                    <Link to="/search" onClick={() => handleLinkClick("search")} ><strong>Search</strong></Link>
                </div>
                <div className="line line2"></div>

                <div className={`menu-item ${activeLink === "blog" ? "active-link" : ""}`}>
                    <i class="bi bi-pencil-square"></i>

                    <Link to="/blog" onClick={() => handleLinkClick("blog")} ><strong>Blog</strong></Link>
                </div>

                <div className="line line3"></div>

                <div className={`menu-item ${activeLink === "subscription" ? "active-link" : ""}`}>
                    <HiOutlineRectangleStack size={25} />
                    <Link to="/subscription" onClick={() => handleLinkClick("subscription")} ><strong>Subscriptions</strong></Link>
                </div>

                <div className="line line4"></div>
                <div className={`menu-item ${activeLink === "contact" ? "active-link" : ""}`}>
                    <i className="bi bi-envelope"></i>
                    <Link to="/contact" onClick={() => handleLinkClick("contact")} ><strong>Contact</strong></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
