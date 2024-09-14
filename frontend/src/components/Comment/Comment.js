import React, { useEffect, useState } from 'react';
import "./Comment.scss";
import axios from '../../api/axios';
import { USER_URL } from "../../utils/constrants";

const Comment = ({ comment }) => {

    const [postUser, setPostUser] = useState({});
    useEffect(() => {
        if (comment?.user?.id) {
            const fetchPostUser = async (id) => {
                try {
                    const response = await axios.get(`${USER_URL}/${id}`);
                    setPostUser(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }

            fetchPostUser(comment.user.id);
        }
    }, [comment]);


    return (
        <div className='blog-comments-item gird align-center justify-center bg-zidyia' key={comment.id}>

            <div className='comment-info ' >
                <span className='comment-info-name fw-7 text-dark-blue fs-18'>{comment?.user?.username}</span>
                <p className='my-1 fs-15'>{comment?.body}</p>
            </div>
        </div>
    )
}

export default Comment