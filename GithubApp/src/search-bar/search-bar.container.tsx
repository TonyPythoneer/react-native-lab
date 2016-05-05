import * as React from 'react';

import SearchBar from "./search-bar.component";


export default class SearchBarApp extends React.Component<any, any>{
    render() {
        const { actions } = this.props;
        return (
            <SearchBar actions={actions} />
        )
    }
}
