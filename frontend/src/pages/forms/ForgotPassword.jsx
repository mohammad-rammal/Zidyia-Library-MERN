import React, { useState } from 'react';
import "./forgotPassword.css";
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword({ setOpenForgot }) {

    const [email, setEmail] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email missing");
    }

    return (
        <div onClick={() => setOpenForgot(false)} className='form-full bg-slate-500 bg-opacity-75 transition-opacity opacity-100'>

            <section onClick={(event) => event.stopPropagation()} className="form-container">
                <IoMdClose onClick={() => setOpenForgot(false)} className='close-icon' />

                <h1 className="form-title"> Forgot Password </h1>
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


                    <button type="submit" className='form-btn'>
                        Submit
                    </button>

                </form>
            </section>
        </div>
    )
}


export default ForgotPassword