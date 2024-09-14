import React, { useState } from 'react';
import "./resetPassword.css";
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './ForgotPassword';

function ResetPassword({ setOpenLogin }) {

    const [password, setPassword] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (password.trim() === "") return toast.error("Password missing");
    }

    return (

        <section onClick={(event) => event.stopPropagation()} className="form-container">

            <h1 className="form-title"> Welcome Back </h1>
            <h1 className="form-title2">Reset Password</h1>
            <form onSubmit={formSubmitHandler} className='form' >


                <div className="form-group">
                    <label htmlFor="password" className='form-label'>
                        Password
                    </label>
                    <input type="password" className='form-input' id="password" placeholder="Enter Your New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className='form-btn'>
                    Submit
                </button>

            </form>
        </section>
    )
}


export default ResetPassword