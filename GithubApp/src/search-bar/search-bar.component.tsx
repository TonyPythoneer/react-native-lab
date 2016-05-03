import * as React from 'react-native';
import { Text, StyleSheet, View, TextInput } from 'react-native';


export default class SearchBar extends React.Component<any, any>{
    private onBeginSearch(event:{ nativeEvent: { text: string } }): void {
        const { actions } = this.props;
        actions.beginSearch(event.nativeEvent.text);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bar}>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        style={styles.barText}
                        placeholder='Search'
                        onSubmitEditing={(e) => this.onBeginSearch(e)}
                    />
                </View>
            </View>
         )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'gray',
        height: 50},
    bar: {
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10},
    barText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 18},
})
