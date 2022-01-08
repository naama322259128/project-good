import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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
import Timer from '../auction/Timer'
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
import ProfileButton from '../user/ProfileButton';
import Button from '@material-ui/core/Button';
import './Drawer.scss'
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import CustomizedBadges from '../auction/CustomizedBadges';
import auctionsIcon from '../../img/icons/auctions.png'
import statisticsIcon from '../../img/icons/statistics.png'
import buildingIcon from '../../img/icons/building.png'
import homeIcon from '../../img/icons/home.png'
import aboutIcon from '../../img/icons/about.png'
import Arrows from './Arrows';
import { useHistory } from 'react-router-dom';
import Error from './Error';

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
const MyLinkInList = ({ text, iconSrc, to }) => {
  const history = useHistory();

  return (
    <ListItem
      onClick={() => window.location = "http://localhost:3000" + to}
      title={text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} button style={{ marginBottom: '1.8vh' }}>
      <ListItemIcon className="links-icons"><img src={iconSrc} className={"icon-link-in-list"} /></ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>)
}
export const MiniDrawer = (props) => {



  useEffect(() => {
    let id = localStorage.getItem("user");

    if (id && props.currentUser == null) {

      let a_id = localStorage.getItem("currentAuction");
      let n_a_id = localStorage.getItem("newAuction");
      if (a_id) props.setCurrentAuctionByStorage(a_id);
      if (n_a_id) props.setNewAuctionByStorage(n_a_id);
      props.setUserByStorage(id);
    }

  }, [])

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();

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
          {props.currentUser ? <ProfileButton /> : <Button type="button" id="btnLoginInDrower" onClick={() => props.setLogin(true)}>Login</Button>}
          <Typography variant="h6" noWrap component="div">Chinese auctions</Typography>
          {location.pathname.startsWith('/auction') && <Timer />}
          {location.pathname.startsWith('/auction') && <CustomizedBadges />}
          <Arrows />
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

          <MyLinkInList text="HOME" iconSrc={homeIcon} to={"/home"} />

          <MyLinkInList text="AUCTIONS" iconSrc={auctionsIcon} to={"/toAuctions"} />

          <ListItem
            onClick={props.currentUser ?
              () => createNewAuctionInDB(props.currentUser._id).then(succ => {
                if (succ.status != 400) {
                  props.setNewAuction(succ.data);
                  window.location = "http://localhost:3000/new_auction"
                }
              }) :
              () => {
                window.scrollTo(0, 0);
                props.setLogin(true)
              }}
            title={"BUILDING".toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
            button
            style={{ marginBottom: '1.8vh' }}>
            <ListItemIcon className="links-icons"><img src={buildingIcon} className={"icon-link-in-list"} /></ListItemIcon>
            <ListItemText primary={"BUILDING"} />
          </ListItem>

          <MyLinkInList text="STATISTICS" iconSrc={statisticsIcon} to={"/statistics"} />

          <MyLinkInList text="ABOUT" iconSrc={aboutIcon} to={"/about"} />

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
            <Route path={`/`}><Error /></Route>
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
export default connect(mapStateToProps, { setLogin, setNewAuction, setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(MiniDrawer);
