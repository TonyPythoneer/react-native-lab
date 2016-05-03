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
                return <Text>Error!</Text>
            case "wait":
                return <Text>Wait...</Text>
            default:
                return <Text>Nothing</Text>
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

                <View>
                    <Text style={{ fontSize: 128 }}>
                        123123123123123123123123123123123123123123123123123123123123
                        123123123123123123123123123123123123123123123123123123123123
                        123123123123123123123123123123123123123123123123123123123123
                    </Text>
                </View>
            </ParallaxView>
        )
    }
}
