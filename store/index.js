import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['likedJobs']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  // The second argument {} = default state of the app
  const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  // Delete all saved data - for testing
  // persistor.purge();

  // This exports a function that returns an object with a store and persistor.
  return { store, persistor };
};
