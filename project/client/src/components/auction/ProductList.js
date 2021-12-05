import Product from './Product';
import './Auction.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const ProductList = (props) => {
    return (<div class="products-container">
        
        {props.currentAuction && props.currentAuction.productList && props.currentAuction.productList.map((item) => {
            return <Product key={parseInt(item._id)} product={item} />
        })}
    </div>
    );

}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, {})(ProductList);

