import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Login from '../user/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
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
    window.addEventListener("scroll", changeHeader)
    return () => {
      window.removeEventListener('scroll', changeHeader);
    };
  }, []);

  const changeHeader = () => {
    let s = document.getElementById("smallHeader");
    if (s != null) {
      let height = 800//הגובה של ההידר הגדול
      if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        if (s != null) s.style.top = "0";
      } else {
        if (s != null) s.style.top = "-500px";
      }
    }
  }
  return (<>
    <header id="home_header" >
      <Link to={"/home"} id="logo_home_header" > </Link>

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

        <Button type="button" className="btn" id="btnMoreInfo" href="/about">MORE INFO</Button>

        <Button href={props.currentUser ? "/new_auction" : '#'} onClick={props.currentUser ? null : () => { window.scrollTo(0, 0); props.setLogin(true) }} type="button" className="btn" id="btnNewAuction">
          BUILD CHINESE AUCTION
        </Button>
      </div>


      <div id="right_pic"></div>
      <div id="left_pic"></div>
    </header>
    <div id="smallHeader">
      <Link to={"/home"} id="logo_home_small_header" ></Link>
      {props.currentUser ? <ProfileButton /> : <Button type="button" className="btn" id="login_btn_small_header" onClick={() => props.setLogin(true)}>Login</Button>}
    </div>
  </>)
}


const mapStateToProps = state => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, { setLogin, updateCurrentUser })(HomeHeader);
