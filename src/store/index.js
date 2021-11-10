import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//TODO: agregar 'reducer' cuando se cree
const store = createStore( composeEnhancers(applyMiddleware(thunk)))

export default store;