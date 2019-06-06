import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers';

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunk);

  const enhancers = [middlewareEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./store/reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
