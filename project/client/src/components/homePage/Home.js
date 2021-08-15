import React from 'react';
import { connect } from "react-redux";
import './home.scss';
import AuctionList from './AuctionList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';



const Home = (props) => {

  return (<>
    <HomeHeader />
    
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
