import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import ForgotPassword from './ForgotPassword';
import "./login.css";

function Login({ setOpenLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const [openForgot, setOpenForgot] = useState(false);

    const handleForgot = () => {
        setOpenForgot(true);
    }


    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email missing");
        if (password.trim() === "") return toast.error("Password missing");

        dispatch(loginUser({ email, password}));
    }

    return (
        <div onClick={() => setOpenLogin(false)} className='form-full bg-slate-500 bg-opacity-75 transition-opacity opacity-100'>

            <section onClick={(event) => event.stopPropagation()} className="form-container">
                <IoMdClose onClick={() => setOpenLogin(false)} className='close-icon' />

                <h1 className="form-title"> Welcome Back </h1>
                <h1 className="form-title2">Please enter your details.</h1>
                <form onSubmit={formSubmitHandler} className='form' >

                    <div className="form-group">
                        <label htmlFor="email" className='form-label'>
                            Email
                        </label>
                        <input type="email" className='form-input' id="email" placeholder="Enter Your Valid Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className='form-label'>
                            Password
                        </label>
                        <input type="password" className='form-input' id="password" placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className='form-btn'>
                        Log in
                    </button>

                </form>
                <div className="form-footer">

                    <div onClick={() => handleForgot()} >
                    <span className='cursor-pointer forms-forms'>Forgot Password</span>
                    </div>
                   {openForgot && <ForgotPassword setOpenForgot={setOpenForgot} />}

                </div>
            </section>
        </div>
    )
}

export default Login;
