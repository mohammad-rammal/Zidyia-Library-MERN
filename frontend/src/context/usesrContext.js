import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/userReducer";
import { GET_SINGLE_USER_BEGIN, GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_ERROR }
    from "../utils/constrants";
import axios from "../api/axios";

import { USER_URL } from "../utils/constrants";
import userReducer from "../reducers/userReducer";

const initialState = {
    singleUserLoading: false,
    singleUserError: false,
    singleUser: []
}

const UserContext = createContext({});
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchSingleUser = async (id) => {
        dispatch({ type: GET_SINGLE_USER_BEGIN });
        try {
            const response = await axios.get(`${USER_URL}/${id}`);
            const singleUser = response.data;
            dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: singleUser });
        } catch (err) {
            dispatch({ type: GET_SINGLE_USER_ERROR });
        }
    }

    return (
        <UserContext.Provider value={{
            ...state,
            fetchSingleUser
        }}>
            {children}

        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}