import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../utils/constrants";

const sidebarReducer = (state, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state, isSidebarOpen: true
            }
        case CLOSE_SIDEBAR:
            return {
                ...state, isSidebarOpen: false
            }
        default:
            return false;
    }
}

export default sidebarReducer;