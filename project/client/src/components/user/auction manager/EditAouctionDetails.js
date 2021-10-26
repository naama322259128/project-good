//עדכון פרטי מכירה וארגון
import React from 'react';
import { connect } from "react-redux";
import './auctionManager.scss'
const EditAuctionDetails = (props) => {
    return (<>
        <h1>Edit your Chinese auction details</h1>
        שם מכירה

    </>
    )
}
const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {})(EditAuctionDetails);
