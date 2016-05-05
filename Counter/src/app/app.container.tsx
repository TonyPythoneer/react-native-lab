import * as React from 'react';
import { View, StyleSheet }  from 'react-native';
import { connect } from "react-redux";

import * as connectArgs from "./connect-args";
import CounterApp from "../counter/counter.container";


@connect(
    connectArgs.mapStateToProps,
    connectArgs.mapDispatchToProps
)
export default class AppContainer extends React.Component<any, any> {
    render() {
        const { counter, counterActions } = this.props;
        return (
            <View style={style.app}>
				<CounterApp
                    count={counter.count}
					actions={counterActions} />
            </View>
        )
    }
}


//
const style = StyleSheet.create({
    app: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})