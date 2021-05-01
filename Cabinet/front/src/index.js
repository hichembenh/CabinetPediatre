import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { reducers } from './reducers';
import App from './App';
import './index.css';
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
