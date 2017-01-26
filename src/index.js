// Some weirdness to make axiom work. Ask Harry.
window.__INCLUDE_CSS__ = true;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import { storeCreator } from './lib/store';
import { storeUpdater } from './lib/api';
import { data } from './data';

const store = storeCreator();

const interval = 3;

storeUpdater(store, data, interval);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
