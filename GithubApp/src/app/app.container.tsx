import * as React from 'react';
import { Text, View, TextInput }  from 'react-native';
import { connect } from "react-redux";

import * as connectArgs from "./connect-args";
import ParallaxView from '../plugins/parallax-view';
import SearchBarApp from '../search-bar/search-bar.container';


//{{ uri: 'https://avatars.githubusercontent.com/u/10459119?v=3'}}
@connect(
    connectArgs.mapStateToProps,
    connectArgs.mapDispatchToProps
)
export default class AppContainer extends React.Component<any, any> {
    render() {
        const { searchBar, searchBarActions } = this.props
        /*
                        <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    />
         */
        /*
                <View style={{backgroundColor: 'gray', height: 50,
                                            flex:1,
                                justifyContent: 'center',}}>
                    <View style={{
                                borderRadius: 10,
                                backgroundColor: 'white',
                                paddingLeft: 10,
                                marginLeft: 10,
                                marginRight: 10
                                }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                fontSize: 18 }}
                            placeholder='Search'
                        />
                    </View>
                </View>
                <ParallaxView
                    backgroundSource={{ uri: 'https://avatars.githubusercontent.com/u/10459119?v=3' }}
                    windowHeight={600}
                    header={(
                        <View style={{
                                flex:1,
                                justifyContent: 'flex-end',
                                 }}>
                            <View style={{
                                borderRadius: 30,
                                backgroundColor: 'rgba(255,255,255,0.75)',
                                bottom: 10,
                                paddingLeft: 20,
                                marginLeft: 20,
                                marginRight: 20,
                                }}>
                                <Text style={{ fontSize: 64 }}>
                                    TonyPythoneer
                                </Text>
                            </View>
                        </View>
                    ) }>

                    <View>
                        <Text style={{ fontSize: 128 }}>
                            123123123123123123123123123123123123123123123123123123123123
                            123123123123123123123123123123123123123123123123123123123123
                            123123123123123123123123123123123123123123123123123123123123
                        </Text>
                    </View>
                </ParallaxView>
         */
        return (
            <SearchBarApp actions={searchBarActions} />
        )
    }
}
