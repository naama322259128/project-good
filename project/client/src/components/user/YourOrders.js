import React, { useEffect } from 'react';
import './yourProfile.scss'
import { connect } from "react-redux";
import { dataUpdate } from '../../store/actions/user';


const YourOrders = (props) => {
   // useEffect(() => { //props.dataUpdate(); })
    return (<div>
        <h1>Your Orders</h1>
    </div >);
}

const mapStateToProps = state => {
    return {
    };
}
export default connect(mapStateToProps, {dataUpdate})(YourOrders);