import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


export default class CounterButton extends React.Component<any, any>{
    render() {
        const { btnEvent, btnText } = this.props;
        return (
            <TouchableOpacity onPress={btnEvent} style={styles.button}>
                <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 60,
        padding: 40,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonText: {
        fontSize: 48
    }
});
