import './yourProfile.scss'
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { BrowserRouter as Router, Link, useRouteMatch, Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import EditProducts from './auction manager/EditProducts'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'
import { updateUserState, setItemsInLocalStorage as set1 } from '../../store/actions/user'
import { updateSiteManagerState, setItemsInLocalStorage as set2 } from '../../store/actions/siteManager'
import { updateAuctionManagerState, setItemsInLocalStorage as set3 } from '../../store/actions/auctionManager'

const YourProfile = (props) => {
    useEffect(() => {
        props.updateUserState();
        let s = props.currentUser.status;
        if (s === 'SITE_MANAGER') {
            window.addEventListener('storage', props.updateSiteManagerState);
            window.location.addEventListener('reload', props.updateSiteManagerState);
            props.set2();
        } else if (s === 'AUCTION_MANAGER') {
            window.addEventListener('storage', props.updateAuctionManagerState);
            window.location.addEventListener('reload', props.updateAuctionManagerState);
            props.set3();

        } else {
            window.addEventListener('storage', props.updateUserState);
            window.location.addEventListener('reload', props.updateUserState);
            props.set1();
        }
    }, [])
    return (<>
        <Switch>
            <Route path={'/your_profile/edit_auction'}><EditAuction /></Route>
            <Route path={'/your_profile/statistics'}>< AuctionStatistics /></Route>
            <Route path={'/your_profile/results'}><AuctionResults /></Route>
            <Route path={'/your_profile'}>{props.currentUser.status === 'SITE_MANAGER' ? (<SiteManagerTable />) : props.currentUser.status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) : (<UserTable />)}</Route>
        </Switch>
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { updateUserState, updateSiteManagerState, updateAuctionManagerState, set1, set2, set3, })(YourProfile);