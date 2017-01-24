// Some weirdness to make axiom work. Ask Harry.
window.__INCLUDE_CSS__ = true;

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import rootReducer from './reducers';
import { fetchFromAPI } from './lib/api';


const storeCreator = () => {
  if (process.env.NODE_ENV !== "production") {
    return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } else {
    return createStore(rootReducer)
  }
};

const store = storeCreator();

const dispatchAction = action => data =>
  store.dispatch({
    type:  action,
    state: data.items
  });

// Kick off requests to the APIs.
fetchFromAPI('pods').then(dispatchAction('SET_PODS'));
fetchFromAPI('nodes').then(dispatchAction('SET_NODES'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
