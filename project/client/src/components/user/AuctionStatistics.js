import './User.scss';
import { connect } from 'react-redux';
import React from 'react';


const AuctionStatistics = (props) => {
    return (
        <>

            <h1 >Chinese auction statistics</h1>

        </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction_id:state.user.selected_auction_to_options

    };
}
export default connect(mapStateToProps, {})(AuctionStatistics);