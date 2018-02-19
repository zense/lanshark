/*
  This file exports the redux store after configuring it. Configuring includes
  applying middlewares, loading previous state from file etc,.
*/

import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers/rootReducer';

// Creates redux store
function configureStore() {
  // List of middlewares to be applied
  const middlewares = [thunkMiddleware];

  // If executed in development mode add Logger middleware
  if (process.env.ELECTRON_ENV === 'development') {
    middlewares.push(createLogger());
  }

  // Return the store
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  );
}

// Export store object
export default configureStore();
