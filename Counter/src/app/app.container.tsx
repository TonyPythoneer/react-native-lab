import * as React from 'react';
import { Text }  from 'react-native';
import { connect } from "react-redux";

import * as connectArgs from "./connect-args";


@connect(
    connectArgs.mapStateToProps,
    connectArgs.mapDispatchToProps
)
export default class AppContainer extends React.Component<any, any> {
    render() {
        //const {} = this.props
        return (
            <Text>fuck!</Text>
        )
    }
}
