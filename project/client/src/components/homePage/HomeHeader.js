import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';
import Login from '../login/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Profile from '../login/Profile';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';



const HomeHeader = (props) => {

//לעשות גם רימוב-איוונט-ליסנר בעת שהקומפוננטה עוזבת
  useEffect(() => { window.addEventListener("scroll", handleScroll) }, []);

  let handleScroll = () => {
    if (window.scrollY > 20 || document.documentElement.scrollY > 20) {
      document.getElementById("home_header").style.height = "15vh";
    } else {
      document.getElementById("home_header").style.height = "136vh";
    }
  };

  return (
    <header id="home_header">
      <Link to={"/home"}>  <div className="logo" ></div></Link>
      {/* פרופיל של הבחירה */}
      {props.currentUser ? <Profile /> : null}
      {props.currentUser ? null : <Button type="button" className="btnLogin btn" onClick={() => { window.scrollTo(0, 900); props.setLogin(true); }}>Login</Button>}
      {/* <div id="home_text">
        <h3>Build your </h3>
        <h5>chinese auction</h5>
        <p>
          If you dreamed of having your own Chinese auction,<br />
          here you can easily do so.<br />
          In a short, simple, light and convenient process,<br />
          you will create your Chinese auction.
        </p>

        <Link to={"/about"}>
          <Button type="button" className="btnMoreInfo btn">MORE INFO</Button>
        </Link>

        <Link to={props.currentUser ? "/newAuction" : '#'}>
          <Button onClick={props.currentUser ? null : () => { window.scrollTo(0, 900); props.setLogin(true) }} type="button" className="btn btnNewAuction">
            BUILD CHINESE AUCTION
          </Button>
        </Link>
      </div> */}


      {props.loginIsOpen == true ? (<Login />) : null}

      {/* <i class="chevron down icon" id="iconDown" onClick={() => { window.scrollTo(0, 900) }}></i> */}

      {/* <IconButton color="primary" component="span" onClick={() => { window.scrollTo(0, 900) }}id="up_down_in_header">
        <UpIcon />
      </IconButton> */}

      {/* <div id="right_pic"></div>
      <div id="left_pic"></div> */}
    </header>)


}


const mapStateToProps = state => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { setLogin })(HomeHeader);
