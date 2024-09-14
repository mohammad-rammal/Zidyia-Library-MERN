import React from 'react';
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { TbBooks } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";

import { useSidebarContext } from '../../context/sidebarContext';


const Sidebar = () => {

  const { isSidebarOpen, closeSidebar } = useSidebarContext();

  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ""}`}>
      <button type='button' className='sidebar-close-btn' onClick={() => closeSidebar()}>
        <FaTimes size={24} className='text-white-A700' />
      </button>
      <Link className='navbar-brand text-white-A700 flex align-center fs-26' to="/" >
        <span className='navbar-brand-icon'>
          <TbBooks />
        </span>
        <span className='navbar-brand-txt font-core-rhino-45-regular fw-5'>BLOG</span>
      </Link>
      <ul className='sidebar-nav font-core-rhino-45-regular my-5 mt-16'>
        <li className='nav-item'>
          <Link to='/' className='nav-link text-white fw-4 fs-18'>HOME</Link>
        </li>
        <li className='nav-item'>
          <Link to='/' className='nav-link text-white fw-4 fs-18'>BLOG</Link>
        </li>
        <li className='nav-item'>
          <Link to='/' className='nav-link text-white fw-4 fs-18'>ABOUT</Link>
        </li>
      </ul>
      <div className='sidebar-blocks my-5 mt-40'>
        <div className='sidebar-block'>
          <h3 className='font-core-rhino-55-medium text-white-A700  mt-8'>Industry</h3>
          <p className='text-white-A700 font-core-rhino-35-light mt-4'>Book and Periodical Publishing</p>
        </div>
        <div className='sidebar-block'>
          <h3 className='font-core-rhino-55-medium text-white-A700 mt-8'>Location</h3>
          <p className='text-white-A700 font-core-rhino-35-light mt-4'>Beirut - Lebanon</p>
        </div>
        <div className='sidebar-block'>
          <h3 className='font-family-core-rhino-55-medium text-white-A700 mt-8'>Email</h3>
          <p className='text-white-A700 font-core-rhino-35-light mt-4'>zideia.library@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar