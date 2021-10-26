import React, { useEffect, useState } from 'react';
import Login from '../user/Login';
import Button from '@material-ui/core/Button';
import ProfileButton from '../user/ProfileButton';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './main.scss';
import { setLogin } from '../../store/actions/home';
import { updateCurrentUser } from '../../store/actions/user'
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';
import { useStorageReducer } from 'react-storage-hooks';

const SmallHeader = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
    );

    return (<>
        <header id="small-header">
            <Link to={"/home"} id="logo_home_small_header" />
            {state.currentUser ?
                <ProfileButton /> :
                <Button type="button" className="btn" id="login_btn_small_header"
                    onClick={() => {
                        dispatch({ type: actionTypes.SET_LOGIN, payload: true })
                    }}>Login</Button>}
        </header>

    </>);
}

export default  SmallHeader;
