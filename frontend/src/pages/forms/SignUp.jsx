import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/apiCalls/authApiCall';
import swal from 'sweetalert';

function SignUp({ setOpenSignUp }) {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);

  const [fullname, setFullname] = useState('');
  const [idImage, setIdImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState(''); // Add studentId state
  const [openLogin, setOpenLogin] = useState(false);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (fullname.trim() === '') return toast.error('Full name missing');
    if (!idImage) return toast.error('ID Image missing');
    if (email.trim() === '') return toast.error('Email missing');
    if (password.trim() === '') return toast.error('Password missing');
    if (studentId.trim() === '') return toast.error('Student ID missing'); // Validate studentId

    const formData = new FormData();
    formData.append('fullName', fullname);
    formData.append('idImage', idImage);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('studentId', studentId); // Append studentId to the form data

    dispatch(registerUser(formData));
  };


  const handleLogin = () => {
    setOpenLogin(true);
  };

  return (
    <>
      <div onClick={() => setOpenSignUp(false)} className="form-full bg-slate-500 bg-opacity-75 transition-opacity opacity-100">
        <section onClick={(event) => event.stopPropagation()} className="form-container">
          <IoMdClose onClick={() => setOpenSignUp(false)} className="close-icon" />
          <h1 className="form-title"> Create an account </h1>
          <h1 className="form-title2">Welcome! Create your account to access millions of publications on Zendy</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-input"
                id="fullname"
                placeholder="Enter Your Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="idImage" className="form-label">
                ID Image
              </label>
              <input
                type="file"
                className="form-input"
                id="idImage"
                onChange={(e) => setIdImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                placeholder="Enter Your Valid Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentId" className="form-label">
                Student ID
              </label>
              <input
                type="text"
                className="form-input"
                id="studentId"
                placeholder="Enter Your ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <button type="submit" className="form-btn">
              Sign Up
            </button>
          </form>
          <div className="form-footer">
            Already have an account?
            <div onClick={handleLogin}>
              <span className="cursor-pointer forms-forms">Log In</span>
            </div>
            {openLogin && <Login setOpenLogin={setOpenLogin} />}
          </div>
        </section>
      </div>
    </>
  );
}

export default SignUp;
