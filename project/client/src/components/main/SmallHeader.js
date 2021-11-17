import React, { useEffect, useState } from 'react';
import Login from '../user/Login';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './main.scss';
import { setLogin } from '../../store/actions/home';

const SmallHeader = (props) => {

    return (<>
        <header id="small-header">
            <Link to={"/home"} id="logo_home_small_header" />//TODO למה פותח לוגין

            {props.currentUser ?
                <ProfileButton /> :
                (<Button type="button" className="btn" id="login_btn_small_header"
                    onClick={() => { props.setLogin(true) }}>Login</Button>)}//למה לא פותח לוגין

        </header>

    </>);
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        loginIsOpen: state.user.loginIsOpen
    }
}
export default connect(mapStateToProps, { setLogin })(SmallHeader);
