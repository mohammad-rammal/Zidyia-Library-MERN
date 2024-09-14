import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/blogReducer";

import {
    GET_BLOGS_BEGIN, GET_BLOGS_SUCCESS, GET_BLOGS_ERROR,
    SET_SEARCH_TERM, GET_BLOG_BY_SEARCHTHEM_ERROR, GET_BLOG_BY_SEARCHTHEM_SUCCESS
    , GET_BLOG_BY_SEARCHTHEM_BEGIN, GET_SINGLE_BLOG_ERROR, GET_SINGLE_BLOG_SUCCESS, GET_SINGLE_BLOG_BEGIN
} from "../utils/constrants";

import axios from "../api/axios";
import { BLOG_URL } from "../utils/constrants";
import { SEARCH_URL } from "../utils/constrants";

const initialState = {
    blogLoading: false,
    blogError: false,
    blogs: [],
    tempBlogs: [],
    singleBlogLoading: false,
    singleBlogError: false,
    singleBlog: [],
    searchTerm: "",
    searchBlogsLoading: false,
    searchBlogsError: false
}

const BlogContext = createContext({});
export const BlogsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchBlogs = async () => {
        dispatch({ type: GET_BLOGS_BEGIN });
        try {
            const response = await axios.get(BLOG_URL);
            dispatch({ type: GET_BLOGS_SUCCESS, payload: response.data.posts });
        } catch (err) {
            console.log(err);
            dispatch({ type: GET_BLOGS_ERROR });
        }
    }

    const fetchSignleBlog = async (id) => {
        dispatch({ type: GET_SINGLE_BLOG_BEGIN });
        try {
            const response = await axios.get(`${BLOG_URL}/${id}`);
            dispatch({ type: GET_SINGLE_BLOG_SUCCESS, payload: response.data });
        } catch (err) {
            dispatch({ type: GET_SINGLE_BLOG_ERROR })
        }
    }

    const fetchBlogsFromSearch = async (searchTerm) => {
        dispatch({ type: GET_BLOG_BY_SEARCHTHEM_BEGIN });
        try {
            const response = await axios.get(`${SEARCH_URL}${searchTerm}`);
            dispatch({ type: GET_BLOG_BY_SEARCHTHEM_SUCCESS, payload: response.data.posts });
        } catch (err) {
            dispatch({ type: GET_BLOG_BY_SEARCHTHEM_ERROR })
        }
    }

    const setSearchTerm = (searchTerm) => {
        dispatch({ type: SET_SEARCH_TERM, payload: searchTerm })
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <BlogContext.Provider value={{
            ...state,
            fetchSignleBlog,
            fetchBlogsFromSearch,
            setSearchTerm
        }}>

            {children}

        </BlogContext.Provider>
    )

}

export const useBlogsContext = () => {
    return useContext(BlogContext);
}