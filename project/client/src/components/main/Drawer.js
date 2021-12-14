import 'semantic-ui-css/semantic.min.css'
import Home from '../homePage/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auction from '../auction/Auction';
import NewAuction from '../new auction/NewAuction';
import About from './About'
import YourProfile from '../user/YourProfile';
import UpdateDetails from '../user/UpdateDetails';
import React, { useEffect } from "react";
import ContinueNewAuction from '../new auction/ContinueNewAuction';
import { connect } from "react-redux";
import Statistics from './Statistics';
import CartAll from '../user/CartAll';
import { setLogin } from '../../store/actions/home';
import { setNewAuction } from '../../store/actions/newAuction';
import { createNewAuctionInDB } from '../../utils/newAuctionUtils';
import { Link } from 'react-router-dom';
import Login from '../user/Login';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import './Drawer.scss'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const MyLinkInList = ({ text, icon }) => {
  return (
    <ListItem button>
      <ListItemIcon className="links-icons">
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>)
}
export const MiniDrawer = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar id="drawer-top">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >Chinese auctions</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List id="links-list">

          <Link to={"/home"}><MyLinkInList text="HOME" /></Link>

          <Link to={"/home"}><MyLinkInList text="AUCTIONS" /></Link>

          <Link onClick={props.currentUser ? () => createNewAuctionInDB(props.currentUser._id).then(succ => {
            if (succ.status != 400) {
              props.setNewAuction(succ.data);
              console.log(succ.data);
            }
          }) : () => { window.scrollTo(0, 0); props.setLogin(true) }} to={props.currentUser ? "/new_auction" : '#'}>
            <MyLinkInList text="BUILDING" />
          </Link>

          <Link to={"/statistics"} ><MyLinkInList text="STATISTICS" /></Link>

          <Link to={"/about"} ><MyLinkInList text="ABOUT" /></Link>

        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Router>
          <Switch>
            <Route path={`/auction`} ><Auction /></Route>
            <Route path={`/new_auction`}><NewAuction /></Route>
            <Route path={`/continue_new_auction`}><ContinueNewAuction /></Route>
            <Route path={`/about`}><About /></Route>
            <Route path={`/your_profile`}><YourProfile /></Route>
            <Route path={`/update_your_details`}><UpdateDetails /></Route>
            <Route path={`/shoppingCart`}><CartAll /></Route>
            <Route path={`/statistics`}><Statistics /></Route>
          </Switch>
        </Router >
      </Box>
    </Box >
  );
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
}
export default connect(mapStateToProps, { setLogin, setNewAuction })(MiniDrawer);
