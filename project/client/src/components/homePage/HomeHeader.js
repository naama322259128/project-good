import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';
import Login from '../user/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import IconButton from '@material-ui/core/IconButton';
<<<<<<< HEAD
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
=======

>>>>>>> f8db560e952d09c146499ddfb897d5b4636d939b


const HomeHeader = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //לעשות גם רימוב-איוונט-ליסנר בעת שהקומפוננטה עוזבת
  useEffect(() => { window.addEventListener("scroll", handleScroll) }, []);




  let handleScroll = () => {
    var small = document.getElementById("small_home_header");
    if (window.scrollY > 900 || document.documentElement.scrollY > 900) {
      if (small) small.style.display = "block";      //להוסיף את ההידר הקטן
    } else {
      if (small) small.style.display = "none";      //להוריד את ההידר הקטן
    }
  };

  return (<>

    <div id="small_home_header">

      <div id="logo_home_small_header" ></div>
<<<<<<< HEAD
      <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
    {props.currentUser?<Profile /> : <Tab label="Login" onClick={() => { window.scrollTo(0, 0); props.setLogin(true); }}/>}
      <Tab label="Home" />

    </Tabs>
      {/* {props.currentUser ? <Profile /> : null}
      {props.currentUser ? null : <Button type="button" className="btnLogin btn" id="login_btn_small_header" onClick={() => { window.scrollTo(0, 0); props.setLogin(true); }}>Login</Button>} */}
=======
      {props.currentUser ? <ProfileButton/> : null}
      {props.currentUser ? null : <Button type="button" className="btnLogin btn" id="login_btn_small_header" onClick={() => { window.scrollTo(0, 0); props.setLogin(true); }}>Login</Button>}
>>>>>>> f8db560e952d09c146499ddfb897d5b4636d939b
    </div>

    <header id="home_header">
      <Link to={"/home"}>  <div id="logo_home_header" ></div></Link>

      {props.currentUser ? <ProfileButton /> : null}
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
          <Button onClick={props.currentUser ? null : () => { window.scrollTo(0, 0); props.setLogin(true) }} type="button" className="btn btnNewAuction">
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
