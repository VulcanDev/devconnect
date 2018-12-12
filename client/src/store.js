import { createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};
const middleWare = [thunk];

export default createStore(rootReducer, initialState, middleWare);
