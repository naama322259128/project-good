import React, { useEffect, useState } from 'react';
import Login from '../user/Login';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './main.scss';
import { setLogin } from '../../store/actions/home';
import { updateCurrentUser } from '../../store/actions/user'

const HomeFooter = (props) => {
    return (<>
        <header id="small-header">
            <Link to={"/home"} id="logo_home_small_header" ></Link>
            {props.currentUser ? <ProfileButton /> : <Button type="button" className="btn" id="login_btn_small_header" onClick={() => props.setLogin(true)}>Login</Button>}
        </header>
        {props.loginIsOpen ? (<Login />) : null}

    </>);
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser  ,
          loginIsOpen: state.user.loginIsOpen,

    }
}
export default connect(mapStateToProps, { setLogin, updateCurrentUser })(HomeFooter);
