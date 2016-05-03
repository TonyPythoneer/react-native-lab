import * as React from 'react-native';
import { Text, View, ScrollView, TextInput }  from 'react-native';
import { connect } from "react-redux";

import * as connectArgs from "./connect-args";
import SearchBarApp from '../search-bar/search-bar.container';
import UserProfileViewApp from '../user-profile-view/user-profile-view.container';


@connect(
    connectArgs.mapStateToProps,
    connectArgs.mapDispatchToProps
)
export default class AppContainer extends React.Component<any, any> {
    render() {
        const { searchedResult, searchBarActions } = this.props;
        console.log('AppContainer RENDER!!');
        return (
            <ScrollView>
                <SearchBarApp actions={searchBarActions} />
                <UserProfileViewApp searchedResult={searchedResult} />
            </ScrollView>
        )
    }
}
