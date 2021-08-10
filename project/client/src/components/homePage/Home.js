import React from 'react';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';
import Login from '../login/Login';
import './home.scss';
import { Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import AuctionList from './AuctionList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import Button from '@material-ui/core/Button';
import AuctionList2 from './AuctionList2';

const Home = (props) => {

  return (<div>

    {/* log-out להוסיף כפתור התנתקות */}
<header>
  <div className="logo"></div>
  <Button type="button" className="btnLogin btn" onClick={() => { props.setLogin(true);}}>Login</Button>
  <p>Back to<br/>School</p>
  <Button type="button"  className="btnMoreInfo btn">More Info</Button>
  {props.loginIsOpen == true ? (<Login />) : null} 

</header>
  
    <Switch>
      <Route path={`/current_auction`}><CurrentAuction /></Route>
      <Route path={`/cart`}><Cart /></Route>
      <Route path={`/`}><AuctionList2/></Route>
    </Switch>
    <footer></footer>
  </div>
  );
}
const mapStateToProps = state => {
  return { loginIsOpen: state.user.loginIsOpen };
}
export default connect(mapStateToProps, { setLogin })(Home);
