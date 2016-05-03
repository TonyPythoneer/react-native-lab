import * as React from 'react';
import { Provider } from 'react-redux';

import configureStore from './app/configure-store';
import AppContianer from './app/app.container';


const store = configureStore();


export default class App extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <AppContianer/>
            </Provider>
        );
    }
}
