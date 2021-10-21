import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { setCurrentAuction } from '../../store/actions/currentAuction'
import { Link } from 'react-router-dom';
import './home.scss';
import { setLogin } from "../../store/actions/home";
import { getAuctionsList } from "../../utils/auctionUtils";
import React, { useEffect, useState } from "react";
import { updateCurrentUser } from '../../store/actions/user'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState'
import * as actionTypes from '../../store/actionTypes';
import Login from '../user/Login';

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
    {state.loginIsOpen ? <Login /> : null}
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
                    // onClick={props.currentUser ? () => { props.setCurrentAuction(item._id) } : () => { window.scrollTo(0, 0); props.setLogin(true); }}
                    to={state.currentUser ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </>
    );
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, { setLogin, setCurrentAuction, updateCurrentUser })(AuctionsList);


