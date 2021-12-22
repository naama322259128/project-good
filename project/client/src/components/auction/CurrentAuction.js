import { connect } from "react-redux";
import ProductList from './ProductList';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import Timer from "./Timer";
import './Auction.scss';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from "../../store/actions/user";

const CurrentAuction = (props) => {
    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id) {
            let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
    },[])
    return (<>

        <Link to={`/auction/cart`}><h1>Cart</h1></Link>


        {/* <Timer /> */}

        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(CurrentAuction);

