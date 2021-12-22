import { Link } from 'react-router-dom'
import './CartAll.scss';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { emptyTheCartByAuction, getCartFromDB } from '../../utils/userUtils';
import { getAuctionFromDB } from '../../store/actions/currentAuction'
import de from '../../img/icons/dustbin.png'
import IconButton from '@material-ui/core/IconButton';
import OneAuction from '../homePage/OneAuction';
import { setNewAuction } from '../../store/actions/newAuction';
import { setCurrentAuction } from '../../store/actions/currentAuction';
import { signIn } from '../../store/actions/signIn';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
const CartAll = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);

        }



    }, [])

    useEffect(() => {
        if (props.currentUser) getCartFromDB(props.currentUser._id).then(succ => {
            if (succ.status != 400) setArray(succ.data);
        })
    }, [props.currentUser])

    const [array, setArray] = React.useState(null);

    return (<div id="a-container">
        {array && array.map((item) => {
            return (
                <div> <Link
                    key={parseInt(item.auction._id)}
                    onClick={() => props.getAuctionFromDB(item.auction._id)}
                    to={`/auction`}>
                    <OneAuction key={parseInt(item.auction._id)} item={item.auction} />

                </Link>
                    <center>
                        <h3>Amount to pay: {item.sum}₪</h3>
                        <IconButton onClick={() => emptyTheCartByAuction(item.auction._id, props.currentUser._id).then(succ => {
                            if (succ.status != 400) getCartFromDB(props.currentUser._id).then(succ => {
                                if (succ.status != 400) setArray(succ.data);
                            })
                        })} title="Delete" >
                            <img className="my_icon" src={de} ></img>
                        </IconButton>
                    </center>
                </div>
            )
        })}
    </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentAuction: state.currentAuction.currentAuction,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, { signIn, setCurrentAuction, setNewAuction, getAuctionFromDB, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(CartAll);