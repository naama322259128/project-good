import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch, useLocation, useHistory } from 'react-router-dom'
import { updateCurrentUser } from '../../store/actions/user'
import AuctionsList from '../homePage/AuctionsList';
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
const Auction = (props) => {
    const { url, path } = useRouteMatch();
    useEffect(() => { props.updateCurrentUser(JSON.parse(localStorage.getItem("currentUser"))) }, [])
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
export default connect(mapStateToProps, { updateCurrentUser })(Auction);
