import './yourProfile.scss'
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'

const YourProfile = (props) => {
    
    return (
        <Switch>
            <Route path={'/your_profile/edit_auction'}><EditAuction /></Route>
            <Route path={'/your_profile/statistics'}>< AuctionStatistics /></Route>
            <Route path={'/your_profile/results'}><AuctionResults /></Route>
            <Route path={'/your_profile'}>{props.currentUser.status === 'SITE_MANAGER' ? (<SiteManagerTable />) : props.currentUser.status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) : (<UserTable />)}</Route>
        </Switch>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {  })(YourProfile);