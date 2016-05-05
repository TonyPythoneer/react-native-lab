import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CounterMonitor from './counter-monitor.component';
import CounterButton from './counter-button.component';


export default class CounterApp extends React.Component<any, any>{
    render() {
        const { count, actions } = this.props;
        return (
            <View style={style.app}>
                <Text></Text>
                <CounterMonitor count={count}/>
                <CounterButton
                    btnText={'up'}
                    btnEvent={actions.increasement}/>
                <CounterButton
                    btnText={'down'}
                    btnEvent={actions.decreasement}/>
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