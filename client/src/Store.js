import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import { thunk } from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {};
const middleware = [thunk];
const enhancer = compose(
    applyMiddleware(...middleware)
);

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

export default store