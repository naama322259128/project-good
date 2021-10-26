import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Login from '../user/Login';
import './home.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import { setLogin } from '../../store/actions/home'
import SmallHeader from '../main/SmallHeader';
import User from '../../models/user'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';
import { setCurrentUser } from '../../store/actions/signUp'


export default function HomeHeader(props) {
  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'user',
    reducer,
    userState
  );

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

      {state.currentUser ? <ProfileButton/>
      : <Button type="button" className="btn" id="btnLogin"

        onClick={() => {
          dispatch({ type: actionTypes.SET_LOGIN, payload: true  /*props.setLogin(true) */ })
        }}>Login</Button>
        }

      {state.loginIsOpen ? <Login/> : null}

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

        <Button
          href={state.currentUser ? "/new_auction" : '#'}
          onClick={state.currentUser ?
            localStorage.removeItem("newAuction")  //לפנות את הלוכל-סטורג' מנתיוני מכירה חדשה
            : () => {
              window.scrollTo(0, 0);
              dispatch({ type: actionTypes.SET_LOGIN, payload: true })
            }
          }
          type="button" className="btn" id="btnNewAuction">
          BUILD CHINESE AUCTION
        </Button>
      </div>


      <div id="right_pic" />
      <div id="left_pic" />
    </header>
    <SmallHeader />
  </>)
}
