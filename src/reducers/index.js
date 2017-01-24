import { combineReducers } from 'redux';
import nodes from './nodes'
import pods from './pods'

export default combineReducers({
  nodes,
  pods
});


