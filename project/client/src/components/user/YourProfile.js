import './yourProfile.scss'
import React, { useEffect } from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { Route, Switch } from 'react-router-dom'
import EditAuction from './auction manager/EditAuction'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'
import { connect } from 'react-redux';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';


const YourProfile = (props) => {

    //TODO: לבדוק שהיוסר או הכרנט-יוסר לא אנדיפיינד
    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id) {
            let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        };
    },[])
    return (
        <Switch>
            <Route path={'/your_profile/edit_auction'}>{props.user.status === 'AUCTION_MANAGER' ? <EditAuction /> : null}</Route>
            <Route path={'/your_profile/statistics'}>{props.user.status === 'AUCTION_MANAGER' ? < AuctionStatistics /> : null}</Route>
            <Route path={'/your_profile/results'}>{props.user.status === 'AUCTION_MANAGER' ? <AuctionResults /> : null}</Route>
            <Route path={'/your_profile'}>
                {/* {props.user.status === 'SITE_MANAGER' ? (<SiteManagerTable />) :
                    props.user.status === 'AUCTION_MANAGER' ?
                        (<AuctionManagerTable />) : null} */}
                <UserTable />
            </Route>
        </Switch>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        userId: state.user.currentUser._id

    };
}
export default connect(mapStateToProps, { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(YourProfile);
