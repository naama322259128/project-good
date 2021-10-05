import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './user/YourProfile';
import UpdateDetails from './user/UpdateDetails';
import React from "react";
import StateCounter from './StateCounter'
import AuctionInformation from './new auction/AuctionInformation';
function App() {
  return (
<<<<<<< HEAD
    <div>
      <Router>
        {/* <AboutAuction/> */}
        {/* <ContactForm/> */}
        {/* <NewAuction /> */}
        <Switch>
          <Route path={`/auction`} ><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/new_auction`}><NewAuction /></Route>
          <Route path={`/about`}><About /></Route>
          <Route path={`/your_profile`}><YourProfile /></Route>
          <Route path={`/update_your_details`}><UpdateDetails /></Route>
          <Route path={`/`}><Home /></Route>
        </Switch>
      </Router>
    </div >
=======

     <Router>
      <Switch>
        <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route>
        <Route path={`/new_auction`}><NewAuction /></Route>
        <Route path={`/about`}><About /></Route>
        <Route path={`/your_profile`}><YourProfile /></Route>
        <Route path={`/update_your_details`}><UpdateDetails /></Route>
        <Route path={`/`}><Home /></Route>
      </Switch> 
    </Router>
>>>>>>> dbd8c9ef60a3f7520ab14a73c88b4a9090a1baae
  );
}

export default App;
