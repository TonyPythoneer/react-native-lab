import * as C from "./search-bar.constants";


const initialState = {
    text: '',
};


export default function counter(state = initialState, action) {
    switch (action.type) {
        case C.BEGIN_SEARCH:
            return { text: action.text }
        default:
            return state;
    }
}
