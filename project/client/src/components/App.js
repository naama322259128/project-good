import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './user/YourProfile';
import UpdateDetails from './user/UpdateDetails';
import React from "react";
import ContinueNewAuction from './new auction/ContinueNewAuction';

function App() {
  return (

    <Router>
      {/* <UpdateDetails/> */}
      <Switch>

        <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route>
        <Route path={`/new_auction`}><NewAuction /></Route>
        <Route path={`/continueNewAuction`}><ContinueNewAuction /></Route>
        <Route path={`/about`}><About /></Route>
        <Route path={`/your_profile`}><YourProfile /></Route>
        <Route path={`/update_your_details`}><UpdateDetails /></Route>
        <Route path={`/`}><Home />    </Route>

      </Switch>
    </Router>

  );
}

export default App;
