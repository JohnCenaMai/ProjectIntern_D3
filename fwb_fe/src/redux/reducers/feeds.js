import {LIKE,UN_LIKE,LIKE_COMMENT,UNLIKE_COMMENT} from "../actions/types";


const initalState = {

}

function likeReducer(state = initalState, action) {

    const {type} = action

    switch (type) {
        case LIKE:
            
            break;
        case UN_LIKE:
            
            break;
        case LIKE_COMMENT:

            break;
        case UNLIKE_COMMENT:

            break;
        default:
            break;
    }
};

export default likeReducer;