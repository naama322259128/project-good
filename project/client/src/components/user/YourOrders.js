import React, { useEffect } from 'react';
import './yourProfile.scss'
import { connect } from "react-redux";
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';


const YourOrders = (props) => {
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
    return (<div>
        <h1>Your Orders</h1>
    </div >);
}

const mapStateToProps = state => {
    return {
    };
}
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(YourOrders);