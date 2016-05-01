import * as React from 'react';
import { Text, StyleSheet } from 'react-native';


export default class CounterMonitor extends React.Component<any, any>{
    render() {
        const { count } = this.props;
        return (<Text style={styles.monitor}>Clicked: { count } times</Text>)
    }
}


const styles = StyleSheet.create({
    monitor: {
        fontSize: 64,
        fontWeight: '900'
    }
})
