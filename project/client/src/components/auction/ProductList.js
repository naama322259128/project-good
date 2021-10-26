import Product from './Product';
import './Auction.scss';
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../store/actions/currentAuction';
import { connect } from "react-redux";

function ProductList (props)  {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.getProducts(props.currnetAuction))
    },[]);
    return (<div>
        {products.length&&
        products.map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })}
    </div>
    );

}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        loginIsOpen: state.user.loginIsOpen,
        currnetAuction: state.auction._id
    }
}
export default connect(mapStateToProps, { getProducts })(ProductList);

