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
function App(props) {
  useEffect(() => {
<<<<<<< HEAD
    window.addEventListener('storage', props.updateUserState);//מעדכנת את הסטייט מתי שינוי בסטורג
    window.location.addEventListener('reload', props.updateUserState);//מתי שיהיה טעינה בדפדפן אז נעדכן את הסטטי
    props.setItemsInLocalStorage();
  }, [])

  //להוסיף אדד-איונט-ליסנר לרענון הדפדפן
=======
    window.addEventListener('storage', props.updateUserState);
    window.addEventListener('reload', props.updateUserState);
    props.setUserItemsInLS();
  }, [])
>>>>>>> 85e3a164308c3df250dc4e35076bacb553891d1a
  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/auction`} ><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          {/* <Route path={`/new_auction`}><PackagesList /></Route> */}
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
export default connect(mapStateToProps, { setUserItemsInLS, updateUserState })(App);
