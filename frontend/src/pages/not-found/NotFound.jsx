import React from "react";
import notfound from "../../assets/images/notfound1.png";
import { Link } from "react-router-dom"
import "./not-found.css"

function NotFound() {
    return (
        <div className="not-found">

            <div className="not-found-img">
                <img src={notfound} alt="" />
            </div>

            <div className="not-found-title">
                <span>PAGE NOT FOUND</span>
            </div>

            <div className="not-found-text">
                <span>We looked everywhere for this page.</span>
                <span>Are you sure the website URL is correct ?</span>
                <span>Get in touch with site owner</span>
            </div>
            <Link className="not-found-link" to="/">Go To Home Page</Link>
        </div>
    );
}

export default NotFound;
