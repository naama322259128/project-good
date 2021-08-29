import { connect } from "react-redux";
import Product from './Product'
import './Auction.scss';
import { updateCurrentAuction } from '../../store/actions/currentAuction'
import React, { useEffect } from 'react';

const ProductList = (props) => {
    useEffect(() => { props.updateCurrentAuction(localStorage.getItem("currentAuction")) }, [])

    return (<div> 
        {props.arr.map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })} 
    </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.currentAuction.productsList,
    }
}

export default connect(mapStateToProps, {updateCurrentAuction})(ProductList);