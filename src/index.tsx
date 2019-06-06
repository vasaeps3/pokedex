import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';
import './index.scss';

const store = configureStore();

const renderApp = () => ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./App', renderApp);
}

renderApp();
