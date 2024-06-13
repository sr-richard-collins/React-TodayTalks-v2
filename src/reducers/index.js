// reducers/index.js

import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postReducer,
});

export default rootReducer;
