import './Auction.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const PurchaseSettings = (props) => {
    return (<>
        <br/>
        <br/>

        PurchaseSettings
        <br/>
        <br/>
        <br/>
        חיה......................
    </>
    );

}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, {})(PurchaseSettings);

