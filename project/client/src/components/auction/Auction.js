import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import {  updateCurrentAuctionState } from '../../store/actions/currentAuction'
import {setCurrentAuctionItemsInLS}from '../../utils/auctionUtils'
import AuctionsList from '../homePage/AuctionsList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
const Auction = (props) => {
    const { url, path } = useRouteMatch();
    useEffect(() => {
        window.addEventListener('storage', props.updateCurrentAuctionState);
        window.addEventListener('reload', props.updateCurrentAuctionState);
        props.setCurrentAuctionItemsInLS();
    }, [])
    return (<div>

        <header className="auction_header">
            {/* log-out להוסיף כפתור התנתקות */}
            <Link to={"/home"}>  <div className="logo" ></div></Link>
        </header>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Switch>
            <Route path={`/auction/cart`}><Cart /></Route>
            <Route path={`/auction/auction_list`}><AuctionsList /></Route>
            <Route path={`/auction`}><CurrentAuction /></Route>
        </Switch>
        <footer className="auction_footer"></footer>
    </div>
    );
}
const mapStateToProps = state => {
}
export default connect(mapStateToProps, {  setCurrentAuctionItemsInLS, updateCurrentAuctionState })(Auction);
