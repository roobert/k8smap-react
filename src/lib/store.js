import { createStore } from 'redux';
import rootReducer from '../reducers';

export const storeCreator = () => {
  if (process.env.NODE_ENV !== "production") {
    return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } else {
    return createStore(rootReducer)
  }
};
