import React from 'react';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';
import Login from '../login/Login';
import { Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import AuctionList from './AuctionList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';

const Home = (props) => {

  return (<div>

    {/* log-out להוסיף כפתור התנתקות */}

    {/* זה מיורק רק זמנית */}
    {/* <button onClick={() => { props.setLogin(true); }}>Log in</button>
    {props.loginIsOpen == true ? (<Login />) : null} */}

    <h1>home page</h1>
    <Switch>
      <Route path={`/current_auction`}><CurrentAuction /></Route>
      <Route path={`/cart`}><Cart /></Route>
      <Route path={`/`}><AuctionList /></Route>
    </Switch>
  </div>);
}
const mapStateToProps = state => {
  return { loginIsOpen: state.user.loginIsOpen };
}
export default connect(mapStateToProps, { setLogin })(Home);
