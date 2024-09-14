import { GET_COMMENTS_BY_POST_ERROR, GET_COMMENTS_BY_POST_SUCCESS, GET_COMMENTS_BY_POST_BEGIN }
    from "../utils/constrants";

const commentReducer = (state, action) => {
    switch (action.type) {
        case GET_COMMENTS_BY_POST_BEGIN:
            return {
                ...state, commentsByPostLoading: true
            }
        case GET_COMMENTS_BY_POST_SUCCESS:
            return {
                ...state, commentsByPostLoading: false,
                commentsByPost: action.payload
            }
        case GET_COMMENTS_BY_POST_ERROR:
            return {
                ...state, commentsByPostLoading: false,
                commentsByPostError: true
            }
        default:
            return state;
    }
}

export default commentReducer;