import './Cart.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const Success = (props) => {

  
    return (<center>
<h1>Payment made successfully!<br/>
Thank you for taking part in the blessed activity!</h1>
    </center>
    );
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction,
        user: state.user,
    }
}
export default connect(mapStateToProps, { })(Success);

