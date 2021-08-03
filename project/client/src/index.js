import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose,combineReducers } from 'redux';
import reducer from "./store/reducers/userState";
import thunk from 'redux-thunk';
import { newAuctionReducer, userReducer,existingAuctionReducer,mainReducer } from "./store/reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(combineReducers({ auction: newAuctionReducer, user: userReducer, existingAuction:existingAuctionReducer,main:mainReducer}),
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
reportWebVitals();
