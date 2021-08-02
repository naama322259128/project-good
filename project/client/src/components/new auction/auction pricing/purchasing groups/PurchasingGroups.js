import React, { useState } from 'react';
import { showAddGroup } from '../../../../store/actions/newAuction';
import PricingList from '../purchasing groups/PricingList';
import AddGroup from '../purchasing groups/AddGroup';
import { connect } from "react-redux";

//קבוצות תמחור
//נציג את רשימת הקבוצות שכבר הוסיף
//וגם כפתור להוספת קבוצה חדשה
//קומפוננטה זו תוצג בתוך 
//AuctionPricing

const PurchasingGroups = (props) => {
    return (
        <>
            <h1>Purchasing Group</h1>
            {/* קבוצת תמחור היא קבוצת כרטיסים בעלי אותו מחיר */}
            <label>A purchasing group is a group of tickets with the same price</label>
            <div className="ui form">
                <div className="three fields">
                    {<PricingList />}
                    {<AddGroup />}
                    <br />
                    <input className="ui button" type="button" value="Add Purchasing Group" onClick={props.showAddGroup} />
                </div>
            </div>
        </>);
}
const mapStateToProps = state => {
    return {
        // showSetPrice: state.showSetPrice,
        pricesList: state.pricesList
    };
}
export default connect(mapStateToProps, { showAddGroup })(PurchasingGroups);



