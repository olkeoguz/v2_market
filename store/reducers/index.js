import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';

// COMBINED REDUCERS
const reducers = {
  cart,
  products,
};

export default combineReducers(reducers);
