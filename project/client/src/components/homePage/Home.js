import { connect } from "react-redux";
import './home.scss';
import AuctionsList from './AuctionsList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import React, { useEffect } from "react";
import { updateCurrentUser } from '../../store/actions/user'

const Home = (props) => {
  useEffect(() => { props.updateCurrentUser(JSON.parse(localStorage.getItem("currentUser"))) }, [])

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
export default connect(mapStateToProps, {updateCurrentUser})(Home);
