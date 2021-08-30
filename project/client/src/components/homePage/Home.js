import { connect } from "react-redux";
import './home.scss';
import AuctionsList from './AuctionsList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import React, { useEffect } from "react";
import { updateUserState,setItemsInLocalStorage } from '../../store/actions/user'

const Home = (props) => {
  useEffect(() => {
    window.addEventListener('storage', props.updateUserState);
    props.setItemsInLocalStorage();
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
export default connect(mapStateToProps, {updateUserState,setItemsInLocalStorage})(Home);
