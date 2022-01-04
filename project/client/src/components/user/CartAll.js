import { Link } from 'react-router-dom'
import './CartAll.scss';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getCartFromDB } from '../../utils/userUtils';
import de from '../../img/icons/dustbin.png'
import IconButton from '@material-ui/core/IconButton';
import OneAuction from '../homePage/OneAuction';
import { setNewAuction } from '../../store/actions/newAuction';
import { setCurrentAuction, getAuctionFromDB } from '../../store/actions/currentAuction';
import { signIn } from '../../store/actions/signIn';
import { setUserByStorage, setShowDeleteAuctionFromCartModal, setAllCartArray, setDeleteAuctionFromCart } from '../../store/actions/user';
import DeleteAuctionFromCartModal from './DeleteAuctionFromCartModal';

const CartAll = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id && props.currentUser == null) props.setUserByStorage(id)
    }, [])

    useEffect(() => {
        if (props.currentUser) getCartFromDB(props.currentUser._id).then(succ => {
            if (succ.status != 400) props.setAllCartArray(succ.data);
        })
    }, [props.currentUser])


    return (<>
        {props.show && <DeleteAuctionFromCartModal />}
        <div id="a-container">
            {props.array && props.array.map((item) => {
                return (
                    <div>
                        <Link
                            key={parseInt(item.auction._id)}
                            onClick={() => props.getAuctionFromDB(item.auction._id)}
                            to={`/auction`}>
                            <OneAuction key={parseInt(item.auction._id)} item={item.auction} />
                        </Link>
                        <center>
                            <h3 style={{display:'inline-block',marginTop:'1.5vh'}}>Amount to pay: {item.sum}$ </h3>
                            <IconButton  style={{display:'inline-block'}}title="Delete" onClick={() => { props.setShowDeleteAuctionFromCartModal(true); props.setDeleteAuctionFromCart(item.auction) }} >
                                <img className="my_icon" src={de} ></img>
                            </IconButton>
                        </center>
                    </div>
                )
            })}
        </div>
        {props.array && props.array.length == 0 && <h1>You have no products in your shopping cart.</h1>}
    </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentAuction: state.currentAuction.currentAuction,
        currentUser: state.user.currentUser,
        show: state.user.showDeleteAuctionFromCartModal,
        array: state.user.allCartArray
    }
}
export default connect(mapStateToProps, { signIn, setCurrentAuction, setNewAuction, getAuctionFromDB, setUserByStorage, setShowDeleteAuctionFromCartModal, setDeleteAuctionFromCart,setAllCartArray })(CartAll);