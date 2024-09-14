import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/commentReducer";

import { GET_COMMENTS_BY_POST_ERROR, GET_COMMENTS_BY_POST_SUCCESS, GET_COMMENTS_BY_POST_BEGIN }
    from "../utils/constrants";
import axios from "../api/axios";
import { COMMENT_BY_POST_URL } from "../utils/constrants";

const initialState = {
    commentsByPostLoading: false,
    commentsByPostError: false,
    commentsByPost: []
}

const CommentContext = createContext({});
export const CommentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCommentsByPost = async (id) => {
        dispatch({ type: GET_COMMENTS_BY_POST_BEGIN });
        try {
            const response = await axios.get(`${COMMENT_BY_POST_URL}/${id}`);

            dispatch({ type: GET_COMMENTS_BY_POST_SUCCESS, payload: response.data.comments });
        } catch (err) {
            dispatch({ type: GET_COMMENTS_BY_POST_ERROR });
        }
    }

    return (
        <CommentContext.Provider value={{
            ...state,
            fetchCommentsByPost
        }}>
            {children}
        </CommentContext.Provider>
    )
}

export const useCommentContext = () => {
    return useContext(CommentContext);
}