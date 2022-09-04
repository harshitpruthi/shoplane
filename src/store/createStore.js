import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import ShopApp from './shop/reducers';

const store =  createStore(ShopApp,applyMiddleware(thunkMiddleware));
export default store;
