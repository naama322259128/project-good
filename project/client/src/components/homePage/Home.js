import { connect } from "react-redux";
import './home.scss';
import AuctionsList from './AuctionsList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import React, { useEffect } from "react";
import { updateUserState } from '../../store/actions/user'
import {setUserItemsInLS}from '../../utils/userUtils'
const Home = (props) => {
  useEffect(() => {
    window.addEventListener('storage', props.updateUserState);
    window.addEventListener('reload', props.updateUserState);
    props.setUserItemsInLS();
  }, [])
  return (<>
    <HomeHeader />
    <AuctionsList />
    <HomeFooter />
  </>
  );
}
const mapStateToProps = state => {
  return {
  };
}
export default connect(mapStateToProps, {updateUserState,setUserItemsInLS})(Home);