import './yourProfile.scss'
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import EditProducts from './auction manager/EditProducts'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'
import { setUserItemsInLS, setAuctionManagerItemsInLS, setSiteManagerItemsInLS } from '../../utils/userUtils'
import { updateUserState } from '../../store/actions/user'
import { updateSiteManagerState } from '../../store/actions/siteManager'
import { updateAuctionManagerState } from '../../store/actions/auctionManager'
const YourProfile = (props) => {
    useEffect(() => {
        props.updateUserState();
        let s = props.currentUser.status;
        if (s === 'SITE_MANAGER') {
            window.addEventListener('storage', props.updateSiteManagerState);
            window.addEventListener('reload', props.updateSiteManagerState);
            props.setSiteManagerItemsInLS();
        } else if (s === 'AUCTION_MANAGER') {
            window.addEventListener('storage', props.updateAuctionManagerState);
            window.addEventListener('reload', props.updateAuctionManagerState);
            props.setAuctionManagerItemsInLS();

        } else {
            window.addEventListener('storage', props.updateUserState);
            window.addEventListener('reload', props.updateUserState);
            props.setUserItemsInLS();
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
export default connect(mapStateToProps, { updateUserState, updateSiteManagerState, updateAuctionManagerState, setUserItemsInLS, setAuctionManagerItemsInLS, setSiteManagerItemsInLS })(YourProfile);