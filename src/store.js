import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer, REHYDRATE, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createActionBuffer from 'redux-action-buffer';

const middleware = applyMiddleware(thunk, createLogger());

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['message'],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);

//persistor.purge();

export default { store, persistor };
