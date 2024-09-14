import React from 'react';
import Header from '../../components/header/Header';
import styles from './blogPage.css';
import blogrecent from '../../assets/images/blog-recent.png';
import time from '../../assets/icons/time_1.png';
import calendar from '../../assets/icons/Calendar.png';
import { Link } from "react-router-dom"

function BlogPage() {
    return (
        <div className='main-blog-container'>
            <div className='main-blog'>
                <div className='both-text'>
                    <div className='main-blog-text  '>
                        Discover our latest blogs, news, and updates
                    </div>
                    <div className='main-blog-text-2'>
                        Welcome to Zendy's knowledge base where you can discover more about academic research.
                    </div>
                </div>
                <div className='main-blog-text-out flex text-white-A700 mb-3'>
                    Featured Blog
                </div>
                <div className='main-blog-img'>
                    <img src={blogrecent} alt='' className='main-blog-img-2' />
                </div>
                <div className='text-white-A700 '>

                    <div className='main-blog-text-out-2 flex mt-4 fw-bold '>
                        See the Top Reads of December 2023
                    </div>
                    <div className='main-blog-text-out-3 flex mt-2 fw-light '>
                        Behavior Economics This paper highlights how traditional economic models function on the assumption that people behave rationally, which is not always the case. The unification of psychology and economics...
                    </div>
                    <div className='main-blog-det flex justify-start'>
                        <div className='main-blog-det-1'>
                            <div className='main-blog-det-1-calendar'>
                                <img src={calendar} alt='' />
                            </div>
                            <div className='main-blog-det-1-text'>
                                Jan 4, 2024
                            </div>
                        </div>
                        <div className='main-blog-det-2'>
                            <div className='main-blog-det-2-time'>
                                <img src={time} alt='' />
                            </div>
                            <div className='main-blog-det-2-text'>
                                5 Mins Read
                            </div>
                        </div>
                    </div>
                    <div className='main-blog-recent flex'>
                        <Link to="/blog-details"  >Recent blogs</Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BlogPage;
