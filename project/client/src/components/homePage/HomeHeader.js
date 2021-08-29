import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Login from '../user/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setLogin } from '../../store/actions/home'
import { updateCurrentUser } from '../../store/actions/user'


const HomeHeader = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //TODO:
  //לעשות גם רימוב-איוונט-ליסנר בעת שהקומפוננטה עוזבת
  useEffect(() => {
    props.updateCurrentUser(localStorage.getItem("currentUser"));
    window.addEventListener("scroll", handleScroll)
  }, []);

  let handleScroll = () => {
    var small = document.getElementById("small_home_header");
    if (window.scrollY > 900 || document.documentElement.scrollY > 900) {
      if (small) small.style.display = "block";      //להוסיף את ההידר הקטן
    }
    else if (small) small.style.display = "none";           //להוריד את ההידר הקטן

  };

  return (<>

    <div id="small_home_header">

      <div id="logo_home_small_header" ></div>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {props.currentUser ? <ProfileButton /> : <Tab label="Login" onClick={() => { window.scrollTo(0, 0); props.setLogin(true) }} />}
        <Tab label="Home" />

      </Tabs>
    </div>

    <header id="home_header">
      <Link to={"/home"}>  <div id="logo_home_header" ></div></Link>

      {props.currentUser ? <ProfileButton /> : <Button type="button" className="btn" id="btnLogin" onClick={() => { props.setLogin(true) }}>Login</Button>}
      {props.loginIsOpen ? (<Login />) : null}

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
          <Button type="button" className="btn" id="btnMoreInfo">MORE INFO</Button>
        </Link>

        <Link to={props.currentUser ? "/new_auction" : '#'}>
          <Button onClick={props.currentUser ? null : () => { window.scrollTo(0, 0); props.setLogin(true) }} type="button" className="btn" id="btnNewAuction">
            BUILD CHINESE AUCTION
          </Button>
        </Link>
      </div>


      <div id="right_pic"></div>
      <div id="left_pic"></div>
    </header>
  </>)
}


const mapStateToProps = state => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { setLogin,updateCurrentUser })(HomeHeader);
