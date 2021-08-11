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
import HomeFooter from './HomeFooter';

const Home = (props) => {

  return (<>

    {/* log-out להוסיף כפתור התנתקות */}
    <header className="home_header">

      <Link to={"/home"}>  <div className="logo" ></div></Link>
   {props.currentUser?null: <Button type="button" className="btnLogin btn" onClick={() => { window.scrollTo(0, 1000); props.setLogin(true); }}>Login</Button>}  
      <div id="home_text">
        <h3>Build your </h3>
        <h5>chinese auction</h5>
        <p>
          If you dreamed of having your own Chinese auction,<br />
          here you can easily do so.<br />
          In a short, simple, light and convenient process,<br />
          you will create your Chinese auction.
        </p>
        <Button type="button" className="btnMoreInfo btn">MORE INFO</Button>
        <Link to={props.currentUser ? "/newAuction" : '#'}>
          <Button onClick={props.currentUser ? null : () => props.setLogin(true)} type="button" className="btn btnNewAuction">
            BUILD CHINESE AUCTION
          </Button>
        </Link>
        {props.loginIsOpen == true ? (<Login />) : null}
      </div>
      <div id="right_pic"></div>
      <div id="left_pic"></div>
    </header>

    <AuctionList />
    <HomeFooter/>
  </>
  );
}
const mapStateToProps = state => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { setLogin })(Home);
