import * as C from "./counter.constants";
import objectAssign from "./../utils/object-assign";


const initialState = {
    count: 0,
};


export default function counter(state = initialState, action) {
    switch (action.type) {
        case C.INCREASEMENT:
            return { count: state.count + 1 }
        case C.DECREASEMENT:
            return { count: state.count - 1 }
        default:
            return state;
    }
}
