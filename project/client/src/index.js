import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose,combineReducers } from 'redux';
import reducer from "./store/reducers/userState";
import thunk from 'redux-thunk';
import { newAuctionReducer, userReducer } from "./store/reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const myStore = createStore(courseReducer);
const myStore = createStore(combineReducers({ auction: newAuctionReducer, user: userReducer }),
  composeEnhancers(
    applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode>
  //   <Provider store={createStore(reducer, applyMiddleware(thunk))}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
  <React.StrictMode>
  <Provider store={myStore}>
    <App />
  </Provider>

</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
