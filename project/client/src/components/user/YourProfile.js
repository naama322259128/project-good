import './yourProfile.scss'
import { connect } from 'react-redux';
import React from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { BrowserRouter as Router, Link, useRouteMatch, Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import EditProducts from './auction manager/EditProducts'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'

const YourProfile = (props) => {
    return (<>
        <Switch>
            <Route path={'/your_profile/edit_auction'}><EditAuction /></Route>
            <Route path={'/your_profile/statistics'}>< AuctionStatistics /></Route>
            <Route path={'/your_profile/results'}><AuctionResults/></Route>
            <Route path={'/your_profile'}>  {localStorage.getItem("currentUser").status === 'USER' ? (<UserTable />) : localStorage.getItem("currentUser").status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) : (<SiteManagerTable />)}</Route>
        </Switch>
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        //currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {})(YourProfile);