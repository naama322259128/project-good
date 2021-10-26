import React from 'react';
import './yourProfile.scss'
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from "react-redux";

import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';

const ITEM_HEIGHT = 48;
const ProfileButton = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
    );

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const out = () => {
        handleClose();
        //TODO: חשוב מאוד, האם לשמור לו נתונים לפני שמוחקים לו הכל
        dispatch({ type: actionTypes.SIGN_OUT }) //איפוס הנתונים בלוקלסטורג ובסטייט
    }



    return (<div>
        <AccountCircleIcon
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            id="profileIcon"
        >
            <MoreVertIcon />
        </AccountCircleIcon>

        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
        >
            <Link to={'/your_profile'}>
                <MenuItem key={'Your profile'} onClick={handleClose}>Your profile</MenuItem>
            </Link>


            <Link to={'/update_your_details'}>
                <MenuItem key={'Update your details'} onClick={handleClose}>Update your details</MenuItem>
            </Link>

            <Link to={'/continueNewAuction'}>
                <MenuItem key={'Continue chinese auction'} onClick={handleClose}>Continue chinese auction</MenuItem>
            </Link>

            <Link to={'/home'}>
                <MenuItem key={'Sign out'} onClick={out}>Sign out</MenuItem>
            </Link>

        </Menu>


    </div >);
}

const mapStateToProps = state => {
    return {
    };
}
export default connect(mapStateToProps, {/* signOut*/ })(ProfileButton);
