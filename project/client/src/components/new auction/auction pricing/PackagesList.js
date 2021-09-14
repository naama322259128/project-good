//רשימת חבילות רכישה קיימות
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { setPackagesList } from '../../../store/actions/newAuction'
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'
const PackagesList = (props) => {

    //let deletePackage = (p) => {
    // let x = JSON.parse(localStorage.getItem("packagesList")).remove(p);
    // localStorage.setItem("packagesList", JSON.stringify(x))
    //props.setPackagesList(x);
    //}
    const [state, dispatch, writeError] = useStorageReducer(
        //צריך לבדוק שהכרנט יוסר תואם למידע בלוקל סטורג
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטורג' וזה גם הסטייט הכללי
    );

    return (<>
        {/* אם יש חבילות שלו שנמצאות במסד נתונים, אם כן - להוסיפן */}
        <div className="ui divided selection list">
            {state.packagesList.map((item, index) => {
                return (<div key={index}>
                    <h2>qty: {item.qty}</h2>
                    <h2>discount: {item.discount}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => {
                        dispatch({
                            type: actionTypes.DELETE_PACKAGE,
                            payload: item
                        })/* deletePackage(item)*/
                    }} />
                </div>
                )
            })}
        </div></>
    );
}
const myMapStateToProps = (state) => {
    return {
        // arr: state.auction.packagesList
    }
}
export default connect(myMapStateToProps, {/* setPackagesList*/ })(PackagesList);
