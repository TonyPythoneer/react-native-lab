import {bindActionCreators} from 'redux';

import searchBarActions from '../search-bar/search-bar.actions';


export function mapStateToProps(state) {
    return { searchBar: state.text };
}


export function mapDispatchToProps(dispatch) {
    return {
        searchBarActions: bindActionCreators(searchBarActions, dispatch)
    };
}
