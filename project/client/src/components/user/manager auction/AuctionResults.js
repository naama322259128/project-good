import '../yourProfile.scss'
import { connect } from 'react-redux';
import React from 'react';


const AuctionResults = (props) => {
    return (
        <>

            <h1 >Chinese auction results</h1>

        </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction_id:state.user.selected_auction_to_options

    };
}
export default connect(mapStateToProps, {})(AuctionResults);