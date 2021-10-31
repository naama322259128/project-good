import { useEffect } from "react";
import { connect } from "react-redux";
import { addPackageToDB } from '../../../store/actions/newAuction'
import * as actionTypes from '../../../store/actionTypes'

const AddPackage = (props) => {

    let newPackage = { qty: 0, discount: 0 };
    let checkQty = () => {
        let tmp = [];
        if (props.arr) tmp = props.arr.filter(p => p.qty === newPackage.qty);//פילטר מחזיר רק את אלה שעונים לתנאי
        if (tmp.length > 0 || newPackage.qty < 2) document.getElementById("qtyInput").style.borderColor = "red";
        else document.getElementById("qtyInput").style.borderColor = "";
    }
    let checkDiscount = () => {
        if (newPackage.discount < 2) document.getElementById("discountInput").style.borderColor = "red";
        else document.getElementById("discountInput").style.borderColor = "";
    }

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
                onClick={() => props.addPackageToDB(newPackage)}>Add</button>
        </form >
    );
}
const mapStateToProps = (state) => {
    return {
        arr: state.auction.newAuction.productList
    };
}
export default connect(mapStateToProps, { addPackageToDB })(AddPackage);

//לא לאפשר הוספת חבילה עם כמות שכבר קיימת
//disable
//להציג מסגרת אדומה אם לחץ מספר שלילי
