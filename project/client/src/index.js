import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { newAuctionReducer, userReducer, currentAuctionReducer, mainReducer ,auctionManagerReducer,siteManagerReducer} from "./store/reducers";

// בס"ד
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(combineReducers({
  auction: newAuctionReducer,
  user: userReducer,
  currentAuction: currentAuctionReducer,
  main: mainReducer,
  auctionManager: auctionManagerReducer,
  siteManager: siteManagerReducer
}),
  composeEnhancers(
    applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
