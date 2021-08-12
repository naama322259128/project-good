import React from 'react';
import { connect } from "react-redux";
import './home.scss';
import AuctionList from './AuctionList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
const Home = (props) => {

  return (<>
    <HomeHeader />
    <AuctionList />
    <HomeFooter />
  </>
  );
}
const mapStateToProps = state => {
  return {
  };
}
export default connect(mapStateToProps, {})(Home);
