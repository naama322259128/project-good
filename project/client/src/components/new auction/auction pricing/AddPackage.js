import { useEffect } from "react";
import { connect } from "react-redux";
// import { setPackagesList, showAddPackage } from '../../../store/actions/newAuction'
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'

const AddPackage = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטורג' וזה גם הסטייט הכללי
    );
    let newPackage = { qty: 0, discount: 0 };
    let checkQty = () => {
        let tmp = state.packagesList.filter(p => p.qty === newPackage.qty);//פילטר מחזיר רק את אלה שעונים לתנאי
        if (tmp.length > 0 || newPackage.qty < 2) document.getElementById("qtyInput").style.borderColor = "red";
        else document.getElementById("qtyInput").style.borderColor = "";
    }
    let checkDiscount = () => {
        if (newPackage.discount < 2) document.getElementById("discountInput").style.borderColor = "red";
        else document.getElementById("discountInput").style.borderColor = "";
    }
    /*let addPackageToLS = () => {
        let arr = localStorage.getItem('packagesList');
        arr.push(newPackage)

        localStorage.setItem("packagesList", JSON.stringify(arr))//האם צריך שורה זו
        //props.setPackagesList(arr);

        localStorage.setItem('showSetPackageBtn', true);
        //props.showAddPackage(true);
    }*/
    return (
        <form >
            <div className="ui equal width form">
                <div className="fields">
                    <div className="field">
                        <label>Quantity of tickets</label>
                        <input type="number" id="qtyInput" onChange={(e) => { newPackage.qty = e.target.value; checkQty() }} />
                    </div>
                    <div className="field">
                        <label>Discount percentages</label>
                        <input id="discountInput" type="number" min="2" required={(newPackage.qty > 0)} onChange={(e) => { newPackage.discount = e.target.value; checkDiscount() }} />
                    </div>
                </div>
            </div>
            <button className="positive ui button"
                // disabled={parseInt(newPackage.qty) < 1 || parseInt(newPackage.discount) < 2}
                onClick={() => {
                    dispatch({
                        type: actionTypes.ADD_PACKAGE,
                        payload: newPackage
                    })
                    /*addPackageToLS(newPackage);*/
                }}>Add</button>
        </form >
    );
}
const mapStateToProps = (state) => {
    return {
        // arr: state.auction.packagesList
    };
}
export default connect(mapStateToProps, {/* setPackagesList, showAddPackage*/ })(AddPackage);

//לא לאפשר הוספת חבילה עם כמות שכבר קיימת
//disable
//להציג מסגרת אדומה אם לחץ מספר שלילי

// showAddPackage פונקציה שמקבלת פרמטר בוליאני ומגדירה את 
// המשתנה הבוליאני showSetPackage שבסטייט

// showSetPackageBtn משתנה בוליאני בלוקלסטורג'
