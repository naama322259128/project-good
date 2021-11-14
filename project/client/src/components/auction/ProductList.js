import Product from './Product';
import './Auction.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

function ProductList(props) {

    return (<div>
        ProductList
        {props.currentAuction && props.currentAuction.productList &&
            props.currentAuction.productList.map((item) => {
                return (<Product key={parseInt(item._id)} item={item} />)
            })}
    </div>
    );

}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        loginIsOpen: state.user.loginIsOpen,
        currentAuction: state.auction.currentAuction
    }
}
export default connect(mapStateToProps, {})(ProductList);

