import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './user/YourProfile';
import UpdateDetails from './user/UpdateDetails';
import React, { useEffect } from "react";
import ContinueNewAuction from './new auction/ContinueNewAuction';
import { connect } from "react-redux";
import { signIn, loginGoogle } from '../store/actions/signIn';
function App(props) {
  useEffect(() => {
    if (props.currentUser == null && localStorage.getItem("login") == "true")
      props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
    else if (props.currentUser == null && localStorage.getItem("login") == "google")
      props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))
  }, [])
  return (
    <Router>
      <Switch>
        <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route>
        <Route path={`/new_auction`}><NewAuction /></Route>
        <Route path={`/continue_new_auction`}><ContinueNewAuction /></Route>
        <Route path={`/about`}><About /></Route>
        <Route path={`/your_profile`}><YourProfile /></Route>
        <Route path={`/update_your_details`}><UpdateDetails /></Route>
        <Route path={`/`}><Home /></Route>
      </Switch>
    </Router>

  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { signIn, loginGoogle })(App);