import React from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch, useLocation, useHistory } from 'react-router-dom'
import AuctionList from '../homePage/AuctionList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
const Auction = (props) => {
    const { url, path } = useRouteMatch();

    return (<div>

        <header className="auction_header">
            {/* log-out להוסיף כפתור התנתקות */}
            <Link to={"/home"}>  <div className="logo" ></div></Link>
        </header>



        <Switch>
            <Route path={`${path}/cart`}><Cart /></Route>
            <Route path={`${path}/auction_list`}><AuctionList /></Route>
            <Route exact path={`${path}`}><CurrentAuction /></Route>
        </Switch>
        <footer className="auction_footer"></footer>
    </div>
    );
}
const mapStateToProps = state => {
}
export default connect(mapStateToProps, {})(Auction);
