import React, { useState } from "react";
import styles from "./headerTop.css";
import Vector from "../../assets/icons/Vector.png";
import Search from "../../assets/icons/Search.png";
import Translate from "../../assets/icons/Translate.png";
import messages from "../../assets/icons/messages.png";
import notification from "../../assets/icons/notification.png";
import profileLogo from "../../assets/icons/profile-logo.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import { Link } from 'react-router-dom';
import SignUp from "../../pages/forms/SignUp";
import Login from "../../pages/forms/Login";
import { useSelector, useDispatch } from "react-redux";
import { FaHouseUser } from "react-icons/fa"; 
import { IoLogOut } from "react-icons/io5";
import { IoMdArrowRoundDown } from "react-icons/io";
import { logoutUser } from "../../redux/apiCalls/authApiCall";


function HeaderTop() {
    const dispatch = useDispatch();
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [dropdown, setDropdown] = useState(true);

    // Handle Sign Up
    const handleSignUp = () => {
        setOpenSignUp(true);
    }

    const handleLogin = () => {
        setOpenLogin(true);
    }

    const { user } = useSelector(state => state.auth);


    // Logout Handler
    const logoutHandler = () => {
        setDropdown(false);
        dispatch(logoutUser());
    }

    return (
        <div className="header-top app.light ">
            {user ?
                <>
                    <div className="welcome">
                        Welcome <span>{user.fullName}</span>
                    </div>
                </>
                :
                (
                    <>
                        <div className="header-top-right">
                            <div className="more">
                                <img src={Vector} alt="" className="vector" />
                            </div>

                            <div className="welcome-name flex ml-4">
                                <div className="welcome-name-lib decoration-2 underline-offset-2 decoration-primary text-grey-900 text-base active pointer mt-1 w-44">
                                    <Link to="/">
                                        <span>
                                            <div className="zidyia-bar">
                                                <svg
                                                    height="30"
                                                    viewBox="0 0 50 30"
                                                    fill="none"
                                                    data-test=""
                                                    aria-label=""
                                                >
                                                    <path
                                                        d="M111.7626.5162 111.762 8.13799 111.762 14.6252ZM0 0.0167674H29.1716V9.78125L0.803297 29.5401L14.5486 21.6611L29.1716 30H0V20.2202L27.9964 0.844525L14.5486 8.34034L0 0.0167674ZM33.1434"
                                                        fill="white"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div><span className="zidyia-text">IDIYA</span></div>
                                        </span>
                                    </Link>
                                </div>
                                <div className="welcome-name-des text-s text-white-900 md:text-sm text-grey-900 w-14 h-full  md:ml-2 md:mt-0 ">
                                    <span className="research-lib">
                                        Research <br /> Library
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            <div className="search-bar">
                <div className="search-bar-style">
                    <div className="search-bar-icon-icon">
                        <img src={Search} alt="" className="search-bar-icon-icon-icon" />
                    </div>
                    <div className="search-bar-style-text">
                        <input type="text" placeholder="search" />
                    </div>
                    <div className="search-bar-style-text-icon"></div>
                </div>
            </div>

            {user ?
                <>
                    <div className='header-top-left '>
                        <div className="digital-passport">
                            <div className="digital-passport-in">
                                <div className="digital-passport-in-logo">
                                    <img src={Translate} alt="" />
                                </div>
                            </div>
                            <div className="digital-passport-out"></div>
                        </div>

                        <div className="messages">
                            <div className="messages-in">
                                <img src={messages} alt="" className='messages-in-logo' />
                            </div>
                        </div>

                        <div className="notifications">
                            <div className="notifications-in">
                                <img src={notification} alt="" className='notifications-in-logo' />
                            </div>
                        </div>

                        <div className='profile'>
                            <Link to={`/profile/${user?._id}`} >
                                <img src={user?.profilePicture.url} alt="" className=' profile-in' />
                            </Link>
                        </div>

                        <IoMdArrowRoundDown onClick={() => setDropdown(!dropdown)} />
                        
                        {dropdown && (
                            <div className='header-right-dropdown'>
                                <Link to={`/profile/${user?._id}`} className="header-dropdown-item" >
                                    <FaHouseUser />
                                    <span className="ms-2">Profile</span>
                                </Link>
                                <div onClick={logoutHandler} className="header-dropdown-item">
                                    <IoLogOut />
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                </>
                :
                (
                    <>
                        <div className="header-top-right">
                            <div onClick={() => handleLogin()} className="header-right-link login-btn">
                                <span>Log In</span>
                            </div>
                            {openLogin && <Login setOpenLogin={setOpenLogin} />}
                            <div onClick={() => handleSignUp()} className="header-right-link sign-btn">
                                <span>Sign Up</span>
                            </div>
                            {openSignUp && <SignUp setOpenSignUp={setOpenSignUp} />}
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default HeaderTop;
