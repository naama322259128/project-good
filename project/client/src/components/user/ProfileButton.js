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
            <Link to={'/your_profile'}>
                <MenuItem key={'Your profile'} className="user-menu" onClick={handleClose}>Your profile</MenuItem>
            </Link>

            <Link to={'/update_your_details'}>
                <MenuItem key={'Update your details'}  className="user-menu" onClick={handleClose}>Update your details</MenuItem>
            </Link>
            {props.currentUser && props.currentUser.status != "USER" &&
                <Link to={'/continue_new_auction'}>
                    <MenuItem key={'Continue building'}  className="user-menu" onClick={handleClose}>Continue building</MenuItem>
                </Link>
            }
            <Link to={'/shoppingCart'}>
                <MenuItem key={'Shopping cart'} className="user-menu"  onClick={handleClose}>Shopping cart</MenuItem>
            </Link>
            <Link to={'/home'}>
                <MenuItem key={'Sign out'} className="user-menu"  onClick={out}>Sign out</MenuItem>
            </Link>

        </Menu>


    </div >);
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { signOut })(ProfileButton);