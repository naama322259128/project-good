import './yourProfile.scss'
import React, { useEffect } from 'react';
import SiteManagerTable from './site manager/SiteManagerTable';
import AuctionManagerTable from './auction manager/AuctionManagerTable';
import UserTable from './UserTable';
import { Route, Switch } from 'react-router-dom'
import AuctionResults from './auction manager/AuctionResults'
import AuctionStatistics from './auction manager/AuctionStatistics'
import { connect } from 'react-redux';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';


const YourProfile = (props) => {

    //TODO: לבדוק שהיוסר או הכרנט-יוסר לא אנדיפיינד
    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])
    return (props.user &&
        (<Switch>
            {props.user.status === 'AUCTION_MANAGER' && <Route path={'/your_profile/statistics'}>< AuctionStatistics /> </Route>}
            {props.user.status === 'AUCTION_MANAGER' && <Route path={'/your_profile/results'}><AuctionResults /></Route>}
            <Route path={'/your_profile'}>
                {
                    props.user.status === 'SITE_MANAGER' ? (<SiteManagerTable />) :
                        props.user.status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) :
                            null
                }
                <UserTable />
            </Route>
        </Switch>)
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        currentUser: state.user.currentUser

    };
}
export default connect(mapStateToProps, { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(YourProfile);
