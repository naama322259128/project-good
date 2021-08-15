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
    var small = document.getElementById("small_home_header");
    if (window.scrollY > 26 || document.documentElement.scrollY > 26) {
      if (small) small.style.display = "block";      //להוסיף את ההידר הקטן
    } else {
      if (small) small.style.display = "none";      //להוריד את ההידר הקטן
    }
  };

  return (<>

    <div id="small_home_header">
      <div id="logo_home_small_header" ></div>
      {props.currentUser ? <Profile /> : null}
      {props.currentUser ? null : <Button type="button" className="btnLogin btn" id="login_btn_small_header" onClick={() => { window.scrollTo(0, 0); props.setLogin(true); }}>Login</Button>}
    </div>

    <header id="home_header">
      <Link to={"/home"}>  <div id="logo_home_header" ></div></Link>
      {/* פרופיל של הבחירה */}
      {props.currentUser ? <Profile /> : null}
      {props.currentUser ? null : <Button type="button" className="btnLogin btn" onClick={() => { props.setLogin(true); }}>Login</Button>}
      <div id="home_text">
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
      </div>

      {props.loginIsOpen == true ? (<Login />) : null}

      <div id="right_pic"></div>
      <div id="left_pic"></div>
    </header></>)
}


const mapStateToProps = state => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { setLogin })(HomeHeader);
