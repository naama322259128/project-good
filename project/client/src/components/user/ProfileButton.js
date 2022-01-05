import React from 'react';
import './yourProfile.scss'
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from "react-redux";
import { signOut } from '../../store/actions/user';

const ITEM_HEIGHT = 48;
const ProfileButton = (props) => {


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
        props.signOut();
        window.location = "http://localhost:3000/home"
    }


    // color: "#262b96 !important",//TODO

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
                    width: '25ch',
                    marginTop: '4vh',
                },
            }}
        >

            <MenuItem key={'Your profile'}
                className="user-menu"
                onClick={() => { handleClose(); window.location = "http://localhost:3000/your_profile" }}>
                Your profile
            </MenuItem>

            <MenuItem key={'Update your details'}
                className="user-menu"
                onClick={() => { handleClose(); window.location = "http://localhost:3000/update_your_details"; }}>
                Update your details
            </MenuItem>

            {props.currentUser && props.currentUser.status != "USER" &&
                <MenuItem key={'Continue building'}
                    className="user-menu"
                    onClick={() => { handleClose(); window.location = "http://localhost:3000/continue_new_auction" }}>
                    Continue building
                </MenuItem>}


            <MenuItem key={'Shopping cart'}
                className="user-menu"
                onClick={() => { handleClose(); window.location = "http://localhost:3000/shoppingCart" }} >
                Shopping cart
            </MenuItem>

            <MenuItem key={'Sign out'} className="user-menu" onClick={out}>Sign out</MenuItem>
        </Menu>


    </div >);
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { signOut })(ProfileButton);