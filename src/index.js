import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

const JSX = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{JSX}</React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
