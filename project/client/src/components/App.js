import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './user/YourProfile';
import UpdateDetails from './user/UpdateDetails';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PackagesList from './new auction/auction pricing/PackagesList';
import { updateUserState } from '../store/actions/user'
import { setUserItemsInLS } from '../utils/userUtils'
import AboutAuction from './auction/about/AboutAuction'
import ContactForm from './main/ContactForm';
import StateCounter from './StateCounter';
function App(props) {

  useEffect(() => {



    //storage  storageChange  
    //window.addEventListener("storage", () => props.updateUserState());//?
    // window.addEventListener('click', () => alert("click from window.addEventListener('click')"));//good
    //window.addEventListener('reload', () => props.updateUserState());//?
    //window.onstorage = () => { alert("storage") };//doesn't do also it

    props.setUserItemsInLS();//good
  }, [])
  return (
    <div>
      <Router>
        {/* <AboutAuction/> */}
        {/* <ContactForm/> */}

        <NewAuction />
        {/* <Switch>
          <Route path={`/auction`} ><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/new_auction`}><NewAuction /></Route>
          <Route path={`/about`}><About /></Route>
          <Route path={`/your_profile`}><YourProfile /></Route>
          <Route path={`/update_your_details`}><UpdateDetails /></Route>
          <Route path={`/`}><Home /></Route>
        </Switch> */}
      </Router>
    </div >
  );

}
const mapStateToProps = state => {
}
export default connect(mapStateToProps, { setUserItemsInLS, updateUserState })(App);
