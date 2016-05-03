import * as C from "./search-bar.constants";


const actions = {
    beginSearch: (text) => (dispatch) => {
    	dispatch({ type: C.BEGIN_SEARCH, text })
    },
}


export default actions;
