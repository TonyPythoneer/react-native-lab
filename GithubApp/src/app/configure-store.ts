import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
const devTools = require('remote-redux-devtools')


// enhancer
const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk),
    // Redux tool
    devTools()
);


// configureStore
export default function configureStore(initialState = undefined) {
    const store: Redux.Store = createStore(reducer, initialState, enhancer);
    return store;
}
