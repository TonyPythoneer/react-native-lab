import * as C from "./search-bar.constants";


const initialState = {
    status: '',
    data: {},
};


export default function counter(state = initialState, action) {
    switch (action.type) {
        case C.BEGIN_SEARCH:
            return {
                status: action.status,
                data: action.data,
            }
        case C.COMPLETE_SEARCH:
            return {
                status: action.status,
                data: action.data,
            }
        default:
            return state;
    }
}
