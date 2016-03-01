import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Map} from 'immutable';
import reducer from './reducer';
import logger from './middlewares/logger';

export default function makeStore() {
  return createStore(reducer, Map(), applyMiddleware(thunkMiddleware, logger));
}
