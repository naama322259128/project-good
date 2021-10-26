import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { Link } from 'react-router-dom';
import './home.scss';
import { getAuctionsList } from "../../utils/auctionUtils";
import React, { useEffect, useState } from "react";
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState'
import * as actionTypes from '../../store/actionTypes';

const AuctionsList = (props) => {
    let [auctionsList, setAuctionsList] = useState([]);
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
    );
    //הכנסת רשימה של כל המכירות הקיימות במסד נתונים
    useEffect(() => {
        getAuctionsList().then(succ => { setAuctionsList(succ.data) })
    }, []);

    return (<>
        {auctionsList && auctionsList.map((item) => {
            return (
                <Link
                    key={parseInt(item._id)}
                    onClick={state.currentUser ? null : () => {
                        window.scrollTo(0, 0);
                        dispatch({
                            type: actionTypes.SET_LOGIN,
                            payload: true
                        })
                    }}
                    to={state.currentUser ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </>
    );
}

export default AuctionsList;


