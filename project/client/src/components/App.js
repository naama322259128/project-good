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
import { LoginFromStorage, GetDataFromStorage } from '../store/actions/home';
import { getUserByIDFromDB } from '../utils/userUtils';
import { getAuctionByIdFromDB } from '../utils/auctionUtils';
import { signIn } from '../store/actions/signIn';
import MiniDrawer from '../components/main/Drawer'
import Statistics from './main/Statistics';
import CartAll from './user/CartAll';
import Login from './user/Login';
import { setNewAuction } from '../store/actions/newAuction'
import { setCurrentAuction } from '../store/actions/currentAuction'
import {dataUpdate}from '../store/actions/user'
function App(props) {

  useEffect(() => {
    //props.dataUpdate();

    window.addEventListener("dblclick", sodi)
  }, [])

  const sodi = () => { props.signIn('m', 'm@gmail.com');/* window.removeEventListener("dblclick", sodi);*/ }

  return (
    //TODO: למה כשמגיעים לדף הבית מתוך דף אחר, הוא פותח לוגין
    // TODO: למחוק מהלוקל-סטורג' מיד שעוזבים את הקומפוננטה 
    <>
      {props.loginIsOpen ? <Login /> : null}
      <Router>

        <Switch>
          <Route exact path={`/home`}><Home /></Route>
          <Route exact path={`/`}><Home /></Route>
          <Route path={`/`}><MiniDrawer /></Route>

          {/* //יירקתי בגלל הדרוואר */}
          {/* <Route path={`/auction`} ><Auction /></Route> 
         <Route path={`/new_auction`}><NewAuction /></Route>
        <Route path={`/continue_new_auction`}><ContinueNewAuction /></Route>
        <Route path={`/about`}><About /></Route>
        <Route path={`/your_profile`}><YourProfile /></Route>
        <Route path={`/update_your_details`}><UpdateDetails /></Route>
        <Route path={`/shoppingCart`}><CartAll /></Route>
        <Route path={`/statistics`}><Statistics/></Route> */}

        </Switch>

      </Router ></>
  );
  
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    loginIsOpen: state.user.loginIsOpen

  };
}
export default connect(mapStateToProps, { signIn, setCurrentAuction, setNewAuction,dataUpdate })(App);