import { connect } from "react-redux";
import Product from './Product';
import './Auction.scss';
import { updateCurrentAuction } from '../../store/actions/currentAuction';
import React, { useEffect } from 'react';
import { getProducts } from '../../store/actions/currentAuction';
import Button from '@material-ui/core/Button';

const ProductList = (props) => {
    // ? הצגת מוצרים ישירות מהמסד נתונים, איך נרענן אם מישהו יוסיף מוצר למסד
    // ? הצגת פרטי מוצר במכירה ישירות מהמסד, איך נרענן אם מנהל מכירה יעדכן פרטי מוצר

    return (<div>
        {/* {props.getProducts(JSON.parse(localStorage.getItem("currentAuction"))._id).map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })} */}

        {props.getProducts(JSON.parse(localStorage.getItem("currentAuction")).currnetAuction._id).map((item) => {
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

export default connect(mapStateToProps, { /*updateCurrentAuction,*/ getProducts })(ProductList);