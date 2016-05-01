import {bindActionCreators} from "redux";

import counterActions from '../counter/counter.actions';


export function mapStateToProps(state) {
    return { counter: state.counter };
}


export function mapDispatchToProps(dispatch) {
    return {
        counterActions: bindActionCreators(counterActions, dispatch)
    };
}
