import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch, useLocation, useHistory } from 'react-router-dom'
import { updateCurrentUser } from '../../store/actions/user'
import AuctionList from '../homePage/AuctionList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
const Auction = (props) => {
    const { url, path } = useRouteMatch();
    useEffect(() => { props.updateCurrentUser(localStorage.getItem("currentUser")) }, [])
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
            {/* <Route path={`${path}/cart`}><Cart /></Route>
            <Route path={`${path}/auction_list`}><AuctionList /></Route>
            <Route exact path={`${path}`}><CurrentAuction /></Route>  */}

            <Route path={`/auction/cart`}><Cart /></Route>
            <Route path={`${path}/auction_list`}><AuctionList /></Route>
            <Route exact path={`${path}`}><CurrentAuction /></Route>
        </Switch>
        <footer className="auction_footer"></footer>
    </div>
    );
}
const mapStateToProps = state => {
}
export default connect(mapStateToProps, {updateCurrentUser})(Auction);
