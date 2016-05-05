import {bindActionCreators} from 'redux';

import searchBarActions from '../search-bar/search-bar.actions';


export function mapStateToProps(state) {
    return {
        searchedResult: state.searchBar,
    };
}


export function mapDispatchToProps(dispatch) {
    return {
        searchBarActions: bindActionCreators(searchBarActions, dispatch)
    };
}
