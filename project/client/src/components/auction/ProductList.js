import Product from './Product';
import './Auction.scss';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../store/actions/currentAuction';

const ProductList = (props) => {

    const [products, setProducts] = useState([]);
    useEffect = (() => {
        getProducts(JSON.parse(localStorage.getItem("currentAuction")).currnetAuction).then(
            succ => { setProducts(succ.data) });
    }, []);

    return (<div>
        {products.map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })}
    </div>
    );

}


export default ProductList;