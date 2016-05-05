import * as React from 'react-native';
import { Text, View }  from 'react-native';

import ParallaxView from '../plugins/parallax-view';


export default class UserProfileViewApp extends React.Component<any, any> {
    render() {
        const searchedResult: any = this.props.searchedResult;

        switch (searchedResult.status) {
            case "ok":
                return <UserProfileView searchedResult={searchedResult}/>
            case "error":
                return (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 64 }}>Error!</Text>
                    </View>
                )
            case "wait":
                return (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 64 }}>Wait...!</Text>
                    </View>
                )
            default:
                return (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 64 }}>Nothing!</Text>
                    </View>
                )
        }
    }
}


class UserProfileView extends React.Component<any, any> {
    render() {
        const searchedResult = this.props.searchedResult;
        const { login, avatar_url, repos_url, public_repos, followers_url, followers} = searchedResult.data;
        return (
            <ParallaxView
                backgroundSource={{ uri: avatar_url }}
                windowHeight={600}
                header={(
                    <View style={{
                        flex: 1,
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
                                {login}
                            </Text>
                        </View>
                    </View>
                )}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 64 }}>
                        followers: {followers}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 64}}>
                        public_repos: {public_repos}
                    </Text>
                </View>
            </ParallaxView>
        )
    }
}
