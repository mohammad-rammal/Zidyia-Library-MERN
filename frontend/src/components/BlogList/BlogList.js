import React, { useState } from 'react';
import "./BlogList.scss";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import Pagintation from "../Pagination/Pagination";
import { useBlogsContext } from '../../context/blogContext';
import Loader from "../Loader/Loader";



const BlogList = ({ blogs }) => {

    const { blogsLoading, searchBlogsLoading } = useBlogsContext();
    const blogLimit = 6;
    const [paginate, setPaginate] = useState(1 * blogLimit);
    const paginateHandler = (value) => setPaginate(value * blogLimit);
    
    if (blogsLoading || searchBlogsLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <div className='blog-items grid my-6'>
                {
                    blogs.slice(paginate - 6, paginate).map(blog => {
                        return (
                            <div className='blog-item' key={blog.id}>
                                <div className='blog-item-title fw-5 fs-18 font-core-rhino-45-regular'>
                                    {blog.title} 
                                </div>
                                <div className='blog-tem-text'>{(blog.body).substring(0, 100)}... </div>
                                <div className='blog-item-reaction flex align-center'>
                                    <AiFillLike />
                                    <span className='reaction-value font-core-rhino-45-regular fs-15 fw-5'> {blog.reactions}</span>
                                </div>
                                <div className='blog-item-tags'>
                                    {
                                        blog.tags.map((tag, idx) => (
                                            <span className='blog-item-tags-single fs-13 font-core-rhino-45-regular text-uppercase' key={idx}>
                                                {tag}
                                            </span>
                                        ))
                                    }


                                </div>

                                <div className='blog-item-btn'>
                                    <Link to={`/blog/${blog.id}`} className='read-more-btn font-core-rhino-45-regular text-white-A700 fw-4'> Show more </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pagintation noOfBlogs={blogs.length} paginateHandler={paginateHandler} />
        </>
    )
}

export default BlogList