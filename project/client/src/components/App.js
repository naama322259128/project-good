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
import UserTable from './user/UserTable';
import AuctionManagerTable from './user/auction manager/AuctionManagerTable';
import ContactForm from './main/ContactForm';
import ContinueNewAuction from './new auction/ContinueNewAuction';
function App() {
  return (

<<<<<<< HEAD
    <Router>
      <Switch>
        {/* <AuctionManagerTable/> */}
        {/* <StateCounter/> */}
        {/* <UserTable/> */}
        {/* <ContactForm/> */}
        {/* <NewAuction /> */}
        <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route>
=======
     <Router>
      <Switch> 
           {/* <AuctionManagerTable/> */}
           {/* <StateCounter/> */}
     {/* <UserTable/> */}
     <ContactForm/>
     {/* <NewAuction /> */}
        {/* <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route> 
>>>>>>> 81d9f8ce24a8ba2da50d525289a64b6397b8350e
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
