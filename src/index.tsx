import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import configureStore from './configureStore';
import './index.scss';

const store = configureStore();

const renderApp = () => ReactDOM.render(
  <Provider store={store}><Router><App /></Router> </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./App', renderApp);
}

renderApp();
