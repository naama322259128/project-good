import { connect } from "react-redux";
import ProductList from './ProductList';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import Timer from "./Timer";
import './Auction.scss';
import { dataUpdate } from "../../store/actions/user";

const CurrentAuction = (props) => {
    useEffect(() => {
        //props.dataUpdate();
    })
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

export default connect(mapStateToProps, {dataUpdate})(CurrentAuction);

