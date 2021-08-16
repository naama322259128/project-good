import React from 'react';
import './NewAuction.scss';
import { connect } from "react-redux";
import { setLastModal } from "../../store/actions/newAuction"; //האם להציג את מודל אישור סופי
import { createNewAuction } from "../../utils/auctionUtil"; //שמירת כל הנתונים במסד
const FinalStep = (props) => {
    let newAuction = {
        //לשנות את הסטטוס למנהל
        code: "צריך לשנות",
        name: props.organizationName,
        auctionManager: props.auctionManager,
        lotteriesDate: props.lotteriesDate,
        registrationEndDate: props.registrationEndDate,
        purchasePackage: props.packagesList,
        productList: props.productsList,
        orderList: null
    }
    
    return (
        <div id="myModal" className="modal_final_step glass_final_step" onClick={()=>{props.setLastModal(false)}}>
            <div className="modal-content_final_step">
                <h1>Are you sure the Chinese auction is ready?</h1>
                <button onClick={() => props.createNewAuction(newAuction)}>Yes</button>
                <button onClick={() => props.setLastModal(false)}>No</button>
            </div>
        </div>);
}
const mapStateToProps = (state) => {
    return {
        pricesList: state.auction.pricesList,//רשימת מחירים
        packagesList: state.auction.packagesList,// רשימת חבילות
        productsList: state.auction.productsList,//רשימת מוצרים
        regulationsFile: state.auction.regulationsFile,//קובץ תקנון
        dateOfLottery: state.auction.dateOfLottery,//תאריך ביצוע ההגרלות
        registrationEndDate: state.auction.registrationEndDate,//תאריך סיום ההרשמה
        organizationName: state.auction.organizationName,//שם ארגון
        organizationPhotos: state.auction.organizationPhotos,//תמונות הארגון
        auctionManager: state.auction.currentUser
    };
}
export default connect(mapStateToProps, { setLastModal ,createNewAuction})(FinalStep);