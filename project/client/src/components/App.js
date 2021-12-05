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
// import { LoginFromStorage, GetDataFromStorage } from '../store/actions/home';
import { signIn } from '../store/actions/signIn';
import MiniDrawer from '../components/main/Drawer'
import Statistics from './main/Statistics';

function App(props) {

  useEffect(() => {
    /*if (props.currentUser == null) props.LoginFromStorage();
    if (props.newAuction == null) props.GetDataFromStorage();*/
    window.addEventListener("dblclick", sodi)
  }, [])

const sodi = () => { props.signIn('m', 'm@gmail.com');/* window.removeEventListener("dblclick", sodi);*/ }

  return (
    //TODO: למה כשמגיעים לדף הבית מתוך דף אחר, הוא פותח לוגין
    // TODO: למחוק מהלוקל-סטורג' מיד שעוזבים את הקומפוננטה 
    <Router>
      <Switch>
        <Route path={`/auction`} ><Auction /></Route>
        <Route path={`/home`}><Home /></Route>
        <Route exact path={`/`}><Home /></Route>
        {/* <Route path={`/`}><MiniDrawer /></Route> */}
        <Route path={`/new_auction`}><NewAuction /></Route>
        <Route path={`/continue_new_auction`}><ContinueNewAuction /></Route>
        <Route path={`/about`}><About /></Route>
        <Route path={`/your_profile`}><YourProfile /></Route>
        <Route path={`/update_your_details`}><UpdateDetails /></Route>
        <Route path={`/shoppingCart`}><Home /></Route>
        <Route path={`/Statistics`}><Statistics/></Route>
      </Switch>
    </Router >
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { signIn })(App);