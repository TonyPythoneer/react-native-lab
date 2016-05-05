import * as C from "./counter.constants";


const actions = {
    increasement: () => ({ type: C.INCREASEMENT }),
    decreasement: () => ({ type: C.DECREASEMENT }),
}


export default actions;
