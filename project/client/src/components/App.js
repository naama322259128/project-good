import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './user/YourProfile';
import UpdateDetails from './user/UpdateDetails';
import EditProducts from './user/auction manager/EditProducts';
import AuctionInformation from './new auction/AuctionInformation';
import AddProduct from './new auction/uploading products/AddProduct';
import React, { useEffect } from "react";

function App(props) {
  useEffect(() => {
    localStorage.setItem("currentUser", null);
  }, [])
  return (
    <div>
      <Router>
        <div>
          {localStorage.getItem("currentUser") ? (
            <Switch><Route path={`/auction`} ><Auction /></Route>
              <Route path={`/home`}><Home /></Route>
              <Route path={`/new_auction`}><NewAuction /></Route>
              <Route path={`/about`}><About /></Route>
              <Route path={`/your_profile`}><YourProfile /></Route>
              <Route path={`/update_your_details`}><UpdateDetails /></Route></Switch>) :
            <Route path={`/`}><Home /></Route>}
        </div>
      </Router>

      {/* <AuctionInformation/> */}

    </div >
  );

}


export default App;
