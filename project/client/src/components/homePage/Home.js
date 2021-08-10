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

const Home = (props) => {

  return (<div>

    {/* log-out להוסיף כפתור התנתקות */}
    <header>
      <Link to={"/home"}>  <div className="logo" ></div></Link>
      <Button type="button" className="btnLogin btn" onClick={() => {  window.scrollTo(0, 1000); props.setLogin(true); }}>Login</Button>
      <p>Back to<br />School</p>
      <Button type="button" className="btnMoreInfo btn">More Info</Button>
      <Link to={"/newAuction"}><Button type="button" className="btn">NEW AUCTION</Button></Link>
      {props.loginIsOpen == true ? (<Login />) : null}

    </header>

    <AuctionList />
    <footer></footer>
  </div>
  );
}
const mapStateToProps = state => {
  return { loginIsOpen: state.user.loginIsOpen };
}
export default connect(mapStateToProps, { setLogin })(Home);
