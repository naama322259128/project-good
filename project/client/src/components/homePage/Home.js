import { connect } from "react-redux";
import './home.scss';
import AuctionsList from './AuctionsList';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import React, { useEffect } from "react";
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from "../../store/actions/user";
import { useLocation } from 'react-router-dom';

const Home = (props) => {
  const location = useLocation();

  useEffect(() => {
    let id = localStorage.getItem("user");

    if (id && props.currentUser == null) {

      let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
      if (a_id) props.setCurrentAuctionByStorage(a_id);
      if (n_a_id) props.setNewAuctionByStorage(n_a_id);
      props.setUserByStorage(id);
    }
    if (location.pathname.startsWith('/toAuctions')) window.scrollTo(0, 900)//TODO

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
    currentUser: state.user.currentUser

  };
}
export default connect(mapStateToProps, { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(Home);