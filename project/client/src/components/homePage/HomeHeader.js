import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Login from '../user/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import { setLogin } from '../../store/actions/home'
import { setCurrentUser } from '../../store/actions/signUp'
import { createNewAuctionInDB } from '../../utils/newAuctionUtils';
import { setNewAuction } from '../../store/actions/newAuction';
import SmallHeader from '../main/SmallHeader';
import User from '../../models/user'

const HomeHeader = (props) => {


  useEffect(() => {
    window.addEventListener("scroll", changeHeader);
    return () => { window.removeEventListener('scroll', changeHeader); };
  }, []);

  const changeHeader = () => {
    let s = document.getElementById("small-header");
    if (s != null) {
      let height = 900//הגובה של ההידר הגדול
      if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        if (s != null) s.style.top = "0";
      }
      else if (s != null) s.style.top = "-500px";
    }
  }
  return (<>
    <header id="home_header" >
      <Link to={"/home"} id="logo_home_header" />

      {props.currentUser ? <ProfileButton />
        : <Button type="button" className="btn" id="btnLogin"
          onClick={() => props.setLogin(true)}>Login</Button>}

      {props.loginIsOpen ? <Login /> : null}

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

        <Link
          to={props.currentUser ? "/new_auction" : '#'}>
          <Button
            // href={props.currentUser ? "/new_auction" : '#'}
            onClick={props.currentUser ?
              () => {
                createNewAuctionInDB(props.currentUser._id).then(succ => {
                  if (succ.status != 400) {
                    props.setNewAuction(succ.data);
                  }
                })
                localStorage.removeItem("newAuction")
              }  //לפנות את הלוכל-סטורג' מנתיוני מכירה חדשה
              : () => {
                props.setLogin(true);
                window.scrollTo(0, 0);
              }
            }
            type="button" className="btn" id="btnNewAuction">
            BUILD CHINESE AUCTION
          </Button>
        </Link>
      </div>


      <div id="right_pic" />
      <div id="left_pic" />
    </header>
    {/* <SmallHeader /> */}
  </>)
}
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loginIsOpen: state.user.loginIsOpen
  }
}
export default connect(mapStateToProps, { setLogin,setNewAuction })(HomeHeader);
