import React from 'react';
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { TbBooks } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { search_icon } from "../../utils/images"
import { useSidebarContext } from '../../context/sidebarContext';

const Navbar = () => {

  const { openSidebar } = useSidebarContext();
  console.log(openSidebar);

  return (
    <nav className='navbar color-nav flex align-center  '>
      <div className='container w-100 ' >
        <div className='navbar-content flex align-center justify-between' >
          <div className='brand-and-toggler'>
            <Link to="/" className='navbar-brand text-white-A700 flex align-center fs-6 '>
              <span className='navbar-brand-icon' >
                <TbBooks size={29} />
              </span>
              <span className='navbar-brand-txt font-core-rhino-45-regular fw-9 fs-26 ' >Zidyia Library</span>
            </Link>
          </div>

          <div className='navbar-row flex align-center'>
            <ul className='navbar-nav flex align-center font-core-rhino-45-regular'>
              <li className='nav-item'>
                <Link to="/blog-details" className='nav-link text-white-A700 fw-4 fs-19' >BACK</Link>
              </li>
              <li className='nav-item'>
                <Link to="/about" className='nav-link text-white-A700 fw-4 fs-19' >ABOUT</Link>
              </li>
              <li className='nav-item'>
                <Link to="/contact" className='nav-link text-white-A700 fw-4 fs-19' >CONTACT-US</Link>
              </li>
            </ul>
            <div className='vertical-line'> </div>
            <div className='navbar-btns flex algin-center'>
              <Link to="/blog-details" type='button' className='navbar-search-btn' >
                <img src={search_icon} alt='' />
              </Link>
              <button type='button' className='sidebar-show-btn bg-white-A700 flex align-center justify-center' onClick={() => openSidebar()}>
                <FaBars size={21} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar