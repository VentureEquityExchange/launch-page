import * as Components from './components/index';
import * as Actions from './actions/index';
import * as Reducers from './reducers/index';


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';


// Import component to your project
let { Main } = Components;

const reducer = combineReducers({...Reducers});
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div>
        <Main />
    </div>
  </Provider>, document.getElementById('app'));


export { Actions, Components, Reducers, }
