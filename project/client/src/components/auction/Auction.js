import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import { updateCurrentAuctionState } from '../../store/actions/currentAuction'
import { setCurrentAuctionItemsInLS } from '../../utils/auctionUtils'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import SmallHeader from '../main/SmallHeader';
import SmallFooter from '../main/SmallFooter';

const Auction = (props) => {
    // const { url, path } = useRouteMatch();
    // useEffect(() => {
    //     window.addEventListener('storage', props.updateCurrentAuctionState);
    //     window.addEventListener('reload', props.updateCurrentAuctionState);
    //     props.setCurrentAuctionItemsInLS();
    // }, [])
    return (<>
        <SmallHeader />
        {/* <header className="auction_header">
             log-out להוסיף כפתור התנתקות
            <Link to={"/home"}>  <div className="logo" ></div></Link>
        </header> */}



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
            <Route path={`/auction`}><CurrentAuction /></Route>
            <Route path={`/`}><CurrentAuction /></Route>
            {/* למחוק את הראוט האחרון הוא רק זמני */}
        </Switch>
        {/* <footer className="auction_footer"></footer> */}
        <SmallFooter />
    </>
    );
}
const mapStateToProps = state => {
}
export default connect(mapStateToProps, { setCurrentAuctionItemsInLS, updateCurrentAuctionState })(Auction);
