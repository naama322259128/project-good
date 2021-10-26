import './yourProfile.scss'
import React from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'


const YourProfile = (props) => {
    //TODO: לבדוק שהיוסר או הכרנט-יוסר לא אנדיפיינד
    let currentUser = JSON.parse(localStorage.getItem('user')).currentUser;
    return (
        <Switch>
            <Route path={'/your_profile/edit_auction'}>{currentUser.status === 'AUCTION_MANAGER' ? <EditAuction /> : null}</Route>
            <Route path={'/your_profile/statistics'}>{currentUser.status === 'AUCTION_MANAGER' ? < AuctionStatistics /> : null}</Route>
            <Route path={'/your_profile/results'}>{currentUser.status === 'AUCTION_MANAGER' ? <AuctionResults /> : null}</Route>
            <Route path={'/your_profile'}>
                {currentUser.status === 'SITE_MANAGER' ? (<SiteManagerTable />) :
                    currentUser.status === 'AUCTION_MANAGER' ?
                        (<AuctionManagerTable />) : (<UserTable />)}
            </Route>
        </Switch>
    );
}


export default YourProfile;