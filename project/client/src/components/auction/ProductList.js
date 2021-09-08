import { connect } from "react-redux";
import Product from './Product';
import './Auction.scss';
import { updateCurrentAuction } from '../../store/actions/currentAuction';
import React, { useEffect } from 'react';
import { getProducts } from '../../store/actions/currentAuction';
import Button from '@material-ui/core/Button';

const ProductList = (props) => {

    //TODO: איך הפונקציה תתרענן בעת הוספת מוצר למסד ?
    return (<div>
        {props.getProducts(JSON.parse(localStorage.getItem("currentAuction"))._id).map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })}
      
    </div>
    );
}
const mapStateToProps = (state) => {
    return {
        //arr: state.currentAuction.productsList,
    }
}

export default connect(mapStateToProps, { updateCurrentAuction, getProducts })(ProductList);