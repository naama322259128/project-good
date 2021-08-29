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
import React, { useEffect, useState } from "react";
import { updateCurrentUser } from '../store/actions/user'
import { connect } from "react-redux";

// במקום לעשות בכל פונקציה רענון מהלוקל סטורג'
//אפשר לעשות פונקציה שתופעל בעת רענון
//ולהדים את האיוונט ליסנר הזה באפפ



function App(props) {

  useEffect(() => {
    let x = localStorage.getItem("currentUser")
    if (x == "" || x == undefined) localStorage.setItem("currentUser", "");
    props.updateCurrentUser(localStorage.getItem("currentUser"));

  }, [])

  return (
    <div>
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
    </div >
  );

}


const mapStateToProps = state => {
}
export default connect(mapStateToProps, { updateCurrentUser })(App);
