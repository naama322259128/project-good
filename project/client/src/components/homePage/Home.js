import { connect } from "react-redux";
import './home.scss';
import AuctionList from './AuctionList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => { localStorage.setItem("showLogin", false); }, [])
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
