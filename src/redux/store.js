import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/index';

// export default createStore(
// 	rootReducer,
// 	applyMiddleware(promiseMiddleware, logger)
// )

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

const persistor = persistStore(store);

export default { store, persistor };
