import React from 'react';
import '../homePage/home.scss';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from "react-redux";
import{deleteUser} from "../../store/actions/signUp"
const ITEM_HEIGHT = 48;

const Profile = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
const signOut=()=>{
  if( window.confirm("Are you sure you want to leave?"))
  {
    props.deleteUser(props.currentUser);
  }
  
}

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
<<<<<<< HEAD
            <Link to={'/your_profile'}><MenuItem key={'Your profile'} onClick={()=>{handleClose();alert(12)}} >Your profile</MenuItem> </Link>
            <Link to={'/home'}><MenuItem key={'Sign out'} onClick={handleClose }>Sign out</MenuItem></Link> 

=======
            <Link to={'/your_profile'}><MenuItem key={'Your profile'} onClick={handleClose}>Your profile</MenuItem> </Link>
            <Link to={'/home'}><MenuItem key={'Sign out'} onClick={()=>{handleClose();signOut(); } }>Sign out</MenuItem></Link> 
            
>>>>>>> f673493bfe0b207ec2238daa84cd78fb4dd63f45
        </Menu> </div >);
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {deleteUser})(Profile);
