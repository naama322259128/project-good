import './yourProfile.scss'
import { connect } from 'react-redux';
import React from 'react';
import SiteManagerTable from './SiteManagerTable';
import AuctionManagerTable from './manager auction/AuctionManagerTable';
import UserTable from './UserTable';
import { BrowserRouter as Router, Link, useRouteMatch, Route, Switch } from 'react-router-dom'
import EditAuction from './manager auction/EditAuction'
import EditProducts from './manager auction/EditProducts'
import AuctionResults from './manager auction/AuctionResults'
import AuctionStatistics from './manager auction/AuctionStatistics'

const YourProfile = (props) => {
    return (<>
        <Switch>
            <Route path={'/your_profile/edit_auction/products'}><EditProducts /></Route>
            <Route path={'/your_profile/edit_auction'}><EditAuction /></Route>
            <Route path={'/your_profile/statistics'}>< AuctionStatistics /></Route>
            <Route path={'/your_profile/results'}><AuctionResults/></Route>
            <Route path={'/your_profile'}>  {props.currentUser.status === 'USER' ? (<UserTable />) : props.currentUser.status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) : (<SiteManagerTable />)}</Route>
        </Switch>
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {})(YourProfile);