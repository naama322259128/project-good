import './User.scss';
import { connect } from 'react-redux';
import React from 'react';
import SiteManagerTable from './SiteManagerTable';
import AuctionManagerTable from './AuctionManagerTable';
import UserTable from './UserTable';

const YourProfile = (props) => {
    return (<>
        {props.currentUser.status === 'USER' ? (<UserTable />) : props.currentUser.status === 'AUCTION_MANAGER' ? (<AuctionManagerTable />) : (<SiteManagerTable />)}
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {})(YourProfile);